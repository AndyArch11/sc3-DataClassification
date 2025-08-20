import * as XLSX from 'xlsx';

// Get current timestamp for filename
const getTimestamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
};

// Data Classification Guidance content
const getGuidanceContent = () => {
    return [
        ['Data Classification Guidance'],
        [''],
        ['Data Classification helps identify and evaluate the sensitivity, value, and importance of data within an organisation and the risk associated with the data.'],
        ['This process is crucial for ensuring that data is handled appropriately, protecting sensitive information, and complying with legal and regulatory obligations.'],
        ['Data classification processes help safeguard the Confidentiality, Integrity, and Availability of data.'],
        [''],
        ['RELEVANT STANDARDS AND REGULATIONS:'],
        ['• ISO 27001 - Information Security Management'],
        ['• ISO 27002 - Code of Practice for Information Security Controls'],
        ['• ISO 38505-1 - Data Governance Part 1: Framework for Data Governance'],
        ['• ISO 38505-2 - Data Governance Part 2: Guidelines for Data Management'],
        ['• ISO 38505-3 - Data Governance Part 3: Guidelines for Data Classification'],
        ['• Australian Privacy Principles - Guidelines for the Collection, Use, and Disclosure of Personal Information'],
        ['• GDPR - EU General Data Protection Regulation'],
        ['• HIPAA - US Health Insurance Portability and Accountability Act'],
        ['• NIST SP 800-53 - Security and Privacy Controls for Information Systems and Organisations'],
        ['• PCI DSS - Payment Card Industry Data Security Standard'],
        [''],
        ['DATA CLASSIFICATION PROCESS (5 STEPS):'],
        [''],
        ['1. IDENTIFICATION: Identify what data you have'],
        ['   • Create inventory of all data assets including ownership and storage location'],
        ['   • Document data purpose, processes, dependencies, and regulatory requirements'],
        ['   • Map system and process dependencies'],
        ['   • Classify by data type: PII, Financial, IP, Healthcare, Customer, Employee, etc.'],
        [''],
        ['2. CLASSIFICATION SCHEME: Create data classification categories'],
        ['   • Common categories: Public, Internal, Confidential, Restricted'],
        ['   • Define clear criteria for each classification level'],
        ['   • Use tiered approach based on potential impact if compromised'],
        ['   • Align with organisational risk management framework'],
        [''],
        ['3. LABELING: Label data according to classification'],
        ['   • Asset owners responsible for labeling'],
        ['   • Use consistent, visible, easily understood labels'],
        ['   • Provide training on proper labeling practices'],
        ['   • Update labels when data is moved, copied, or modified'],
        ['   • Capture classification decisions and rationale'],
        [''],
        ['4. HANDLING: Establish procedures based on classification'],
        ['   • Implement ISO 27001 control categories: Organisational, People, Physical, Technological'],
        ['   • Define roles and responsibilities for data handling'],
        ['   • Implement access controls using principle of least privilege'],
        ['   • Develop procedures for storage, transmission, and disposal'],
        ['   • Integrate into system development lifecycle (SDLC)'],
        [''],
        ['5. COMPLIANCE: Ensure legal and regulatory compliance'],
        ['   • Stay informed about applicable data protection laws'],
        ['   • Conduct regular compliance audits'],
        ['   • Document assessment accountability and track currency'],
        ['   • Implement reporting procedures for violations'],
        [''],
        ['CLASSIFICATION CRITERIA:'],
        ['• Public: Information for public consumption (Low Risk)'],
        ['• Internal: Information for internal use (Medium Risk)'],
        ['• Confidential: Sensitive information (High Risk)'],
        ['• Restricted: Highly sensitive information (Critical Risk)'],
        [''],
        ['RISK IMPACT LEVELS:'],
        ['• Low Risk: Minimal/no impact - Standard response time - Basic controls'],
        ['• Medium Risk: Minor disruption - Priority response - Enhanced monitoring'],
        ['• High Risk: Significant impact - Urgent response - Encryption, MFA, DLP'],
        ['• Critical Risk: Severe disruption - Immediate response - Air-gapped, HSMs'],
        [''],
        ['DISCLAIMER:'],
        ['This information is for general guidance only and requires adaptation for specific'],
        ['business needs. Consult qualified legal professionals for specific legal advice.'],
        ['Customise this framework to fit your organisation\'s unique requirements.']
    ];
};

// Convert entries data to worksheet format
const convertEntriesToWorksheetData = (entries) => {
    if (!entries || entries.length === 0) {
        return [['No data classification entries found.']];
    }

    // Define all possible columns based on the form structure
    const columns = [
        // Basic Details
        { key: 'assetName', label: 'Asset Name' },
        { key: 'assetType', label: 'Asset Type' },
        { key: 'dataType', label: 'Data Type' },
        { key: 'dataClassification', label: 'Data Classification' },
        { key: 'description', label: 'Description' },
        { key: 'dependencies', label: 'Dependencies' },
        { key: 'dataOwner', label: 'Data Owner' },
        { key: 'technicalOwner', label: 'Technical Owner' },
        { key: 'assessorName', label: 'Assessor Name' },
        { key: 'assessmentDate', label: 'Assessment Date' },
        { key: 'reviewDate', label: 'Review Date' },
        
        // Security Controls
        { key: 'atRestEncryption', label: 'At Rest Encryption' },
        { key: 'inTransitEncryption', label: 'In Transit Encryption' },
        { key: 'databaseEncryption', label: 'Database Encryption' },
        { key: 'encryptionCipher', label: 'Encryption Cipher' },
        { key: 'hashAlgorithm', label: 'Hash Algorithm' },
        { key: 'keyManagement', label: 'Key Management' },
        
        // Access Controls
        { key: 'authentication', label: 'Authentication' },
        { key: 'authorization', label: 'Authorisation' },
        { key: 'identityManagement', label: 'Identity Management' },
        { key: 'accessControls', label: 'Access Controls' },
        
        // Advanced Security Controls
        { key: 'wafControls', label: 'WAF Controls' },
        { key: 'dlpControls', label: 'DLP Controls' },
        { key: 'casbControls', label: 'CASB Controls' },
        { key: 'sseControls', label: 'SSE Controls' },
        { key: 'cloudNetworkSecurity', label: 'Cloud Network Security' },
        { key: 'sdwanControls', label: 'SD-WAN Controls' },
        { key: 'saseArchitecture', label: 'SASE Architecture' },
        { key: 'zeroTrustMaturity', label: 'Zero Trust Maturity' },
        { key: 'networkSecurity', label: 'Network Security' },
        { key: 'protocolGapCoverage', label: 'Protocol Gap Coverage' },
        
        // Application Security
        { key: 'antivirusControls', label: 'Antivirus Controls' },
        { key: 'vulnerabilityScanning', label: 'Vulnerability Scanning' },
        { key: 'certificateManagement', label: 'Certificate Management' },
        { key: 'applicationControl', label: 'Application Control' },
        { key: 'patchManagement', label: 'Patch Management' },
        { key: 'codeIntegrity', label: 'Code Integrity' },
        { key: 'osHardening', label: 'OS Hardening' },
        { key: 'osEncryption', label: 'OS Encryption' },
        
        // Mobile Security
        { key: 'mdmControls', label: 'MDM Controls' },
        { key: 'mamControls', label: 'MAM Controls' },
        { key: 'byodPolicy', label: 'BYOD Policy' },
        { key: 'mobileDataProtection', label: 'Mobile Data Protection' },
        
        // Remote Access
        { key: 'vdiSolution', label: 'VDI Solution' },
        { key: 'jumpHosts', label: 'Jump Hosts' },
        { key: 'remoteAccessPolicy', label: 'Remote Access Policy' },
        { key: 'sessionIsolation', label: 'Session Isolation' },
        { key: 'remoteAccessMonitoring', label: 'Remote Access Monitoring' },
        { key: 'privilegedAccessManagement', label: 'Privileged Access Management' },
        
        // Monitoring & Logging
        { key: 'monitoring', label: 'Monitoring' },
        { key: 'threatMonitoring', label: 'Threat Monitoring' },
        { key: 'availabilityMonitoring', label: 'Availability Monitoring' },
        { key: 'auditLogging', label: 'Audit Logging' },
        
        // Data Lifecycle
        { key: 'backupStrategy', label: 'Backup Strategy' },
        { key: 'dataRetentionPeriod', label: 'Data Retention Period' },
        { key: 'backupRetentionPeriod', label: 'Backup Retention Period' },
        { key: 'archivePolicy', label: 'Archive Policy' },
        { key: 'disposalMethod', label: 'Disposal Method' },
        
        // Compliance
        { key: 'complianceRequirements', label: 'Compliance Requirements' },
        
        // Business Impact Assessment
        { key: 'businessImpactLevel', label: 'Business Impact Level' },
        { key: 'availabilitySLO', label: 'Availability SLO' },
        { key: 'rto', label: 'RTO' },
        { key: 'rpo', label: 'RPO' },
        { key: 'incidentResponse', label: 'Incident Response' },
        
        // Additional Modern Security Controls
        { key: 'dataDiscoveryAutomation', label: 'Data Discovery Automation' },
        { key: 'contentBasedClassification', label: 'Content Based Classification' },
        { key: 'dataFlowMapping', label: 'Data Flow Mapping' },
        { key: 'sensitiveDataScanning', label: 'Sensitive Data Scanning' },
        
        // Privacy Engineering
        { key: 'privacyByDesign', label: 'Privacy By Design' },
        { key: 'dataMinimisation', label: 'Data Minimisation' },
        { key: 'purposeLimitation', label: 'Purpose Limitation' },
        { key: 'consentManagement', label: 'Consent Management' },
        { key: 'rightToErasure', label: 'Right To Erasure' },
        { key: 'dataPortability', label: 'Data Portability' },
        
        // APP Data Collection Controls
        { key: 'appDataCollectionLimitations', label: 'APP Data Collection Limitations' },
        { key: 'appSolicitedUnsolicited', label: 'APP Solicited Unsolicited' },
        { key: 'appCollectionNotice', label: 'APP Collection Notice' },
        { key: 'appThirdPartyCollection', label: 'APP Third Party Collection' },
        
        // Australian Privacy Principles (APP) Specific
        { key: 'appCustomerAccess', label: 'APP Customer Access' },
        { key: 'appDataCorrection', label: 'APP Data Correction' },
        { key: 'appDataRetentionDisposal', label: 'APP Data Retention Disposal' },
        { key: 'appNotificationRequirements', label: 'APP Notification Requirements' },
        
        // Australian Accessibility Compliance (DDA)
        { key: 'accessibilityCompliance', label: 'Accessibility Compliance' },
        { key: 'assistiveTechnologySupport', label: 'Assistive Technology Support' },
        { key: 'inclusiveDataAccessDesign', label: 'Inclusive Data Access Design' },
        { key: 'workplaceAccessibilityAccommodation', label: 'Workplace Accessibility Accommodation' },
        
        // Implementation Notes
        { key: 'implementationNotes', label: 'Implementation Notes' },
        { key: 'businessJustification', label: 'Business Justification' }
    ];

    // Create header row
    const headerRow = columns.map(col => col.label);
    
    // Create data rows
    const dataRows = entries.map(entry => {
        return columns.map(col => {
            const value = entry[col.key];
            return value || '';
        });
    });

    return [headerRow, ...dataRows];
};

// Main export function
export const exportDCToExcel = (entries) => {
    try {
        // Create a new workbook
        const workbook = XLSX.utils.book_new();
        
        // Create guidance worksheet
        const guidanceData = getGuidanceContent();
        const guidanceWorksheet = XLSX.utils.aoa_to_sheet(guidanceData);
        
        // Style the guidance worksheet header
        if (guidanceWorksheet['A1']) {
            guidanceWorksheet['A1'].s = {
                font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
                fill: { fgColor: { rgb: "2F5233" } },
                alignment: { horizontal: "center" }
            };
        }
        
        // Add guidance worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, guidanceWorksheet, 'Data Classification Guidance');
        
        // Create entries worksheet
        const entriesData = convertEntriesToWorksheetData(entries);
        const entriesWorksheet = XLSX.utils.aoa_to_sheet(entriesData);
        
        // Auto-size columns for entries worksheet
        const maxWidth = entriesData[0] ? entriesData[0].length : 0;
        const colWidths = [];
        for (let i = 0; i < maxWidth; i++) {
            let maxLength = 0;
            entriesData.forEach(row => {
                if (row[i] && row[i].toString().length > maxLength) {
                    maxLength = row[i].toString().length;
                }
            });
            colWidths.push({ width: Math.min(Math.max(maxLength + 2, 10), 50) });
        }
        entriesWorksheet['!cols'] = colWidths;
        
        // Style the entries worksheet header
        if (entriesData.length > 0 && entriesData[0]) {
            entriesData[0].forEach((header, index) => {
                const cellRef = XLSX.utils.encode_cell({ r: 0, c: index });
                if (entriesWorksheet[cellRef]) {
                    entriesWorksheet[cellRef].s = {
                        font: { bold: true, color: { rgb: "FFFFFF" } },
                        fill: { fgColor: { rgb: "2F5233" } },
                        alignment: { horizontal: "center" }
                    };
                }
            });
        }
        
        // Add entries worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, entriesWorksheet, 'Data Classification Entries');
        
        // Generate filename with timestamp
        const timestamp = getTimestamp();
        const filename = `SC3_Data_Classification_Export_${timestamp}.xlsx`;
        
        // Write the file
        XLSX.writeFile(workbook, filename);
        
        console.log(`✅ Excel export successful: ${filename}`);
        
        // Show success message to user
        alert(`Excel export successful!\nFile saved as: ${filename}\n\nThe export includes:\n• Data Classification Guidance worksheet\n• Data Classification Entries worksheet with ${entries.length} entries`);
        
    } catch (error) {
        console.error('❌ Excel export failed:', error);
        alert(`Excel export failed: ${error.message}`);
    }
};
