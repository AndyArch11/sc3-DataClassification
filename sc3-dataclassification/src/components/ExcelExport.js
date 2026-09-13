import * as ExcelJS from 'exceljs';

// Main export function
export const exportDCToExcel = (entries) => {
    try {
        // Create a new workbook
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'SC3 Data Classification Tool';
        workbook.lastModifiedBy = 'SC3 Data Classification Tool';
        workbook.created = new Date();
        workbook.modified = new Date();
        
        // Create guidance worksheet
        const guidanceData = getGuidanceContent();
        const guidanceWorksheet = workbook.addWorksheet('Data Classification Guidance');
        
        // Add guidance data to worksheet
        guidanceWorksheet.addRows(guidanceData);
        
        // Style the guidance worksheet header
        if (guidanceWorksheet.getRow(1).cellCount > 0) {
            const headerCell = guidanceWorksheet.getRow(1).getCell(1);
            headerCell.font = { bold: true, size: 16, color: { rgb: "FFFFFF" } };
            headerCell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { rgb: "2F5233" }
            };
            headerCell.alignment = { horizontal: 'center' };
        }
        
        // Create entries worksheet
        const entriesData = convertEntriesToWorksheetData(entries);
        const entriesWorksheet = workbook.addWorksheet('Data Classification Entries');
        
        // Add entries data to worksheet
        entriesWorksheet.addRows(entriesData);
        
        // Auto-size columns for entries worksheet
        if (entriesData.length > 0 && entriesData[0]) {
            const maxWidth = entriesData[0].length;
            for (let i = 1; i <= maxWidth; i++) {
                let maxLength = 10; // Minimum width
                entriesData.forEach(row => {
                    if (row[i-1] && row[i-1].toString().length > maxLength) {
                        maxLength = row[i-1].toString().length;
                    }
                });
                entriesWorksheet.getColumn(i).width = Math.min(Math.max(maxLength + 2, 10), 50);
            }
        }
        
        // Style the entries worksheet header
        if (entriesData.length > 0 && entriesData[0]) {
            const headerRow = entriesWorksheet.getRow(1);
            headerRow.eachCell((cell) => {
                cell.font = { bold: true, color: { rgb: "FFFFFF" } };
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { rgb: "2F5233" }
                };
                cell.alignment = { horizontal: 'center' };
            });
        }
        
        // Generate filename with timestamp
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5); // Format: YYYY-MM-DDTHH-MM-SS
        const filename = `SC3_Data_Classification_Export_${timestamp}.xlsx`;
        
        // Generate and download the file
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });
        
    } catch (error) {
        console.error('Error creating Excel export:', error);
        alert('An error occurred while creating the Excel file. Please try again.');
    }
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
        ['Customise this framework to fit your organisation\'s unique requirements.'],
        [""],
        [
        `Data Classification Form - Generated on ${new Date().toLocaleDateString()}`
        ]
    ];
};

// Convert entries data to worksheet format
const convertEntriesToWorksheetData = (entries) => {
    if (!entries || entries.length === 0) {
        return [['No data classification entries found.']];
    }

    const sectionHeaders = [
        'Data Classification Details',
        '', '', '', '', '', '', '', '', '', '', '', '', //{13}
        'Security Controls',
        '', '', '', '', '', '', '',  //{8}
        'Access Controls',
        '', '', '', //{4}
        'Advanced Security Controls',
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', //{16}
        'Application Security Controls',
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',  //{21}
        'Remote Access Infrastructure',
        '', '', '', '', '', '', '', //{8}
        'Monitoring & Compliance',
        '', '', '', '', '', '', '', '', '', //{10}
        'Data Lifecycle', 
        '', '', '', '', '', '', '', '', '', '', '', //{12}
        'Compliance and Governance',
        '', '', '', '', '', '', '', '', '', '', '', //{12}
        'Privacy Engineering and Rights Management',
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', //{22}
        'Zero Trust & Cloud-Native Data Security',
        '', '', '', '', '', '', '', '', '', '', '', '', //{13}
        'AI/ML Data Security & Responsible AI',
        '', '', '', '', '', '', '', '', '', '', '', '', //{13}
        'Supply Chain Data Security & Third-Party Risk',
        '', '', '', '', '', '', '', '', '', '', '', '', //{13}
        'Advanced Threat Protection & Quantum-Ready Security',
        '', '', '', '', '', '', '', '', //{9}
        'Data Democratisation vs Controlled Access',
        '', '', '', '', '', '', '', '', '', '', //{11}
        'Modern Data Security & Automation',
        '', '', '', '', '', '', '', '', '', '', //{11}
        'Data Governance & Management',
        '', '', '', '', '', '', '', '', '', '', '', '', '', '', //{15}
        'Implementation Notes',
        '' //{2}
    ];

    // Define all possible columns based on the form structure
    const columns = [
        // Data Classification Details
        { key: 'assetName', label: 'Asset Name' },
        { key: 'assetType', label: 'Asset Type' },
        { key: 'dataType', label: 'Data Type' },
        { key: 'dataSensitivity', label: 'Data Sensitivity' },                    
        { key: 'dataCriticality', label: 'Data Criticality' },                    
        { key: 'dataClassification', label: 'Data Classification (Derived)' },    
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
        { key: 'keyManagementProcesses', label: 'Key Management Processes' },
        { key: 'secretsManagement', label: 'Secrets Management' },
        
        // Access Controls
        { key: 'authentication', label: 'Authentication' },
        { key: 'authorisation', label: 'Authorisation' },
        { key: 'identityManagement', label: 'Identity Management' },
        { key: 'specificAccessControls', label: 'Specific Access Controls' },
        
        // Advanced Security Controls
        { key: 'wafControls', label: 'WAF Controls' },
        { key: 'apiSecurityGateway', label: 'API Security Gateway' },
        { key: 'dlpControls', label: 'DLP Controls' },
        { key: 'privilegedSessionManagement', label: 'Privileged Session Management' },
        { key: 'threatIntelligenceIntegration', label: 'Threat Intelligence Integration' },
        { key: 'threatModeling', label: 'Threat Modeling' },
        { key: 'soar', label: 'SOAR' },
        { key: 'siem', label: 'SIEM' },
        { key: 'casbControls', label: 'CASB Controls' },
        { key: 'sseControls', label: 'SSE Controls' },
        { key: 'cloudNetworkSecurity', label: 'Cloud Network Security' },
        { key: 'sdwanControls', label: 'SD-WAN Controls' },
        { key: 'saseArchitecture', label: 'SASE Architecture' },
        { key: 'zeroTrustMaturity', label: 'Zero Trust Maturity' },
        { key: 'networkSecurity', label: 'Network Security' },
        { key: 'protocolGapCoverage', label: 'Protocol Gap Coverage' },
        
        // Application Security Controls
        { key: 'antivirusControls', label: 'Antivirus Controls' },
        { key: 'vulnerabilityScanning', label: 'Vulnerability Scanning' },
        { key: 'applicationTesting', label: 'Application Testing' },
        { key: 'applicationSecurityTesting', label: 'Application Security Testing' },
        { key: 'applicationLogging', label: 'Application Logging & Telemetry' },
        { key: 'secureHeadersTransport', label: 'Secure Headers & Transport' },
        { key: 'sessionManagementHardening', label: 'Session Management Hardening' },
        { key: 'certificateLifecycle', label: 'Certificate Lifecycle' },
        { key: 'applicationControl', label: 'Application Control' },
        { key: 'patchManagement', label: 'Patch Management' },
        { key: 'codeIntegrity', label: 'Code Integrity' },
        { key: 'sca', label: 'SCA (Software Composition Analysis)' },
        { key: 'ossLicenceCompliance', label: 'OSS Licence Compliance' },
        { key: 'secretsScanningRepos', label: 'Secrets Scanning (Code Repos)' },
        { key: 'ciCdPipelineSecurity', label: 'CI/CD Pipeline Security' },
        { key: 'osHardening', label: 'OS Hardening' },
        { key: 'osEncryption', label: 'OS Encryption' },
        { key: 'mdmControls', label: 'MDM Controls' },
        { key: 'mamControls', label: 'MAM Controls' },
        { key: 'byodPolicy', label: 'BYOD Policy' },
        { key: 'mobileDataProtection', label: 'Mobile Data Protection' },
        
        // Remote Access Infrastructure
        { key: 'vdiSolution', label: 'VDI Solution' },
        { key: 'vpnAccessControls', label: 'VPN Access Controls' },
        { key: 'ztnaAccess', label: 'ZTNA Access' },
        { key: 'jumpHosts', label: 'Jump Hosts' },
        { key: 'remoteAccessPolicy', label: 'Remote Access Policy' },
        { key: 'sessionIsolation', label: 'Session Isolation' },
        { key: 'remoteAccessMonitoring', label: 'Remote Access Monitoring' },
        { key: 'privilegedAccessManagement', label: 'Privileged Access Management' },
        
        // Monitoring and Compliance
        { key: 'threatMonitoring', label: 'Threat Monitoring' },
        { key: 'availabilityMonitoring', label: 'Availability Monitoring' },
        { key: 'auditLogging', label: 'Audit Logging' },
        { key: 'penetrationTesting', label: 'Penetration Testing' },
        { key: 'socCapability', label: 'SOC Capability' },
        { key: 'complianceAutomation', label: 'Compliance Automation' },
        { key: 'securityMetrics', label: 'Security Metrics' },
        { key: 'auditTrailRetention', label: 'Audit Trail Retention' },
        { key: 'changeManagementIntegration', label: 'Change Management Integration' },
        { key: 'securityTestingFrequency', label: 'Security Testing Frequency' },
        
        // Data Lifecycle Management
        { key: 'dataMigrationStrategy', label: 'Data Migration Strategy' },
        { key: 'dataDowngradeControls', label: 'Data Downgrade Controls' },
        { key: 'dataVersioningStrategy', label: 'Data Versioning Strategy' },
        { key: 'dataRedundancyLevel', label: 'Data Redundancy Level' },
        { key: 'haDrTestingFrequency', label: 'HA/DR Testing Frequency' },
        { key: 'backupStrategy', label: 'Backup Strategy' },
        { key: 'backupTestingFrequency', label: 'Backup Testing Frequency' },
        { key: 'backupRetentionPeriod', label: 'Backup Retention Period' },
        { key: 'dataRetentionPolicy', label: 'Data Retention Policy' },
        { key: 'archivePolicy', label: 'Archive Policy' },
        { key: 'dataEolProcess', label: 'EOL Process' },
        { key: 'dataDisposalMethod', label: 'Disposal Method' },
        
        // Compliance and Governance
        { key: 'complianceRequirements', label: 'Compliance Requirements' },
        { key: 'businessImpactLevel', label: 'Business Impact Level' },
        { key: 'availabilitySLO', label: 'Availability SLO' },
        { key: 'rto', label: 'RTO' },
        { key: 'rpo', label: 'RPO' },
        { key: 'incidentResponse', label: 'Incident Response' },
        { key: 'architectureGovernance', label: 'Architecture Governance' },
        { key: 'thirdPartyRiskManagement', label: 'Third-Party Risk Management' },
        { key: 'dpaStatus', label: 'DPA Status' },
        { key: 'regulatoryReporting', label: 'Regulatory Reporting' },
        { key: 'auditFrequency', label: 'Audit Frequency' },
        { key: 'dataResidency', label: 'Data Residency' },
        
        // Privacy Engineering and Rights Management
        { key: 'privacyByDesign', label: 'Privacy By Design' },
        { key: 'automatedPrivacyControlsPets', label: 'Automated Privacy Controls & PETs' },
        { key: 'dataMinimisation', label: 'Data Minimisation' },
        { key: 'appDataCollectionLimitations', label: 'APP Data Collection Limitations' },
        { key: 'appSolicitedUnsolicited', label: 'APP Solicited Unsolicited' },
        { key: 'appCollectionNotice', label: 'APP Collection Notice' },
        { key: 'appNotificationRequirements', label: 'APP Notification Requirements' },
        { key: 'appThirdPartyCollection', label: 'APP Third Party Collection' },      
        { key: 'crossBorderDataTransferCompliance', label: 'Cross-Border Data Transfer Compliance' },
        { key: 'consentManagement', label: 'Consent Management' },
        { key: 'consentWithdrawalMechanism', label: 'Consent Withdrawal Mechanism' },
        { key: 'appCustomerAccess', label: 'APP Customer Access' },
        { key: 'appDataCorrection', label: 'APP Data Correction' },
        { key: 'appDataRetentionDisposal', label: 'APP Data Retention Disposal' },
        { key: 'rightToErasure', label: 'Right To Erasure' }, 
        { key: 'privacyTrainingAwareness', label: 'Privacy Training & Awareness' }, 
        { key: 'copyrightFairUseCompliance', label: 'Copyright & Fair Use Compliance' }, 
        { key: 'indigenousDataSovereignty', label: 'Indigenous Data Sovereignty' },
        { key: 'accessibilityCompliance', label: 'Accessibility Compliance' },
        { key: 'assistiveTechnologySupport', label: 'Assistive Technology Support' },
        { key: 'inclusiveDataAccessDesign', label: 'Inclusive Data Access Design' },
        { key: 'workplaceAccessibilityAccommodation', label: 'Workplace Accessibility Accommodation' },

        // Zero Trust & Cloud-Native Data Security
        { key: 'dataMicrosegmentation', label: 'Data Microsegmentation' },
        { key: 'containerDataProtection', label: 'Container Data Protection' },
        { key: 'multiCloudDataGovernance', label: 'Multi-Cloud Data Governance' },
        { key: 'iacSecurityScanning', label: 'IaC Security Scanning' },
        { key: 'continuousVerification', label: 'Continuous Verification' },
        { key: 'justInTimeDataAccess', label: 'Just-in-Time Data Access' },
        { key: 'riskBasedAuthentication', label: 'Risk-Based Authentication' },
        { key: 'deviceTrustVerification', label: 'Device Trust Verification' },
        { key: 'serverlessDataSecurity', label: 'Serverless Data Security' },
        { key: 'cspmDataAssets', label: 'Cloud DSPM for Data Assets' },
        { key: 'cloudEgressControls', label: 'Cloud Egress & Private Connectivity' },
        { key: 'cloudIngressControls', label: 'Cloud Ingress & Public Exposure' },
        { key: 'workloadIdentityFederation', label: 'Workload Identity Federation' },

    //  AI/ML Data Security & Responsible AI
        { key: 'trainingDataProtection', label: 'Training Data Protection' },
        { key: 'aiGovernance', label: 'AI Governance' }, 
        { key: 'aiModelExplainability', label: 'AI Model Explainability & Transparency' },
        { key: 'algorithmicBiasDetection', label: 'Algorithmic Bias Detection & Mitigation' },
        { key: 'aiModelCards', label: 'AI Model Card & Documentation' },
        { key: 'humanInLoopAi', label: 'Human-in-the-Loop for High-Risk Decisions' },
        { key: 'modelDataLeakagePrevention', label: 'Model Output Monitoring & Data Leakage Prevention' },
        { key: 'aiSafetyAdversarial', label: 'AI Safety & Adversarial Robustness' },
        { key: 'aiDataLineage', label: 'AI Data Lineage & Provenance' },
        { key: 'modelVersioningRollback', label: 'Model Versioning & Rollback Controls' },
        { key: 'aiModelDrift', label: 'AI Model Drift Detection & Retraining' },
        { key: 'thirdPartyAiRisk', label: 'Third-Party AI/ML Model Risk Assessment' },
        { key: 'aiSupplyChainTransparency', label: 'AI Supply Chain Transparency (SBOM for AI)' },

        // Supply Chain Data Security & Third-Party Risk
        { key: 'thirdPartyDataProcessing', label: 'Third-Party Data Processing' },
        { key: 'supplyChainDataMapping', label: 'Supply Chain Data Mapping' },
        { key: 'buildProvenanceSigning', label: 'Build Provenance & Artifact Signing (SLSA)' },
        { key: 'secureDevPracticesSsdf', label: 'Secure Development Practices (NIST SSDF)' },
        { key: 'vulnerabilityDisclosureSla', label: 'Vulnerability Disclosure & Patch SLAs' },
        { key: 'supplierSecurityAssurance', label: 'Supplier Security Assurance Evidence' },
        { key: 'dependencyPolicyEnforcement', label: 'Artifact/Dependency Policy Enforcement' },
        { key: 'runtimeSupplyChainControls', label: 'Runtime Supply Chain Controls (Containers/Images)' },
        { key: 'fourthPartyFlowdown', label: 'Fourth-Party Flowdown & Oversight' },
        { key: 'dataResidencyRequirements', label: 'Data Residency & Sovereignty Attestation' },
        { key: 'thirdPartyAccessArchitecture', label: 'Third-Party Access Architecture (Vendors)' },
        { key: 'incidentBreachNotification', label: 'Incident/Breach Notification Obligations' },
        { key: 'vendorStabilityMarketPosition', label: 'Vendor Stability & Market Position' },

        // Advanced Threat Protection & Quantum-Ready Security
        { key: 'insiderThreatDetection', label: 'Insider Threat Detection' },
        { key: 'uebaDataOperations', label: 'UEBA For Data Access' },
        { key: 'postQuantumCryptography', label: 'Post-Quantum Cryptography' },
        { key: 'cryptoAgility', label: 'Crypto Agility' },
        { key: 'threatIntelligenceIntegration', label: 'Threat Intelligence Integration & Sharing' },
        { key: 'ransomwareDataExtortionDefense', label: 'Ransomware & Data Extortion Defenses' },
        { key: 'deceptionTechnologiesData', label: 'Deception Technologies (Honeytokens for Data)' },
        { key: 'homomorphicConfidentialComputing', label: 'Homomorphic Encryption / Confidential Computing' },
        { key: 'cryptographicKeyLifecycle', label: 'Secure Cryptographic Key Lifecycle (Pre/Post-Quantum)' },

        // Data Democratisation vs Controlled Access
        { key: 'dataAccessGovernance', label: 'Data Access Governance' },
        { key: 'selfServiceDataAccess', label: 'Self-Service Data Access' },
        { key: 'dataAccessBalancing', label: 'Data Access Balancing' },
        { key: 'dataLiteracyPrograms', label: 'Data Literacy Programs' },
        { key: 'controlledDataSharing', label: 'Controlled Data Sharing' },
        { key: 'dataCatalogDiscovery', label: 'Data Catalog & Discovery Maturity' },
        { key: 'dynamicDataMaskingSelfService', label: 'Dynamic Data Masking / Anonymisation for Self-Service' },
        { key: 'dataAccessRequestWorkflow', label: 'Data Access Request & Approval Workflow' },
        { key: 'dataUsageAnalytics', label: 'Data Usage Analytics & Monitoring' },
        { key: 'dataEntitlementModel', label: 'Data Entitlement & Attribution Model' },
        { key: 'dataAccessRecertification', label: 'Data Access Recertification & Review' },

        // Modern Data Security & Automation
        { key: 'dataDiscoveryAutomation', label: 'Data Discovery Automation' }, 
        { key: 'sensitiveDataScanning', label: 'Sensitive Data Scanning' }, 
        { key: 'contentBasedClassification', label: 'Content Based Classification' }, 
        { key: 'dataSecurityPostureManagement', label: 'Data Security Posture Management (DSPM)' },
        { key: 'dlpAutomation', label: 'Data Loss Prevention (DLP) Automation' },
        { key: 'dataLabelingTaggingAutomation', label: 'Data Labeling & Tagging Automation' },
        { key: 'dataPolicyEnforcementAutomation', label: 'Data Rights & Policy Enforcement Automation' },
        { key: 'soarDataIncidents', label: 'Security Orchestration, Automation & Response (SOAR) for Data' },
        { key: 'automatedComplianceReporting', label: 'Automated Compliance Reporting & Auditing' },
        { key: 'automatedDataLifecycle', label: 'Automated Data Lifecycle Management' },
        { key: 'apiSecurityDataFlowMonitoring', label: 'API Security & Data Flow Monitoring Automation' },

        // Data Governance & Management
        { key: 'dataLineageTracking', label: 'Data Lineage Tracking' },
        { key: 'recordPrimacyManagement', label: 'Record Primacy Management' },
        { key: 'dataQualityControls', label: 'Data Quality Controls' },
        { key: 'metadataManagement', label: 'Metadata Management' },
        { key: 'dataStewardshipProgram', label: 'Data Stewardship Program' },
        { key: 'dataGovernanceFramework', label: 'Data Governance Framework' },
        { key: 'dataFlowDocumentation', label: 'Data Flow Documentation' },
        { key: 'reportingAnalyticsGovernance', label: 'Reporting Analytics Governance' },
        { key: 'dataOwnershipAccountability', label: 'Data Ownership & Accountability Model' },
        { key: 'dataStandardsConventions', label: 'Data Standards & Conventions' },
        { key: 'dataGlossaryBusinessTerms', label: 'Data Glossary & Business Terminology Management' },
        { key: 'dataGovernanceCouncil', label: 'Data Governance Council / Operating Model' },
        { key: 'dataIssueExceptionManagement', label: 'Data Issue & Exception Management' },
        { key: 'dataValueRoiMeasurement', label: 'Data Value & ROI Measurement' },
        { key: 'dataEthicsResponsibleUse', label: 'Data Ethics & Responsible Use Policy' },

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
            if (Array.isArray(value)) {
                return value.join(', ');
            }
            return value || '';
        });
    });

    return [sectionHeaders, headerRow, ...dataRows];
};

