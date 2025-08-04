export default defineI18nConfig(() => ({
  legacy: false,
  missingWarn: false,
  messages: {
    en: {
      language: {
        english: "English",
        italian: "Italiano",
      },

      hero: {
        title: "Easily convert your Trade Republic PDFs",
        description: "Easily convert your Trade Republic statements to CSV files with our free and open-source tool, with no usage limits and no cost. Keep track of your investments and simplify your tax reporting—no hassle.",
      },

      faq: {
        title: "Frequently Asked Questions",
        q1: {
          question: "What PDF formats are supported?",
          answer: "The web UI currently only supports Trade Republic PDF statements from Italy. However, our Python tool can be adjusted to work with other languages and formats if needed.",
        },
        q2: {
          question: "Is my data secure and private?",
          answer: "Yes. When using the web UI, your PDF files are uploaded temporarily to our server for processing, but they are immediately deleted after the conversion is complete. No files are permanently stored.",
        },
        q3: {
          question: "What information gets extracted?",
          answer: "We extract all transaction data including dates, amounts, ISINs, transaction types, and fees. The data is separated into two CSV files: 'trades.csv' contains only buy/sell trades, while 'transactions.csv' contains everything else such as card transactions, bank transfers, cashback, and other activities.",
        },
        q4: {
          question: "How accurate is the conversion?",
          answer: "The conversion should be accurate as our parsing engine is specifically designed for Trade Republic's format. However, always double-check the results with your original PDF as Trade Republic might update their PDF structure at any moment, which could cause the tool to fail or produce incorrect results.",
        },
        q5: {
          question: "Can I use this for other brokers?",
          answer: "Currently, this tool is specifically designed for Trade Republic Italy statements. Other brokers use different formats that would require separate parsers.",
        },
        q6: {
          question: "Is this service free?",
          answer: "Yes, this service is completely free to use. No registration, no hidden fees, no limitations.",
        },
      },

      fileUpload: {
        uploadFile: "Upload file",
        dragDropText: "Drag or drop your files here or click to upload",
        unknownType: "unknown type",
        modified: "modified",
        fileSelected: "File selected",
        fileSelectedDesc: "PDF file is ready for processing",
        uploadDisabled: "File upload disabled",
        fileAlreadySelected: "File already selected for processing",
      },

      pdfProcessor: {
        processPdf: "Process PDF",
        waitingConsent: "Waiting for consent",
        pleaseAcceptPrivacy: "Please accept our privacy policy to continue.",
        processing: "Processing PDF...",
        errorProcessing: "Error during PDF processing",
        processAnother: "Process another PDF",
        downloadTransactions: "Download Transactions",
        downloadTrades: "Download Trades",
        processingFailed: "Unable to process the PDF. Please make sure it is a valid Trade Republic statement.",
        processingComplete: "Processing completed!",
        uploading: "Uploading PDF...",
        invalidFile: "Please select a valid PDF file",
        transactionsDesc: "Cards, bank transfers, fees, cashback",
        tradesDesc: "Buy/sell operations",
        processingServer: "Processing PDF on the server...",
      },

      footer: {
        madeBy: "Made by",
        privacy: "Privacy Policy",
        contact: "Contact Us",
        contactDescription: "If you have any questions, issues, or suggestions, please reach out to us:",
        githubRepository: "GitHub Repository",
        copyright: "All rights reserved.",
      },

      error: {
        page_not_found: "Oops! The page you're looking for doesn't exist.",
        internal_server_error: "Oops! An internal server error occurred.",
        something_went_wrong: "Something went wrong.",
        if_error_persists: "If the error persists, contact us on",
        take_home: "Take me home",
      },

      seo: {
        default: {
          title: "Home - TR Converter",
          description: "Convert your Trade Republic PDFs to CSV files",
        },
        privacy: {
          title: "Privacy Policy - TR Converter",
          description: "Privacy Policy of TR Converter",
        },
        error: {
          title: "Error - TR Converter",
          description: "An error occurred while processing your request.",
        },
      },

      privacy: {
        title: "Privacy Policy",
        lastUpdated: "Last updated: August 4, 2025",
        consentTitle: "Privacy Policy Consent",
        consentMessage: "Before processing your PDF file, please accept our privacy policy.",
        dataProcessingInfo: "Your PDF file will be uploaded to our servers temporarily for processing. The file is automatically deleted after conversion and no financial data is stored permanently.",
        acceptanceRequired: "By accepting, you agree to our privacy policy and data processing terms.",
        codeTransparency: "You can review our code for transparency at:",
        repositoryLink: "GitHub Repository",
        consultPolicy: "You can consult our privacy policy here:",
        accept: "Accept and Continue",
        reject: "Reject",
        sections: {
          introduction: {
            title: "Introduction",
            content: "This Privacy Policy describes how TR Converter (\"we\", \"our\", or \"us\") collects, uses, and protects your information when you use our PDF conversion service. We are committed to protecting your privacy and ensuring the security of your personal data. This policy applies to all users of our website and services, regardless of location, and explains your privacy rights and how the law protects you.",
          },
          scope: {
            title: "Scope of This Policy",
            content: "This Privacy Policy covers our treatment of personally identifiable information that we gather when you are accessing or using our services. This policy does not apply to the practices of companies that we do not own or control, or to individuals that we do not employ or manage.",
          },
          dataCollection: {
            title: "Information We Collect",
            content: "We collect minimal information to provide our service and ensure optimal user experience:",
            items: [
              "IP address for security, fraud prevention, and abuse prevention",
              "Browser information including user agent, language preferences, and screen resolution for compatibility optimization and troubleshooting",
              "Usage analytics through Umami including page views, session duration, and referral sources (privacy-focused analytics)",
              "Device information such as operating system and browser version for technical support",
              "Timestamps of service usage for performance monitoring and abuse detection",
            ],
          },
          pdfProcessing: {
            title: "PDF Processing and File Handling",
            important: "Important:",
            importantText: "Your PDF files are sent to our servers for processing to extract and convert the data to CSV format. However, no personal information from your PDFs is stored permanently. Files are processed temporarily and automatically deleted after conversion. We do not read, analyze, or store the content of your financial documents beyond the automated processing required for conversion.",
          },
          dataRetention: {
            title: "Data Retention",
            content: "We retain different types of data for different periods:",
            items: [
              "PDF files: Immediately deleted after processing (typically within minutes)",
              "Generated CSV files: Available for download for 24 hours, then permanently deleted",
              "Server logs: Retained for 30 days for security monitoring and debugging purposes",
              "Analytics data: Anonymized data retained indefinitely for service improvement",
              "Error logs: Retained for 90 days for troubleshooting and service improvement",
            ],
          },
          thirdParty: {
            title: "Third-Party Services",
            cloudflare: {
              title: "Cloudflare",
              content: "We use Cloudflare for content delivery network (CDN), DDoS protection, security, and performance optimization. Cloudflare may collect certain technical information including IP addresses, system configuration information, and other information about traffic to and from our website as described in their Privacy Policy. Cloudflare is GDPR compliant and processes data as our processor.",
            },
            analytics: {
              title: "Analytics",
              content: "We use Umami (https://umami.is/) for privacy-focused website analytics. Umami is a privacy-first analytics platform that:",
              items: [
                "Does not use cookies or track personal information across websites",
                "Collects only anonymous usage data without personal identifiers",
                "Is fully GDPR compliant and does not require cookie consent",
                "Does not share data with third parties or advertising networks",
                "Stores data on our own servers, not third-party services",
                "Provides aggregate statistics only, no individual user tracking",
              ],
            },
          },
          dataSecurity: {
            title: "Data Security",
            content: "We implement comprehensive technical and organizational measures to protect your data:",
            items: [
              "PDF files are processed in isolated containers and deleted immediately after conversion",
              "No personal financial information is stored permanently on our servers",
              "All communications are encrypted using HTTPS/TLS 1.3 with strong cipher suites",
              "Regular security reviews, penetration testing, and vulnerability assessments",
              "Access controls and authentication for all administrative functions",
              "Automated monitoring for unusual activity and potential security threats",
              "Regular backups of system configurations (not user data) with encryption",
              "Compliance with industry security standards and best practices",
            ],
          },
          cookiesAndTracking: {
            title: "Cookies and Tracking",
            content: "Our approach to cookies and tracking technologies:",
            items: [
              "We do not use traditional tracking cookies or advertising cookies",
              "Essential cookies may be used for basic website functionality and security",
              "We do not participate in cross-site tracking or behavioral advertising",
              "No third-party advertising networks have access to your data",
              "Your browser's Do Not Track settings are respected",
              "You can disable cookies in your browser without affecting core functionality",
            ],
          },
          internationalTransfers: {
            title: "International Data Transfers",
            content: "Our services operate globally, and data may be processed in different locations:",
            items: [
              "Data processing occurs in secure data centers within the European Union",
              "We ensure adequate protection for any international data transfers",
              "All transfers comply with GDPR requirements and adequacy decisions",
              "We use Standard Contractual Clauses where required for data protection",
            ],
          },
          gdprRights: {
            title: "Your Rights Under GDPR",
            content: "Under the General Data Protection Regulation (GDPR), you have the following rights:",
            items: [
              "Right of access: Request copies of your personal data and information about how it's processed",
              "Right to rectification: Request correction of inaccurate or incomplete personal data",
              "Right to erasure ('right to be forgotten'): Request deletion of your personal data under certain circumstances",
              "Right to restrict processing: Request limitation of processing your personal data in specific situations",
              "Right to data portability: Request transfer of your data to another service in structured format",
              "Right to object: Object to processing of your personal data for legitimate interests or direct marketing",
              "Rights related to automated decision-making: Protection against solely automated decisions that significantly affect you",
              "Right to withdraw consent: Withdraw previously given consent for data processing at any time",
            ],
          },
          legalBasis: {
            title: "Legal Basis for Processing",
            content: "We process your personal data based on the following legal grounds:",
            items: [
              "Legitimate interests: For website security, fraud prevention, and service improvement",
              "Contract performance: To provide the PDF conversion service you requested",
              "Legal obligations: To comply with applicable laws and regulations",
              "Consent: Where you have explicitly provided consent for specific processing activities",
            ],
          },
          changes: {
            title: "Changes to This Privacy Policy",
            content: "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will update the 'Last updated' date at the top of this policy. For significant changes, we may provide additional notice such as a prominent announcement on our website. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your privacy.",
          },
          contact: {
            title: "Contact Us",
            content: "If you have any questions about this Privacy Policy, our data practices, or wish to exercise your privacy rights, please contact us at info{'@'}gianlucaiavicoli.dev. We will respond to your inquiry within 30 days as required by GDPR. For urgent privacy concerns, please mark your email as 'Privacy - Urgent' in the subject line.",
          },
        },
      },
    },

    it: {
      language: {
        english: "Inglese",
        italian: "Italiano",
      },

      hero: {
        title: "Converti facilmente i PDF di Trade Republic",
        description: "Converti facilmente i tuoi estratti conto di Trade Republic in file CSV con il nostro strumento gratuito e open source, senza limiti di utilizzo e senza alcun costo. Tieni traccia dei tuoi investimenti e semplifica la dichiarazione dei redditi—senza complicazioni.",
      },

      faq: {
        title: "Domande Frequenti",
        q1: {
          question: "Quali formati PDF sono supportati?",
          answer: "L'interfaccia web attualmente supporta solo gli statement PDF di Trade Republic dall'Italia. Tuttavia, il nostro strumento Python può essere adattato per funzionare con altre lingue e formati se necessario.",
        },
        q2: {
          question: "I miei dati sono sicuri e privati?",
          answer: "Sì. Quando usi l'interfaccia web, i tuoi file PDF vengono caricati temporaneamente sul nostro server per l'elaborazione, ma vengono immediatamente eliminati dopo il completamento della conversione. Nessun file viene memorizzato permanentemente.",
        },
        q3: {
          question: "Quali informazioni vengono estratte?",
          answer: "Estraiamo tutti i dati delle transazioni inclusi date, importi, ISIN, tipi di transazione e commissioni. I dati sono separati in due file CSV: 'trades.csv' contiene solo le operazioni di acquisto/vendita, mentre 'transactions.csv' contiene tutto il resto come transazioni con carta, bonifici bancari, cashback e altre attività.",
        },
        q4: {
          question: "Quanto è precisa la conversione?",
          answer: "La conversione dovrebbe essere precisa poiché il nostro motore di parsing è progettato specificamente per il formato di Trade Republic. Tuttavia, controlla sempre i risultati con il tuo PDF originale poiché Trade Republic potrebbe aggiornare la struttura del PDF in qualsiasi momento, il che potrebbe causare il malfunzionamento dello strumento o produrre risultati errati.",
        },
        q5: {
          question: "Posso usarlo per altri broker?",
          answer: "Attualmente, questo strumento è progettato specificamente per gli statement di Trade Republic Italia. Altri broker usano formati diversi che richiederebbero parser separati.",
        },
        q6: {
          question: "Questo servizio è gratuito?",
          answer: "Sì, questo servizio è completamente gratuito da usare. Nessuna registrazione, nessuna commissione nascosta, nessuna limitazione.",
        },
      },

      fileUpload: {
        uploadFile: "Carica file",
        dragDropText: "Trascina o rilascia i tuoi file qui o clicca per caricare",
        unknownType: "tipo sconosciuto",
        modified: "modificato",
        fileSelected: "File selezionato",
        fileSelectedDesc: "Il file PDF è pronto per l'elaborazione",
        uploadDisabled: "Caricamento file disabilitato",
        fileAlreadySelected: "File già selezionato per l'elaborazione",
      },

      pdfProcessor: {
        processPdf: "Elabora PDF",
        waitingConsent: "Attesa del consenso",
        pleaseAcceptPrivacy: "Accetta la nostra informativa sulla privacy per continuare.",
        processing: "Elaborazione PDF...",
        errorProcessing: "Errore nell'Elaborazione PDF",
        processAnother: "Elabora un Altro PDF",
        downloadTransactions: "Scarica Transazioni",
        downloadTrades: "Scarica Operazioni",
        processingFailed: "Elaborazione PDF fallita. Assicurati che sia un estratto conto Trade Republic valido.",
        processingComplete: "Elaborazione completata!",
        uploading: "Caricamento PDF...",
        invalidFile: "Seleziona un file PDF valido",
        transactionsDesc: "Carte, bonifici bancari, commissioni, cashback",
        tradesDesc: "Transazioni di acquisto/vendita",
        processingServer: "Elaborazione PDF sul server...",
      },

      footer: {
        madeBy: "Realizzato da",
        privacy: "Informativa sulla privacy",
        contact: "Contattaci",
        contactDescription: "Se hai domande, problemi o suggerimenti, contattaci su:",
        githubRepository: "Repository GitHub",
        copyright: "Tutti i diritti riservati.",
      },

      error: {
        page_not_found: "Oops! La pagina che stai cercando non esiste.",
        internal_server_error: "Oops! Si è verificato un errore interno del server.",
        something_went_wrong: "Qualcosa è andato storto.",
        if_error_persists: "Se l'errore persiste, contattaci su",
        take_home: "Torna alla home",
      },

      seo: {
        default: {
          title: "Home - TR Converter",
          description: "Convert your Trade Republic PDFs to CSV files",
        },
        privacy: {
          title: "Informativa sulla Privacy - TR Converter",
          description: "Informativa sulla Privacy di TR Converter",
        },
        error: {
          title: "Errore - TR Converter",
          description: "Si è verificato un errore durante l'elaborazione della tua richiesta.",
        },
      },

      privacy: {
        title: "Informativa sulla Privacy",
        lastUpdated: "Ultimo aggiornamento: 4 agosto 2025",
        consentTitle: "Consenso Informativa sulla Privacy",
        consentMessage: "Prima di elaborare il tuo file PDF, accetta la nostra informativa sulla privacy.",
        dataProcessingInfo: "Il tuo file PDF verrà caricato temporaneamente sui nostri server per l'elaborazione. Il file viene automaticamente eliminato dopo la conversione e nessun dato finanziario viene memorizzato permanentemente.",
        acceptanceRequired: "Accettando, accetti la nostra informativa sulla privacy e i termini di elaborazione dei dati.",
        codeTransparency: "Puoi rivedere il nostro codice per trasparenza su:",
        repositoryLink: "Repository GitHub",
        consultPolicy: "Puoi consultare la nostra informativa sulla privacy qui:",
        accept: "Accetta e Continua",
        reject: "Rifiuta",
        sections: {
          introduction: {
            title: "Introduzione",
            content: "Questa Informativa sulla Privacy descrive come TR Converter (\"noi\", \"nostro\") raccoglie, utilizza e protegge le tue informazioni quando utilizzi il nostro servizio di conversione PDF. Ci impegniamo a proteggere la tua privacy e a garantire la sicurezza dei tuoi dati personali. Questa policy si applica a tutti gli utenti del nostro sito e servizi, indipendentemente dalla posizione, e spiega i vostri diritti alla privacy e come la legge vi protegge.",
          },
          scope: {
            title: "Ambito di Questa Policy",
            content: "Questa Informativa sulla Privacy copre il nostro trattamento delle informazioni personalmente identificabili che raccogliamo quando accedi o utilizzi i nostri servizi. Questa policy non si applica alle pratiche di aziende che non possediamo o controlliamo, o a individui che non impieghiamo o gestiamo.",
          },
          dataCollection: {
            title: "Informazioni che Raccogliamo",
            content: "Raccogliamo informazioni minime per fornire il nostro servizio e garantire un'esperienza utente ottimale:",
            items: [
              "Indirizzo IP per sicurezza, prevenzione frodi e abusi",
              "Informazioni del browser inclusi user agent, preferenze linguistiche e risoluzione schermo per ottimizzazione compatibilità e risoluzione problemi",
              "Analisi dell'utilizzo tramite Umami incluse visualizzazioni pagine, durata sessioni e fonti di riferimento (analytics rispettoso della privacy)",
              "Informazioni del dispositivo come sistema operativo e versione browser per supporto tecnico",
              "Timestamp dell'utilizzo del servizio per monitoraggio prestazioni e rilevamento abusi",
            ],
          },
          pdfProcessing: {
            title: "Elaborazione PDF e Gestione File",
            important: "Importante:",
            importantText: "I tuoi file PDF vengono inviati ai nostri server per l'elaborazione al fine di estrarre e convertire i dati in formato CSV. Tuttavia, nessuna informazione personale dai tuoi PDF viene memorizzata permanentemente. I file vengono elaborati temporaneamente e automaticamente eliminati dopo la conversione. Non leggiamo, analizziamo o memorizziamo il contenuto dei tuoi documenti finanziari oltre l'elaborazione automatizzata richiesta per la conversione.",
          },
          dataRetention: {
            title: "Conservazione dei Dati",
            content: "Conserviamo diversi tipi di dati per periodi diversi:",
            items: [
              "File PDF: Eliminati immediatamente dopo l'elaborazione (tipicamente entro minuti)",
              "File CSV generati: Disponibili per il download per 24 ore, poi eliminati permanentemente",
              "Log del server: Conservati per 30 giorni per monitoraggio sicurezza e debugging",
              "Dati analytics: Dati anonimizzati conservati indefinitamente per miglioramento servizio",
              "Log errori: Conservati per 90 giorni per risoluzione problemi e miglioramento servizio",
            ],
          },
          thirdParty: {
            title: "Servizi di Terze Parti",
            cloudflare: {
              title: "Cloudflare",
              content: "Utilizziamo Cloudflare per content delivery network (CDN), protezione DDoS, sicurezza e ottimizzazione delle prestazioni. Cloudflare può raccogliere alcune informazioni tecniche inclusi indirizzi IP, informazioni di configurazione del sistema e altre informazioni sul traffico da e verso il nostro sito web come descritto nella loro Informativa sulla Privacy. Cloudflare è conforme al GDPR e elabora i dati come nostro processore.",
            },
            analytics: {
              title: "Analytics",
              content: "Utilizziamo Umami (https://umami.is/) per analytics web rispettoso della privacy. Umami è una piattaforma di analytics che mette la privacy al primo posto e che:",
              items: [
                "Non utilizza cookie o traccia informazioni personali tra siti web",
                "Raccoglie solo dati di utilizzo anonimi senza identificatori personali",
                "È completamente conforme al GDPR e non richiede consenso per i cookie",
                "Non condivide dati con terze parti o reti pubblicitarie",
                "Memorizza i dati sui nostri server, non su servizi di terze parti",
                "Fornisce solo statistiche aggregate, nessun tracciamento individuale degli utenti",
              ],
            },
          },
          dataSecurity: {
            title: "Sicurezza dei Dati",
            content: "Implementiamo misure tecniche e organizzative complete per proteggere i tuoi dati:",
            items: [
              "I file PDF vengono elaborati in container isolati ed eliminati immediatamente dopo la conversione",
              "Nessuna informazione finanziaria personale viene memorizzata permanentemente sui nostri server",
              "Tutte le comunicazioni sono crittografate utilizzando HTTPS/TLS 1.3 con suite di cifratura robuste",
              "Revisioni di sicurezza regolari, test di penetrazione e valutazioni delle vulnerabilità",
              "Controlli di accesso e autenticazione per tutte le funzioni amministrative",
              "Monitoraggio automatizzato per attività inusuali e potenziali minacce alla sicurezza",
              "Backup regolari delle configurazioni di sistema (non dati utente) con crittografia",
              "Conformità agli standard di sicurezza industriali e alle migliori pratiche",
            ],
          },
          cookiesAndTracking: {
            title: "Cookie e Tracciamento",
            content: "Il nostro approccio ai cookie e alle tecnologie di tracciamento:",
            items: [
              "Non utilizziamo cookie di tracciamento tradizionali o cookie pubblicitari",
              "I cookie essenziali possono essere utilizzati per funzionalità di base del sito web e sicurezza",
              "Non partecipiamo al tracciamento cross-site o alla pubblicità comportamentale",
              "Nessuna rete pubblicitaria di terze parti ha accesso ai tuoi dati",
              "Le impostazioni Do Not Track del tuo browser sono rispettate",
              "Puoi disabilitare i cookie nel tuo browser senza influire sulle funzionalità principali",
            ],
          },
          internationalTransfers: {
            title: "Trasferimenti Internazionali di Dati",
            content: "I nostri servizi operano globalmente e i dati possono essere elaborati in diverse località:",
            items: [
              "L'elaborazione dei dati avviene in data center sicuri all'interno dell'Unione Europea",
              "Garantiamo protezione adeguata per qualsiasi trasferimento internazionale di dati",
              "Tutti i trasferimenti sono conformi ai requisiti GDPR e alle decisioni di adeguatezza",
              "Utilizziamo Clausole Contrattuali Standard dove richiesto per la protezione dei dati",
            ],
          },
          gdprRights: {
            title: "I Tuoi Diritti Sotto il GDPR",
            content: "Sotto il Regolamento Generale sulla Protezione dei Dati (GDPR), hai i seguenti diritti:",
            items: [
              "Diritto di accesso: Richiedere copie dei tuoi dati personali e informazioni su come vengono elaborati",
              "Diritto di rettifica: Richiedere la correzione di dati personali inesatti o incompleti",
              "Diritto alla cancellazione ('diritto all'oblio'): Richiedere la cancellazione dei tuoi dati personali in certe circostanze",
              "Diritto di limitare l'elaborazione: Richiedere la limitazione dell'elaborazione dei tuoi dati personali in situazioni specifiche",
              "Diritto alla portabilità dei dati: Richiedere il trasferimento dei tuoi dati a un altro servizio in formato strutturato",
              "Diritto di opposizione: Opporti all'elaborazione dei tuoi dati personali per interessi legittimi o marketing diretto",
              "Diritti relativi al processo decisionale automatizzato: Protezione contro decisioni esclusivamente automatizzate che ti influenzano significativamente",
              "Diritto di revocare il consenso: Revocare il consenso precedentemente fornito per l'elaborazione dei dati in qualsiasi momento",
            ],
          },
          legalBasis: {
            title: "Base Legale per l'Elaborazione",
            content: "Elaboriamo i tuoi dati personali basandoci sui seguenti fondamenti legali:",
            items: [
              "Interessi legittimi: Per sicurezza del sito web, prevenzione frodi e miglioramento del servizio",
              "Esecuzione del contratto: Per fornire il servizio di conversione PDF che hai richiesto",
              "Obblighi legali: Per conformarci alle leggi e regolamenti applicabili",
              "Consenso: Dove hai esplicitamente fornito consenso per specifiche attività di elaborazione",
            ],
          },
          changes: {
            title: "Modifiche a Questa Informativa sulla Privacy",
            content: "Potremmo aggiornare questa Informativa sulla Privacy di tanto in tanto per riflettere cambiamenti nelle nostre pratiche, tecnologia, requisiti legali o altri fattori. Quando apportiamo modifiche, aggiorneremo la data 'Ultimo aggiornamento' in cima a questa policy. Per modifiche significative, potremmo fornire un avviso aggiuntivo come un annuncio prominente sul nostro sito web. Ti incoraggiamo a rivedere periodicamente questa Informativa sulla Privacy per rimanere informato su come proteggiamo la tua privacy.",
          },
          contact: {
            title: "Contattaci",
            content: "Se hai domande su questa Informativa sulla Privacy, sulle nostre pratiche sui dati, o desideri esercitare i tuoi diritti alla privacy, contattaci a info{'@'}gianlucaiavicoli.dev. Risponderemo alla tua richiesta entro 30 giorni come richiesto dal GDPR. Per questioni urgenti sulla privacy, contrassegna la tua email come 'Privacy - Urgente' nell'oggetto.",
          },
        },
      },
    },
  },
}));
