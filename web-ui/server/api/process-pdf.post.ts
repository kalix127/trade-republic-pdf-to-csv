export default defineEventHandler(async (event) => {
  try {
    // Parse the multipart form data using Nuxt 3's built-in function
    const formData = await readMultipartFormData(event);

    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        message: "No files uploaded",
      });
    }

    // Find the PDF file in the form data
    const pdfFile = formData.find(item => item.name === "pdf");

    if (!pdfFile || !pdfFile.data) {
      throw createError({
        statusCode: 400,
        message: "No PDF file uploaded",
      });
    }

    // Get Python API URL from environment or default to Docker service name
    const pythonApiUrl = process.env.PYTHON_API_URL || "http://python-api:8000";

    try {
      // Create FormData to forward to Python API
      const apiFormData = new FormData();
      const blob = new Blob([pdfFile.data], { type: "application/pdf" });
      apiFormData.append("pdf", blob, pdfFile.filename || "document.pdf");

      // Call Python FastAPI service
      const response = await $fetch(`${pythonApiUrl}/process-pdf`, {
        method: "POST",
        body: apiFormData,
      });

      // Return the response from Python API
      return {
        success: response.success,
        message: response.message,
        stats: response.stats,
        csvContent: response.csv_content,
      };
    } catch (apiError: any) {
      // Handle API communication errors
      console.error("Python API Error:", apiError);

      throw createError({
        statusCode: 502,
        message: `Failed to communicate with PDF processing service: ${apiError.message || "Unknown error"}`,
      });
    }
  } catch (error: any) {
    // Ensure any error is properly formatted
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});
