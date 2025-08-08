import React, { useState } from 'react';
import "./DC.css";

const DCInputForm = ({
  form,
  handleChange,
  handleSubmit,
  handleCancel, 
  editIndex, 
  fieldsOpen, 
  setFieldsOpen
}) => {
    const [validationWarnings, setValidationWarnings] = useState({});
    const [extendedFieldsOpen, setExtendedFieldsOpen] = useState(false);

    const assetTypes = [
        { value: 'printed-media', label: '📄 Printed Media', icon: '📄' },
        { value: 'digital-files', label: '💾 Digital Files', icon: '💾' },
        { value: 'database-data', label: '🗄️ Database Data', icon: '🗄️' },
        { value: 'systems-applications', label: '🖥️ Systems/Applications', icon: '🖥️' },
        { value: 'emails', label: '📧 Emails', icon: '📧' },
        { value: 'cloud-storage', label: '☁️ Cloud Storage', icon: '☁️' },
        { value: 'mobile-devices', label: '📱 Mobile Devices', icon: '📱' }
    ];

    const dataClassifications = [
        { value: 'public', label: '🌐 Public', risk: 'Low', color: 'green' },
        { value: 'internal', label: '🏢 Internal', risk: 'Medium', color: 'orange' },
        { value: 'confidential', label: '🔒 Confidential', risk: 'High', color: 'red' },
        { value: 'restricted', label: '🚫 Restricted', risk: 'Critical', color: 'darkred' }
    ];

    const dataTypes = [
        { value: 'pii', label: '👤 Personal Identifiable Information (PII)', icon: '👤' },
        { value: 'financial', label: '💰 Financial Data', icon: '💰' },
        { value: 'ip', label: '🧠 Intellectual Property (IP)', icon: '🧠' },
        { value: 'healthcare', label: '🏥 Healthcare/Medical Data', icon: '🏥' },
        { value: 'customer', label: '👥 Customer Data', icon: '👥' },
        { value: 'employee', label: '👷 Employee Data', icon: '👷' },
        { value: 'operational', label: '⚙️ Operational Data', icon: '⚙️' },
        { value: 'technical', label: '🔧 Technical Data', icon: '🔧' },
        { value: 'strategic', label: '📈 Strategic/Business Data', icon: '📈' },
        { value: 'regulatory', label: '⚖️ Regulatory/Compliance Data', icon: '⚖️' },
        { value: 'research', label: '🔬 Research & Development', icon: '🔬' },
        { value: 'legal', label: '📜 Legal Documents', icon: '📜' },
        { value: 'marketing', label: '📢 Marketing Data', icon: '📢' },
        { value: 'public-info', label: '📰 Public Information', icon: '📰' },
        { value: 'mixed', label: '🔄 Mixed Data Types', icon: '🔄' },
        { value: 'other', label: '📋 Other (specify in description)', icon: '📋' }
    ];

    const encryptionCiphers = [
        { value: 'AES-256', label: 'AES-256 (Recommended)', status: 'recommended', type: 'symmetric' },
        { value: 'AES-128', label: 'AES-128', status: 'acceptable', type: 'symmetric' },
        { value: 'ChaCha20-Poly1305', label: 'ChaCha20-Poly1305', status: 'recommended', type: 'symmetric' },
        { value: 'AES-256-GCM', label: 'AES-256-GCM', status: 'recommended', type: 'symmetric' },
        { value: 'AES-128-GCM', label: 'AES-128-GCM', status: 'acceptable', type: 'symmetric' },
        { value: 'RSA-4096', label: 'RSA-4096', status: 'acceptable', type: 'asymmetric' },
        { value: 'RSA-2048', label: 'RSA-2048', status: 'quantum-vulnerable', type: 'asymmetric' },
        { value: 'ECC-P-256', label: 'ECC-P-256 (NIST P-256)', status: 'acceptable', type: 'asymmetric' },
        { value: 'ECC-P-384', label: 'ECC-P-384 (NIST P-384)', status: 'recommended', type: 'asymmetric' },
        { value: 'Ed25519', label: 'Ed25519', status: 'recommended', type: 'asymmetric' },
        { value: 'X25519', label: 'X25519 (Key Exchange)', status: 'recommended', type: 'asymmetric' },
        { value: 'Blowfish', label: 'Blowfish', status: 'deprecated', type: 'symmetric' },
        { value: 'Triple DES', label: 'Triple DES', status: 'deprecated', type: 'symmetric' },
        { value: 'DES', label: 'DES', status: 'compromised', type: 'symmetric' },
        { value: 'RC4', label: 'RC4', status: 'compromised', type: 'symmetric' },
        { value: 'Other', label: 'Other (specify in notes)', status: 'unknown', type: 'unknown' }
    ];

    const hashAlgorithms = [
        { value: 'SHA-256', label: 'SHA-256 (Recommended)', status: 'recommended' },
        { value: 'SHA-384', label: 'SHA-384', status: 'recommended' },
        { value: 'SHA-512', label: 'SHA-512', status: 'recommended' },
        { value: 'SHA-3-256', label: 'SHA-3-256', status: 'recommended' },
        { value: 'SHA-3-512', label: 'SHA-3-512', status: 'recommended' },
        { value: 'BLAKE2b', label: 'BLAKE2b', status: 'recommended' },
        { value: 'BLAKE2s', label: 'BLAKE2s', status: 'acceptable' },
        { value: 'SHA-224', label: 'SHA-224', status: 'acceptable' },
        { value: 'SHA-1', label: 'SHA-1', status: 'deprecated' },
        { value: 'MD5', label: 'MD5', status: 'compromised' },
        { value: 'MD4', label: 'MD4', status: 'compromised' },
        { value: 'Other', label: 'Other (specify in notes)', status: 'unknown' }
    ];

    const authenticationMethods = [
        'Username/Password', 'Multi-Factor Authentication (MFA)', 'Single Sign-On (SSO)', 
        'Certificate-based', 'Biometric', 'Hardware Tokens', 'Smart Cards', 'API Keys'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(e);
        
        // Validate control selection based on data classification
        validateControlSelection(name, value, form.dataClassification);
    };

    const validateControlSelection = (controlName, controlValue, classification) => {
        if (!classification) {
            // Clear warnings for this field if no classification
            setValidationWarnings(prev => {
                const updated = { ...prev };
                delete updated[controlName];
                return updated;
            });
            return;
        }

        const restrictedControls = getRestrictedControls(classification);
        const recommendedControls = getMinimumRequiredControls(classification);
        
        let warningMessage = null;

        // Check if selected control is inappropriate for this classification
        if (restrictedControls[controlName] && restrictedControls[controlName].includes(controlValue)) {
            warningMessage = `⚠️ "${controlValue}" is not recommended for ${classification.toUpperCase()} data classification. ${restrictedControls[controlName + '_reason'] || ''}`;
        }
        // Check if selected control doesn't meet minimum requirements
        else if (recommendedControls[controlName] && !recommendedControls[controlName].includes(controlValue)) {
            warningMessage = `💡 For ${classification.toUpperCase()} classification, consider: ${recommendedControls[controlName].join(', ')}`;
        }

        // Update warnings for this specific field
        setValidationWarnings(prev => {
            const updated = { ...prev };
            if (warningMessage) {
                updated[controlName] = warningMessage;
            } else {
                delete updated[controlName];
            }
            return updated;
        });
    };

    // Helper function to get warning for a specific field
    const getFieldWarning = (fieldName) => {
        return validationWarnings[fieldName] || null;
    };

    // Inline warning component
    const FieldWarning = ({ fieldName }) => {
        const warning = getFieldWarning(fieldName);
        if (!warning) return null;
        
        return (
            <div className="dc-field-warning-inline">
                <small className="dc-warning-text">{warning}</small>
            </div>
        );
    };

    const getRestrictedControls = (classification) => {
        const restrictions = {
            'confidential': {
                'atRestEncryption': ['none', 'basic'],
                'atRestEncryption_reason': 'Confidential data requires strong encryption.',
                'inTransitEncryption': ['none', 'basic'],
                'inTransitEncryption_reason': 'Transit encryption is mandatory.',
                'databaseEncryption': ['none'],
                'databaseEncryption_reason': 'Database encryption required for confidential data.',
                'threatMonitoring': ['basic-logging'],
                'threatMonitoring_reason': 'Advanced threat monitoring required for confidential data.',
                'authentication': ['Username/Password'],
                'authentication_reason': 'Multi-factor authentication is required.',
                'monitoring': ['basic'],
                'monitoring_reason': 'Enhanced monitoring is required for confidential data.',
                'dlpControls': ['none', 'basic'],
                'dlpControls_reason': 'Comprehensive DLP required for confidential data.',
                'casbControls': ['none', 'basic'],
                'casbControls_reason': 'Advanced CASB protection required for confidential data.',
                'osHardening': ['none', 'basic'],
                'osHardening_reason': 'DISA STIG compliance or equivalent required for confidential data.',
                'osEncryption': ['none', 'vm-guest-basic', 'vm-guest-full'],
                'osEncryption_reason': 'VM host encryption or layered encryption required for confidential data.',
                'identityManagement': ['application-managed-individual', 'application-managed-shared', 'database-managed-individual', 'database-managed-shared', 'third-party-non-federated', 'service-to-service', 'break-glass', 'hybrid-approach'],
                'identityManagement_reason': 'Centrally managed identities required for confidential data.',
                'appDataCollectionLimitations': ['unrestricted-collection'],
                'appDataCollectionLimitations_reason': 'Purpose-limited data collection required for confidential data.',
                'appSolicitedUnsolicited': ['unrestricted-collection'],
                'appSolicitedUnsolicited_reason': 'Strict solicited data handling required for confidential data.',
                'appCollectionNotice': ['basic-notice'],
                'appCollectionNotice_reason': 'Comprehensive collection notices required for confidential data.',
                'appThirdPartyCollection': ['no-third-party'],
                'appThirdPartyCollection_reason': 'Controlled third party data collection required for confidential data.',
                'encryptionCipher': ['Blowfish', 'Triple DES', 'DES', 'RC4'],
                'encryptionCipher_reason': 'Deprecated or compromised ciphers not permitted for confidential data.',
                'hashAlgorithm': ['SHA-1', 'MD5', 'MD4'],
                'hashAlgorithm_reason': 'Deprecated or compromised hash algorithms not permitted for confidential data.'
            },
            'restricted': {
                'atRestEncryption': ['none', 'basic', 'standard'],
                'atRestEncryption_reason': 'Restricted data requires maximum encryption with HSM.',
                'inTransitEncryption': ['none', 'basic', 'standard'],
                'inTransitEncryption_reason': 'End-to-end encryption is mandatory.',
                'databaseEncryption': ['none', 'tde-basic'],
                'databaseEncryption_reason': 'Comprehensive database protection required for restricted data.',
                'threatMonitoring': ['basic-logging', 'siem-integration'],
                'threatMonitoring_reason': 'AI-powered threat hunting required for restricted data.',
                'authentication': ['Username/Password', 'Single Sign-On (SSO)'],
                'authentication_reason': 'Biometric or hardware token authentication required.',
                'authorisation': ['basic'],
                'authorisation_reason': 'Advanced authorisation models required.',
                'monitoring': ['basic', 'standard'],
                'monitoring_reason': 'Real-time or continuous monitoring required.',
                'dlpControls': ['none', 'basic', 'advanced'],
                'dlpControls_reason': 'Enterprise DLP with ML/AI required for restricted data.',
                'casbControls': ['none', 'basic', 'standard'],
                'casbControls_reason': 'Comprehensive CASB suite required for restricted data.',
                'osHardening': ['none', 'basic', 'cis'],
                'osHardening_reason': 'Immutable OS with custom hardening profile mandatory for restricted data.',
                'osEncryption': ['none', 'vm-guest-basic', 'vm-guest-full', 'vm-guest-vtpm', 'vm-host', 'physical-host', 'cloud-vm', 'cloud-vm-vtpm'],
                'osEncryption_reason': 'Comprehensive layered encryption with hardware/virtual TPM mandatory for restricted data.',
                'backupStrategy': ['none', 'basic'],
                'backupStrategy_reason': 'Air-gapped or immutable backups required.',
                'disposalMethod': ['standard', 'secure-wipe'],
                'disposalMethod_reason': 'Physical or witnessed destruction required.',
                'encryptionCipher': ['RSA-2048', 'Blowfish', 'Triple DES', 'DES', 'RC4'],
                'encryptionCipher_reason': 'Only quantum-resistant and non-deprecated ciphers permitted for restricted data.',
                'hashAlgorithm': ['MD5', 'MD4', 'SHA-224'],
                'hashAlgorithm_reason': 'Only SHA-256 or stronger hash algorithms permitted for restricted data.',
                'identityManagement': ['application-managed-individual', 'application-managed-shared', 'database-managed-individual', 'database-managed-shared', 'third-party-non-federated', 'service-to-service', 'break-glass', 'hybrid-approach'],
                'identityManagement_reason': 'Centrally managed identities required for restricted data.',
                'appDataCollectionLimitations': ['none', 'basic'],
                'appDataCollectionLimitations_reason': 'Strict purpose limitation and minimal collection required for restricted data.',
                'appSolicitedUnsolicited': ['no-policy', 'basic-controls'],
                'appSolicitedUnsolicited_reason': 'Comprehensive policies required for handling unsolicited restricted data.',
                'appCollectionNotice': ['none', 'basic-notice'],
                'appCollectionNotice_reason': 'Detailed and interactive collection notices required for restricted data.',
                'appThirdPartyCollection': ['no-consent', 'basic-notification'],
                'appThirdPartyCollection_reason': 'Explicit consent and verification required for third party collection of restricted data.',
                'dataLineageTracking': ['none', 'manual-documentation'],
                'dataLineageTracking_reason': 'Comprehensive automated lineage tracking required for restricted data.',
                'recordPrimacyManagement': ['none', 'source-system-priority'],
                'recordPrimacyManagement_reason': 'Enterprise master data management required for restricted data.',
                'dataQualityControls': ['none', 'basic-validation', 'rule-based-checks'],
                'dataQualityControls_reason': 'Advanced ML-based quality controls required for restricted data.',
                'metadataManagement': ['none', 'basic-documentation', 'data-dictionary'],
                'metadataManagement_reason': 'Enterprise metadata repository required for restricted data.',
                'dataStewardshipProgram': ['none', 'ad-hoc-ownership'],
                'dataStewardshipProgram_reason': 'Center of excellence stewardship required for restricted data.',
                'dataGovernanceFramework': ['none', 'basic-policies'],
                'dataGovernanceFramework_reason': 'Comprehensive adaptive governance framework required for restricted data.',
                'dataFlowDocumentation': ['none', 'high-level-diagrams'],
                'dataFlowDocumentation_reason': 'Comprehensive flow catalog required for restricted data.',
                'reportingAnalyticsGovernance': ['none', 'basic-controls'],
                'reportingAnalyticsGovernance_reason': 'Enterprise reporting platform required for restricted data.'
            },
            'internal': {
                'encryptionCipher': ['DES', 'RC4'],
                'encryptionCipher_reason': 'Compromised ciphers should not be used even for internal data.',
                'hashAlgorithm': ['MD5', 'MD4'],
                'hashAlgorithm_reason': 'Compromised hash algorithms should not be used even for internal data.'
            },
            'public': {
                'encryptionCipher': ['DES', 'RC4'],
                'encryptionCipher_reason': 'Compromised ciphers present security risks.',
                'hashAlgorithm': ['MD5', 'MD4'],
                'hashAlgorithm_reason': 'Compromised hash algorithms present security risks.'
            }
        };

        return restrictions[classification] || {};
    };

    const getMinimumRequiredControls = (classification) => {
        const requirements = {
            'internal': {
                'atRestEncryption': ['basic', 'standard', 'strong', 'maximum'],
                'databaseEncryption': ['tde-basic', 'tde-advanced', 'column-encryption', 'data-masking', 'tokenisation', 'comprehensive'],
                'threatMonitoring': ['siem-integration', 'threat-detection', 'behavioral-analytics', 'ai-threat-hunting', 'zero-trust-monitoring'],
                'availabilityMonitoring': ['infrastructure-monitoring', 'application-performance', 'synthetic-monitoring', 'real-user-monitoring'],
                'identityManagement': ['centrally-managed-individual', 'centrally-managed-service', 'centrally-managed-delegated'],
                'monitoring': ['standard', 'enhanced', 'real-time', 'continuous'],
                'osHardening': ['basic', 'cis', 'stig', 'custom', 'immutable'],
                'osEncryption': ['vm-guest-vtpm', 'vm-host', 'physical-host', 'cloud-vm', 'cloud-vm-vtpm', 'cloud-host', 'memory-encryption', 'layered-encryption', 'layered-vtpm', 'comprehensive'],
                'encryptionCipher': ['AES-128', 'AES-256', 'ChaCha20-Poly1305', 'RSA-4096', 'AES-256-GCM', 'AES-128-GCM', 'ECC-P-256', 'ECC-P-384', 'Ed25519', 'X25519'],
                'hashAlgorithm': ['SHA-256', 'SHA-384', 'SHA-512', 'SHA-3-256', 'SHA-3-512', 'BLAKE2b'],
                'appCustomerAccess': ['customer-portal', 'automated-access', 'real-time-access', 'structured-export', 'api-access'],
                'appDataCorrection': ['customer-correction', 'workflow-correction', 'verified-correction', 'audit-trail-correction', 'real-time-correction'],
                'appDataRetentionDisposal': ['business-purpose', 'automated-disposal', 'value-based-retention', 'intelligent-lifecycle', 'compliance-driven'],
                'appNotificationRequirements': ['proactive-notifications', 'automated-notifications', 'personalised-notifications', 'multi-channel-notifications', 'intelligent-notifications'],
                'appDataCollectionLimitations': ['purpose-limitation', 'necessity-test', 'proportionality-assessment', 'minimal-collection', 'strict-purpose-binding'],
                'appSolicitedUnsolicited': ['solicited-only', 'unsolicited-review', 'automatic-destruction', 'lawful-retention', 'segregated-handling', 'comprehensive-policy'],
                'appCollectionNotice': ['detailed-notice', 'layered-notice', 'just-in-time', 'interactive-notice', 'comprehensive-disclosure'],
                'appThirdPartyCollection': ['consent-required', 'notification-only', 'source-verification', 'purpose-alignment', 'comprehensive-tracking'],
                'accessibilityCompliance': ['wcag-a', 'wcag-aa', 'wcag-aaa', 'adaptive-interfaces', 'universal-design'],
                'assistiveTechnologySupport': ['keyboard-navigation', 'voice-control', 'eye-tracking', 'switch-control', 'comprehensive-assistive'],
                'inclusiveDataAccessDesign': ['high-contrast', 'scalable-text', 'alternative-formats', 'cognitive-accessibility', 'multi-sensory'],
                'workplaceAccessibilityAccommodation': ['ergonomic-adjustments', 'assistive-hardware', 'flexible-interfaces', 'remote-accessibility', 'comprehensive-accommodation'],
                'dataLineageTracking': ['manual-documentation', 'metadata-driven', 'automated-discovery', 'real-time-tracking', 'end-to-end-visibility', 'impact-analysis'],
                'recordPrimacyManagement': ['source-system-priority', 'master-data-management', 'golden-record', 'consensus-based', 'temporal-primacy', 'multi-domain-mdm'],
                'dataQualityControls': ['basic-validation', 'rule-based-checks', 'statistical-profiling', 'ml-quality-detection', 'real-time-monitoring', 'continuous-improvement'],
                'metadataManagement': ['basic-documentation', 'data-dictionary', 'catalog-driven', 'semantic-layer', 'automated-discovery', 'enterprise-metadata'],
                'dataStewardshipProgram': ['ad-hoc-ownership', 'domain-stewards', 'business-stewards', 'technical-stewards', 'federated-stewardship', 'center-of-excellence'],
                'dataGovernanceFramework': ['basic-policies', 'dmbok-framework', 'dama-framework', 'cobit-data', 'custom-framework', 'adaptive-governance'],
                'dataFlowDocumentation': ['high-level-diagrams', 'detailed-mapping', 'system-integration', 'real-time-monitoring', 'automated-discovery', 'comprehensive-catalog'],
                'reportingAnalyticsGovernance': ['basic-controls', 'standardized-metrics', 'certified-reports', 'self-service-governed', 'data-mart-governance', 'enterprise-reporting']
            },
            'confidential': {
                'atRestEncryption': ['strong', 'maximum'],
                'inTransitEncryption': ['standard', 'strong', 'maximum'],
                'databaseEncryption': ['tde-advanced', 'column-encryption', 'field-level-encryption', 'tokenisation', 'data-masking', 'dynamic-masking', 'comprehensive'],
                'threatMonitoring': ['threat-detection', 'behavioral-analytics', 'ai-threat-hunting', 'zero-trust-monitoring', 'deception-technology'],
                'availabilityMonitoring': ['application-performance', 'synthetic-monitoring', 'real-user-monitoring', 'distributed-tracing', 'comprehensive-observability'],
                'identityManagement': ['centrally-managed-individual', 'centrally-managed-delegated', 'just-in-time'],
                'authentication': ['Multi-Factor Authentication (MFA)', 'Certificate-based', 'Biometric', 'Hardware Tokens', 'Smart Cards'],
                'monitoring': ['enhanced', 'real-time', 'continuous'],
                'auditLogging': ['detailed', 'comprehensive', 'forensic'],
                'osHardening': ['cis', 'stig', 'custom', 'immutable'],
                'osEncryption': ['vm-guest-vtpm', 'vm-host', 'physical-host', 'cloud-vm-vtpm', 'cloud-host', 'memory-encryption', 'layered-encryption', 'layered-vtpm', 'comprehensive'],
                'encryptionCipher': ['AES-256', 'ChaCha20-Poly1305', 'AES-256-GCM', 'ECC-P-384', 'Ed25519', 'X25519'],
                'hashAlgorithm': ['SHA-256', 'SHA-384', 'SHA-512', 'SHA-3-256', 'SHA-3-512', 'BLAKE2b'],
                'appCustomerAccess': ['automated-access', 'real-time-access', 'structured-export', 'api-access'],
                'appDataCorrection': ['workflow-correction', 'verified-correction', 'audit-trail-correction', 'real-time-correction'],
                'appDataRetentionDisposal': ['automated-disposal', 'value-based-retention', 'intelligent-lifecycle', 'compliance-driven'],
                'appNotificationRequirements': ['automated-notifications', 'personalised-notifications', 'multi-channel-notifications', 'intelligent-notifications'],
                'appDataCollectionLimitations': ['necessity-test', 'proportionality-assessment', 'minimal-collection', 'strict-purpose-binding'],
                'appSolicitedUnsolicited': ['solicited-only', 'automatic-destruction', 'lawful-retention', 'segregated-handling', 'comprehensive-policy'],
                'appCollectionNotice': ['layered-notice', 'just-in-time', 'interactive-notice', 'comprehensive-disclosure'],
                'appThirdPartyCollection': ['consent-required', 'source-verification', 'purpose-alignment', 'comprehensive-tracking'],
                'accessibilityCompliance': ['wcag-aa', 'wcag-aaa', 'adaptive-interfaces', 'universal-design'],
                'assistiveTechnologySupport': ['voice-control', 'eye-tracking', 'switch-control', 'comprehensive-assistive'],
                'inclusiveDataAccessDesign': ['alternative-formats', 'cognitive-accessibility', 'multi-sensory'],
                'workplaceAccessibilityAccommodation': ['assistive-hardware', 'flexible-interfaces', 'remote-accessibility', 'comprehensive-accommodation'],
                'dataLineageTracking': ['metadata-driven', 'automated-discovery', 'real-time-tracking', 'end-to-end-visibility', 'impact-analysis'],
                'recordPrimacyManagement': ['master-data-management', 'golden-record', 'consensus-based', 'temporal-primacy', 'multi-domain-mdm'],
                'dataQualityControls': ['rule-based-checks', 'statistical-profiling', 'ml-quality-detection', 'real-time-monitoring', 'continuous-improvement'],
                'metadataManagement': ['catalog-driven', 'semantic-layer', 'automated-discovery', 'enterprise-metadata'],
                'dataStewardshipProgram': ['business-stewards', 'technical-stewards', 'federated-stewardship', 'center-of-excellence'],
                'dataGovernanceFramework': ['dmbok-framework', 'dama-framework', 'cobit-data', 'custom-framework', 'adaptive-governance'],
                'dataFlowDocumentation': ['detailed-mapping', 'system-integration', 'real-time-monitoring', 'automated-discovery', 'comprehensive-catalog'],
                'reportingAnalyticsGovernance': ['standardized-metrics', 'certified-reports', 'self-service-governed', 'data-mart-governance', 'enterprise-reporting']
            },
            'restricted': {
                'atRestEncryption': ['maximum'],
                'inTransitEncryption': ['maximum'],
                'databaseEncryption': ['comprehensive'],
                'threatMonitoring': ['ai-threat-hunting', 'zero-trust-monitoring', 'deception-technology', 'threat-intelligence'],
                'availabilityMonitoring': ['distributed-tracing', 'predictive-analytics', 'chaos-engineering', 'comprehensive-observability'],
                'authentication': ['Biometric', 'Hardware Tokens', 'Smart Cards'],
                'authorisation': ['pam', 'zero-trust'],
                'monitoring': ['real-time', 'continuous'],
                'auditLogging': ['comprehensive', 'forensic'],
                'osHardening': ['stig', 'custom', 'immutable'],
                'osEncryption': ['comprehensive'],
                'identityManagement': ['centrally-managed-individual', 'centrally-managed-delegated', 'just-in-time'],
                'backupStrategy': ['immutable', 'air-gapped'],
                'disposalMethod': ['physical', 'witnessed', 'certified'],
                'encryptionCipher': ['AES-256', 'ChaCha20-Poly1305', 'AES-256-GCM', 'ECC-P-384', 'Ed25519', 'X25519'],
                'hashAlgorithm': ['SHA-256', 'SHA-384', 'SHA-512', 'SHA-3-256', 'SHA-3-512', 'BLAKE2b'],
                'appCustomerAccess': ['real-time-access', 'structured-export', 'api-access'],
                'appDataCorrection': ['verified-correction', 'audit-trail-correction', 'real-time-correction'],
                'appDataRetentionDisposal': ['intelligent-lifecycle', 'compliance-driven'],
                'appNotificationRequirements': ['personalised-notifications', 'multi-channel-notifications', 'intelligent-notifications'],
                'appDataCollectionLimitations': ['minimal-collection', 'strict-purpose-binding'],
                'appSolicitedUnsolicited': ['solicited-only', 'automatic-destruction', 'comprehensive-policy'],
                'appCollectionNotice': ['interactive-notice', 'comprehensive-disclosure'],
                'appThirdPartyCollection': ['consent-required', 'comprehensive-tracking'],
                'accessibilityCompliance': ['wcag-aaa', 'adaptive-interfaces', 'universal-design'],
                'assistiveTechnologySupport': ['comprehensive-assistive'],
                'inclusiveDataAccessDesign': ['cognitive-accessibility', 'multi-sensory'],
                'workplaceAccessibilityAccommodation': ['comprehensive-accommodation'],
                'dataLineageTracking': ['real-time-tracking', 'end-to-end-visibility', 'impact-analysis'],
                'recordPrimacyManagement': ['golden-record', 'temporal-primacy', 'multi-domain-mdm'],
                'dataQualityControls': ['ml-quality-detection', 'real-time-monitoring', 'continuous-improvement'],
                'metadataManagement': ['automated-discovery', 'enterprise-metadata'],
                'dataStewardshipProgram': ['center-of-excellence'],
                'dataGovernanceFramework': ['adaptive-governance'],
                'dataFlowDocumentation': ['comprehensive-catalog'],
                'reportingAnalyticsGovernance': ['enterprise-reporting']
            }
        };

        return requirements[classification] || {};
    };

    const getFilteredOptions = (controlName, allOptions) => {
        const classification = form.dataClassification;
        if (!classification) return allOptions;

        const restrictedControls = getRestrictedControls(classification);
        const restricted = restrictedControls[controlName] || [];

        return allOptions.filter(option => {
            const value = option.value || option;
            return !restricted.includes(value);
        });
    };

    const getCipherSecurityStatus = (cipher) => {
        const cipherObj = encryptionCiphers.find(c => c.value === cipher);
        return cipherObj ? cipherObj.status : 'unknown';
    };

    const getCipherType = (cipher) => {
        const cipherObj = encryptionCiphers.find(c => c.value === cipher);
        return cipherObj ? cipherObj.type : 'unknown';
    };

    const getCipherTypeIcon = (type) => {
        switch (type) {
            case 'symmetric':
                return '🔐'; // Locked with key (symmetric)
            case 'asymmetric':
                return '🔑'; // Key (asymmetric)
            default:
                return '';
        }
    };

    const getHashSecurityStatus = (hash) => {
        const hashObj = hashAlgorithms.find(h => h.value === hash);
        return hashObj ? hashObj.status : 'unknown';
    };

    const getCipherWarningIcon = (cipher, classification) => {
        const status = getCipherSecurityStatus(cipher);
        
        if (status === 'compromised') return '🔴'; // Red circle for compromised
        if (status === 'deprecated') return '⚠️'; // Warning for deprecated
        if (status === 'quantum-vulnerable' && ['confidential', 'restricted'].includes(classification)) return '🟡'; // Yellow for quantum-vulnerable with high classification
        
        return '';
    };

    const getHashWarningIcon = (hash, classification) => {
        const status = getHashSecurityStatus(hash);
        
        if (status === 'compromised') return '🔴'; // Red circle for compromised
        if (status === 'deprecated') return '⚠️'; // Warning for deprecated
        
        return '';
    };

    const getCipherStatusMessage = (cipher) => {
        const status = getCipherSecurityStatus(cipher);
        const type = getCipherType(cipher);
        const typeDescription = type === 'symmetric' ? 'Symmetric encryption (same key for encrypt/decrypt)' : 
                               type === 'asymmetric' ? 'Asymmetric encryption (public/private key pair)' : 
                               'Unknown encryption type';
        
        let statusMessage = '';
        switch (status) {
            case 'compromised':
                statusMessage = 'This cipher has been cryptographically compromised and should not be used.';
                break;
            case 'deprecated':
                statusMessage = 'This cipher is deprecated by NIST and should be avoided.';
                break;
            case 'quantum-vulnerable':
                statusMessage = 'This cipher may be vulnerable to quantum computing attacks.';
                break;
            case 'recommended':
                statusMessage = 'This cipher is currently recommended for secure applications.';
                break;
            case 'acceptable':
                statusMessage = 'This cipher is acceptable for most applications.';
                break;
            default:
                statusMessage = '';
        }
        
        return statusMessage ? `${statusMessage} ${typeDescription}` : typeDescription;
    };

    const getHashStatusMessage = (hash) => {
        const status = getHashSecurityStatus(hash);
        
        switch (status) {
            case 'compromised':
                return 'This hash algorithm has been cryptographically compromised and should not be used.';
            case 'deprecated':
                return 'This hash algorithm is deprecated by NIST and should be avoided.';
            case 'recommended':
                return 'This hash algorithm is currently recommended for secure applications.';
            case 'acceptable':
                return 'This hash algorithm is acceptable for most applications.';
            default:
                return '';
        }
    };

    const getRecommendedControls = () => {
        const assetType = form.assetType;
        const classification = form.dataClassification;
        
        if (!assetType || !classification) return null;

        const controlRecommendations = {
            'printed-media': {
                'public': {
                    storage: 'Standard filing systems',
                    disposal: 'General disposal bins',
                    access: 'Basic labeling, general office access',
                    monitoring: 'No specific monitoring required'
                },
                'internal': {
                    storage: 'Controlled access areas, clear desk policy',
                    disposal: 'Proper disposal bins, shredding for sensitive content',
                    access: 'Access logs, staff training required',
                    monitoring: 'Regular audits of access logs'
                },
                'confidential': {
                    storage: 'Locked storage, authorised access only',
                    disposal: 'Mandatory shredding, witnessed destruction',
                    access: 'Authorised access, document tracking, copy restrictions',
                    monitoring: 'Document tracking systems, regular audits'
                },
                'restricted': {
                    storage: 'Secure vault storage',
                    disposal: 'Witnessed destruction, certificate of destruction',
                    access: 'Biometric access, chain of custody, executive approval required',
                    monitoring: 'Continuous monitoring of access logs'
                }
            },
            'digital-files': {
                'public': {
                    encryption: 'No sensitive data, basic permissions',
                    backup: 'Standard backups, antivirus protection',
                    access: 'Basic user authentication',
                    monitoring: 'Basic logging, regular scans'
                },
                'internal': {
                    encryption: 'File-level encryption, encrypted file transport protocols, authenticated users',
                    backup: 'Regular encrypted backups, file versioning',
                    access: 'RBAC implementation, access monitoring, change tracking',
                    monitoring: 'Regular audits of access logs, change tracking'
                },
                'confidential': {
                    encryption: 'AES-256 encryption at rest and in transit',
                    backup: 'Encrypted backups, DLP systems',
                    access: 'MFA required, detailed audit logs',
                    monitoring: 'Regular audits of access logs, change tracking, regular compliance and access reviews'
                },
                'restricted': {
                    encryption: 'AES-256 encryption, air-gapped storage',
                    backup: 'HSM protection, immutable backups',
                    access: 'Real-time alerts, forensic imaging capabilities, automated response systems',
                    monitoring: 'Continuous monitoring of access logs, change tracking, regular compliance and access reviews'
                }
            },
            'cloud-storage': {
                'public': {
                    encryption: 'No sensitive data, basic encryption',
                    backup: 'Standard backups',
                    access: 'Usage monitoring, access logging',
                    monitoring: 'Regular audits of access logs'
                },
                'internal': {
                    encryption: 'Host-level encryption, encrypted file transport protocols, authenticated users',
                    backup: 'Regular encrypted backups, file versioning',
                    access: 'RBAC implementation, MFA required, network secured, access monitoring',
                    monitoring: 'Regular audits of access logs, change tracking'
                },
                'confidential': {
                    encryption: 'File level AES-256 encryption at rest and in transit, authenticated users',
                    backup: 'Encrypted backups, DLP systems',
                    access: 'PIM/PAM required, network segmentation, detailed audit logs, regular access reviews',
                    monitoring: 'Continuous monitoring of access logs, change tracking, regular compliance and access reviews'
                },
                'restricted': {
                    encryption: 'Customer Managed HSM keys, file level AES-256 encryption at rest and in transit, authenticated users',
                    backup: 'HSM protection, immutable backups',
                    access: 'PIM/PAM required, network segmentation, real-time alerts, forensic imaging capabilities',
                    monitoring: 'Continuous monitoring of access logs, change tracking, regular compliance and access reviews'
                }
            },
            'database-data': {
                'public': {
                    encryption: 'Basic storage level encryption, no sensitive data',
                    backup: 'Standard backups, basic monitoring',
                    access: 'Public access with minimal controls, standard user authentication',
                    monitoring: 'Query logging, performance monitoring, regular audits of access logs'
                },
                'internal': {
                    encryption: 'TDE, encrypted connections',
                    backup: 'Regular encrypted backups, PITR',
                    access: 'RBAC implementation, access monitoring',
                    monitoring: 'Query logging, performance monitoring, activity monitoring, regular audits of access logs, change tracking'
                },
                'confidential': {
                    encryption: 'TDE with column encryption and data masking of sensitive fields',
                    backup: 'Encrypted backups, DLP systems',
                    access: 'Zero Trust, PAM, MFA required, detailed audit logs, regular access reviews, real-time monitoring',
                    monitoring: 'Continuous monitoring of access logs, regular compliance and access reviews, incident forensics, breach notification systems'
                },
                'restricted': {
                    encryption: 'TDE, always encrypted',
                    backup: 'Encrypted, immutable backups',
                    access: 'Zero Trust, PAM, MFA required, real-time alerts, forensic imaging capabilities, automated lockdown systems',
                    monitoring: 'Continuous monitoring of access logs, regular compliance and access reviews, incident forensics, breach notification systems'
                }
            },
            'systems-applications': {
                'public': {
                    encryption: 'Basic storage level encryption, no sensitive data',
                    backup: 'Standard backups, basic monitoring, basic patching',
                    access: 'Basic user authentication',
                    monitoring: 'Basic logging, firewall logs, availability monitoring, regular audits of access logs'
                },
                'internal': {
                    encryption: 'File-level encryption, encrypted connections, authenticated users',
                    backup: 'Regular encrypted backups, source code versioning, change management',
                    access: 'PAM, RBAC implementation, access monitoring',
                    monitoring: 'Regular audits of access logs, network logs, change tracking, performance monitoring'
                },
                'confidential': {
                    encryption: 'AES-256 encryption at rest and in transit',
                    backup: 'Encrypted backups, DLP systems',
                    access: 'PAM, MFA required, detailed audit logs, regular access reviews',
                    monitoring: 'Continuous monitoring of access logs, change tracking, regular compliance and access reviews, incident forensics'
                },
                'restricted': {
                    encryption: 'AES-256 encryption, air-gapped storage',
                    backup: 'HSM protection, immutable backups',
                    access: 'Zero trust, PAM, MFA required, micro-segmentation',
                    monitoring: 'Real-time alerts, forensic imaging capabilities, continuous monitoring of access logs, change tracking, regular compliance and access reviews, incident forensics'
                }
            },
            'emails': {
                'public': {
                    encryption: 'Basic transport level encryption, no sensitive data',
                    backup: 'Standard backups, basic monitoring',
                    access: 'Spam and phishing filters, bulk mailing constraints, public access',
                    monitoring: 'Basic logging, mail flow monitoring, delivery reports, regular audits of access logs'
                },
                'internal': {
                    encryption: 'Encryption for external emails',
                    backup: 'Regular encrypted backups, email journaling, retention policies',
                    access: 'RBAC implementation, access monitoring and controls, email classification',
                    monitoring: 'Regular audits of access logs, email flow monitoring, delivery reports'
                },
                'confidential': {
                    encryption: 'ETE AES-256 encryption at rest and in transit, S/MIME or PGP, DLP policies',
                    backup: 'Encrypted backups, DLP systems',
                    access: 'MFA required, restricted distribution, detailed audit logs, regular activity reviews, legal hold capabilities',
                    monitoring: 'Content inspection, regular audits of access logs, email flow monitoring, delivery reports, incident forensics, compliance reporting'
                },
                'restricted': {
                    encryption: 'Always encrypted, message level encryption, air-gapped archives, DLP policies',
                    backup: 'Encrypted backups, DLP systems',
                    access: 'MFA required, secure gateways, email recall systems',
                    monitoring: 'Chain of custody, forensic analysis, continuous monitoring of access logs, change tracking, regular compliance and access reviews'
                }
            },
            'mobile-devices': {
                'public': {
                    encryption: 'No sensitive data, device passwords, basic device encryption',
                    backup: 'N/A',
                    access: 'App store restrictions',
                    monitoring: 'Basic logging, device usage monitoring, regular audits of access logs, basic compliance checks'
                },
                'internal': {
                    encryption: 'Contaniner separation',
                    backup: 'If MDM is used, regular encrypted backups',
                    access: 'RBAC implementation, MFA required, certificate based auth, device management policies, app whitelisting, device compliance checks',
                    monitoring: 'Jailbreak detection, regular audits of access logs, device usage monitoring, change tracking, compliance checks'
                },
                'confidential': {
                    encryption: 'Container encryption, MDM policies',
                    backup: 'MDM required, encrypted backups, DLP systems',
                    access: 'RBAC implementation, MFA required, VPN-only access, geo-fencing, device compliance checks',
                    monitoring: 'Behavioural analytics, continuous monitoring of access logs, change tracking, regular compliance and access reviews, incident forensics'
                },
                'restricted': {
                    encryption: 'Hardware security modules, secure boot processes',
                    backup: 'MDM required, encrypted backups, DLP systems',
                    access: 'RBAC, MFA, VPN-only access, geo-fencing, device compliance checks, dedicated secure devices',
                    monitoring: 'Real-time alerts, tamper-evident logging, emergency wipe protocols, device quarantine, incident containment'
                }
            }
        };

        return controlRecommendations[assetType]?.[classification] || null;
    };

    const recommendedControls = getRecommendedControls();

    return (
      <form onSubmit={handleSubmit}>
        {/* Basic Asset Information - Always Visible */}
        <details open={fieldsOpen} onToggle={e => setFieldsOpen(e.target.open)}>          
          <summary className="dc-form-summary">🔍 Data Classification Assessment Form</summary>
            <fieldset className="dc-fieldset dc-fieldset-asset-info">
              <legend className="dc-legend dc-legend-asset-info">🎯 Asset Information</legend>
              <table className="dc-field-table">
                <tbody>
                    <tr>   
                    <td className="dc-field-cell-label">
                      <label className="dc-form-label">Asset Name:<span className="dc-required">*</span></label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="assetName"
                        name="assetName"
                        value={form.assetName}
                        onChange={handleChange}
                        placeholder="Enter the name of the data asset"
                        required
                        className="dc-input"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="dc-field-cell-label">
                      <label className="dc-form-label">Asset Type:<span className="dc-required">*</span></label>
                    </td>
                    <td>
                      <select
                        id="assetType"
                        name="assetType"
                        value={form.assetType}
                        onChange={handleChange}
                        required
                        className="dc-select"
                      >
                        <option value="">Select asset type...</option>
                        {assetTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="dc-field-cell-label">
                      <label className="dc-form-label">Data Type:<span className="dc-required">*</span></label>
                    </td>
                    <td>
                      <select
                        id="dataType"
                        name="dataType"
                        value={form.dataType}
                        onChange={handleChange}
                        required
                        className="dc-select"
                      >
                        <option value="">Select data type...</option>
                        {dataTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <small className="dc-field-hint">
                        Select the primary type of data contained in this asset. Choose 'Mixed Data Types' if multiple types apply.
                      </small>
                    </td>
                  </tr>
                  <tr>
                    <td className="dc-field-cell-label">
                      <label className="dc-form-label">Data Classification:<span className="dc-required">*</span></label>
                    </td>
                    <td>
                      <select
                        id="dataClassification"
                        name="dataClassification"
                        value={form.dataClassification}
                        onChange={handleChange}
                        required
                        className={`dc-select ${form.dataClassification ? `dc-classification-${form.dataClassification}` : ''}`}
                      >
                        <option value="">Select classification...</option>
                        {dataClassifications.map(classification => (
                          <option key={classification.value} value={classification.value}>
                            {classification.label} ({classification.risk} Risk)
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="dc-field-cell-label">
                      <label className="dc-form-label">Asset Description:</label>
                    </td>
                    <td>
                      <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describe the data asset, its purpose, and contents"
                        rows="3"
                        className="dc-textarea"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="dc-field-cell-label">
                      <label className="dc-form-label">System & Process Dependencies:</label>
                    </td>
                    <td>
                      <textarea
                        id="dependencies"
                        name="dependencies"
                        value={form.dependencies}
                        onChange={handleChange}
                        placeholder="List systems, applications, processes, or workflows that depend on this data asset (e.g., CRM system, monthly reporting process, API integrations)"
                        rows="3"
                        className="dc-textarea"
                      />
                      <small className="dc-field-hint">
                        Identify downstream systems, business processes, and workflows that would be impacted if this data asset becomes unavailable or compromised
                      </small>
                    </td>
                  </tr>
                  <tr>
                    <td className="dc-field-cell-label">
                      <label className="dc-form-label">Data Owner:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="dataOwner"
                        name="dataOwner"
                        value={form.dataOwner}
                        onChange={handleChange}
                        placeholder="Business owner responsible for the data"
                        className="dc-input"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="dc-field-cell-label">
                      <label className="dc-form-label">Technical Owner:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="technicalOwner"
                        name="technicalOwner"
                        value={form.technicalOwner}
                        onChange={handleChange}
                        placeholder="Technical contact for implementation and support"
                        className="dc-input"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="dc-field-cell-label">
                      <label className="dc-form-label">Assessment Conducted By:<span className="dc-required">*</span></label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="assessorName"
                        name="assessorName"
                        value={form.assessorName}
                        onChange={handleChange}
                        placeholder="Name of person conducting this data classification assessment"
                        required
                        className="dc-input"
                      />
                      <small className="dc-field-hint">
                        Enter the full name of the person responsible for this data classification assessment
                      </small>
                    </td>
                  </tr>
                  <tr>
                    <td className="dc-field-cell-label">
                      <label className="dc-form-label">Assessment Date:<span className="dc-required">*</span></label>
                    </td>
                    <td>
                      <input
                        type="date"
                        id="assessmentDate"
                        name="assessmentDate"
                        value={form.assessmentDate}
                        onChange={handleChange}
                        required
                        className="dc-input-date"
                      />
                      <small className="dc-field-hint">
                        Date when this data classification assessment was conducted
                      </small>
                    </td>
                  </tr>
                  <tr>
                    <td className="dc-field-cell-label">
                      <label className="dc-form-label">Next Review Date:</label>
                    </td>
                    <td>
                      <input
                        type="date"
                        id="reviewDate"
                        name="reviewDate"
                        value={form.reviewDate}
                        onChange={handleChange}
                        className="dc-input-date"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>

            {/* Extended Data Classification Assessment - Collapsible */}
            <details open={extendedFieldsOpen} onToggle={e => { e.stopPropagation(); setExtendedFieldsOpen(e.target.open); }}>          
              <summary className="dc-form-summary">🔍 Extended Data Classification Assessment (Optional)</summary>
              <table className="dc-form-table">
                <tbody>
                  {/* Security Controls Fields */}
                  <tr>
                    <td colSpan="2">
                      <fieldset className="dc-fieldset dc-fieldset-security-controls">
                        <legend className="dc-legend dc-legend-security-controls">🔒Security Controls</legend>
                        <table className="dc-field-table">
                          <tbody>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data at Rest Encryption:</label>
                              </td>
                              <td>
                                <select
                                  id="atRestEncryption"
                                  name="atRestEncryption"
                                  value={form.atRestEncryption}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('atRestEncryption') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select encryption level...</option>
                                      {getFilteredOptions('atRestEncryption', [
                                          { value: 'none', label: 'No encryption required' },
                                          { value: 'basic', label: 'Basic encryption (provider managed)' },
                                          { value: 'standard', label: 'Standard encryption (AES-128)' },
                                          { value: 'strong', label: 'Strong encryption (AES-256)' },
                                          { value: 'maximum', label: 'Maximum encryption (AES-256 + HSM)' }
                                      ]).map(option => (
                                          <option key={option.value} value={option.value}>
                                              {option.label}
                                              {form.dataClassification === 'restricted' && ['none', 'basic', 'standard'].includes(option.value) ? ' ⚠️' : ''}
                                              {form.dataClassification === 'confidential' && ['none', 'basic'].includes(option.value) ? ' ⚠️' : ''}
                                          </option>
                                      ))}
                                </select>                              
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          {form.dataClassification === 'public' && 'Any encryption level acceptable'}
                                          {form.dataClassification === 'internal' && 'Basic encryption or higher recommended'}
                                          {form.dataClassification === 'confidential' && 'Strong encryption (AES-256) required'}
                                          {form.dataClassification === 'restricted' && 'Maximum encryption with HSM required'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="atRestEncryption" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data in Transit Encryption:</label>
                              </td>
                              <td>
                                <select
                                  id="inTransitEncryption"
                                  name="inTransitEncryption"
                                  value={form.inTransitEncryption}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('inTransitEncryption') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select encryption level...</option>
                                      {getFilteredOptions('inTransitEncryption', [
                                          { value: 'none', label: 'No encryption required (HTTP, FTP, Telnet)' },
                                          { value: 'basic', label: 'Basic encryption (HTTP/1.1 + TLS 1.0/1.1, SSH v1, legacy protocols)' },
                                          { value: 'standard', label: 'Standard secure protocols (HTTP/1.1 + TLS 1.2, HTTP/2, SSH v2, SFTP)' },
                                          { value: 'strong', label: 'Strong encryption (HTTP/2 + TLS 1.3, HTTP/3 + QUIC, modern VPN)' },
                                          { value: 'maximum', label: 'Maximum protection (HTTP/3 + QUIC, E2E encryption, mutual auth)' }
                                      ]).map(option => (
                                          <option key={option.value} value={option.value}>
                                              {option.label}
                                              {form.dataClassification === 'restricted' && ['none', 'basic', 'standard'].includes(option.value) ? ' ⚠️' : ''}
                                              {form.dataClassification === 'confidential' && ['none', 'basic'].includes(option.value) ? ' ⚠️' : ''}
                                          </option>
                                      ))}
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          {form.dataClassification === 'public' && 'Any secure transport protocol acceptable (HTTPS/TLS, SSH, VPN)'}
                                          {form.dataClassification === 'internal' && 'Modern protocols recommended (HTTP/1.1+TLS 1.2, HTTP/2, SSH v2, SFTP)'}
                                          {form.dataClassification === 'confidential' && 'Strong encryption required (HTTP/2+TLS 1.3, HTTP/3+QUIC, secure VPN)'}
                                          {form.dataClassification === 'restricted' && 'Maximum protection required (HTTP/3+QUIC, E2E encryption, mutual auth)'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="inTransitEncryption" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Database Encryption & Data Protection:</label>
                              </td>
                              <td>
                                <select
                                  id="databaseEncryption"
                                  name="databaseEncryption"
                                  value={form.databaseEncryption}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select database protection level...</option>
                                  <option value="none">No database encryption</option>
                                  <option value="tde-basic">Transparent Data Encryption (TDE) - Basic</option>
                                  <option value="tde-advanced">TDE with Customer-Managed Keys</option>
                                  <option value="column-encryption">Column-Level Encryption</option>
                                  <option value="row-level-security">Row-Level Security (RLS)</option>
                                  <option value="field-level-encryption">Field-Level Encryption</option>
                                  <option value="tokenisation">Data Tokenisation</option>
                                  <option value="data-masking">Data Masking/Obfuscation</option>
                                  <option value="dynamic-masking">Dynamic Data Masking</option>
                                  <option value="synthetic-data">Synthetic Data Generation</option>
                                  <option value="database-firewall">Database Firewall Protection</option>
                                  <option value="always-encrypted">Always Encrypted (SQL Server)</option>
                                  <option value="envelope-encryption">Envelope Encryption</option>
                                  <option value="comprehensive">Comprehensive (TDE + Column + Masking + Tokenisation)</option>
                                </select>
                                <small className="dc-field-hint">
                                  <strong>Database-specific encryption and data protection:</strong><br/>
                                  • <strong>TDE:</strong> Encrypts entire database files at rest<br/>
                                  • <strong>Column/Field Encryption:</strong> Encrypts specific sensitive columns<br/>
                                  • <strong>Row-Level Security:</strong> Controls access to specific rows<br/>
                                  • <strong>Tokenisation:</strong> Replaces sensitive data with non-sensitive tokens<br/>
                                  • <strong>Data Masking:</strong> Obscures production data in non-production environments<br/>
                                  • <strong>Dynamic Masking:</strong> Real-time masking based on user permissions<br/>
                                  • <strong>Synthetic Data:</strong> AI-generated realistic but fake data for testing
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommended for {form.dataClassification.toUpperCase()}:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic protection sufficient - consider data masking for non-production environments'}
                                        {form.dataClassification === 'internal' && 'TDE + data masking recommended for non-production environments'}
                                        {form.dataClassification === 'confidential' && 'TDE + column encryption + tokenisation for sensitive fields + mandatory masking/synthetic data for non-production'}
                                        {form.dataClassification === 'restricted' && 'Comprehensive protection required: TDE + column encryption + RLS + tokenisation + always encrypted + synthetic data only for non-production'}
                                    </small>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Encryption Cipher:</label>
                              </td>
                              <td>
                                <select
                                  id="encryptionCipher"
                                  name="encryptionCipher"
                                  value={form.encryptionCipher}
                                  onChange={handleInputChange}
                                  className={`${getFieldWarning('encryptionCipher') ? 'dc-field-warning' : 'dc-select'}`}
                                >
                                  <option value="">Select cipher...</option>
                                      {getFilteredOptions('encryptionCipher', encryptionCiphers).map(cipher => (
                                          <option key={cipher.value} value={cipher.value}>
                                              {getCipherTypeIcon(cipher.type)} {cipher.label} {getCipherWarningIcon(cipher.value, form.dataClassification)}
                                          </option>
                                      ))}
                                  </select>
                                  {form.encryptionCipher && (
                                      <small className={`dc-field-hint ${getCipherSecurityStatus(form.encryptionCipher) === 'compromised' || getCipherSecurityStatus(form.encryptionCipher) === 'deprecated' ? 'dc-cipher-warning' : ''}`}>
                                          {getCipherStatusMessage(form.encryptionCipher)}
                                          {form.dataClassification && (
                                              <>
                                                  <br />
                                                  <strong>Guidance for {form.dataClassification.toUpperCase()}:</strong>{' '}
                                                  {form.dataClassification === 'public' && 'Consider using modern ciphers for better security. Both symmetric and asymmetric ciphers are acceptable.'}
                                                  {form.dataClassification === 'internal' && 'Use AES-128+ (symmetric) or ECC/RSA (asymmetric) for internal data.'}
                                                  {form.dataClassification === 'confidential' && 'AES-256 (symmetric) or ECC-P-384+ (asymmetric) recommended.'}
                                                  {form.dataClassification === 'restricted' && 'Only AES-256/ChaCha20 (symmetric) or ECC-P-384+/Ed25519 (asymmetric) should be used.'}
                                              </>
                                          )}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="encryptionCipher" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Hash Algorithm:</label>
                              </td>
                              <td>
                                <select
                                  id="hashAlgorithm"
                                  name="hashAlgorithm"
                                  value={form.hashAlgorithm}
                                  onChange={handleInputChange}
                                  className={`${getFieldWarning('hashAlgorithm') ? 'dc-field-warning' : 'dc-select'}`}
                                >
                                  <option value="">Select hash algorithm...</option>
                                      {getFilteredOptions('hashAlgorithm', hashAlgorithms).map(hash => (
                                          <option key={hash.value} value={hash.value}>
                                              {hash.label} {getHashWarningIcon(hash.value, form.dataClassification)}
                                          </option>
                                      ))}
                                  </select>
                                  {form.hashAlgorithm && (
                                      <small className={`dc-field-hint ${getHashSecurityStatus(form.hashAlgorithm) === 'compromised' || getHashSecurityStatus(form.hashAlgorithm) === 'deprecated' ? 'dc-cipher-warning' : ''}`}>
                                          {getHashStatusMessage(form.hashAlgorithm)}
                                          {form.dataClassification && (
                                              <>
                                                  <br />
                                                  {form.dataClassification === 'public' && 'Consider using SHA-256 or stronger for better security.'}
                                                  {form.dataClassification === 'internal' && 'Use SHA-256 or stronger for internal data.'}
                                                  {form.dataClassification === 'confidential' && 'SHA-256 or stronger recommended.'}
                                                  {form.dataClassification === 'restricted' && 'Only SHA-256 or stronger should be used.'}
                                              </>
                                          )}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="hashAlgorithm" />                                    
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Key Management:</label>
                              </td>
                              <td>
                                <select
                                  id="keyManagement"
                                  name="keyManagement"
                                  value={form.keyManagement}
                                  onChange={handleInputChange}
                                  className={`${getFieldWarning('keyManagement') ? 'dc-field-warning' : 'dc-select'}`}
                                >
                                  <option value="">Select key management...</option>
                                  <option value="provider">Provider managed keys</option>
                                  <option value="customer">Customer managed keys</option>
                                  <option value="hsm">Hardware Security Module (HSM)</option>
                                  <option value="byok">Bring Your Own Key (BYOK)</option>
                                </select>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </fieldset>
                    </td>
                  </tr>

                  {/* Access Control Fields */}
                  <tr>
                    <td colSpan="2">
                      <fieldset className="dc-fieldset dc-fieldset-access-control">
                        <legend className="dc-legend dc-legend-access-control">🔐 Access Control</legend>
                        <table className="dc-field-table">
                          <tbody>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Authentication Method:</label>
                              </td>
                              <td>
                                <select
                                  id="authentication"
                                  name="authentication"
                                  value={form.authentication}
                                  onChange={handleInputChange}
                                  className={`${getFieldWarning('authentication') ? 'dc-field-warning' : 'dc-select'}`}
                                >
                                  <option value="">Select authentication method...</option>
                                  {getFilteredOptions('authentication', [
                                      { value: 'none', label: 'No authentication required' },
                                      { value: 'basic', label: 'Basic authentication' },
                                      { value: 'mfa', label: 'Multi-Factor Authentication (MFA)' },
                                      { value: 'sso', label: 'Single Sign-On (SSO)' },
                                      { value: 'biometric', label: 'Biometric authentication' }
                                  ]).map(option => (
                                      <option key={option.value} value={option.value}>
                                          {option.label}
                                          {form.dataClassification === 'restricted' && option.value === 'none' ? ' ⚠️' : ''}
                                          {form.dataClassification === 'confidential' && option.value === 'basic' ? ' ⚠️' : ''}
                                      </option>
                                  ))}
                                </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          {form.dataClassification === 'public' && 'Basic authentication acceptable'}
                                          {form.dataClassification === 'internal' && 'Multi-factor authentication recommended'}
                                          {form.dataClassification === 'confidential' && 'Multi-factor authentication required'}
                                          {form.dataClassification === 'restricted' && 'Biometric or hardware token authentication required'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="authentication" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Authorisation Model:</label>
                              </td>
                              <td>
                                <select
                                  id="authorisation"
                                  name="authorisation"
                                  value={form.authorisation}
                                  onChange={handleInputChange}
                                  className={`${getFieldWarning('authorisation') ? 'dc-field-warning' : 'dc-select'}`}
                                >
                                    <option value="">Select authorisation...</option>
                                      {getFilteredOptions('authorisation', [
                                          { value: 'basic', label: 'Basic permissions' },
                                          { value: 'rbac', label: 'Role-Based Access Control (RBAC)' },
                                          { value: 'abac', label: 'Attribute-Based Access Control (ABAC)' },
                                          { value: 'pam', label: 'Privileged Access Management (PAM)' },
                                          { value: 'zero-trust', label: 'Zero Trust Architecture' }
                                      ]).map(option => (
                                          <option key={option.value} value={option.value}>
                                              {option.label}
                                              {form.dataClassification === 'restricted' && option.value === 'basic' ? ' ⚠️' : ''}
                                          </option>
                                      ))}
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          {form.dataClassification === 'public' && 'Basic permissions acceptable'}
                                          {form.dataClassification === 'internal' && 'RBAC recommended'}
                                          {form.dataClassification === 'confidential' && 'RBAC or ABAC recommended'}
                                          {form.dataClassification === 'restricted' && 'PAM or Zero Trust required'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="authorisation" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Identity Management & Access Patterns:</label>
                              </td>
                              <td>
                                <select
                                  id="identityManagement"
                                  name="identityManagement"
                                  value={form.identityManagement}
                                  onChange={handleInputChange}
                                  className="dc-select"
                                >
                                  <option value="">Select identity management approach...</option>
                                  <option value="centrally-managed-individual">Centrally Managed Individual Identities (AD/Azure AD/LDAP)</option>
                                  <option value="centrally-managed-service">Centrally Managed Service Accounts (Federated)</option>
                                  <option value="centrally-managed-delegated">Centrally Managed with Delegated Permissions</option>
                                  <option value="application-managed-individual">Application-Managed Individual Accounts</option>
                                  <option value="application-managed-shared">Application-Managed Shared Accounts</option>
                                  <option value="database-managed-individual">Database-Managed Individual Users</option>
                                  <option value="database-managed-shared">Database-Managed Shared/Generic Users</option>
                                  <option value="third-party-non-federated">Third-Party Application (No Federation)</option>
                                  <option value="service-to-service">Service-to-Service Authentication (API Keys/Certificates)</option>
                                  <option value="just-in-time">Just-In-Time (JIT) Access Provisioning</option>
                                  <option value="break-glass">Break-Glass Emergency Access</option>
                                  <option value="hybrid-approach">Hybrid Approach (Multiple Identity Sources)</option>
                                </select>
                                <small className="dc-field-hint">
                                  <strong>Identity Management Patterns:</strong><br/>
                                  • <strong>Centrally Managed:</strong> Single source of truth (AD, Azure AD, LDAP) with federation<br/>
                                  • <strong>Application-Managed:</strong> Local application user stores without central federation<br/>
                                  • <strong>Database-Managed:</strong> Database-specific user accounts and permissions<br/>
                                  • <strong>Individual vs Shared:</strong> Unique personal accounts vs shared/generic accounts<br/>
                                  • <strong>Delegated:</strong> Permissions granted through delegation rather than direct assignment<br/>
                                  • <strong>Service-to-Service:</strong> System authentication using certificates, API keys, or tokens
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommended for {form.dataClassification.toUpperCase()}:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic identity management acceptable - consider centralised for better governance'}
                                        {form.dataClassification === 'internal' && 'Centrally managed identities recommended - avoid shared accounts where possible'}
                                        {form.dataClassification === 'confidential' && 'Centrally managed individual identities required - no shared accounts except for emergency break-glass'}
                                        {form.dataClassification === 'restricted' && 'Centrally managed with JIT access + delegated permissions - all access must be individually attributed and time-limited'}
                                    </small>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Specific Access Controls:</label>
                              </td>
                              <td>
                                <textarea
                                  id="specific-access-controls"
                                  name="specificAccessControls"
                                  value={form.specificAccessControls}
                                  onChange={handleInputChange}
                                  placeholder="Describe specific access controls, restrictions, and approval processes"
                                  rows="3"
                                  className="dc-textarea"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </fieldset>
                    </td>
                  </tr>

                  {/* Advanced Security Control Fields */}
                  <tr>
                    <td colSpan="2">
                      <fieldset className="dc-fieldset dc-fieldset-advanced-security-controls">
                        <legend className="dc-legend dc-legend-advanced-security-controls">🛡️ Advanced Security Controls</legend>
                        <table className="dc-field-table">
                          <tbody>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Web Application Firewall (WAF) - Ingress Protection:</label>
                              </td>
                              <td>
                                <select
                                  id="wafControls"
                                  name="wafControls"
                                  value={form.wafControls}
                                  onChange={handleInputChange}
                                  className={`${getFieldWarning('wafControls') ? 'dc-field-warning' : 'dc-select'}`}
                                >
                                  <option value="">Select WAF protection...</option>
                                      <option value="none">No WAF required</option>
                                      <option value="basic">Basic WAF protection (HTTP/HTTPS only)</option>
                                      <option value="standard">Standard OWASP ruleset (with TLS inspection)</option>
                                      <option value="advanced">Advanced threat protection (API security)</option>
                                      <option value="enterprise">Enterprise WAF with bot protection (full HTTP analysis)</option>
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Ingress web protection:</strong> HTTP/HTTPS traffic only. Does not cover SFTP, SSH, or encrypted tunnels without TLS inspection
                                          <br />
                                          {form.dataClassification === 'public' && 'Basic WAF acceptable for web applications'}
                                          {form.dataClassification === 'internal' && 'Standard OWASP ruleset recommended'}
                                          {form.dataClassification === 'confidential' && 'Advanced threat protection required'}
                                          {form.dataClassification === 'restricted' && 'Enterprise WAF with bot protection required'}
                                      </small>
                                  )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Loss Prevention (DLP) - Egress Protection:</label>
                              </td>
                              <td>
                                <select
                                  id="dlpControls"
                                  name="dlpControls"
                                  value={form.dlpControls}
                                  onChange={handleInputChange}
                                  className={`${getFieldWarning('dlpControls') ? 'dc-field-warning' : 'dc-select'}`}
                                >
                                  <option value="">Select DLP level...</option>
                                      <option value="none">No DLP required</option>
                                      <option value="basic">Basic content inspection (email, web)</option>
                                      <option value="advanced">Advanced pattern detection (all protocols)</option>
                                      <option value="comprehensive">Comprehensive DLP suite (network + endpoint)</option>
                                      <option value="enterprise">Enterprise DLP with ML/AI (all traffic types)</option>
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Egress data protection:</strong> Monitors outbound data flows (email, web, FTP, APIs, cloud uploads)
                                          <br />
                                          {form.dataClassification === 'public' && 'Basic DLP acceptable for monitoring'}
                                          {form.dataClassification === 'internal' && 'Advanced pattern detection recommended for all protocols'}
                                          {form.dataClassification === 'confidential' && 'Comprehensive DLP suite required for network + endpoint'}
                                          {form.dataClassification === 'restricted' && 'Enterprise DLP with ML/AI required for all traffic types'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="dlpControls" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Cloud Access Security Broker (CASB) - Cloud Egress</label>
                              </td>
                              <td>
                                <select
                                  id="casbControls"
                                name="casbControls"
                                value={form.casbControls}
                                onChange={handleInputChange}
                                className={`${getFieldWarning('casbControls') ? 'dc-field-warning' : 'dc-select'}`}
                              >
                                <option value="">Select CASB protection...</option>
                                      <option value="none">No CASB required</option>
                                      <option value="basic">Basic cloud visibility (API-based)</option>
                                      <option value="standard">Standard CASB controls (HTTP/HTTPS)</option>
                                      <option value="advanced">Advanced threat protection (inline proxy)</option>
                                      <option value="comprehensive">Comprehensive CASB suite (all cloud services)</option>
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Cloud egress protection:</strong> Traditional CASB - primarily HTTP/HTTPS cloud traffic. Limited visibility into encrypted tunnels
                                          <br />
                                          {form.dataClassification === 'public' && 'Basic cloud visibility acceptable'}
                                          {form.dataClassification === 'internal' && 'Standard CASB controls recommended'}
                                          {form.dataClassification === 'confidential' && 'Advanced threat protection required'}
                                          {form.dataClassification === 'restricted' && 'Consider SSE/SASE for comprehensive coverage'}
                                      </small>
                                  )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Security Service Edge (SSE) - Cloud Egress</label>
                              </td>
                              <td>
                                <select
                                  id="sseControls"
                                  name="sseControls"
                                  value={form.sseControls}
                                  onChange={handleInputChange}
                                  className={`${getFieldWarning('sseControls') ? 'dc-field-warning' : 'dc-select'}`}
                                >
                                  <option value="">Select SSE protection...</option>
                                      <option value="none">No SSE required</option>
                                      <option value="basic">Basic SSE (CASB + SWG)</option>
                                      <option value="standard">Standard SSE (CASB + SWG + ZTNA)</option>
                                      <option value="advanced">Advanced SSE with FWaaS</option>
                                      <option value="comprehensive">Comprehensive SSE platform</option>
                                      <option value="sase">Full SASE architecture</option>
                                </select>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Modern cloud security:</strong> SSE integrates CASB, SWG, ZTNA, and FWaaS for comprehensive protection
                                        <br />
                                        {form.dataClassification === 'public' && 'Basic SSE acceptable for cloud-first organisations'}
                                        {form.dataClassification === 'internal' && 'Standard SSE with ZTNA recommended'}
                                        {form.dataClassification === 'confidential' && 'Advanced SSE with FWaaS required'}
                                        {form.dataClassification === 'restricted' && 'Full SASE architecture required'}
                                    </small>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Cloud Network Security</label>
                              </td>
                              <td>
                                <select
                                    id="cloudNetworkSecurity"
                                    name="cloudNetworkSecurity"
                                    value={form.cloudNetworkSecurity}
                                    onChange={handleInputChange}
                                    className='dc-select'
                                >
                                  <option value="">Select cloud network security...</option>
                                      <option value="none">No cloud network controls</option>
                                      <option value="basic">Basic VPC/VNet with security groups</option>
                                      <option value="standard">VPC + Private subnets + NAT Gateway</option>
                                      <option value="advanced">Private endpoints + VPN Gateway + Network ACLs</option>
                                      <option value="comprehensive">Service mesh + Private Link + Transit Gateway</option>
                                      <option value="zero-trust">Zero Trust with ZTNA + micro-segmentation</option>
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Cloud infrastructure protection:</strong> VPC/VNet isolation, private endpoints, service mesh for all protocols
                                          <br />
                                          {form.dataClassification === 'public' && 'Basic VPC with security groups acceptable'}
                                          {form.dataClassification === 'internal' && 'Private subnets with NAT Gateway recommended'}
                                          {form.dataClassification === 'confidential' && 'Private endpoints and VPN Gateway required'}
                                          {form.dataClassification === 'restricted' && 'Zero Trust with micro-segmentation required'}
                                      </small>
                                  )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">SD-WAN (Software-Defined Wide Area Network)</label>
                              </td>
                              <td>
                                <select
                                    id="sdwanControls"
                                    name="sdwanControls"
                                    value={form.sdwanControls}
                                    onChange={handleInputChange}
                                    className='dc-select'
                                >
                                    <option value="">Select SD-WAN implementation...</option>
                                      <option value="traditional-wan">Traditional WAN (no SD-WAN)</option>
                                      <option value="vpn">VPN-based connectivity</option>
                                      <option value="mpls">MPLS network</option>
                                      <option value="basic">Basic SD-WAN (centralised control)</option>
                                      <option value="standard">Standard SD-WAN with encryption</option>
                                      <option value="advanced">Advanced SD-WAN with security functions</option>
                                      <option value="secure">Secure SD-WAN with integrated security</option>
                                      <option value="sase-integrated">SASE-integrated SD-WAN</option>
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Network connectivity backbone:</strong> SD-WAN provides intelligent routing, bandwidth optimisation, and security integration
                                          <br />
                                          {form.dataClassification === 'public' && 'Traditional WAN or VPN acceptable, basic SD-WAN beneficial for efficiency'}
                                          {form.dataClassification === 'internal' && 'VPN or standard SD-WAN with encryption recommended'}
                                          {form.dataClassification === 'confidential' && 'Secure VPN or advanced SD-WAN with integrated security required'}
                                          {form.dataClassification === 'restricted' && 'SASE-integrated SD-WAN mandatory for Zero Trust architecture'}
                                      </small>
                                  )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">SASE Architecture</label>
                              </td>
                              <td>
                                <select
                                  id="saseArchitecture"
                                  name="saseArchitecture"
                                  value={form.saseArchitecture}
                                  onChange={handleInputChange}
                                  className='dc-select'
                                >
                                  <option value="">Select SASE implementation...</option>
                                      <option value="none">Traditional security stack (no SASE)</option>
                                      <option value="partial">Partial SASE (SSE components)</option>
                                      <option value="hybrid">Hybrid SASE (cloud + on-premises)</option>
                                      <option value="cloud-native">Cloud-native SASE</option>
                                      <option value="full-sase">Full SASE with SD-WAN</option>
                                      <option value="zero-trust-sase">Zero Trust SASE platform</option>
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Network + Security convergence:</strong> SASE combines SD-WAN, SSE, and Zero Trust for cloud-first security
                                          <br />
                                          {form.dataClassification === 'public' && 'Traditional stack acceptable, consider partial SASE for efficiency'}
                                          {form.dataClassification === 'internal' && 'Hybrid SASE recommended for modern organisations'}
                                          {form.dataClassification === 'confidential' && 'Cloud-native SASE with strong controls required'}
                                          {form.dataClassification === 'restricted' && 'Zero Trust SASE platform mandatory'}
                                      </small>
                                  )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Zero Trust Maturity</label>
                              </td>
                              <td>
                                <select
                                    id="zeroTrustMaturity"
                                    name="zeroTrustMaturity"
                                    value={form.zeroTrustMaturity}
                                    onChange={handleInputChange}
                                    className='dc-select'
                                >
                                  <option value="">Select Zero Trust maturity...</option>
                                      <option value="traditional">Traditional perimeter security</option>
                                      <option value="initial">Initial ZT (identity-based access)</option>
                                      <option value="developing">Developing ZT (device + identity)</option>
                                      <option value="defined">Defined ZT (micro-segmentation)</option>
                                      <option value="managed">Managed ZT (continuous verification)</option>
                                      <option value="optimised">Optimised ZT (ML/AI-driven)</option>
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Never trust, always verify:</strong> Zero Trust security posture assessment
                                          <br />
                                          {form.dataClassification === 'public' && 'Traditional security acceptable, ZT beneficial'}
                                          {form.dataClassification === 'internal' && 'Developing ZT recommended (device + identity)'}
                                          {form.dataClassification === 'confidential' && 'Defined ZT required (micro-segmentation)'}
                                          {form.dataClassification === 'restricted' && 'Managed or Optimised ZT mandatory'}
                                      </small>
                                  )}
                              </td>                            
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Network Security Controls - All Protocols</label>
                              </td>
                              <td>
                                <select
                                    id="networkSecurity"
                                    name="networkSecurity"
                                    value={form.networkSecurity}
                                    onChange={handleInputChange}
                                    className='dc-select'
                                >
                                    <option value="">Select network security...</option>
                                    <option value="basic">Basic firewall protection (port-based rules)</option>
                                    <option value="standard">Network segmentation + VLANs</option>
                                    <option value="advanced">Advanced IDS/IPS (all protocols)</option>
                                    <option value="ngfw">Next-Gen Firewall with DPI</option>
                                    <option value="zero-trust">Zero Trust network architecture</option>
                                    <option value="micro-segmentation">Micro-segmentation with ZTNA</option>
                                </select>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>All network protocols:</strong> Covers SSH, SFTP, FTP, SMTP, DNS, and encrypted tunnels not visible to WAF/CASB
                                        <br />
                                        {form.dataClassification === 'public' && 'Basic firewall protection acceptable'}
                                        {form.dataClassification === 'internal' && 'Network segmentation recommended'}
                                        {form.dataClassification === 'confidential' && 'Advanced IDS/IPS required'}
                                        {form.dataClassification === 'restricted' && 'Zero Trust or micro-segmentation required'}
                                    </small>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Non-HTTP Protocol Coverage</label>
                              </td>
                              <td>
                                <select
                                    id="protocolGapCoverage"
                                    name="protocolGapCoverage"
                                    value={form.protocolGapCoverage}
                                    onChange={handleInputChange}
                                    className='dc-select'
                                >
                                    <option value="">Select protocol coverage...</option>
                                    <option value="none">No additional coverage needed</option>
                                    <option value="basic">Basic monitoring (SFTP, SSH logging)</option>
                                    <option value="advanced">Advanced DPI (all encrypted protocols)</option>
                                    <option value="comprehensive">Comprehensive inspection + SSL/TLS breakout</option>
                                    <option value="endpoint">Endpoint-based protection (agent monitoring)</option>
                                </select>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Coverage gaps:</strong> SFTP, SSH, VPN tunnels, encrypted protocols not inspected by WAF/CASB
                                        <br />
                                        {form.dataClassification === 'public' && 'Basic monitoring acceptable'}
                                        {form.dataClassification === 'internal' && 'Advanced DPI recommended'}
                                        {form.dataClassification === 'confidential' && 'Comprehensive inspection required'}
                                        {form.dataClassification === 'restricted' && 'Endpoint-based protection mandatory'}
                                    </small>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </fieldset>
                    </td>
                  </tr>

                  {/* Application Security Controls */}
                  <tr>
                    <td colSpan="2">
                      <fieldset className="dc-fieldset dc-fieldset-application-security-controls">
                        <legend className="dc-legend dc-legend-application-security-controls">🛡️ Application Security Controls</legend>
                        <table className="dc-field-table">
                          <tbody>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Antivirus & Anti-malware:</label>
                              </td>
                              <td>
                                <select
                                    id="antivirusControls"
                                    name="antivirusControls"
                                    value={form.antivirusControls}
                                    onChange={handleInputChange}
                                    className={getFieldWarning('antivirusControls') ? 'dc-field-warning' : 'dc-select'}
                                >
                                    <option value="">Select antivirus protection...</option>
                                    <option value="none">No antivirus required</option>
                                    <option value="basic">Basic antivirus (signature-based)</option>
                                    <option value="standard">Standard endpoint protection</option>
                                    <option value="advanced">Advanced threat protection (behavioral analysis)</option>
                                    <option value="enterprise">Enterprise EDR/XDR solution</option>
                                    <option value="next-gen">Next-gen with AI/ML detection</option>
                                </select>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Endpoint protection:</strong> Antivirus, anti-malware, and advanced threat detection
                                        <br />
                                        {form.dataClassification === 'public' && 'Basic antivirus acceptable for low-risk environments'}
                                        {form.dataClassification === 'internal' && 'Standard endpoint protection recommended'}
                                        {form.dataClassification === 'confidential' && 'Advanced threat protection required'}
                                        {form.dataClassification === 'restricted' && 'Enterprise EDR/XDR with AI/ML detection mandatory'}
                                    </small>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Vulnerability Scanning</label>
                              </td>
                              <td>
                                <select
                                    id="vulnerabilityScanning"
                                    name="vulnerabilityScanning"
                                    value={form.vulnerabilityScanning}
                                    onChange={handleInputChange}
                                    className={getFieldWarning('vulnerabilityScanning') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select vulnerability scanning...</option>
                                  <option value="none">No vulnerability scanning</option>
                                  <option value="manual">Manual/periodic scanning</option>
                                  <option value="scheduled">Scheduled automated scanning</option>
                                  <option value="continuous">Continuous vulnerability assessment</option>
                                  <option value="comprehensive">Comprehensive SAST/DAST/IAST</option>
                                  <option value="devsecops">DevSecOps integrated scanning</option>
                              </select>
                              {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Vulnerability management:</strong> Application and infrastructure vulnerability assessment
                                      <br />
                                      {form.dataClassification === 'public' && 'Manual scanning acceptable for non-critical systems'}
                                      {form.dataClassification === 'internal' && 'Scheduled automated scanning recommended'}
                                      {form.dataClassification === 'confidential' && 'Continuous vulnerability assessment required'}
                                      {form.dataClassification === 'restricted' && 'DevSecOps integrated scanning with SAST/DAST mandatory'}
                                  </small>
                              )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Certificate Lifecycle Management</label>
                              </td>
                              <td>
                                <select
                                    id="certificateLifecycle"
                                    name="certificateLifecycle"
                                    value={form.certificateLifecycle}
                                    onChange={handleInputChange}
                                    className="dc-select"
                                >
                                    <option value="">Select certificate lifecycle management...</option>
                                    <option value="manual">Manual certificate management</option>
                                    <option value="basic">Basic certificate tracking</option>
                                    <option value="automated">Automated certificate lifecycle</option>
                                    <option value="enterprise">Enterprise PKI with CA</option>
                                    <option value="cloud-managed">Cloud-managed certificates</option>
                                    <option value="zero-touch">Zero-touch certificate automation</option>
                                </select>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>PKI & Certificate management:</strong> SSL/TLS, code signing, and identity certificates
                                        <br />
                                        {form.dataClassification === 'public' && 'Manual or basic certificate tracking acceptable'}
                                        {form.dataClassification === 'internal' && 'Automated certificate lifecycle recommended'}
                                        {form.dataClassification === 'confidential' && 'Enterprise PKI with automated renewal required'}
                                        {form.dataClassification === 'restricted' && 'Zero-touch automation with enterprise CA mandatory'}
                                    </small>
                                )}
                              </td>
                            </tr>
                            <tr>
                                <td className="dc-field-cell-label">
                                  <label className="dc-form-label">Application Control Software</label>
                                </td>
                                <td>
                                  <select
                                      id="applicationControl"
                                      name="applicationControl"
                                      value={form.applicationControl}
                                      onChange={handleInputChange}
                                      className={getFieldWarning('applicationControl') ? 'dc-field-warning' : 'dc-select'}
                                  >
                                      <option value="">Select application control...</option>
                                      <option value="none">No application control</option>
                                      <option value="basic">Basic allow/deny lists</option>
                                      <option value="signature">Digital signature verification</option>
                                      <option value="behavioral">Behavioral application control</option>
                                      <option value="zero-trust">Zero Trust application security</option>
                                      <option value="container">Container & runtime protection</option>
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Application execution control:</strong> Whitelisting, code signing, runtime protection
                                          <br />
                                          {form.dataClassification === 'public' && 'Basic allow/deny lists acceptable'}
                                          {form.dataClassification === 'internal' && 'Digital signature verification recommended'}
                                          {form.dataClassification === 'confidential' && 'Behavioral application control required'}
                                          {form.dataClassification === 'restricted' && 'Zero Trust application security with runtime protection mandatory'}
                                      </small>
                                  )}
                              </td>
                          </tr>
                          <tr>
                              <td className="dc-field-cell-label">
                                  <label className="dc-form-label">Patch Management</label>
                              </td>
                              <td>
                                  <select
                                      id="patchManagement"
                                      name="patchManagement"
                                      value={form.patchManagement}
                                      onChange={handleInputChange}
                                      className={getFieldWarning('patchManagement') ? 'dc-field-warning' : 'dc-select'}
                                  >
                                      <option value="">Select patch management...</option>
                                      <option value="manual">Manual patching</option>
                                      <option value="scheduled">Scheduled patch cycles</option>
                                      <option value="automated">Automated patch deployment</option>
                                      <option value="risk-based">Risk-based patch prioritisation</option>
                                      <option value="zero-downtime">Zero-downtime patching</option>
                                      <option value="immutable">Immutable infrastructure deployment</option>
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Security update management:</strong> OS, application, and firmware patching
                                          <br />
                                          {form.dataClassification === 'public' && 'Manual or scheduled patching acceptable'}
                                          {form.dataClassification === 'internal' && 'Automated patch deployment recommended'}
                                          {form.dataClassification === 'confidential' && 'Risk-based patch prioritisation required'}
                                          {form.dataClassification === 'restricted' && 'Zero-downtime or immutable infrastructure mandatory'}
                                      </small>
                                  )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                  <label className="dc-form-label">Code Integrity & Signing</label>
                              </td>
                              <td>
                                  <select
                                      id="codeIntegrity"
                                      name="codeIntegrity"
                                      value={form.codeIntegrity}
                                      onChange={handleInputChange}
                                      className={getFieldWarning('codeIntegrity') ? 'dc-field-warning' : 'dc-select'}
                                  >
                                    <option value="">Select code integrity controls...</option>
                                      <option value="none">No code signing required</option>
                                      <option value="basic">Basic code signing</option>
                                      <option value="trusted">Trusted publisher verification</option>
                                      <option value="supply-chain">Supply chain integrity checks</option>
                                      <option value="sbom">Software Bill of Materials (SBOM)</option>
                                      <option value="attestation">Code attestation & provenance</option>
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Software integrity:</strong> Code signing, supply chain security, and provenance verification
                                          <br />
                                          {form.dataClassification === 'public' && 'Basic code signing recommended for distribution'}
                                          {form.dataClassification === 'internal' && 'Trusted publisher verification recommended'}
                                          {form.dataClassification === 'confidential' && 'Supply chain integrity checks with SBOM required'}
                                          {form.dataClassification === 'restricted' && 'Full code attestation and provenance tracking mandatory'}
                                      </small>
                                  )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                  <label className="dc-form-label">OS Hardening & Configuration</label>
                              </td>
                              <td>
                                  <select
                                      id="osHardening"
                                      name="osHardening"
                                      value={form.osHardening}
                                      onChange={handleInputChange}
                                      className={getFieldWarning('osHardening') ? 'dc-field-warning' : 'dc-select'}
                                  >
                                      <option value="">Select OS hardening level...</option>
                                      <option value="none">No OS hardening</option>
                                      <option value="basic">Basic security configuration</option>
                                      <option value="cis">CIS Benchmarks compliance</option>
                                      <option value="stig">DISA STIG compliance</option>
                                      <option value="custom">Custom hardening profile</option>
                                      <option value="immutable">Immutable OS configuration</option>
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Operating system security:</strong> Hardening, configuration management, and compliance
                                          <br />
                                          {form.dataClassification === 'public' && 'Basic security configuration recommended'}
                                          {form.dataClassification === 'internal' && 'CIS Benchmarks compliance recommended'}
                                          {form.dataClassification === 'confidential' && 'DISA STIG compliance or equivalent required'}
                                          {form.dataClassification === 'restricted' && 'Immutable OS with custom hardening profile mandatory'}
                                      </small>
                                  )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                  <label className="dc-form-label">OS Encryption (VM-Aware)</label>
                              </td>
                              <td>
                                  <select
                                      id="osEncryption"
                                      name="osEncryption"
                                      value={form.osEncryption}
                                      onChange={handleInputChange}
                                      className={getFieldWarning('osEncryption') ? 'dc-field-warning' : 'dc-select'}
                                  >
                                      <option value="">Select OS encryption implementation...</option>
                                      <option value="none">No OS encryption</option>
                                      <option value="vm-guest-basic">VM Guest: Basic encryption (BitLocker/FileVault in VM)</option>
                                      <option value="vm-guest-full">VM Guest: Full disk encryption (dm-crypt/LUKS in VM)</option>
                                      <option value="vm-guest-vtpm">VM Guest: vTPM-backed encryption (Azure/AWS/GCP vTPM)</option>
                                      <option value="vm-host">VM Host: Hypervisor-level encryption (vSAN/Hyper-V host)</option>
                                      <option value="physical-host">Physical Host: Bare metal encryption with TPM</option>
                                      <option value="cloud-vm">Cloud VM: Provider-managed VM encryption</option>
                                      <option value="cloud-vm-vtpm">Cloud VM: Provider + vTPM encryption (Azure/AWS vTPM)</option>
                                      <option value="cloud-host">Cloud Host: Provider-managed host encryption</option>
                                      <option value="memory-encryption">Memory encryption (SME/TME/TXT)</option>
                                      <option value="layered-encryption">Layered: VM guest + host encryption</option>
                                      <option value="layered-vtpm">Layered: vTPM guest + host encryption</option>
                                      <option value="comprehensive">Comprehensive: All layers + memory + cache</option>
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Virtualisation-aware encryption:</strong> VM guest OS, vTPM-backed, VM host/hypervisor, and physical host encryption layers
                                          <br />
                                          {form.dataClassification === 'public' && 'VM guest encryption acceptable; vTPM recommended for cloud environments'}
                                          {form.dataClassification === 'internal' && 'vTPM-backed or VM host encryption recommended for better security'}
                                          {form.dataClassification === 'confidential' && 'vTPM + layered encryption or physical TPM with host encryption required'}
                                          {form.dataClassification === 'restricted' && 'Comprehensive layered encryption with hardware/virtual TPM mandatory'}
                                      </small>
                                  )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Mobile Device Management (MDM)</label>
                              </td>
                              <td>
                                <select
                                    id="mdmControls"
                                    name="mdmControls"
                                    value={form.mdmControls}
                                    onChange={handleInputChange}
                                    className={getFieldWarning('mdmControls') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select MDM implementation...</option>
                                      <option value="none">No mobile device management</option>
                                      <option value="basic">Basic device registration</option>
                                      <option value="standard">Standard MDM (device policies)</option>
                                      <option value="comprehensive">Comprehensive MDM suite</option>
                                      <option value="unified">Unified Endpoint Management (UEM)</option>
                                      <option value="zero-trust">Zero Trust mobile security</option>
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Mobile device control:</strong> Device enrollment, policy enforcement, remote wipe capabilities
                                          <br />
                                          {form.dataClassification === 'public' && 'Basic device registration acceptable for low-risk access'}
                                          {form.dataClassification === 'internal' && 'Standard MDM with device policies recommended'}
                                          {form.dataClassification === 'confidential' && 'Comprehensive MDM suite with encryption required'}
                                          {form.dataClassification === 'restricted' && 'UEM or Zero Trust mobile security mandatory'}
                                      </small>
                                  )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Mobile Application Management (MAM)</label>
                              </td>
                              <td>
                                <select
                                    id="mamControls"
                                    name="mamControls"
                                    value={form.mamControls}
                                    onChange={handleInputChange}
                                    className={getFieldWarning('mamControls') ? 'dc-field-warning' : 'dc-select'}
                                >
                                      <option value="">Select MAM protection...</option>
                                      <option value="none">No application management</option>
                                      <option value="basic">Basic app deployment</option>
                                      <option value="containerised">App containerisation</option>
                                      <option value="comprehensive">Comprehensive MAM suite</option>
                                      <option value="app-wrapping">App wrapping with DLP</option>
                                      <option value="micro-vpn">Micro-VPN per-app tunneling</option>
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Application-level control:</strong> App containerisation, data protection, per-app VPN
                                          <br />
                                          {form.dataClassification === 'public' && 'Basic app deployment acceptable'}
                                          {form.dataClassification === 'internal' && 'App containerisation recommended'}
                                          {form.dataClassification === 'confidential' && 'Comprehensive MAM with app wrapping required'}
                                          {form.dataClassification === 'restricted' && 'Micro-VPN per-app tunneling mandatory'}
                                      </small>
                                  )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">BYOD (Bring Your Own Device) Policy</label>
                              </td>
                              <td>
                                <select
                                    id="byodPolicy"
                                    name="byodPolicy"
                                    value={form.byodPolicy}
                                    onChange={handleInputChange}
                                    className={getFieldWarning('byodPolicy') ? 'dc-field-warning' : 'dc-select'}
                                >
                                      <option value="">Select BYOD policy...</option>
                                      <option value="prohibited">BYOD prohibited</option>
                                      <option value="limited">Limited BYOD (email only)</option>
                                      <option value="standard">Standard BYOD with MDM</option>
                                      <option value="managed">Managed BYOD with MAM</option>
                                      <option value="container-based">Container-based BYOD</option>
                                      <option value="zero-trust-byod">Zero Trust BYOD</option>
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Personal device access:</strong> Policy for employee-owned devices accessing corporate data
                                          <br />
                                          {form.dataClassification === 'public' && 'Limited BYOD with basic controls acceptable'}
                                          {form.dataClassification === 'internal' && 'Standard BYOD with MDM enrollment recommended'}
                                          {form.dataClassification === 'confidential' && 'Managed BYOD with MAM containerisation required'}
                                          {form.dataClassification === 'restricted' && 'BYOD prohibited or Zero Trust BYOD with strict controls only'}
                                      </small>
                                  )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                  <label className="dc-form-label">Mobile Data Protection</label>
                              </td>
                              <td>
                                <select
                                    id="mobileDataProtection"
                                    name="mobileDataProtection"
                                    value={form.mobileDataProtection}
                                    onChange={handleInputChange}
                                    className={getFieldWarning('mobileDataProtection') ? 'dc-field-warning' : 'dc-select'}
                                >
                                    <option value="">Select mobile data protection...</option>
                                    <option value="basic">Basic PIN/password protection</option>
                                    <option value="encryption">Device encryption required</option>
                                    <option value="app-level">App-level encryption</option>
                                    <option value="comprehensive">Comprehensive mobile DLP</option>
                                    <option value="air-gapped">Air-gapped mobile access</option>
                                    <option value="virtual-desktop">Virtual desktop interface only</option>
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Mobile data safeguards:</strong> Encryption, DLP, and access controls for mobile platforms
                                          <br />
                                          {form.dataClassification === 'public' && 'Basic PIN protection acceptable'}
                                          {form.dataClassification === 'internal' && 'Device encryption recommended'}
                                          {form.dataClassification === 'confidential' && 'App-level encryption and mobile DLP required'}
                                          {form.dataClassification === 'restricted' && 'Air-gapped access or virtual desktop interface only'}
                                      </small>
                                  )}
                              </td>
                            </tr>
                            </tbody>
                            </table>
                      </fieldset>
                    </td>
                  </tr>
                  
                  {/* Remote Access Infrastructure */}
                  <tr>
                    <td colSpan="2">
                      <fieldset className="dc-fieldset dc-fieldset-remote-access-infrastructure">
                        <legend className="dc-legend dc-legend-remote-access-infrastructure">🖥️ Remote Access Infrastructure</legend>
                        <table className="dc-field-table">
                          <tbody>
                            <tr>
                              <td className="dc-field-cell-label">
                                  <label className="dc-form-label">Virtual Desktop Infrastructure (VDI)</label>
                              </td>
                              <td>
                                  <select
                                      id="vdiSolution"
                                      name="vdiSolution"
                                      value={form.vdiSolution}
                                      onChange={handleInputChange}
                                      className={getFieldWarning('vdiSolution') ? 'dc-field-warning' : 'dc-select'}
                                  >
                                    <option value="">Select VDI implementation...</option>
                                    <option value="none">No VDI required</option>
                                    <option value="basic">Basic VDI (shared desktops)</option>
                                    <option value="persistent">Persistent VDI (dedicated desktops)</option>
                                    <option value="non-persistent">Non-persistent VDI (stateless)</option>
                                    <option value="avd">Azure Virtual Desktop (AVD)</option>
                                    <option value="citrix">Citrix Virtual Apps & Desktops</option>
                                    <option value="vmware-horizon">VMware Horizon</option>
                                    <option value="aws-workspaces">AWS WorkSpaces</option>
                                    <option value="google-cloud">Google Cloud Virtual Desktops</option>
                                    <option value="zero-trust-vdi">Zero Trust VDI with isolation</option>
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Virtual desktop delivery:</strong> Centralised desktop computing with data isolation
                                          <br />
                                          {form.dataClassification === 'public' && 'Basic VDI acceptable for cost-effective remote access'}
                                          {form.dataClassification === 'internal' && 'Persistent or non-persistent VDI recommended'}
                                          {form.dataClassification === 'confidential' && 'Enterprise VDI (Citrix/VMware/AVD) with encryption required'}
                                          {form.dataClassification === 'restricted' && 'Zero Trust VDI with complete isolation mandatory'}
                                      </small>
                                  )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Jump Hosts / Bastion Hosts</label>
                              </td>
                              <td>
                                <select
                                  id="jumpHosts"
                                  name="jumpHosts"
                                  value={form.jumpHosts}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('jumpHosts') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select jump host configuration...</option>
                                  <option value="none">No jump hosts required</option>
                                  <option value="basic">Basic jump host (SSH/RDP relay)</option>
                                  <option value="hardened">Hardened jump hosts with logging</option>
                                  <option value="privileged">Privileged Access Workstations (PAW)</option>
                                  <option value="zero-trust">Zero Trust jump hosts</option>
                                  <option value="cloud-native">Cloud-native bastion services</option>
                                  <option value="air-gapped">Air-gapped jump hosts</option>
                                </select>
                                {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Secure access gateway:</strong> Controlled entry point for administrative and privileged access
                                          <br />
                                          {form.dataClassification === 'public' && 'Basic jump host acceptable for simple environments'}
                                          {form.dataClassification === 'internal' && 'Hardened jump hosts with comprehensive logging recommended'}
                                          {form.dataClassification === 'confidential' && 'Privileged Access Workstations (PAW) required'}
                                          {form.dataClassification === 'restricted' && 'Air-gapped or Zero Trust jump hosts mandatory'}
                                      </small>
                                  )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                  <label className="dc-form-label">Remote Access Policy</label>
                              </td>
                              <td>
                                  <select
                                      id="remoteAccessPolicy"
                                      name="remoteAccessPolicy"
                                      value={form.remoteAccessPolicy}
                                      onChange={handleInputChange}
                                      className={getFieldWarning('remoteAccessPolicy') ? 'dc-field-warning' : 'dc-select'}
                                  >
                                      <option value="">Select remote access policy...</option>
                                      <option value="unrestricted">Unrestricted remote access</option>
                                      <option value="vpn-required">VPN required for remote access</option>
                                      <option value="managed-devices">Managed devices only</option>
                                      <option value="vdi-only">VDI/virtual desktop only</option>
                                      <option value="jump-host-only">Jump host access only</option>
                                      <option value="zero-trust">Zero Trust remote access</option>
                                      <option value="air-gapped-only">Air-gapped environment only</option>
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Remote connectivity rules:</strong> Policy governing how users can access systems remotely
                                          <br />
                                          {form.dataClassification === 'public' && 'VPN or managed device access acceptable'}
                                          {form.dataClassification === 'internal' && 'Managed devices or VDI recommended'}
                                          {form.dataClassification === 'confidential' && 'VDI or jump host access required'}
                                          {form.dataClassification === 'restricted' && 'Air-gapped environment or Zero Trust access only'}
                                      </small>
                                  )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Session Isolation</label>
                              </td>
                              <td>
                                <select
                                  id="sessionIsolation"
                                  name="sessionIsolation"
                                  value={form.sessionIsolation}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('sessionIsolation') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select session isolation level...</option>
                                  <option value="none">No session isolation</option>
                                  <option value="basic">Basic user session separation</option>
                                  <option value="process">Process-level isolation</option>
                                  <option value="container">Container-based isolation</option>
                                  <option value="vm">Virtual machine isolation</option>
                                  <option value="micro-vm">Micro-VM isolation</option>
                                  <option value="air-gapped">Complete air-gapped isolation</option>
                                </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Session security boundaries:</strong> Isolation between user sessions and system components
                                          <br />
                                          {form.dataClassification === 'public' && 'Basic user session separation acceptable'}
                                          {form.dataClassification === 'internal' && 'Process or container-based isolation recommended'}
                                          {form.dataClassification === 'confidential' && 'Virtual machine isolation required'}
                                          {form.dataClassification === 'restricted' && 'Micro-VM or air-gapped isolation mandatory'}
                                      </small>
                                  )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Remote Access Monitoring</label>
                              </td>
                              <td>
                              <select
                                  id="remoteAccessMonitoring"
                                  name="remoteAccessMonitoring"
                                  value={form.remoteAccessMonitoring}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('remoteAccessMonitoring') ? 'dc-field-warning' : 'dc-select'}
                              >
                                    <option value="">Select monitoring level...</option>
                                    <option value="basic">Basic connection logging</option>
                                    <option value="standard">Session recording (metadata)</option>
                                    <option value="comprehensive">Full session recording</option>
                                    <option value="real-time">Real-time monitoring & alerts</option>
                                    <option value="behavioral">Behavioral analytics</option>
                                    <option value="ai-powered">AI-powered anomaly detection</option>
                                  </select>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Remote session oversight:</strong> Monitoring and recording of remote access activities
                                          <br />
                                          {form.dataClassification === 'public' && 'Basic connection logging acceptable'}
                                          {form.dataClassification === 'internal' && 'Session recording (metadata) recommended'}
                                          {form.dataClassification === 'confidential' && 'Full session recording with real-time monitoring required'}
                                          {form.dataClassification === 'restricted' && 'AI-powered anomaly detection with behavioral analytics mandatory'}
                                      </small>
                                  )}
                                </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Privileged Access Management (PAM)</label>
                              </td>
                              <td>
                                <select
                                  id="privilegedAccessManagement"
                                  name="privilegedAccessManagement"
                                  value={form.privilegedAccessManagement}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('privilegedAccessManagement') ? 'dc-field-warning' : 'dc-select'}
                                >
                                    <option value="">Select PAM implementation...</option>
                                    <option value="none">No PAM solution</option>
                                    <option value="basic">Basic password vault</option>
                                    <option value="standard">Standard PAM with session management</option>
                                    <option value="advanced">Advanced PAM with analytics</option>
                                    <option value="enterprise">Enterprise PAM suite</option>
                                    <option value="zero-trust-pam">Zero Trust PAM platform</option>
                                </select>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Privileged credential security:</strong> Management of administrative and service accounts
                                        <br />
                                        {form.dataClassification === 'public' && 'Basic password vault acceptable for admin accounts'}
                                        {form.dataClassification === 'internal' && 'Standard PAM with session management recommended'}
                                        {form.dataClassification === 'confidential' && 'Advanced PAM with analytics and monitoring required'}
                                        {form.dataClassification === 'restricted' && 'Zero Trust PAM platform with complete oversight mandatory'}
                                    </small>
                                  )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </fieldset>
                    </td>
                  </tr>

                  {/* Monitoring and Compliance */}
                  <tr>
                    <td colSpan="2">
                      <fieldset className="dc-fieldset dc-fieldset-monitoring-compliance">
                        <legend className="dc-legend dc-legend-monitoring-compliance">📊 Monitoring and Compliance</legend>
                        <table className="dc-field-table">
                          <tbody>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Threat Monitoring (SecOps - C.I.A.):</label>
                              </td>
                              <td>
                                <select
                                  id="threatMonitoring"
                                  name="threatMonitoring"
                                  value={form.threatMonitoring}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('threatMonitoring') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select threat monitoring level...</option>
                                  {getFilteredOptions('threatMonitoring', [
                                      { value: 'basic-logging', label: 'Basic security logging' },
                                      { value: 'siem-integration', label: 'SIEM integration' },
                                      { value: 'threat-detection', label: 'Advanced threat detection' },
                                      { value: 'behavioral-analytics', label: 'User & entity behavioral analytics (UEBA)' },
                                      { value: 'ai-threat-hunting', label: 'AI-powered threat hunting' },
                                      { value: 'zero-trust-monitoring', label: 'Zero-trust continuous verification' },
                                      { value: 'deception-technology', label: 'Deception technology & honeypots' },
                                      { value: 'threat-intelligence', label: 'Threat intelligence integration' }
                                  ]).map(option => (
                                      <option key={option.value} value={option.value}>
                                          {option.label}
                                          {form.dataClassification === 'restricted' && ['basic-logging', 'siem-integration'].includes(option.value) ? ' ⚠️' : ''}
                                          {form.dataClassification === 'confidential' && option.value === 'basic-logging' ? ' ⚠️' : ''}
                                      </option>
                                  ))}
                                </select>
                                <small className="dc-field-hint">
                                  <strong>Security Operations (SecOps) - Confidentiality & Integrity Protection:</strong><br/>
                                  Monitors for unauthorised access, data breaches, malicious activities, insider threats, and data tampering attempts.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommended for {form.dataClassification.toUpperCase()}:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic security logging sufficient for public data'}
                                        {form.dataClassification === 'internal' && 'SIEM integration recommended for internal data'}
                                        {form.dataClassification === 'confidential' && 'Advanced threat detection + UEBA required for confidential data'}
                                        {form.dataClassification === 'restricted' && 'AI-powered threat hunting + zero-trust monitoring required for restricted data'}
                                    </small>
                                )}
                                <FieldWarning fieldName="threatMonitoring" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Availability Monitoring (DevOps - A.):</label>
                              </td>
                              <td>
                                <select
                                  id="availabilityMonitoring"
                                  name="availabilityMonitoring"
                                  value={form.availabilityMonitoring}
                                  onChange={handleInputChange}
                                  className="dc-select"
                                >
                                  <option value="">Select availability monitoring level...</option>
                                  <option value="basic-uptime">Basic uptime monitoring</option>
                                  <option value="infrastructure-monitoring">Infrastructure monitoring (CPU, memory, disk)</option>
                                  <option value="application-performance">Application Performance Monitoring (APM)</option>
                                  <option value="synthetic-monitoring">Synthetic transaction monitoring</option>
                                  <option value="real-user-monitoring">Real User Monitoring (RUM)</option>
                                  <option value="distributed-tracing">Distributed tracing & observability</option>
                                  <option value="predictive-analytics">Predictive failure analytics</option>
                                  <option value="chaos-engineering">Chaos engineering & resilience testing</option>
                                  <option value="comprehensive-observability">Comprehensive observability platform</option>
                                </select>
                                <small className="dc-field-hint">
                                  <strong>Development Operations (DevOps) - Availability & Performance:</strong><br/>
                                  Monitors system health, performance metrics, service availability, response times, and infrastructure capacity.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Business Impact Considerations:</strong><br/>
                                        {form.dataClassification === 'public' && 'Standard availability monitoring - minimal business impact if unavailable'}
                                        {form.dataClassification === 'internal' && 'Enhanced monitoring recommended - moderate business impact during outages'}
                                        {form.dataClassification === 'confidential' && 'Comprehensive monitoring required - significant business impact and customer-facing services'}
                                        {form.dataClassification === 'restricted' && 'Predictive analytics + chaos engineering - critical business operations cannot afford downtime'}
                                    </small>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Audit Logging</label>
                              </td>
                              <td>
                                <select
                                  id="auditLogging"
                                  name="auditLogging"
                                  value={form.auditLogging}
                                  onChange={handleInputChange}
                                  className="dc-select"
                                >
                                  <option value="">Select audit level...</option>
                                  <option value="minimal">Minimal logging</option>
                                  <option value="standard">Standard audit trail</option>
                                  <option value="detailed">Detailed logging</option>
                                  <option value="comprehensive">Comprehensive audit trail</option>
                                  <option value="forensic">Forensic-level logging</option>
                              </select>
                              {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      {form.dataClassification === 'public' && 'Minimal logging acceptable'}
                                      {form.dataClassification === 'internal' && 'Standard audit trail recommended'}
                                      {form.dataClassification === 'confidential' && 'Detailed logging recommended'}
                                      {form.dataClassification === 'restricted' && 'Comprehensive or forensic logging required'}
                                  </small>
                              )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </fieldset>
                    </td>
                  </tr>

                  {/* Data Lifecycle Management */}
                  <tr>
                    <td colSpan="2">
                      <fieldset className="dc-fieldset dc-fieldset-data-lifecycle-management">
                        <legend className="dc-legend dc-legend-data-lifecycle-management">🔄 Data Lifecycle Management</legend>
                        <table className="dc-field-table">
                          <tbody>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Backup Strategy</label>
                              </td>
                              <td>
                                <select
                                  id="backupStrategy"
                                  name="backupStrategy"
                                  value={form.backupStrategy}
                              onChange={handleInputChange}
                              className={getFieldWarning('backupStrategy') ? 'dc-field-warning' : 'dc-select'}
                            >
                              <option value="">Select backup strategy...</option>
                              {getFilteredOptions('backupStrategy', [
                                  { value: 'none', label: 'No backup required' },
                                  { value: 'basic', label: 'Basic backups' },
                                  { value: 'encrypted', label: 'Encrypted backups' },
                                  { value: 'geo-redundant', label: 'Geo-redundant backups' },
                                  { value: 'immutable', label: 'Immutable backups' },
                                  { value: 'air-gapped', label: 'Air-gapped backups' }
                              ]).map(option => (
                                  <option key={option.value} value={option.value}>
                                      {option.label}
                                      {form.dataClassification === 'restricted' && ['none', 'basic'].includes(option.value) ? ' ⚠️' : ''}
                                  </option>
                              ))}
                          </select>
                          {form.dataClassification && (
                              <small className="dc-field-hint">
                                  {form.dataClassification === 'public' && 'Basic backups acceptable'}
                                  {form.dataClassification === 'internal' && 'Encrypted backups recommended'}
                                  {form.dataClassification === 'confidential' && 'Geo-redundant encrypted backups recommended'}
                                  {form.dataClassification === 'restricted' && 'Air-gapped or immutable backups required'}
                              </small>
                          )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Retention Period</label>
                              </td>
                              <td>
                                <select
                                  id="dataRetentionPolicy"
                                  name="dataRetentionPolicy"
                                  value={form.dataRetentionPolicy}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataRetentionPolicy') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select data retention period...</option>
                                <option value="30-days">30 days</option>
                                <option value="90-days">90 days</option>
                                <option value="1-year">1 year</option>
                                <option value="3-years">3 years</option>
                                <option value="5-years">5 years</option>
                                <option value="7-years">7 years</option>
                                <option value="10-years">10 years</option>
                                <option value="indefinite">Indefinite (legal hold)</option>
                                <option value="custom">Custom period</option>
                            </select>
                            <small className="dc-field-hint">
                                How long the data must be kept for business/legal purposes. 
                                When data needs to be retained for extended periods, also consider the technology that will need to be maintained to access the data over the same period.
                            </small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Backup Retention Period</label>
                              </td>
                              <td>
                                <select
                                  id="backupRetentionPeriod"
                                  name="backupRetentionPeriod"
                                  value={form.backupRetentionPeriod}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('backupRetentionPeriod') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select backup retention...</option>
                                  <option value="7-days">7 days</option>
                                  <option value="30-days">30 days</option>
                                  <option value="90-days">90 days</option>
                                  <option value="6-months">6 months</option>
                                  <option value="1-year">1 year</option>
                                  <option value="2-years">2 years</option>
                                  <option value="3-years">3 years</option>
                                  <option value="match-data">Match data retention</option>
                              </select>
                              <small className="dc-field-hint">
                                  How long backup copies are maintained for recovery purposes. Also consider what else is required to recover the data, such as the original application or system for longer retention periods.
                              </small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Archive Policy</label></td>
                              <td>
                                <select
                                  id="archivePolicy"
                                  name="archivePolicy"
                                  value={form.archivePolicy}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('archivePolicy') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select archive policy...</option>
                                  <option value="none">No archiving required</option>
                                  <option value="cold-storage">Cold storage (30+ days)</option>
                                  <option value="glacier">Glacier/deep archive (90+ days)</option>
                                  <option value="tape-archive">Tape archive (1+ year)</option>
                                  <option value="legal-hold">Legal hold archive</option>
                                  <option value="regulatory">Regulatory compliance archive</option>
                                  <option value="custom">Custom archive policy</option>
                              </select>
                              <small className="dc-field-hint">
                                  Long-term storage policy for infrequently accessed data. Also consider how archived data is discoverable and retrievable over its lifetime.
                                  {form.dataClassification && (
                                      <>
                                          <br />
                                          <strong>Guidance for {form.dataClassification.toUpperCase()}:</strong>{' '}
                                          {form.dataClassification === 'public' && 'Standard cold storage acceptable for cost optimisation'}
                                          {form.dataClassification === 'internal' && 'Cold storage recommended after 30 days of inactivity'}
                                          {form.dataClassification === 'confidential' && 'Encrypted archive required, consider regulatory requirements'}
                                          {form.dataClassification === 'restricted' && 'Legal hold or regulatory compliance archive mandatory'}
                                      </>
                                  )}
                              </small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Disposal Method</label>
                              </td>
                              <td>
                                <select
                                  id="dataDisposalMethod"
                                  name="dataDisposalMethod"
                                  value={form.dataDisposalMethod}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataDisposalMethod') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select disposal method...</option>
                              {getFilteredOptions('disposalMethod', [
                                  { value: 'standard', label: 'Standard deletion' },
                                  { value: 'secure-wipe', label: 'Secure wipe' },
                                  { value: 'cryptographic', label: 'Cryptographic erasure' },
                                  { value: 'physical', label: 'Physical destruction' },
                                  { value: 'witnessed', label: 'Witnessed destruction' },
                                  { value: 'certified', label: 'Certified destruction' }
                              ]).map(option => (
                                  <option key={option.value} value={option.value}>
                                      {option.label}
                                      {form.dataClassification === 'restricted' && ['standard', 'secure-wipe'].includes(option.value) ? ' ⚠️' : ''}
                                  </option>
                              ))}
                          </select>
                          {form.dataClassification && (
                              <small className="dc-field-hint">
                                  {form.dataClassification === 'public' && 'Standard deletion acceptable'}
                                  {form.dataClassification === 'internal' && 'Secure wipe recommended'}
                                  {form.dataClassification === 'confidential' && 'Cryptographic erasure recommended'}
                                  {form.dataClassification === 'restricted' && 'Physical or witnessed destruction required'}
                              </small>
                          )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </fieldset>
                    </td>
                  </tr>

                  {/* Compliance & Governance */}
                  <tr>
                    <td colSpan="2">
                      <fieldset className="dc-fieldset dc-fieldset-compliance-governance">
                        <legend className="dc-legend dc-legend-compliance-governance">⚖️ Compliance & Governance</legend>
                        <table className="dc-field-table">
                          <tbody>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Compliance Requirements</label>
                              </td>
                              <td>
                                <textarea
                                  id="complianceRequirements"
                                  name="complianceRequirements"
                                  value={form.complianceRequirements}
                                  onChange={handleInputChange}
                                  placeholder="List applicable regulations (APP, E8, GDPR, HIPAA, PCI DSS, etc.) and specific requirements"
                                  rows="3"
                                  className="dc-textarea"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Business Impact Level
                                  <small className="dc-field-hint">
                                    Reference your Business Impact Assessment (BIA) to determine impact level. If not available, use the following guidelines:
                                  </small>
                                </label>
                              </td>
                              <td>
                                <select
                                  id="businessImpactLevel"
                                  name="businessImpactLevel"
                                  value={form.businessImpactLevel}
                                  onChange={handleInputChange}
                                  className="dc-select"
                                >
                                    <option value="">Select business impact...</option>
                                    <option value="low">Low - Minimal business disruption</option>
                                    <option value="medium">Medium - Moderate business impact</option>
                                    <option value="high">High - Significant business impact</option>
                                    <option value="critical">Critical - Business critical systems</option>
                                    <option value="catastrophic">Catastrophic - Organisation-wide impact</option>
                                </select>
                          {form.dataClassification && (
                            <small className="dc-field-hint">
                                  {form.dataClassification === 'public' && 'Typically low to medium impact acceptable'}
                                  {form.dataClassification === 'internal' && 'Medium impact level recommended'}
                                  {form.dataClassification === 'confidential' && 'High impact level recommended'}
                                  {form.dataClassification === 'restricted' && 'Critical or catastrophic impact level required'}   
                              </small>
                          )}
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Availability SLO</label>
                              </td>
                              <td>
                                <select
                                  id="availabilitySLO"
                                  name="availabilitySLO"
                                  value={form.availabilitySLO}
                                  onChange={handleInputChange}
                                  className="dc-select"
                              >
                                  <option value="">Select availability target...</option>
                                  <option value="95">95% (36.5 hours downtime/year)</option>
                                  <option value="99">99% (3.65 days downtime/year)</option>
                                  <option value="99.5">99.5% (1.83 days downtime/year)</option>
                                  <option value="99.9">99.9% (8.77 hours downtime/year)</option>
                                  <option value="99.95">99.95% (4.38 hours downtime/year)</option>
                                  <option value="99.99">99.99% (52.6 minutes downtime/year)</option>
                                  <option value="99.999">99.999% (5.26 minutes downtime/year)</option>
                              </select>
                          <small className="dc-field-hint">
                              Service Level Objective for system availability (N.B. every additional "9" doubles the cost and complexity. &gt; 99.5% exceeds typical cost/benefit ratio of most organisations)
                          </small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Recovery Time Objective (RTO)</label>
                              </td>
                              <td>
                                <select
                                  id="rto"
                                  name="rto"
                                  value={form.rto}
                                  onChange={handleInputChange}
                                  className="dc-select"
                              >
                                  <option value="">Select RTO...</option>
                                  <option value="immediate">Immediate (&lt; 1 minute: HA)</option>
                                  <option value="5-minutes">5 minutes</option>
                                  <option value="15-minutes">15 minutes</option>
                                  <option value="1-hour">1 hour</option>
                                  <option value="4-hours">4 hours</option>
                                  <option value="8-hours">8 hours (same business day)</option>
                                  <option value="24-hours">24 hours (next business day)</option>
                                  <option value="72-hours">72 hours</option>
                                  <option value="1-week">1 week</option>
                              </select>
                          <small className="dc-field-hint">
                              Maximum acceptable time to restore service after disruption (subject to type of disruption)
                          </small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Recovery Point Objective (RPO)</label>
                              </td>
                              <td>
                                <select
                                  id="rpo"
                                  name="rpo"
                                  value={form.rpo}
                                  onChange={handleInputChange}
                                  className="dc-select"
                              >
                                  <option value="">Select RPO...</option>
                                  <option value="zero">Zero data loss (synchronous replication)</option>
                                  <option value="5-minutes">5 minutes</option>
                                  <option value="15-minutes">15 minutes</option>
                                  <option value="1-hour">1 hour</option>
                                  <option value="4-hours">4 hours</option>
                                  <option value="24-hours">24 hours (daily backup)</option>
                                  <option value="1-week">1 week</option>
                                  <option value="1-month">1 month</option>
                              </select>
                          <small className="dc-field-hint">
                              Maximum acceptable data loss in case of disruption (Achieving &lt; 15 minutes RPO exceeds typical cost/benefit ratio of most organisations)
                          </small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Incident Response</label>
                              </td>
                              <td>
                                <select
                                  id="incidentResponse"
                                  name="incidentResponse"
                                  value={form.incidentResponse}
                                  onChange={handleInputChange}
                                  className="dc-select"
                                >
                                  <option value="">Select response level...</option>
                                  <option value="standard">Standard response (days)</option>
                                  <option value="priority">Priority response (hours)</option>
                                  <option value="urgent">Urgent response (&lt; 1 hour)</option>
                                  <option value="immediate">Immediate response (&lt; 15 min)</option>
                                  <option value="emergency">Emergency response (&lt; 5 min)</option>
                                </select>
                                {form.businessImpactLevel && (
                                    <small className="dc-field-hint">
                                        <strong>Recommended for {form.businessImpactLevel.toUpperCase()} impact:</strong>{' '}
                                        {form.businessImpactLevel === 'low' && 'Standard response (24-72 hours) acceptable'}
                                        {form.businessImpactLevel === 'medium' && 'Priority response (4-8 hours) recommended'}
                                        {form.businessImpactLevel === 'high' && 'Urgent response (< 1 hour) recommended'}
                                        {form.businessImpactLevel === 'critical' && 'Immediate response (< 15 minutes) required'}
                                        {form.businessImpactLevel === 'catastrophic' && 'Emergency response (< 5 minutes) required'}
                                    </small>
                                  )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </fieldset>
                    </td>
                  </tr>

                  {/* Privacy Engineering Controls */}
                  <tr>
                    <td colSpan="2">
                      <fieldset className="dc-fieldset dc-fieldset-privacy-engineering">
                        <legend className="dc-legend dc-legend-privacy-engineering">🔒 Privacy Engineering & Rights Management (GDPR/APP/DDA Compliance)</legend>
                        <table className="dc-field-table">
                          <tbody>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Privacy by Design:</label>
                              </td>
                              <td>
                                <select
                                  id="privacyByDesign"
                                  name="privacyByDesign"
                                  value={form.privacyByDesign}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select privacy approach</option>
                                  <option value="basic-privacy">Basic Privacy Considerations</option>
                                  <option value="privacy-assessment">Privacy Impact Assessment</option>
                                  <option value="privacy-by-design">Privacy by Design Principles</option>
                                  <option value="privacy-engineering">Privacy Engineering Framework</option>
                                  <option value="differential-privacy">Differential Privacy</option>
                                  <option value="zero-knowledge">Zero-Knowledge Architectures</option>
                                </select>
                                <small className="dc-field-hint">Approach for integrating privacy into system design (GDPR Art. 25 and APP 11)</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Minimisation:</label>
                              </td>
                              <td>
                                <select
                                  id="dataMinimisation"
                                  name="dataMinimisation"
                                  value={form.dataMinimisation}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select minimisation strategy</option>
                                  <option value="basic-reduction">Basic Data Reduction</option>
                                  <option value="purpose-based">Purpose-Based Collection</option>
                                  <option value="automated-pruning">Automated Data Pruning</option>
                                  <option value="intelligent-sampling">Intelligent Data Sampling</option>
                                  <option value="synthetic-data">Synthetic Data Generation</option>
                                  <option value="federated-analytics">Federated Analytics</option>
                                </select>
                                <small className="dc-field-hint">Approach for minimising data collection (GDPR Art. 5(1)(c) and APP 3)</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">APP Data Collection Limitations:</label>
                              </td>
                              <td>
                                <select
                                  id="appDataCollectionLimitations"
                                  name="appDataCollectionLimitations"
                                  value={form.appDataCollectionLimitations}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select collection approach</option>
                                  <option value="unrestricted-collection">Unrestricted Data Collection</option>
                                  <option value="purpose-limitation">Purpose-Limited Collection</option>
                                  <option value="necessity-test">Necessity Test Applied</option>
                                  <option value="proportionality-assessment">Proportionality Assessment</option>
                                  <option value="minimal-collection">Minimal Data Collection Only</option>
                                  <option value="strict-purpose-binding">Strict Purpose Binding</option>
                                </select>
                                <small className="dc-field-hint">Approach for limiting data collection (APP 3, APP 4, and APP 6)</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">APP Solicited vs Unsolicited Data:</label>
                              </td>
                              <td>
                                <select
                                  id="appSolicitedUnsolicited"
                                  name="appSolicitedUnsolicited"
                                  value={form.appSolicitedUnsolicited}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select handling approach</option>
                                  <option value="solicited-only">Solicited Data Only</option>
                                  <option value="unsolicited-review">Unsolicited Data Review Process</option>
                                  <option value="automatic-destruction">Automatic Unsolicited Data Destruction</option>
                                  <option value="lawful-retention">Lawful Retention Assessment</option>
                                  <option value="segregated-handling">Segregated Data Handling</option>
                                  <option value="comprehensive-policy">Comprehensive Solicitation Policy</option>
                                </select>
                                <small className="dc-field-hint">Approach for managing solicited vs unsolicited data (APP 3, APP 4, APP 7, and APP 11)</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">APP Collection Notice Requirements:</label>
                              </td>
                              <td>
                                <select
                                  id="appCollectionNotice"
                                  name="appCollectionNotice"
                                  value={form.appCollectionNotice}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select notice approach</option>
                                  <option value="basic-notice">Basic Collection Notice</option>
                                  <option value="detailed-notice">Detailed Collection Notice</option>
                                  <option value="layered-notice">Layered Privacy Notice</option>
                                  <option value="just-in-time">Just-in-Time Notices</option>
                                  <option value="interactive-notice">Interactive Privacy Notices</option>
                                  <option value="comprehensive-disclosure">Comprehensive Purpose Disclosure</option>
                                </select>
                                <small className="dc-field-hint">Approach for informing users about data collection (APP 5)</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">APP Third Party Collection Controls:</label>
                              </td>
                              <td>
                                <select
                                  id="appThirdPartyCollection"
                                  name="appThirdPartyCollection"
                                  value={form.appThirdPartyCollection}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select third party approach</option>
                                  <option value="no-third-party">No Third Party Collection</option>
                                  <option value="consent-required">Explicit Consent Required</option>
                                  <option value="notification-only">Notification of Third Party Sources</option>
                                  <option value="source-verification">Third Party Source Verification</option>
                                  <option value="purpose-alignment">Purpose Alignment Verification</option>
                                  <option value="comprehensive-tracking">Comprehensive Source Tracking</option>
                                </select>
                                <small className="dc-field-hint">Approach for managing third-party data collection (GDPR Art. 28 and APP 6 and APP 7)</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Consent Management:</label>
                              </td>
                              <td>
                                <select
                                  id="consentManagement"
                                  name="consentManagement"
                                  value={form.consentManagement}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select consent approach</option>
                                  <option value="basic-consent">Basic Consent Forms</option>
                                  <option value="granular-consent">Granular Consent Management</option>
                                  <option value="dynamic-consent">Dynamic Consent Platform</option>
                                  <option value="consent-automation">Consent Lifecycle Automation</option>
                                  <option value="consent-analytics">Consent Analytics & Reporting</option>
                                  <option value="blockchain-consent">Blockchain-Based Consent</option>
                                </select>
                                <small className="dc-field-hint">Approach for managing user consent (GDPR Art. 7)</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">APP Customer Access Rights:</label>
                              </td>
                              <td>
                                <select
                                  id="appCustomerAccess"
                                  name="appCustomerAccess"
                                  value={form.appCustomerAccess}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select APP access approach</option>
                                  <option value="manual-requests">Manual Customer Requests</option>
                                  <option value="customer-portal">Customer Self-Service Portal</option>
                                  <option value="automated-access">Automated Data Access Provision</option>
                                  <option value="real-time-access">Real-Time Data Access</option>
                                  <option value="structured-export">Structured Data Export</option>
                                  <option value="api-access">API-Based Customer Access</option>
                                </select>
                                <small className="dc-field-hint">Approach for ensuring customer data access compliance (APP 12)</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">APP Data Correction Rights:</label>
                              </td>
                              <td>
                                <select
                                  id="appDataCorrection"
                                  name="appDataCorrection"
                                  value={form.appDataCorrection}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select correction approach</option>
                                  <option value="manual-correction">Manual Data Correction Process</option>
                                  <option value="customer-correction">Customer Self-Correction Portal</option>
                                  <option value="workflow-correction">Automated Correction Workflows</option>
                                  <option value="verified-correction">Verified Data Correction</option>
                                  <option value="audit-trail-correction">Correction with Audit Trail</option>
                                  <option value="real-time-correction">Real-Time Data Correction</option>
                                </select>
                                <small className="dc-field-hint">Approach for ensuring data correction compliance (AAP 10 and APP 13)</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">APP Data Retention & Disposal:</label>
                              </td>
                              <td>
                                <select
                                  id="appDataRetentionDisposal"
                                  name="appDataRetentionDisposal"
                                  value={form.appDataRetentionDisposal}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select retention approach</option>
                                  <option value="manual-review">Manual Retention Review</option>
                                  <option value="business-purpose">Business Purpose-Based Retention</option>
                                  <option value="automated-disposal">Automated Data Disposal</option>
                                  <option value="value-based-retention">Value-Based Retention Assessment</option>
                                  <option value="intelligent-lifecycle">Intelligent Data Lifecycle Management</option>
                                  <option value="compliance-driven">Compliance-Driven Retention</option>
                                </select>
                                <small className="dc-field-hint">Approach for ensuring data retention and disposal compliance (APP 11)</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Right to Erasure (GDPR Art. 17):</label>
                              </td>
                              <td>
                                <select
                                  id="rightToErasure"
                                  name="rightToErasure"
                                  value={form.rightToErasure}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select erasure capability</option>
                                  <option value="manual-deletion">Manual Data Deletion</option>
                                  <option value="automated-deletion">Automated Deletion Workflows</option>
                                  <option value="secure-erasure">Cryptographic Secure Erasure</option>
                                  <option value="cross-system-erasure">Cross-System Data Erasure</option>
                                  <option value="verified-erasure">Verified Complete Erasure</option>
                                  <option value="immutable-erasure">Immutable Erasure Records</option>
                                </select>
                                <small className="dc-field-hint">Approach for ensuring data erasure compliance (GDPR Art. 17)</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">APP Notification Requirements:</label>
                              </td>
                              <td>
                                <select
                                  id="appNotificationRequirements"
                                  name="appNotificationRequirements"
                                  value={form.appNotificationRequirements}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select notification approach</option>
                                  <option value="basic-notifications">Basic Privacy Notifications</option>
                                  <option value="proactive-notifications">Proactive Customer Notifications</option>
                                  <option value="automated-notifications">Automated Notification System</option>
                                  <option value="personalised-notifications">Personalised Privacy Communications</option>
                                  <option value="multi-channel-notifications">Multi-Channel Notification System</option>
                                  <option value="intelligent-notifications">Intelligent Notification Management</option>
                                </select>
                                <small className="dc-field-hint">Notification of the collection of personal information and cross-border disclosure (APP 5 and APP 8)</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Accessibility Compliance (DDA/WCAG):</label>
                              </td>
                              <td>
                                <select
                                  id="accessibilityCompliance"
                                  name="accessibilityCompliance"
                                  value={form.accessibilityCompliance}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select accessibility approach</option>
                                  <option value="basic-accessibility">Basic Accessibility Features</option>
                                  <option value="wcag-a">WCAG 2.2 Level A Compliance</option>
                                  <option value="wcag-aa">WCAG 2.2 Level AA Compliance</option>
                                  <option value="wcag-aaa">WCAG 2.2 Level AAA Compliance</option>
                                  <option value="adaptive-interfaces">Adaptive User Interfaces</option>
                                  <option value="universal-design">Universal Design Principles</option>
                                </select>
                                <small className="dc-field-hint">
                                      {form.dataClassification === 'public' && 'WCAG 2.2 Level AA Compliance required'}
                                      {form.dataClassification === 'internal' && 'WCAG 2.2 Level AAA Compliance recommended'}
                                      {form.dataClassification === 'confidential' && 'WCAG 2.2 Level AAA Compliance recommended'}
                                      {form.dataClassification === 'restricted' && 'WCAG 2.2 Level AAA Compliance recommended'}
                                      <br/>Approach for ensuring accessibility compliance (DDA - Disability Discrimination Act, and WCAG - Web Content Accessibility Guidelines) 
                                </small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Assistive Technology Support:</label>
                              </td>
                              <td>
                                <select
                                  id="assistiveTechnologySupport"
                                  name="assistiveTechnologySupport"
                                  value={form.assistiveTechnologySupport}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select assistive technology support</option>
                                  <option value="screen-reader">Basic Screen Reader Support</option>
                                  <option value="keyboard-navigation">Full Keyboard Navigation</option>
                                  <option value="voice-control">Voice Control Integration</option>
                                  <option value="eye-tracking">Eye Tracking Support</option>
                                  <option value="switch-control">Switch Control Interfaces</option>
                                  <option value="comprehensive-assistive">Comprehensive Assistive Tech Support</option>
                                </select>
                                <small className="dc-field-hint">Approach for ensuring assistive technology compatibility and support (DDA and WCAG)</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Inclusive Data Access Design:</label>
                              </td>
                              <td>
                                <select
                                  id="inclusiveDataAccessDesign"
                                  name="inclusiveDataAccessDesign"
                                  value={form.inclusiveDataAccessDesign}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select inclusive design approach</option>
                                  <option value="standard-interface">Standard Interface Design</option>
                                  <option value="high-contrast">High Contrast Options</option>
                                  <option value="scalable-text">Scalable Text & UI Elements</option>
                                  <option value="alternative-formats">Alternative Data Format Options</option>
                                  <option value="cognitive-accessibility">Cognitive Accessibility Features</option>
                                  <option value="multi-sensory">Multi-Sensory Data Presentation</option>
                                </select>                            
                                <small className="dc-field-hint">Approach for ensuring inclusive data access and representation (DDA and WCAG)</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Workplace Accessibility Accommodation:</label>
                              </td>
                              <td>
                                <select
                                  id="workplaceAccessibilityAccommodation"
                                  name="workplaceAccessibilityAccommodation"
                                  value={form.workplaceAccessibilityAccommodation}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select workplace accommodation</option>
                                  <option value="standard-workstation">Standard Workstation Setup</option>
                                  <option value="ergonomic-adjustments">Ergonomic Adjustments Available</option>
                                  <option value="assistive-hardware">Assistive Hardware Provision</option>
                                  <option value="flexible-interfaces">Flexible Interface Configurations</option>
                                  <option value="remote-accessibility">Remote Work Accessibility Support</option>
                                  <option value="comprehensive-accommodation">Comprehensive Accommodation Program</option>
                                </select>
                                <small className="dc-field-hint">Approach for ensuring workplace accessibility and inclusion (DDA)</small>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </fieldset>
                    </td>
                  </tr>

                  {/* Zero Trust & Cloud-Native Security */}
                  <tr>
                    <td colSpan="2">
                      <fieldset className="dc-fieldset dc-fieldset-zero-trust-cloud">
                        <legend className="dc-legend dc-legend-zero-trust-cloud">☁️ Zero Trust & Cloud-Native Data Security</legend>
                        <table className="dc-field-table">
                          <tbody>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Microsegmentation:</label>
                              </td>
                              <td>
                                <select
                                  id="dataMicrosegmentation"
                                  name="dataMicrosegmentation"
                                  value={form.dataMicrosegmentation}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select segmentation approach</option>
                                  <option value="network-segmentation">Network-Level Segmentation</option>
                                  <option value="application-segmentation">Application-Level Segmentation</option>
                                  <option value="data-layer-segmentation">Data Layer Segmentation</option>
                                  <option value="zero-trust-segmentation">Zero Trust Microsegmentation</option>
                                  <option value="dynamic-segmentation">Dynamic Policy Segmentation</option>
                                  <option value="intent-based-segmentation">Intent-Based Segmentation</option>
                                </select>
                                <small className="dc-field-hint">Approach for segmenting data access in cloud-native environments</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Container Data Protection:</label>
                              </td>
                              <td>
                                <select
                                  id="containerDataProtection"
                                  name="containerDataProtection"
                                  value={form.containerDataProtection}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select container security</option>
                                  <option value="basic-secrets">Basic Kubernetes Secrets</option>
                                  <option value="encrypted-secrets">Encrypted Secrets Management</option>
                                  <option value="vault-integration">External Vault Integration</option>
                                  <option value="runtime-protection">Runtime Data Protection</option>
                                  <option value="admission-controls">Admission Controller Policies</option>
                                  <option value="service-mesh-security">Service Mesh Data Security</option>
                                </select>
                                <small className="dc-field-hint">Approach for protecting data in containerized environments</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Multi-Cloud Data Governance:</label>
                              </td>
                              <td>
                                <select
                                  id="multiCloudDataGovernance"
                                  name="multiCloudDataGovernance"
                                  value={form.multiCloudDataGovernance}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select governance approach</option>
                                  <option value="single-cloud">Single Cloud Provider</option>
                                  <option value="multi-cloud-basic">Basic Multi-Cloud Setup</option>
                                  <option value="unified-governance">Unified Data Governance</option>
                                  <option value="cloud-agnostic">Cloud-Agnostic Policies</option>
                                  <option value="federated-governance">Federated Data Governance</option>
                                  <option value="sovereign-cloud">Data Sovereign Cloud</option>
                                </select>
                                <small className="dc-field-hint">Approach for managing multi-cloud data governance</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Infrastructure as Code Security:</label>
                              </td>
                              <td>
                                <select
                                  id="iacSecurityScanning"
                                  name="iacSecurityScanning"
                                  value={form.iacSecurityScanning}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select IaC security approach</option>
                                  <option value="manual-review">Manual Code Review</option>
                                  <option value="basic-scanning">Basic Security Scanning</option>
                                  <option value="policy-as-code">Policy as Code</option>
                                  <option value="automated-compliance">Automated Compliance Checks</option>
                                  <option value="shift-left-security">Shift-Left Security</option>
                                  <option value="continuous-compliance">Continuous Compliance</option>
                                </select>
                                <small className="dc-field-hint">Approach for ensuring continuous compliance in IaC</small>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </fieldset>
                    </td>
                  </tr>

                  {/* AI/ML & Supply Chain Security */}
                  <tr>
                    <td colSpan="2">
                      <fieldset className="dc-fieldset dc-fieldset-ai-supply-chain">
                        <legend className="dc-legend dc-legend-ai-supply-chain">🤖 AI/ML & Supply Chain Data Security</legend>
                        <table className="dc-field-table">
                          <tbody>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Training Data Protection:</label>
                              </td>
                              <td>
                                <select
                                  id="trainingDataProtection"
                                  name="trainingDataProtection"
                                  value={form.trainingDataProtection}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select training data approach</option>
                                  <option value="basic-anonymisation">Basic Data Anonymisation</option>
                                  <option value="differential-privacy">Differential Privacy</option>
                                  <option value="synthetic-training">Synthetic Training Data</option>
                                  <option value="federated-learning">Federated Learning</option>
                                  <option value="secure-multiparty">Secure Multi-Party Computation</option>
                                  <option value="homomorphic-encryption">Homomorphic Encryption</option>
                                </select>
                                <small className="dc-field-hint">Approach for protecting training data used in AI/ML models</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">AI Governance:</label>
                              </td>
                              <td>
                                <select
                                  id="aiGovernance"
                                  name="aiGovernance"
                                  value={form.aiGovernance}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select AI governance approach</option>
                                  <option value="basic-oversight">Basic AI Oversight</option>
                                  <option value="ai-ethics-board">AI Ethics Board</option>
                                  <option value="algorithmic-auditing">Algorithmic Auditing</option>
                                  <option value="responsible-ai">Responsible AI Framework</option>
                                  <option value="ai-risk-management">AI Risk Management</option>
                                  <option value="ai-explainability">AI Explainability Requirements</option>
                                </select>
                                <small className="dc-field-hint">Approach for ensuring AI model transparency and accountability</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Third-Party Data Processing:</label>
                              </td>
                              <td>
                                <select
                                  id="thirdPartyDataProcessing"
                                  name="thirdPartyDataProcessing"
                                  value={form.thirdPartyDataProcessing}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select processing approach</option>
                                  <option value="basic-agreements">Basic Data Processing Agreements</option>
                                  <option value="enhanced-dpa">Enhanced DPA with Security Requirements</option>
                                  <option value="continuous-monitoring">Continuous Vendor Monitoring</option>
                                  <option value="zero-trust-vendors">Zero Trust Vendor Access</option>
                                  <option value="vendor-assessment">Regular Vendor Security Assessments</option>
                                  <option value="data-sovereignty">Data Sovereignty Controls</option>
                                </select>
                                <small className="dc-field-hint">Approach for managing third-party data processing</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Supply Chain Data Mapping:</label>
                              </td>
                              <td>
                                <select
                                  id="supplyChainDataMapping"
                                  name="supplyChainDataMapping"
                                  value={form.supplyChainDataMapping}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select mapping approach</option>
                                  <option value="basic-inventory">Basic Supplier Inventory</option>
                                  <option value="data-flow-mapping">Data Flow Mapping</option>
                                  <option value="risk-based-mapping">Risk-Based Data Mapping</option>
                                  <option value="automated-discovery">Automated Data Flow Discovery</option>
                                  <option value="continuous-mapping">Continuous Supply Chain Mapping</option>
                                  <option value="blockchain-provenance">Blockchain Data Provenance</option>
                                </select>
                                <small className="dc-field-hint">Approach for ensuring supply chain integrity and non-repudiation</small>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </fieldset>
                    </td>
                  </tr>

                  {/* Advanced Threat & Quantum Security */}
                  <tr>
                    <td colSpan="2">
                      <fieldset className="dc-fieldset dc-fieldset-advanced-quantum">
                        <legend className="dc-legend dc-legend-advanced-quantum">⚡ Advanced Threat Protection & Quantum-Ready Security</legend>
                        <table className="dc-field-table">
                          <tbody>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Insider Threat Detection:</label>
                              </td>
                              <td>
                                <select
                                  id="insiderThreatDetection"
                                  name="insiderThreatDetection"
                                  value={form.insiderThreatDetection}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select detection approach</option>
                                  <option value="basic-logging">Basic Activity Logging</option>
                                  <option value="behavioral-analytics">User Entity and Behavioral Analytics (UEBA)</option>
                                  <option value="ml-anomaly">ML-Based Anomaly Detection</option>
                                  <option value="real-time-monitoring">Real-Time Insider Monitoring</option>
                                  <option value="psychological-indicators">Psychological Risk Indicators</option>
                                  <option value="comprehensive-program">Comprehensive Insider Program</option>
                                </select>
                                <small className="dc-field-hint">Model for governing data access and usage</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">UEBA for Data Operations:</label>
                              </td>
                              <td>
                                <select
                                  id="uebaDataOperations"
                                  name="uebaDataOperations"
                                  value={form.uebaDataOperations}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select UEBA approach</option>
                                  <option value="basic-monitoring">Basic User Monitoring</option>
                                  <option value="statistical-analysis">Statistical Baseline Analysis</option>
                                  <option value="ml-behavioral">ML Behavioral Modeling</option>
                                  <option value="advanced-ueba">Advanced UEBA Platform</option>
                                  <option value="ai-driven-detection">AI-Driven Anomaly Detection</option>
                                  <option value="integrated-response">Integrated Response Automation</option>
                                </select>
                                <small className="dc-field-hint">User Entity and Behavioral Analytics (UEBA) approach for governing data access and usage</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Post-Quantum Cryptography:</label>
                              </td>
                              <td>
                                <select
                                  id="postQuantumCryptography"
                                  name="postQuantumCryptography"
                                  value={form.postQuantumCryptography}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select quantum readiness</option>
                                  <option value="current-algorithms">Current Classical Algorithms</option>
                                  <option value="quantum-assessment">Quantum Risk Assessment</option>
                                  <option value="hybrid-algorithms">Hybrid Classical-Quantum Algorithms</option>
                                  <option value="nist-approved">NIST-Approved PQC Algorithms</option>
                                  <option value="crypto-agility">Crypto-Agility Framework</option>
                                  <option value="quantum-safe">Full Quantum-Safe Implementation</option>
                                </select>
                                <small className="dc-field-hint">Readiness for post-quantum cryptographic standards</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Crypto-Agility Framework:</label>
                              </td>
                              <td>
                                <select
                                  id="cryptoAgility"
                                  name="cryptoAgility"
                                  value={form.cryptoAgility}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select agility approach</option>
                                  <option value="static-crypto">Static Cryptographic Implementation</option>
                                  <option value="configurable-crypto">Configurable Crypto Parameters</option>
                                  <option value="modular-crypto">Modular Cryptographic Architecture</option>
                                  <option value="api-driven">API-Driven Crypto Selection</option>
                                  <option value="automated-migration">Automated Algorithm Migration</option>
                                  <option value="dynamic-crypto">Dynamic Cryptographic Adaptation</option>
                                </select>
                                <small className="dc-field-hint">Approach for adapting cryptographic methods to changing threats</small>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </fieldset>
                    </td>
                  </tr>

                  {/* Data Democratisation vs Control */}
                  <tr>
                    <td colSpan="2">
                      <fieldset className="dc-fieldset dc-fieldset-data-democratisation">
                        <legend className="dc-legend dc-legend-data-democratisation">⚖️ Data Democratisation vs Controlled Access</legend>
                        <table className="dc-field-table">
                          <tbody>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Access Governance:</label>
                              </td>
                              <td>
                                <select
                                  id="dataAccessGovernance"
                                  name="dataAccessGovernance"
                                  value={form.dataAccessGovernance}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select governance model</option>
                                  <option value="centralised-control">Centralised Data Control</option>
                                  <option value="federated-governance">Federated Data Governance</option>
                                  <option value="data-mesh">Data Mesh Architecture</option>
                                  <option value="self-service-governed">Self-Service with Governance</option>
                                  <option value="risk-based-access">Risk-Based Access Control</option>
                                  <option value="adaptive-governance">Adaptive Data Governance</option>
                                </select>
                                <small className="dc-field-hint">Model for governing data access and usage</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Self-Service Data Access:</label>
                              </td>
                              <td>
                                <select
                                  id="selfServiceDataAccess"
                                  name="selfServiceDataAccess"
                                  value={form.selfServiceDataAccess}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select self-service approach</option>
                                  <option value="no-self-service">No Self-Service Access</option>
                                  <option value="limited-self-service">Limited Self-Service Catalogs</option>
                                  <option value="guided-self-service">Guided Self-Service Platform</option>
                                  <option value="automated-provisioning">Automated Access Provisioning</option>
                                  <option value="ai-assisted-access">AI-Assisted Data Discovery</option>
                                  <option value="full-democratisation">Full Data Democratisation</option>
                                </select>
                                <small className="dc-field-hint">Approach to enabling self-service data access</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Access Balancing:</label>
                              </td>
                              <td>
                                <select
                                  id="dataAccessBalancing"
                                  name="dataAccessBalancing"
                                  value={form.dataAccessBalancing}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select balancing strategy</option>
                                  <option value="security-first">Security-First Approach</option>
                                  <option value="business-value">Business Value Optimisation</option>
                                  <option value="risk-reward">Risk-Reward Balancing</option>
                                  <option value="dynamic-balancing">Dynamic Access Balancing</option>
                                  <option value="context-aware">Context-Aware Access Control</option>
                                  <option value="zero-trust-access">Zero Trust Data Access</option>
                                </select>
                                <small className="dc-field-hint">Strategy for balancing data access and security</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Literacy Programs:</label>
                              </td>
                              <td>
                                <select
                                  id="dataLiteracyPrograms"
                                  name="dataLiteracyPrograms"
                                  value={form.dataLiteracyPrograms}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select literacy approach</option>
                                  <option value="no-formal-program">No Formal Program</option>
                                  <option value="basic-training">Basic Data Training</option>
                                  <option value="role-based-training">Role-Based Data Training</option>
                                  <option value="comprehensive-program">Comprehensive Literacy Program</option>
                                  <option value="continuous-education">Continuous Data Education</option>
                                  <option value="data-culture">Data-Driven Culture Program</option>
                                </select>
                                <small className="dc-field-hint">Programs aimed at improving data literacy across the organization</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Controlled Data Sharing:</label>
                              </td>
                              <td>
                                <select
                                  id="controlledDataSharing"
                                  name="controlledDataSharing"
                                  value={form.controlledDataSharing}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select sharing approach</option>
                                  <option value="no-external-sharing">No External Data Sharing</option>
                                  <option value="manual-approval">Manual Approval Process</option>
                                  <option value="automated-governance">Automated Sharing Governance</option>
                                  <option value="api-controlled">API-Controlled Data Sharing</option>
                                  <option value="federated-sharing">Federated Data Sharing</option>
                                  <option value="privacy-preserving">Privacy-Preserving Data Sharing</option>
                                </select>
                                <small className="dc-field-hint">Approach for sharing data while protecting privacy</small>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </fieldset>
                    </td>
                  </tr>

                  {/* Modern Data Security Controls */}
                  <tr>
                    <td colSpan="2">
                      <fieldset className="dc-fieldset dc-fieldset-modern-data-security">
                        <legend className="dc-legend dc-legend-modern-data-security">🤖 Modern Data Security & Automation</legend>
                        <table className="dc-field-table">
                          <tbody>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Discovery & Automation:</label>
                              </td>
                              <td>
                                <select
                                  id="dataDiscoveryAutomation"
                                  name="dataDiscoveryAutomation"
                                  value={form.dataDiscoveryAutomation}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select data discovery approach</option>
                                  <option value="manual-inventory">Manual Data Inventory</option>
                                  <option value="automated-scanning">Automated Data Scanning</option>
                                  <option value="ml-based-discovery">ML-Based Data Discovery</option>
                                  <option value="continuous-discovery">Continuous Data Discovery</option>
                                  <option value="cross-platform-discovery">Cross-Platform Discovery</option>
                                  <option value="real-time-classification">Real-Time Classification</option>
                                  <option value="hybrid-discovery">Hybrid Discovery Approach</option>
                                </select>
                                <small className="dc-field-hint">Approach required for discovering data across multiple environments</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Sensitive Data Scanning:</label>
                              </td>
                              <td>
                                <select
                                  id="sensitiveDataScanning"
                                  name="sensitiveDataScanning"
                                  value={form.sensitiveDataScanning}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select scanning approach</option>
                                  <option value="periodic-scans">Periodic Manual Scans</option>
                                  <option value="scheduled-automated">Scheduled Automated Scans</option>
                                  <option value="continuous-scanning">Continuous Data Scanning</option>
                                  <option value="intelligent-scanning">Intelligent Content Scanning</option>
                                  <option value="cross-repository">Cross-Repository Scanning</option>
                                  <option value="compliance-scanning">Compliance-Driven Scanning</option>
                                </select>
                                <small className="dc-field-hint">Approach required for scanning data for sensitive content</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Content-Based Classification:</label>
                              </td>
                              <td>
                                <select
                                  id="contentBasedClassification"
                                  name="contentBasedClassification"
                                  value={form.contentBasedClassification}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select classification method</option>
                                  <option value="manual-tagging">Manual Tagging</option>
                                  <option value="pattern-matching">Pattern Matching</option>
                                  <option value="regex-classification">Regex-Based Classification</option>
                                  <option value="ml-classification">Machine Learning Classification</option>
                                  <option value="ai-powered-classification">AI-Powered Classification</option>
                                  <option value="semantic-analysis">Semantic Analysis</option>
                                  <option value="contextual-classification">Contextual Classification</option>
                                </select>
                                <small className="dc-field-hint">Method used for classifying content based on context</small>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </fieldset>
                    </td>
                  </tr>           

                  {/* Data Governance & Management */}
                  <tr>
                    <td colSpan="2">
                      <fieldset className="dc-fieldset dc-fieldset-data-governance">
                        <legend className="dc-legend dc-legend-data-governance">🏛️ Data Governance & Management</legend>
                        <table className="dc-field-table">
                          <tbody>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Lineage Tracking:</label>
                              </td>
                              <td>
                                <select
                                  id="dataLineageTracking"
                                  name="dataLineageTracking"
                                  value={form.dataLineageTracking}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select lineage approach</option>
                                  <option value="none">No Lineage Tracking</option>
                                  <option value="manual-documentation">Manual Documentation</option>
                                  <option value="metadata-driven">Metadata-Driven Lineage</option>
                                  <option value="automated-discovery">Automated Discovery & Mapping</option>
                                  <option value="real-time-tracking">Real-time Lineage Tracking</option>
                                  <option value="end-to-end-visibility">End-to-End Data Visibility</option>
                                  <option value="impact-analysis">Impact Analysis & Change Management</option>
                                </select>
                                <small className="dc-field-hint">
                                  System for tracking data origins, transformations, and destinations
                                </small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Record Primacy Management:</label>
                              </td>
                              <td>
                                <select
                                  id="recordPrimacyManagement"
                                  name="recordPrimacyManagement"
                                  value={form.recordPrimacyManagement}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select primacy approach</option>
                                  <option value="none">No Primacy Management</option>
                                  <option value="source-system-priority">Source System Priority</option>
                                  <option value="master-data-management">Master Data Management (MDM)</option>
                                  <option value="golden-record">Golden Record Management</option>
                                  <option value="consensus-based">Consensus-Based Primacy</option>
                                  <option value="temporal-primacy">Temporal Primacy Rules</option>
                                  <option value="multi-domain-mdm">Multi-Domain MDM</option>
                                </select>
                                <small className="dc-field-hint">
                                  System for managing authoritative sources and master data
                                </small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Quality Controls:</label>
                              </td>
                              <td>
                                <select
                                  id="dataQualityControls"
                                  name="dataQualityControls"
                                  value={form.dataQualityControls}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select quality approach</option>
                                  <option value="none">No Quality Controls</option>
                                  <option value="basic-validation">Basic Data Validation</option>
                                  <option value="rule-based-checks">Rule-Based Quality Checks</option>
                                  <option value="statistical-profiling">Statistical Data Profiling</option>
                                  <option value="ml-quality-detection">ML-Based Quality Detection</option>
                                  <option value="real-time-monitoring">Real-time Quality Monitoring</option>
                                  <option value="continuous-improvement">Continuous Quality Improvement</option>
                                </select>
                                <small className="dc-field-hint">
                                  Mechanisms for ensuring data accuracy, completeness, and consistency
                                </small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Metadata Management:</label>
                              </td>
                              <td>
                                <select
                                  id="metadataManagement"
                                  name="metadataManagement"
                                  value={form.metadataManagement}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select metadata approach</option>
                                  <option value="none">No Metadata Management</option>
                                  <option value="basic-documentation">Basic Documentation</option>
                                  <option value="data-dictionary">Data Dictionary Management</option>
                                  <option value="catalog-driven">Data Catalog Integration</option>
                                  <option value="semantic-layer">Semantic Layer Management</option>
                                  <option value="automated-discovery">Automated Metadata Discovery</option>
                                  <option value="enterprise-metadata">Enterprise Metadata Repository</option>
                                </select>
                                <small className="dc-field-hint">
                                  System for managing data about data (schemas, definitions, context)
                                </small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Stewardship Program:</label>
                              </td>
                              <td>
                                <select
                                  id="dataStewardshipProgram"
                                  name="dataStewardshipProgram"
                                  value={form.dataStewardshipProgram}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select stewardship model</option>
                                  <option value="none">No Formal Stewardship</option>
                                  <option value="ad-hoc-ownership">Ad-hoc Data Ownership</option>
                                  <option value="domain-stewards">Domain-Based Stewards</option>
                                  <option value="business-stewards">Business Data Stewards</option>
                                  <option value="technical-stewards">Technical Data Stewards</option>
                                  <option value="federated-stewardship">Federated Stewardship Model</option>
                                  <option value="center-of-excellence">Data Stewardship Center of Excellence</option>
                                </select>
                                <small className="dc-field-hint">
                                  Roles and responsibilities for data ownership and management
                                </small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Governance Framework:</label>
                              </td>
                              <td>
                                <select
                                  id="dataGovernanceFramework"
                                  name="dataGovernanceFramework"
                                  value={form.dataGovernanceFramework}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select governance framework</option>
                                  <option value="none">No Formal Governance</option>
                                  <option value="basic-policies">Basic Data Policies</option>
                                  <option value="dmbok-framework">DMBOK Framework</option>
                                  <option value="dama-framework">DAMA Framework</option>
                                  <option value="cobit-data">COBIT for Data Governance</option>
                                  <option value="custom-framework">Custom Governance Framework</option>
                                  <option value="adaptive-governance">Adaptive Data Governance</option>
                                </select>
                                <small className="dc-field-hint">
                                  Overall approach to data governance policies and enforcement
                                </small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Flow Documentation:</label>
                              </td>
                              <td>
                                <select
                                  id="dataFlowDocumentation"
                                  name="dataFlowDocumentation"
                                  value={form.dataFlowDocumentation}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select flow documentation</option>
                                  <option value="none">No Flow Documentation</option>
                                  <option value="manual-documentation">Manual Documentation</option>
                                  <option value="high-level-diagrams">High-Level Flow Diagrams</option>
                                  <option value="detailed-mapping">Detailed Data Flow Mapping</option>
                                  <option value="system-integration">System Integration Documentation</option>
                                  <option value="automated-lineage">Automated Data Lineage</option>
                                  <option value="api-flow-tracking">API Flow Tracking</option>
                                  <option value="real-time-monitoring">Real-time Flow Monitoring</option>
                                  <option value="network-flow-analysis">Network Flow Analysis</option>
                                  <option value="automated-discovery">Automated Flow Discovery</option>
                                  <option value="real-time-mapping">Real-Time Data Mapping</option>
                                  <option value="comprehensive-catalog">Comprehensive Flow Catalog</option>
                                </select>
                                <small className="dc-field-hint">
                                  Documentation and mapping of data movement through systems
                                </small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Reporting & Analytics Governance:</label>
                              </td>
                              <td>
                                <select
                                  id="reportingAnalyticsGovernance"
                                  name="reportingAnalyticsGovernance"
                                  value={form.reportingAnalyticsGovernance}
                                  onChange={handleChange}
                                  className="dc-select"
                                >
                                  <option value="">Select reporting governance</option>
                                  <option value="none">No Reporting Governance</option>
                                  <option value="basic-controls">Basic Reporting Controls</option>
                                  <option value="standardized-metrics">Standardized Metrics & KPIs</option>
                                  <option value="certified-reports">Certified Report Repository</option>
                                  <option value="self-service-governed">Governed Self-Service Analytics</option>
                                  <option value="data-mart-governance">Data Mart Governance</option>
                                  <option value="enterprise-reporting">Enterprise Reporting Platform</option>
                                </select>
                                <small className="dc-field-hint">
                                  Controls for data reporting, analytics, and business intelligence
                                </small>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </fieldset>
                    </td>
                  </tr>              

                  {/* Implementation Notes */}
                  <tr>
                    <td colSpan="2">
                      <fieldset className="dc-fieldset dc-fieldset-implementation-notes">
                        <legend className="dc-legend dc-legend-implementation-notes">📝 Implementation Notes</legend>
                        <table className="dc-field-table">
                          <tbody>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Additional Implementation Notes</label>
                              </td>
                              <td>
                                <textarea
                                  id="implementationNotes"
                                  name="implementationNotes"
                                  value={form.implementationNotes}
                                  onChange={handleInputChange}
                                  placeholder="Add any additional notes, special considerations, or implementation details"
                                  rows="4"
                                  className="dc-textarea"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Business Justification</label>
                              </td>
                              <td>
                                <textarea
                                  id="businessJustification"
                                  name="businessJustification"
                                  value={form.businessJustification}
                                  onChange={handleInputChange}
                                  placeholder="Explain the business need and justification for this data classification"
                                  rows="3"
                                  className="dc-textarea"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </fieldset>
                    </td>
                  </tr>
                </tbody>
              </table>
            </details>            

            {/* Recommended Controls Display */}
            {recommendedControls && (
                <div className="dc-recommendations">
                    <h4>💡 Recommended Controls</h4>
                    <div className="dc-recommendations-content">
                        {Object.entries(recommendedControls).map(([key, value]) => (
                            <div key={key} className="dc-recommendation-item">
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Form Actions */}
            <p></p>
            <div className="dc-flex-gap">
            <button
              type="submit"
              className="dc-btn dc-btn-secondary"
            >
              {editIndex !== null ? "Update Entry" : "Submit Data Classification Details"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="dc-btn dc-btn-cancel"
            >
              Cancel
            </button>
          </div>
        </details>
      </form>
    );
};

export default DCInputForm;
