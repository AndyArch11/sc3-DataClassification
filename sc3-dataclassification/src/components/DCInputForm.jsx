import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import "./DC.css";
import { getOptionSecurityClass, validateControlSelection } from '../utils/securityUtils';

// TODO: break apart the DCInputForm component into smaller subcomponents for better maintainability

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
    const [viewMode, setViewMode] = useState('basic'); // View mode state
    
    // Scroll to top function for Asset Information section
    const scrollToAssetInformation = () => {
      const element = document.getElementById('dc-asset-information');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Back to Top Button Component
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
      const onScroll = () => setShowBackToTop(window.scrollY > 200);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const BackToTopButton = () => {
      if (!showBackToTop) return null;
      return (
        <button
          type="button"
          onClick={scrollToAssetInformation}
          className="dc-back-to-top-button dc-back-to-top-floating"
          title="Back to top of Data Classification Input Form section"
          aria-label="Back to top"
        >
          ↑
        </button>
      );
    };

    const assetTypes = [
        { value: 'printed-media', label: '📄 Printed Media', icon: '📄' },
        { value: 'digital-files', label: '💾 Digital Files', icon: '💾' },
        { value: 'database-data', label: '🗄️ Database Data', icon: '🗄️' },
        { value: 'systems-applications', label: '🖥️ Systems/Applications', icon: '🖥️' },
        { value: 'emails', label: '📧 Emails', icon: '📧' },
        { value: 'cloud-storage', label: '☁️ Cloud Storage', icon: '☁️' },
        { value: 'mobile-devices', label: '📱 Mobile Devices', icon: '📱' }
    ];

    const dataSensitivityOptions = [
        { value: 'public', label: '🌐 Public', level: 1, risk: 'Low' },
        { value: 'internal', label: '🏢 Internal', level: 2, risk: 'Medium' },
        { value: 'confidential', label: '🔒 Confidential', level: 3, risk: 'High' },
        { value: 'restricted', label: '🚫 Restricted', level: 4, risk: 'Critical' }
    ];

    const dataCriticalityOptions = [
        { value: 'public', label: '🌐 Public', level: 1, risk: 'Low' },
        { value: 'internal', label: '🏢 Internal', level: 2, risk: 'Medium' },
        { value: 'confidential', label: '🔒 Confidential', level: 3, risk: 'High' },
        { value: 'restricted', label: '🚫 Restricted', level: 4, risk: 'Critical' }
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
        { value: 'Twofish', label: 'Twofish', status: 'acceptable', type: 'symmetric' },
        { value: 'Camellia', label: 'Camellia', status: 'justify', type: 'symmetric' },
        { value: 'Serpent', label: 'Serpent', status: 'justify', type: 'symmetric' },
        { value: '3DES', label: 'Triple DES', status: 'deprecated', type: 'symmetric' },
        { value: 'DES', label: 'DES', status: 'compromised', type: 'symmetric' },
        { value: 'RC4', label: 'RC4', status: 'compromised', type: 'symmetric' },
        { value: 'Other', label: 'Other (specify in notes)', status: 'unknown', type: 'unknown' }
    ];

    const hashAlgorithms = [
        { value: 'SHA-256', label: 'SHA-256', status: 'recommended' },
        { value: 'SHA-384', label: 'SHA-384', status: 'recommended' },
        { value: 'SHA-512', label: 'SHA-512', status: 'recommended' },
        { value: 'SHA-3-256', label: 'SHA-3-256', status: 'recommended' },
        { value: 'SHA-3-512', label: 'SHA-3-512', status: 'recommended' },
        { value: 'BLAKE2b', label: 'BLAKE2b', status: 'recommended' },
        { value: 'BLAKE2s', label: 'BLAKE2s', status: 'acceptable' },
        { value: 'BLAKE3', label: 'BLAKE3', status: 'justify' },
        { value: 'SHA-224', label: 'SHA-224', status: 'acceptable' },
        { value: 'SHA-1', label: 'SHA-1', status: 'deprecated' },
        { value: 'MD5', label: 'MD5', status: 'compromised' },
        { value: 'MD4', label: 'MD4', status: 'compromised' },
        { value: 'RIPEMD-160', label: 'RIPEMD-160', status: 'justify' },
        { value: 'Whirlpool', label: 'Whirlpool', status: 'justify' },
        { value: 'Other', label: 'Other (specify in notes)', status: 'unknown' }
    ];

    const handleInputChange = (e) => {
        const { name, value, selectedOptions, multiple } = e.target;
        // Normalise value: for multi-selects produce array, otherwise scalar
        const normalisedValue = multiple
          ? Array.from(selectedOptions || []).map(o => o.value)
          : value;

        handleChange({ target: { name, value: normalisedValue } });
        // Validate control selection based on data classification
        validateControlSelection(name, normalisedValue, form.dataClassification, setValidationWarnings);
    };

    // Generic handler for multi-select controls with validation
    const handleMultiSelectChange = (fieldName) => (selectedOptions) => {
        const value = selectedOptions ? selectedOptions.map(o => o.value) : [];
        handleChange({ target: { name: fieldName, value } });
        validateControlSelection(fieldName, value, form.dataClassification, setValidationWarnings);
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

    // Helper function to get security className for react-select control
    const getSecurityClassName = (fieldName, selectedValues) => {
      const normalisedValues = Array.isArray(selectedValues)
        ? selectedValues
        : [selectedValues].filter(Boolean);

      if (normalisedValues.length === 0) return '';
        
        let hasWarning = false;
        let hasDanger = false;
        let hasMissing = false;
        
      normalisedValues.forEach(option => {
            const value = typeof option === 'string' ? option : option.value;
            const securityClass = getOptionSecurityClass(value, fieldName, form.dataClassification);
            if (securityClass === 'dc-option-danger') {
                hasDanger = true;
            } else if (securityClass === 'dc-option-warning') {
                hasWarning = true;
            } else if (securityClass === 'dc-option-missing') {
                hasMissing = true;
            }
        });
        
        if (hasDanger) return 'dc-select-control-danger';
        if (hasWarning) return 'dc-select-control-warning';
        if (hasMissing) return 'dc-select-control-missing';
        return '';
    };

    // Helper function to generate security-based styles for react-select multi-select fields
    const getSecurityStyles = (fieldName) => {
        // Get CSS variable values
        const getCSSVar = (varName) => {
            return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
        };

        return {
            control: (baseStyles) => {
                // Return base styles - we'll use className to apply security styling
                return baseStyles;
            },
            option: (baseStyles, state) => {
                const securityClass = getOptionSecurityClass(state.data.value, fieldName, form.dataClassification);
                let backgroundColour = baseStyles.backgroundColor;
                let colour = baseStyles.color;
                
                if (securityClass === 'dc-option-danger') {
                    backgroundColour = state.isFocused 
                        ? getCSSVar('--select-option-danger-bg-hover') 
                        : getCSSVar('--select-option-danger-bg');
                    colour = getCSSVar('--select-option-danger-color');
                } else if (securityClass === 'dc-option-warning') {
                    backgroundColour = state.isFocused 
                        ? getCSSVar('--select-option-warning-bg-hover') 
                        : getCSSVar('--select-option-warning-bg');
                    colour = getCSSVar('--select-option-warning-color');
                } else if (securityClass === 'dc-option-missing') {
                    backgroundColour = state.isFocused 
                        ? getCSSVar('--select-option-missing-bg-hover') 
                        : getCSSVar('--select-option-missing-bg');
                    colour = getCSSVar('--select-option-missing-color');
                }
                
                return {
                    ...baseStyles,
                    backgroundColor: state.isSelected ? baseStyles.backgroundColor : backgroundColour,
                    color: state.isSelected ? baseStyles.color : colour,
                };
            },
            multiValue: (baseStyles, state) => {
                const securityClass = getOptionSecurityClass(state.data.value, fieldName, form.dataClassification);
                
                if (securityClass === 'dc-option-danger') {
                    return {
                        ...baseStyles,
                        backgroundColor: getCSSVar('--select-option-danger-bg'),
                        borderColor: getCSSVar('--select-option-danger-color'),
                    };
                } else if (securityClass === 'dc-option-warning') {
                    return {
                        ...baseStyles,
                        backgroundColor: getCSSVar('--select-option-warning-bg'),
                        borderColor: getCSSVar('--select-option-warning-color'),
                    };
                } else if (securityClass === 'dc-option-missing') {
                    return {
                        ...baseStyles,
                        backgroundColor: getCSSVar('--select-option-missing-bg'),
                        borderColor: getCSSVar('--select-option-missing-color'),
                    };
                }
                
                return baseStyles;
            },
            multiValueLabel: (baseStyles, state) => {
                const securityClass = getOptionSecurityClass(state.data.value, fieldName, form.dataClassification);
                
                if (securityClass === 'dc-option-danger') {
                    return {
                        ...baseStyles,
                        color: getCSSVar('--select-option-danger-color'),
                        fontWeight: 'bold',
                    };
                } else if (securityClass === 'dc-option-warning') {
                    return {
                        ...baseStyles,
                        color: getCSSVar('--select-option-warning-color'),
                        fontWeight: 'bold',
                    };
                } else if (securityClass === 'dc-option-missing') {
                    return {
                        ...baseStyles,
                        color: getCSSVar('--select-option-missing-color'),
                        fontWeight: 'bold',
                    };
                }
                
                return baseStyles;
            },
            multiValueRemove: (baseStyles, state) => {
                const securityClass = getOptionSecurityClass(state.data.value, fieldName, form.dataClassification);
                
                if (securityClass === 'dc-option-danger') {
                    return {
                        ...baseStyles,
                        color: getCSSVar('--select-option-danger-color'),
                        ':hover': {
                            backgroundColor: getCSSVar('--select-option-danger-bg-hover'),
                            color: getCSSVar('--select-option-danger-color-dark'),
                        },
                    };
                } else if (securityClass === 'dc-option-warning') {
                    return {
                        ...baseStyles,
                        color: getCSSVar('--select-option-warning-color'),
                        ':hover': {
                            backgroundColor: getCSSVar('--select-option-warning-bg-hover'),
                            color: getCSSVar('--select-option-warning-color-dark'),
                        },
                    };
                } else if (securityClass === 'dc-option-missing') {
                    return {
                        ...baseStyles,
                        color: getCSSVar('--select-option-missing-color'),
                        ':hover': {
                            backgroundColor: getCSSVar('--select-option-missing-bg-hover'),
                            color: getCSSVar('--select-option-missing-color-dark'),
                        },
                    };
                }
                
                return baseStyles;
            }
        };
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
        if (status === 'justify') return 'ℹ️'; // Info for justify
        
        return '';
    };

    const getHashWarningIcon = (hash) => {
        const status = getHashSecurityStatus(hash);
        
        if (status === 'compromised') return '🔴'; // Red circle for compromised
        if (status === 'deprecated') return '⚠️'; // Warning for deprecated
        if (status === 'justify') return 'ℹ️'; // Info for justify
        
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
            case 'justify':
                statusMessage = 'This cipher requires governance justification for use.';
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
            case 'justify':
                return 'This hash algorithm requires governance justification for use.';
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
          <summary className="dc-form-summary">✏️ Data Classification Assessment Form</summary>
          
          {/* View Mode Selection */}
          <div className="dc-view-mode-container">
            <label>
              View Mode:
            </label>
            <div className="dc-view-mode-options">
              <label className="dc-view-mode-label">
                <input
                  type="radio"
                  value="basic"
                  checked={viewMode === 'basic'}
                  onChange={(e) => setViewMode(e.target.value)}
                />
                Basic (Essential fields only)
              </label>
              <label className="dc-view-mode-label">
                <input
                  type="radio"
                  value="extended"
                  checked={viewMode === 'extended'}
                  onChange={(e) => setViewMode(e.target.value)}
                />
                Extended (All fields)
              </label>
            </div>
          </div>
          
            <fieldset id="dc-asset-information" className="dc-fieldset dc-fieldset-asset-info">
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
                        Select the primary type of data contained in this asset. Choose &apos;Mixed Data Types&apos; if multiple types apply.
                      </small>
                    </td>
                  </tr>
                  <tr>
                    <td className="dc-field-cell-label">
                      <label className="dc-form-label">Data Sensitivity:<span className="dc-required">*</span></label>
                    </td>
                    <td>
                      <select
                        id="dataSensitivity"
                        name="dataSensitivity"
                        value={form.dataSensitivity}
                        onChange={handleChange}
                        required
                        className={`dc-select ${form.dataSensitivity ? `dc-classification-${form.dataSensitivity}` : ''}`}
                      >
                        <option value="">Select sensitivity level...</option>
                        {dataSensitivityOptions.map(sensitivity => (
                          <option key={sensitivity.value} value={sensitivity.value}>
                            {sensitivity.label} ({sensitivity.risk} Risk)
                          </option>
                        ))}
                      </select>
                      <small className="dc-field-hint">
                        Select the sensitivity level based on the impact of <strong>unauthorised disclosure</strong> (Confidentiality).
                      </small>
                    </td>
                  </tr>
                  <tr>
                    <td className="dc-field-cell-label">
                      <label className="dc-form-label">Data Criticality:<span className="dc-required">*</span></label>
                    </td>
                    <td>
                      <select
                        id="dataCriticality"
                        name="dataCriticality"
                        value={form.dataCriticality}
                        onChange={handleChange}
                        required
                        className={`dc-select ${form.dataCriticality ? `dc-classification-${form.dataCriticality}` : ''}`}
                      >
                        <option value="">Select criticality level...</option>
                        {dataCriticalityOptions.map(criticality => (
                          <option key={criticality.value} value={criticality.value}>
                            {criticality.label} ({criticality.risk} Risk)
                          </option>
                        ))}
                      </select>
                      <small className="dc-field-hint">
                        Select the criticality level based on the impact of <strong>data loss or unavailability</strong> (Integrity & Availability).
                      </small>
                    </td>
                  </tr>
                  <tr>
                    <td className="dc-field-cell-label">
                      <label className="dc-form-label">Data Classification (Derived):</label>
                    </td>
                    <td>
                      {form.dataClassification ? (
                        <div className={`dc-derived-classification-display`}>
                          <span className={`dc-classification-badge dc-${form.dataClassification?.toLowerCase()}`}>
                            {dataClassifications.find(c => c.value === form.dataClassification)?.label || form.dataClassification.charAt(0).toUpperCase() + form.dataClassification.slice(1)}
                            {' '}
                            ({dataClassifications.find(c => c.value === form.dataClassification)?.risk} Risk)
                          </span>
                        </div>
                      ) : (
                        <div className="dc-placeholder-text">
                          <em>Please select sensitivity and criticality levels above</em>
                        </div>
                      )}
                      <small className="dc-field-hint">
                        This classification is automatically determined by the <strong>higher value (high water mark)</strong> of Data Sensitivity and Data Criticality.
                      </small>
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>

            {/* Extended Fields - Only show when viewMode is 'extended' */}
            {viewMode === 'extended' && (
                <table className="dc-form-table">
                  <tbody>
                    {/* Additional Asset Information Fields - Moved from Basic */}
                    <tr>
                      <td colSpan="2">
                        <fieldset className="dc-fieldset dc-fieldset-asset-info-extended">
                          <legend className="dc-legend dc-legend-asset-info">📝 Additional Asset Information</legend>
                          <table className="dc-field-table">
                            <tbody>
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
                                  <label className="dc-form-label">Assessment Conducted By:</label>
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    id="assessorName"
                                    name="assessorName"
                                    value={form.assessorName}
                                    onChange={handleChange}
                                    placeholder="Name of person conducting this data classification assessment"
                                    className="dc-input"
                                  />
                                  <small className="dc-field-hint">
                                    Enter the full name of the person responsible for this data classification assessment
                                  </small>
                                </td>
                              </tr>
                              <tr>
                                <td className="dc-field-cell-label">
                                  <label className="dc-form-label">Assessment Date:</label>
                                </td>
                                <td>
                                  <input
                                    type="date"
                                    id="assessmentDate"
                                    name="assessmentDate"
                                    value={form.assessmentDate}
                                    onChange={handleChange}
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
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <small className="dc-field-hint">The following security control sections provide guidance on suggested controls. While advice is provided based on the data classification level, selections are not assessed. Consider using for input into:
                          <ul>
                            <li>Data Protection Impact Assessments (DPIAs) / Privacy Impact Assessments (PIAs)</li>
                            <li>Security Control Frameworks and security posture assessments</li>
                            <li>Data Governance and Data Management programs</li>
                            <li>Risk Assessments and Risk Treatment Plans. Also see <a href="../rar" target="_blank" rel="noopener noreferrer">Risk Assessment Report Form</a></li>
                            <li>Security Architecture and Design Reviews</li>
                            <li>Incident Response Plans and Business Continuity Plans</li>
                            <li>Comparisons between different assets with same or different classification levels</li>
                          </ul>
                          Organisations vary by size and maturity levels, along with their technology landscapes. Therefore, tailor to fit the specific context and risk appetite of your organisation.
                        </small>
                        <p></p>
                      </td>
                    </tr>

                  {/* Security Controls Fields */}
                  <tr>
                    <td colSpan="2">
                      <fieldset className="dc-fieldset dc-fieldset-security-controls">
                        <legend className="dc-legend dc-legend-security-controls">🔒Security Controls</legend>
                        <table className="dc-field-table">
                          <tbody>
                            <tr>
                              <td colSpan="2">
                                <small className="dc-field-hint">
                                Select the appropriate secrets management strategy based on your data classification and organisational requirements.
                                </small>
                              </td>
                            </tr>
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
                                  <option value="none" className={getOptionSecurityClass('none', 'atRestEncryption', form.dataClassification)}>
                                    No encryption
                                  </option>
                                  <option value="basic" className={getOptionSecurityClass('basic', 'atRestEncryption', form.dataClassification)}>
                                    Basic encryption (provider managed)
                                  </option>
                                  <option value="standard" className={getOptionSecurityClass('standard', 'atRestEncryption', form.dataClassification)}>
                                    Standard encryption (AES-128)
                                  </option>
                                  <option value="strong" className={getOptionSecurityClass('strong', 'atRestEncryption', form.dataClassification)}>
                                    Strong encryption (AES-256)
                                  </option>
                                  <option value="maximum" className={getOptionSecurityClass('maximum', 'atRestEncryption', form.dataClassification)}>
                                    Maximum encryption (AES-256 + HSM)
                                  </option>
                                </select>
                                <small className="dc-field-hint">
                                  Encryption level applied to data when stored on disk, databases, or backups.
                                </small>              
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Any encryption level acceptable, but standard encryption or higher recommended for better security.'}
                                        {form.dataClassification === 'internal' && 'Standard encryption or higher recommended'}
                                        {form.dataClassification === 'confidential' && 'Strong encryption (AES-256) required'}
                                        {form.dataClassification === 'restricted' && 'Maximum encryption required, ideally with HSM'}
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
                                  <option value="none" className={getOptionSecurityClass('none', 'inTransitEncryption', form.dataClassification)}>
                                    No encryption (HTTP, FTP, Telnet)
                                  </option>
                                  <option value="basic" className={getOptionSecurityClass('basic', 'inTransitEncryption', form.dataClassification)}>
                                    Basic encryption (HTTP/1.1 + TLS 1.0/1.1, SSH v1, legacy protocols)
                                  </option>
                                  <option value="standard" className={getOptionSecurityClass('standard', 'inTransitEncryption', form.dataClassification)}>
                                    Standard secure protocols (HTTP/1.1 + TLS 1.2, HTTP/2, SSH v2, SFTP)
                                  </option>
                                  <option value="strong" className={getOptionSecurityClass('strong', 'inTransitEncryption', form.dataClassification)}>
                                    Strong encryption (HTTP/2 + TLS 1.3, HTTP/3 + QUIC, modern VPN)
                                  </option>
                                  <option value="maximum" className={getOptionSecurityClass('maximum', 'inTransitEncryption', form.dataClassification)}>
                                    Maximum protection (HTTP/3 + QUIC, E2E encryption, mutual auth)
                                  </option>
                                  </select>
                                  <small className="dc-field-hint">
                                    Encryption level applied to data when transmitted over networks or between systems.
                                  </small>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && 'Any non-legacy secure transport protocol is acceptable (HTTPS/TLS, SSH, VPN)'}
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
                                <Select
                                  id="databaseEncryption"
                                  name="databaseEncryption"
                                  isMulti
                                  options={[
                                    { value: 'none', label: 'No database encryption' },
                                    { value: 'tde-basic', label: 'Transparent Data Encryption (TDE) - Basic' },
                                    { value: 'tde-advanced', label: 'TDE with Customer-Managed Keys' },
                                    { value: 'column-encryption', label: 'Column-Level Encryption' },
                                    { value: 'row-level-security', label: 'Row-Level Security (RLS)' },
                                    { value: 'field-level-encryption', label: 'Field-Level Encryption' },
                                    { value: 'tokenisation', label: 'Data Tokenisation' },
                                    { value: 'data-masking', label: 'Data Masking/Obfuscation' },
                                    { value: 'dynamic-masking', label: 'Dynamic Data Masking' },
                                    { value: 'synthetic-data', label: 'Synthetic Data Generation' },
                                    { value: 'database-firewall', label: 'Database Firewall Protection' },
                                    { value: 'always-encrypted', label: 'Always Encrypted (SQL Server)' },
                                    { value: 'envelope-encryption', label: 'Envelope Encryption' },
                                    { value: 'backup-encryption', label: 'Backup Encryption' },
                                    { value: 'query-level-encryption', label: 'Query-Level Encryption' },
                                    { value: 'comprehensive', label: 'Comprehensive (TDE + Column + Masking + Tokenisation)' }
                                  ]}
                                  value={Array.isArray(form.databaseEncryption)
                                    ? form.databaseEncryption.map(v => ({ value: v, label: (
                                        [
                                          'No database encryption',
                                          'Transparent Data Encryption (TDE) - Basic',
                                          'TDE with Customer-Managed Keys',
                                          'Column-Level Encryption',
                                          'Row-Level Security (RLS)',
                                          'Field-Level Encryption',
                                          'Data Tokenisation',
                                          'Data Masking/Obfuscation',
                                          'Dynamic Data Masking',
                                          'Synthetic Data Generation',
                                          'Database Firewall Protection',
                                          'Always Encrypted (SQL Server)',
                                          'Envelope Encryption',
                                          'Backup Encryption',
                                          'Query-Level Encryption',
                                          'Comprehensive (TDE + Column + Masking + Tokenisation)'
                                        ][[
                                          'none',
                                          'tde-basic',
                                          'tde-advanced',
                                          'column-encryption',
                                          'row-level-security',
                                          'field-level-encryption',
                                          'tokenisation',
                                          'data-masking',
                                          'dynamic-masking',
                                          'synthetic-data',
                                          'database-firewall',
                                          'always-encrypted',
                                          'envelope-encryption',
                                          'backup-encryption',
                                          'query-level-encryption',
                                          'comprehensive'
                                        ].indexOf(v)] || v)
                                      }))
                                    : []}
                                  onChange={handleMultiSelectChange('databaseEncryption')}
                                  styles={getSecurityStyles('databaseEncryption')}
                                  className={getSecurityClassName('databaseEncryption', form.databaseEncryption)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                  Database-specific encryption and data protection mechanisms
                                </small>
                                <small className="dc-field-hint">
                                  <strong>Database-specific encryption and data protection:</strong><br/>
                                  • <strong>TDE:</strong> Encrypts entire database files at rest<br/>
                                  • <strong>Column/Field Encryption:</strong> Encrypts specific sensitive columns<br/>
                                  • <strong>Row-Level Security:</strong> Controls access to specific rows<br/>
                                  * <strong>Field-Level Encryption:</strong> Encrypts individual data fields within records<br/>
                                  • <strong>Tokenisation:</strong> Replaces sensitive data with non-sensitive tokens<br/>
                                  • <strong>Data Masking:</strong> Obscures production data in non-production environments or in less privileged views<br/>
                                  • <strong>Dynamic Masking:</strong> Real-time masking based on user permissions<br/>
                                  • <strong>Synthetic Data:</strong> Artificially-generated realistic but fake data for testing<br/>
                                  • <strong>Database Firewall:</strong> Monitors and blocks suspicious database traffic<br/>
                                  • <strong>Always Encrypted:</strong> Client-side encryption ensuring data is encrypted in use and at rest<br/>
                                  • <strong>Envelope Encryption:</strong> Encryption of the data encryption keys with a separate key<br/>
                                  • <strong>Backup Encryption:</strong> Encrypts database backups at rest<br/>
                                  • <strong>Query-Level Encryption:</strong> Encrypts data within queries<br/>                                  
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic protection sufficient - consider data masking for non-production environments'}
                                        {form.dataClassification === 'internal' && 'TDE + data masking recommended for non-production environments'}
                                        {form.dataClassification === 'confidential' && 'TDE + column encryption + tokenisation for sensitive fields + mandatory masking/synthetic data for non-production'}
                                        {form.dataClassification === 'restricted' && 'Comprehensive protection required: TDE + column encryption + RLS + tokenisation + always encrypted + synthetic data only for non-production'}
                                    </small>
                                )}
                                <FieldWarning fieldName="databaseEncryption" />
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
                                  className={getFieldWarning('encryptionCipher') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select cipher...</option>
                                  {encryptionCiphers.map(cipher => (
                                    <option 
                                      key={cipher.value} 
                                      value={cipher.value}
                                      className={getOptionSecurityClass(cipher.value, 'encryptionCipher', form.dataClassification)}
                                    >
                                      {getCipherTypeIcon(cipher.type)} {cipher.label} {getCipherWarningIcon(cipher.value, form.dataClassification)}
                                    </option>
                                  ))}
                                  </select>
                                  <small className="dc-field-hint">
                                    Encryption cipher used to protect data.
                                  </small>
                                  {form.dataClassification && (
                                      <small className={`dc-field-hint ${getCipherSecurityStatus(form.encryptionCipher) === 'compromised' || getCipherSecurityStatus(form.encryptionCipher) === 'deprecated' ? 'dc-cipher-warning' : ''}`}>
                                          {getCipherStatusMessage(form.encryptionCipher)}
                                          {form.dataClassification && (
                                              <>
                                                  <br />
                                                  <strong>Guidance for {form.dataClassification.toUpperCase()}:</strong>{' '}<br/>
                                                  {form.dataClassification === 'public' && 'Consider using modern ciphers for better security. Both symmetric and asymmetric ciphers are acceptable.'}
                                                  {form.dataClassification === 'internal' && 'Use AES-128+ (symmetric) or ECC/RSA (asymmetric) for internal data.'}
                                                  {form.dataClassification === 'confidential' && 'AES-256  and ChaCha20-Poly1305 (symmetric) or ECC-P-256 (asymmetric) acceptable, Ed25519 or X25519 recommended.'}
                                                  {form.dataClassification === 'restricted' && 'Only AES-256-GCM (symmetric) or ECC-P-384+ should be used. Avoid RSA-4096 due to performance overheads.'}
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
                                  className={getFieldWarning('hashAlgorithm') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select hash algorithm...</option>
                                  {hashAlgorithms.map(hash => (
                                    <option 
                                      key={hash.value} 
                                      value={hash.value}
                                      className={getOptionSecurityClass(hash.value, 'hashAlgorithm', form.dataClassification)}
                                    >
                                      {hash.label} {getHashWarningIcon(hash.value, form.dataClassification)}
                                    </option>
                                  ))}
                                  </select>
                                  <small className="dc-field-hint">
                                    Hashing algorithm used for data integrity verification or password storage.
                                  </small>
                                  {form.dataClassification && (
                                      <small className={`dc-field-hint ${getHashSecurityStatus(form.hashAlgorithm) === 'compromised' || getHashSecurityStatus(form.hashAlgorithm) === 'deprecated' ? 'dc-cipher-warning' : ''}`}>
                                          {getHashStatusMessage(form.hashAlgorithm)}
                                          {form.dataClassification && (
                                              <><br/>
                                                  <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
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
                                  className={getFieldWarning('keyManagement') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select key management...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'keyManagement', form.dataClassification)}>No key management</option>
                                  <option value="provider" className={getOptionSecurityClass('provider', 'keyManagement', form.dataClassification)}>Provider managed keys</option>
                                  <option value="customer" className={getOptionSecurityClass('customer', 'keyManagement', form.dataClassification)}>Customer managed keys</option>
                                  <option value="byok" className={getOptionSecurityClass('byok', 'keyManagement', form.dataClassification)}>Bring Your Own Key (BYOK)</option>
                                  <option value="hsm" className={getOptionSecurityClass('hsm', 'keyManagement', form.dataClassification)}>Hardware Security Module (HSM)</option>
                                </select>
                                <small className="dc-field-hint">
                                  Method used to manage encryption keys.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Any key management approach acceptable'}
                                        {form.dataClassification === 'internal' && 'Provider or customer managed keys recommended'}
                                        {form.dataClassification === 'confidential' && 'Customer managed keys or HSM required'}
                                        {form.dataClassification === 'restricted' && 'HSM or BYOK strongly recommended'}
                                    </small>
                                )}
                                <FieldWarning fieldName="keyManagement" /> 
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Key Management Processes:</label>
                              </td>
                              <td>
                                <Select
                                  id="keyManagementProcesses"
                                  name="keyManagementProcesses"
                                  isMulti
                                  options={[
                                    { value: 'none', label: 'No Key Rotation Management' },
                                    { value: 'manual-rotation', label: 'Manual Key Rotation' },
                                    { value: 'access-controls', label: 'Access Controls' },
                                    { value: 'audit-logs', label: 'Audit Logging' },
                                    { value: 'automated-rotation', label: 'Automated Key Rotation' },
                                    { value: 'split-knowledge', label: 'Split Knowledge Key' },
                                    { value: 'hsm-storage', label: 'HSM Storage' }
                                  ]}
                                  value={Array.isArray(form.keyManagementProcesses)
                                    ? form.keyManagementProcesses.map(v => {
                                        const labels = {
                                          'none': 'No Key Rotation Management',
                                          'manual-rotation': 'Manual Key Rotation',
                                          'access-controls': 'Access Controls',
                                          'audit-logs': 'Audit Logging',
                                          'automated-rotation': 'Automated Key Rotation',
                                          'split-knowledge': 'Split Knowledge Key',
                                          'hsm-storage': 'HSM Storage'
                                        };
                                        return { value: v, label: labels[v] || v };
                                      })
                                    : []}
                                  onChange={handleMultiSelectChange('keyManagementProcesses')}
                                  styles={getSecurityStyles('keyManagementProcesses')}
                                  className={getSecurityClassName('keyManagementProcesses', form.keyManagementProcesses)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                  Key management processes to ensure key security and integrity
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Basic key management processes acceptable'}
                                      {form.dataClassification === 'internal' && 'Automated key rotation recommended'}
                                      {form.dataClassification === 'confidential' && 'Automated key rotation + audit logging required'}
                                      {form.dataClassification === 'restricted' && 'Automated key rotation + split knowledge + audit logging + HSM storage strongly recommended'}
                                  </small> 
                                )}
                                <FieldWarning fieldName="keyManagementProcesses" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Secrets Management:</label>
                              </td>
                              <td>
                                <Select
                                  id="secretsManagement"
                                  name="secretsManagement"
                                  isMulti
                                  options={[
                                    { value: 'none', label: 'No secrets management' },
                                    { value: 'env-vars', label: 'Basic environment variables' },
                                    { value: 'encrypted-config', label: 'Encrypted configuration files' },
                                    { value: 'secrets-service', label: 'Secrets management service (Vault, Azure Key Vault, AWS Secrets Manager)' },
                                    { value: 'dynamic-secrets', label: 'Dynamic secrets with rotation' },
                                    { value: 'hsm-backed', label: 'Hardware-backed secrets (HSM)' }
                                  ]}
                                  value={Array.isArray(form.secretsManagement)
                                    ? form.secretsManagement.map(v => {
                                        const labels = {
                                          'none': 'No secrets management',
                                          'env-vars': 'Basic environment variables',
                                          'encrypted-config': 'Encrypted configuration files',
                                          'secrets-service': 'Secrets management service (Vault, Azure Key Vault, AWS Secrets Manager)',
                                          'dynamic-secrets': 'Dynamic secrets with rotation',
                                          'hsm-backed': 'Hardware-backed secrets (HSM)'
                                        };
                                        return { value: v, label: labels[v] || v };
                                      })
                                    : []}
                                  onChange={handleMultiSelectChange('secretsManagement')}
                                  styles={getSecurityStyles('secretsManagement')}
                                  className={getSecurityClassName('secretsManagement', form.secretsManagement)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                  Secrets management approaches to securely store and access keys, passwords, and sensitive configuration data.
                                </small>                          
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Basic secrets management acceptable'}
                                      {form.dataClassification === 'internal' && 'Secrets management service recommended'}
                                      {form.dataClassification === 'confidential' && 'Secrets management service with dynamic secrets required'}  
                                      {form.dataClassification === 'restricted' && 'Hardware-backed secrets (HSM) strongly recommended'}
                                  </small>
                                )}
                                <FieldWarning fieldName="secretsManagement" />
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
                              <td colSpan="2">
                                <small className="dc-field-hint">
                                Select the appropriate AuthN and AuthZ method based on your data classification and organisational requirements.
                                </small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Authentication Method:</label>
                              </td>
                              <td>
                                <Select
                                  id="authentication"
                                  name="authentication"
                                  isMulti
                                  options={[
                                      { value: 'none', label: 'No authentication' },
                                      { value: 'basic', label: 'Basic authentication' },
                                      { value: 'api-key', label: 'API Keys' },
                                      { value: 'certificate', label: 'Certificate-based' },
                                      { value: 'sso', label: 'Single Sign-On (SSO)' },
                                      { value: 'mfa', label: 'Multi-Factor Authentication (MFA)' },
                                      { value: 'hardware-token', label: 'Hardware Tokens' },
                                      { value: 'smart-card', label: 'Smart Cards' },
                                      { value: 'biometric', label: 'Biometric authentication' },
                                      { value: 'fido2', label: 'Fast Identity Online (FIDO2)' }
                                  ]}
                                  value={Array.isArray(form.authentication)
                                    ? form.authentication.map(v => {
                                        const labels = {
                                          'none': 'No authentication',
                                          'basic': 'Basic authentication',
                                          'api-key': 'API Keys',
                                          'certificate': 'Certificate-based',
                                          'sso': 'Single Sign-On (SSO)',
                                          'mfa': 'Multi-Factor Authentication (MFA)',
                                          'hardware-token': 'Hardware Tokens',
                                          'smart-card': 'Smart Cards',
                                          'biometric': 'Biometric authentication',
                                          'fido2': 'Fast Identity Online (FIDO2)'
                                        };
                                        return { value: v, label: labels[v] || v };
                                      })
                                    : []}
                                  onChange={handleMultiSelectChange('authentication')}
                                  styles={getSecurityStyles('authentication')}
                                  className={getSecurityClassName('authentication', form.authentication)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                  Authentication methods used to verify user or system identities.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic authentication acceptable'}
                                        {form.dataClassification === 'internal' && 'Multi-factor authentication recommended'}
                                        {form.dataClassification === 'confidential' && 'Multi-factor and SSO authentication required'}
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
                                <Select
                                  id="authorisation"
                                  name="authorisation"
                                  isMulti
                                  options={[
                                    { value: 'basic', label: 'Basic permissions' },
                                    { value: 'rbac', label: 'Role-Based Access Control (RBAC)' },
                                    { value: 'abac', label: 'Attribute-Based Access Control (ABAC)' },
                                    { value: 'pbac', label: 'Policy-Based Access Control (PBAC)' },
                                    { value: 'dac', label: 'Discretionary Access Control (DAC)' },
                                    { value: 'mac', label: 'Mandatory Access Control (MAC)' },
                                    { value: 'pam', label: 'Privileged Access Management (PAM)' },
                                    { value: 'zero-trust', label: 'Zero Trust Architecture' },
                                    { value: 'time-based', label: 'Time-based Access Control' },
                                    { value: 'geolocation-based', label: 'Geolocation-Based Access Control' },
                                    { value: 'context-aware', label: 'Context-Aware Access Control' }
                                  ]}
                                  value={Array.isArray(form.authorisation)
                                    ? form.authorisation.map(v => {
                                        const labels = {
                                          'basic': 'Basic permissions',
                                          'rbac': 'Role-Based Access Control (RBAC)',
                                          'abac': 'Attribute-Based Access Control (ABAC)',
                                          'pam': 'Privileged Access Management (PAM)',
                                          'zero-trust': 'Zero Trust Architecture',
                                          'geolocation-based': 'Geolocation-Based Access Control',
                                          'pbac': 'Policy-Based Access Control (PBAC)',
                                          'dac': 'Discretionary Access Control (DAC)',
                                          'mac': 'Mandatory Access Control (MAC)',
                                          'time-based': 'Time-based Access Control',
                                          'context-aware': 'Context-Aware Access Control'
                                        };
                                        return { value: v, label: labels[v] || v };
                                      })
                                    : []}
                                  onChange={handleMultiSelectChange('authorisation')}
                                  styles={getSecurityStyles('authorisation')}
                                  className={getSecurityClassName('authorisation', form.authorisation)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                  Authorisation models used to control access to data and resources.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
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
                                <Select
                                  id="identityManagement"
                                  name="identityManagement"
                                  isMulti
                                  options={[
                                    { value: 'third-party-non-federated', label: 'Third-Party Application (No Federation)' },
                                    { value: 'application-managed-shared', label: 'Application-Managed Shared Accounts' },
                                    { value: 'application-managed-individual', label: 'Application-Managed Individual Accounts' },
                                    { value: 'social-login', label: 'Social Login (Google, Microsoft, etc.)' },
                                    { value: 'decentralised', label: 'Decentralised Identity (DID, blockchain-based)' },
                                    { value: 'federated', label: 'Federated Identity (SAML, OAuth / OIDC, etc.)' },
                                    { value: 'scim', label: 'SCIM (System for Cross-domain Identity Management)' },
                                    { value: 'hybrid-approach', label: 'Hybrid Approach (Multiple Identity Sources)' },   
                                    { value: 'database-managed-shared', label: 'Database-Managed Shared/Generic Users' },
                                    { value: 'database-managed-individual', label: 'Database-Managed Individual Users' },
                                    { value: 'centrally-managed-delegated', label: 'Centrally Managed with Delegated Permissions' },
                                    { value: 'centrally-managed-service', label: 'Centrally Managed Service Accounts (Federated)' },
                                    { value: 'centrally-managed-individual', label: 'Centrally Managed Individual Identities (AD/Entra ID/LDAP)' },
                                    { value: 'delegated', label: 'Delegated Identity Management' },
                                    { value: 'service-to-service', label: 'Service-to-Service Authentication (API Keys/Certificates)' },
                                    { value: 'just-in-time', label: 'Just-In-Time (JIT) Access Provisioning' },
                                    { value: 'break-glass', label: 'Break-Glass Emergency Access' },                                 
                                    { value: 'iga', label: 'Identity Governance & Administration (IGA)' },
                                    { value: 'custom', label: 'Custom/Other' }
                                  ]}
                                  value={Array.isArray(form.identityManagement)
                                    ? form.identityManagement.map(v => {
                                        const labels = {
                                          'social-login': 'Social Login (Google, Microsoft, etc.)',
                                          'decentralised': 'Decentralised Identity (DID, blockchain-based)',
                                          'federated': 'Federated Identity (SAML, OAuth / OIDC, etc.)',
                                          'scim': 'SCIM (System for Cross-domain Identity Management)',
                                          'centrally-managed-delegated': 'Centrally Managed with Delegated Permissions',
                                          'centrally-managed-service': 'Centrally Managed Service Accounts (Federated)',
                                          'centrally-managed-individual': 'Centrally Managed Individual Identities (AD/Entra ID/LDAP)',
                                          'application-managed-individual': 'Application-Managed Individual Accounts',
                                          'application-managed-shared': 'Application-Managed Shared Accounts',
                                          'database-managed-individual': 'Database-Managed Individual Users',
                                          'database-managed-shared': 'Database-Managed Shared/Generic Users',
                                          'third-party-non-federated': 'Third-Party Application (No Federation)',
                                          'delegated': 'Delegated Identity Management',
                                          'service-to-service': 'Service-to-Service Authentication (API Keys/Certificates)',
                                          'just-in-time': 'Just-In-Time (JIT) Access Provisioning',
                                          'break-glass': 'Break-Glass Emergency Access',
                                          'hybrid-approach': 'Hybrid Approach (Multiple Identity Sources)',
                                          'iga': 'Identity Governance & Administration (IGA)',
                                          'custom': 'Custom/Other'
                                        };
                                        return { value: v, label: labels[v] || v };
                                      })
                                    : []}
                                  onChange={handleMultiSelectChange('identityManagement')}
                                  styles={getSecurityStyles('identityManagement')}
                                  className={getSecurityClassName('identityManagement', form.identityManagement)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                  Identity management and access patterns used to manage user identities and access.
                                </small>
                                <small className="dc-field-hint">
                                  <strong>Identity Management Patterns:</strong><br/>
                                  • <strong>Centrally Managed:</strong> Single source of truth (AD, Entra ID, LDAP) with federation<br/>
                                  • <strong>Federated:</strong> External identity providers using SAML, OAuth, OIDC<br/>
                                  • <strong>SCIM:</strong> Automated user provisioning and deprovisioning across domains<br/>
                                  • <strong>Delegated:</strong> Permissions granted through delegation rather than direct assignment<br/>
                                  • <strong>Decentralised:</strong> User-controlled identities using blockchain or DID<br/>
                                  • <strong>Social Login:</strong> Third-party identity providers (Google, Microsoft, etc.)<br/>
                                  • <strong>Application-Managed:</strong> Local application user stores without central federation<br/>
                                  • <strong>Database-Managed:</strong> Database-specific user accounts and permissions<br/>
                                  • <strong>Individual vs Shared:</strong> Unique personal accounts vs shared/generic accounts<br/>
                                  • <strong>Third-Party Non-Federated:</strong> External apps without identity federation<br/>
                                  • <strong>Service-to-Service:</strong> System authentication using certificates, API keys, or tokens<br/>
                                  • <strong>Just-In-Time (JIT):</strong> On-demand access provisioning for temporary needs<br/>
                                  • <strong>Break-Glass:</strong> Emergency access accounts with elevated privileges<br/>
                                  • <strong>IGA:</strong> Identity Governance & Administration for compliance and oversight<br/>
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic identity management acceptable - consider centralised for better governance'}
                                        {form.dataClassification === 'internal' && 'Centrally managed identities recommended - avoid shared accounts where possible'}
                                        {form.dataClassification === 'confidential' && 'Centrally managed individual identities required - no shared accounts except for emergency break-glass'}
                                        {form.dataClassification === 'restricted' && 'Centrally managed with JIT access + delegated permissions - all access must be individually attributed and time-limited'}
                                    </small>
                                )}
                                <FieldWarning fieldName="identityManagement" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Specific Access Controls:</label>
                              </td>
                              <td>
                                <textarea
                                  id="specificAccessControls"
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
                              <td colSpan="2">
                                <small className="dc-field-hint">
                                Select the appropriate security controls based on your data classification and organisational requirements.
                                </small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Web Application Firewall (WAF) - Ingress Protection:</label>
                              </td>
                              <td>
                                <Select
                                  id="wafControls"
                                  name="wafControls"
                                  isMulti
                                  options={[
                                    { value: 'none', label: 'No WAF' },
                                    { value: 'basic', label: 'Basic WAF protection (HTTP/HTTPS only)' },
                                    { value: 'standard', label: 'Standard OWASP ruleset (with TLS inspection)' },
                                    { value: 'advanced', label: 'Advanced threat protection (API security)' },
                                    { value: 'enterprise', label: 'Enterprise WAF with bot protection (full HTTP analysis)' },
                                    { value: 'distributed', label: 'Distributed WAF (multi-region protection)' },
                                    { value: 'api-protection', label: 'WAF with API Protection' },
                                    { value: 'bot-management', label: 'WAF with Bot Management' },
                                    { value: 'ddos-mitigation', label: 'WAF with DDoS Mitigation' },
                                    { value: 'rate-limiting', label: 'WAF with Rate Limiting' }
                                  ]}
                                  value={Array.isArray(form.wafControls)
                                    ? form.wafControls.map(v => {
                                        const labels = {
                                          'none': 'No WAF',
                                          'basic': 'Basic WAF protection (HTTP/HTTPS only)',
                                          'standard': 'Standard OWASP ruleset (with TLS inspection)',
                                          'advanced': 'Advanced threat protection (API security)',
                                          'enterprise': 'Enterprise WAF with bot protection (full HTTP analysis)',
                                          'api-protection': 'WAF with API Protection',
                                          'bot-management': 'WAF with Bot Management',
                                          'ddos-mitigation': 'WAF with DDoS Mitigation',
                                          'rate-limiting': 'WAF with Rate Limiting',
                                          'distributed': 'Distributed WAF (multi-region protection)'
                                        };
                                        return { value: v, label: labels[v] || v };
                                      })
                                    : []}
                                  onChange={handleMultiSelectChange('wafControls')}
                                  styles={getSecurityStyles('wafControls')}
                                  className={getSecurityClassName('wafControls', form.wafControls)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                  Protects web applications and APIs from common threats and vulnerabilities by filtering and monitoring HTTP/HTTPS traffic.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic WAF acceptable for HTTP/HTTPS traffic'}
                                        {form.dataClassification === 'internal' && 'Standard OWASP ruleset recommended with TLS inspection'}
                                        {form.dataClassification === 'confidential' && 'Advanced threat protection required with API security'}
                                        {form.dataClassification === 'restricted' && 'Enterprise WAF with bot protection and full HTTP analysis strongly recommended'}
                                    </small>
                                )}
                                <FieldWarning fieldName="wafControls" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">API Security Gateway:</label>
                              </td>
                              <td>
                                <Select
                                  id="apiSecurityGateway"
                                  name="apiSecurityGateway"
                                  isMulti
                                  options={[
                                    { value: 'none', label: 'No API Gateway' },
                                    { value: 'basic', label: 'API Gateway with rate limiting' },
                                    { value: 'standard', label: 'API Security Gateway with threat protection' },
                                    { value: 'owasp-api', label: 'Advanced API Security (OWASP API Top 10)' },
                                    { value: 'graphql', label: 'GraphQL Security Controls' },
                                    { value: 'api-specs', label: 'API Specifications (WSDL/SOAP, OpenAPI/REST, etc.)' },
                                    { value: 'runtime-protection', label: 'API Runtime Protection' }
                                  ]}
                                  value={Array.isArray(form.apiSecurityGateway)
                                    ? form.apiSecurityGateway.map(v => {
                                        const labels = {
                                          'none': 'No API Gateway',
                                          'basic': 'API Gateway with rate limiting',
                                          'standard': 'API Security Gateway with threat protection',
                                          'owasp-api': 'Advanced API Security (OWASP API Top 10)',
                                          'graphql': 'GraphQL Security Controls',
                                          'api-specs': 'API Specifications (WSDL/SOAP, OpenAPI/REST, etc.)',
                                          'runtime-protection': 'API Runtime Protection'
                                        };
                                        return { value: v, label: labels[v] || v };
                                      })
                                    : []}
                                  onChange={handleMultiSelectChange('apiSecurityGateway')}
                                  styles={getSecurityStyles('apiSecurityGateway')}
                                  className={getSecurityClassName('apiSecurityGateway', form.apiSecurityGateway)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                  Protects REST, SOAP, GraphQL, and other API endpoints with authentication, authorisation, rate limiting, and threat detection.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Basic API Gateway acceptable for rate limiting'}  
                                      {form.dataClassification === 'internal' && 'API Security Gateway with threat protection recommended'}
                                      {form.dataClassification === 'confidential' && 'Advanced API Security (OWASP API Top 10) required'}
                                      {form.dataClassification === 'restricted' && 'API Runtime Protection with strict API specifications strongly recommended'}
                                  </small>
                                )}
                                <FieldWarning fieldName="apiSecurityGateway" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Loss Prevention (DLP) - Egress Protection:</label>
                              </td>
                              <td>
                                <Select
                                  id="dlpControls"
                                  name="dlpControls"
                                  isMulti
                                  options={[
                                    { value: 'none', label: 'No DLP' },
                                    { value: 'basic', label: 'Basic content inspection (email, web)' },
                                    { value: 'advanced', label: 'Advanced pattern detection with fingerprinting (all protocols)' },
                                    { value: 'network', label: 'Network behaviour analysis (all protocols)' },
                                    { value: 'comprehensive', label: 'Comprehensive DLP suite (network + endpoint)' },
                                    { value: 'ocr', label: 'Optical Character Recognition (OCR) DLP' },
                                    { value: 'ueba', label: 'User Entity and Behaviour Analytics (UEBA) DLP' },
                                    { value: 'enterprise', label: 'Enterprise DLP with ML/AI (all traffic types)' }
                                  ]}
                                  value={Array.isArray(form.dlpControls)
                                    ? form.dlpControls.map(v => {
                                        const labels = {
                                          'none': 'No DLP',
                                          'basic': 'Basic content inspection (email, web)',
                                          'advanced': 'Advanced pattern detection with fingerprinting (all protocols)',
                                          'network': 'Network behaviour analysis (all protocols)',
                                          'comprehensive': 'Comprehensive DLP suite (network + endpoint)',
                                          'ocr': 'Optical Character Recognition (OCR) DLP',
                                          'ueba': 'User Entity and Behaviour Analytics (UEBA) DLP',
                                          'enterprise': 'Enterprise DLP with ML/AI (all traffic types)'
                                        };
                                        return { value: v, label: labels[v] || v };
                                      })
                                    : []}
                                  onChange={handleMultiSelectChange('dlpControls')}
                                  styles={getSecurityStyles('dlpControls')}
                                  className={getSecurityClassName('dlpControls', form.dlpControls)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                  Prevents sensitive data exfiltration by monitoring and controlling outbound data flows across email, web, FTP, APIs, and cloud uploads.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br />
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
                                <label className="dc-form-label">Privileged Session Management:</label>
                              </td>
                              <td>
                                <select
                                  id="privilegedSessionManagement"
                                  name="privilegedSessionManagement"
                                  value={form.privilegedSessionManagement}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('privilegedSessionManagement') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select session management...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'privilegedSessionManagement', form.dataClassification)}>No session recording</option>
                                  <option value="basic-logging" className={getOptionSecurityClass('basic-logging', 'privilegedSessionManagement', form.dataClassification)}>Basic session logging</option>
                                  <option value="full-recording" className={getOptionSecurityClass('full-recording', 'privilegedSessionManagement', form.dataClassification)}>Full session recording (keystrokes)</option>
                                  <option value="real-time-monitoring" className={getOptionSecurityClass('real-time-monitoring', 'privilegedSessionManagement', form.dataClassification)}>Real-time session monitoring</option>
                                  <option value="ai-analytics" className={getOptionSecurityClass('ai-analytics', 'privilegedSessionManagement', form.dataClassification)}>Session analytics with AI</option>
                                </select>
                                <small className="dc-field-hint">
                                  Controls for monitoring and recording privileged sessions (PAM/PSM).
                                </small>                              
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Basic session logging acceptable'}
                                      {form.dataClassification === 'internal' && 'Full session recording recommended'}
                                      {form.dataClassification === 'confidential' && 'Real-time session monitoring required'}
                                      {form.dataClassification === 'restricted' && 'AI-driven session analytics strongly recommended'}
                                  </small>
                                )}
                                <FieldWarning fieldName="privilegedSessionManagement" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Threat Intelligence Integration:</label>
                              </td>
                              <td>
                                <select
                                  id="threatIntelligenceIntegration"
                                  name="threatIntelligenceIntegration"
                                  value={form.threatIntelligenceIntegration}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('threatIntelligenceIntegration') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select TI integration...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'threatIntelligenceIntegration', form.dataClassification)}>No TI integration</option>
                                  <option value="basic-feeds" className={getOptionSecurityClass('basic-feeds', 'threatIntelligenceIntegration', form.dataClassification)}>Basic threat intel feeds (manual)</option>
                                  <option value="enhanced-feeds" className={getOptionSecurityClass('enhanced-feeds', 'threatIntelligenceIntegration', form.dataClassification)}>Enhanced threat intel feeds (automated)</option>
                                  <option value="siem-integration" className={getOptionSecurityClass('siem-integration', 'threatIntelligenceIntegration', form.dataClassification)}>SIEM-integrated TI feeds</option>
                                  <option value="tip-platform" className={getOptionSecurityClass('tip-platform', 'threatIntelligenceIntegration', form.dataClassification)}>Threat Intelligence Platform (TIP) integration</option>
                                  <option value="automated-enrichment" className={getOptionSecurityClass('automated-enrichment', 'threatIntelligenceIntegration', form.dataClassification)}>Automated Indicator of Compromise (IOC) enrichment and blocking</option>
                                </select>
                                <small className="dc-field-hint">
                                  Integrate external threat intel to enrich detections and automate response.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Basic threat intel feeds sufficient'}
                                      {form.dataClassification === 'internal' && 'Enhanced threat intel feeds recommended'}
                                      {form.dataClassification === 'confidential' && 'Real-time threat intel integration required'}
                                      {form.dataClassification === 'restricted' && 'Automated threat intel enrichment strongly recommended'}
                                  </small>
                                )}
                                <FieldWarning fieldName="threatIntelligenceIntegration" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">SOAR (Security Orchestration, Automation & Response):</label>
                              </td>
                              <td>
                                <select
                                  id="soar"
                                  name="soar"
                                  value={form.soar}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('soar') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select SOAR capability...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'soar', form.dataClassification)}>No SOAR</option>
                                  <option value="manual-processes" className={getOptionSecurityClass('manual-processes', 'soar', form.dataClassification)}>Manual incident processes</option>
                                  <option value="basic-playbooks" className={getOptionSecurityClass('basic-playbooks', 'soar', form.dataClassification)}>Basic playbooks (semi-automated)</option>
                                  <option value="siem-orchestration" className={getOptionSecurityClass('siem-orchestration', 'soar', form.dataClassification)}>SIEM-integrated orchestration</option>
                                  <option value="automated-response" className={getOptionSecurityClass('automated-response', 'soar', form.dataClassification)}>Automated response & enrichment</option>
                                  <option value="full-platform" className={getOptionSecurityClass('full-platform', 'soar', form.dataClassification)}>Full SOAR platform with case management</option>
                                </select>
                                <small className="dc-field-hint">
                                  Orchestrate and automate incident response workflows to improve efficiency and reduce response times
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Basic playbooks sufficient'}
                                      {form.dataClassification === 'internal' && 'Enhanced playbooks recommended'}
                                      {form.dataClassification === 'confidential' && 'Real-time playbook automation required'}
                                      {form.dataClassification === 'restricted' && 'Full SOAR platform strongly recommended'}
                                  </small>
                                )}
                                <FieldWarning fieldName="soar" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">SIEM (Security Information & Event Management):</label>
                              </td>
                              <td>
                                <select
                                  id="siem"
                                  name="siem"
                                  value={form.siem}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('siem') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select SIEM capability...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'siem', form.dataClassification)}>No SIEM</option>
                                  <option value="log-aggregation" className={getOptionSecurityClass('log-aggregation', 'siem', form.dataClassification)}>Log aggregation only</option>
                                  <option value="basic-correlation" className={getOptionSecurityClass('basic-correlation', 'siem', form.dataClassification)}>Basic rules/correlation</option>
                                  <option value="advanced-detections" className={getOptionSecurityClass('advanced-detections', 'siem', form.dataClassification)}>Advanced detections (UEBA, ML)</option>
                                  <option value="ti-integrated" className={getOptionSecurityClass('ti-integrated', 'siem', form.dataClassification)}>Threat intel-integrated SIEM</option>
                                  <option value="soar-integrated" className={getOptionSecurityClass('soar-integrated', 'siem', form.dataClassification)}>SOAR-integrated workflows</option>
                                  <option value="cloud-native" className={getOptionSecurityClass('cloud-native', 'siem', form.dataClassification)}>Cloud-native SIEM</option>
                                  <option value="mdr-xdr" className={getOptionSecurityClass('mdr-xdr', 'siem', form.dataClassification)}>MDR/XDR integration</option>
                                </select>
                                <small className="dc-field-hint">
                                  Centralise logs, correlate events, and enhance detections with UEBA/TI.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Basic correlation sufficient'}
                                      {form.dataClassification === 'internal' && 'Advanced detections recommended'}
                                      {form.dataClassification === 'confidential' && 'Real-time threat intel integration required'}
                                      {form.dataClassification === 'restricted' && 'MDR/XDR integration strongly recommended'}
                                  </small>
                                )}
                                <FieldWarning fieldName="siem" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Threat Modeling</label>
                              </td>
                              <td>
                                <Select
                                  id="threatModeling"
                                  name="threatModeling"
                                  isMulti
                                  options={[
                                    { value: 'none', label: 'No threat modeling' },
                                    { value: 'ad-hoc', label: 'Ad-hoc / informal' },
                                    { value: 'periodic-review', label: 'Periodic design review' },
                                    { value: 'dev-integrated', label: 'Integrated into SDLC / DevSecOps' },
                                    { value: 'automated', label: 'Automated tooling integrated' },
                                    { value: 'continuous', label: 'Continuous threat modeling' }
                                  ]}
                                  value={Array.isArray(form.threatModeling)
                                    ? form.threatModeling.map(v => {
                                        const labels = {
                                          'none': 'No threat modeling',
                                          'ad-hoc': 'Ad-hoc / informal',
                                          'periodic-review': 'Periodic design review',
                                          'dev-integrated': 'Integrated into SDLC / DevSecOps',
                                          'automated': 'Automated tooling integrated',
                                          'continuous': 'Continuous threat modeling'
                                        };
                                        return { value: v, label: labels[v] || v };
                                      })
                                    : []}
                                  onChange={handleMultiSelectChange('threatModeling')}
                                  styles={getSecurityStyles('threatModeling')}
                                  className={getSecurityClassName('threatModeling', form.threatModeling)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                  Structured approaches and tooling to identify threats and guide design decisions. Also see <a href="../threatmodel" target="_blank" rel="noopener noreferrer">Threat Model Form</a>.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Ad-hoc threat modelling sufficient'}
                                      {form.dataClassification === 'internal' && 'DevSecOps integration recommended'}
                                      {form.dataClassification === 'confidential' && 'Automated tooling integration required'}
                                      {form.dataClassification === 'restricted' && 'Continuous threat modelling strongly recommended'}
                                  </small>
                                )}
                                <FieldWarning fieldName="threatModeling" />
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
                                  className={getFieldWarning('casbControls') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select CASB protection...</option>
                                        <option value="none" className={getOptionSecurityClass('none', 'casbControls', form.dataClassification)}>No CASB</option>
                                        <option value="basic" className={getOptionSecurityClass('basic', 'casbControls', form.dataClassification)}>Basic cloud visibility (API-based)</option>
                                        <option value="standard" className={getOptionSecurityClass('standard', 'casbControls', form.dataClassification)}>Standard CASB controls (HTTP/HTTPS)</option>
                                        <option value="advanced" className={getOptionSecurityClass('advanced', 'casbControls', form.dataClassification)}>Advanced threat protection (inline proxy)</option>
                                        <option value="comprehensive" className={getOptionSecurityClass('comprehensive', 'casbControls', form.dataClassification)}>Comprehensive CASB suite (all cloud services)</option>
                                    </select>
                                    <small className="dc-field-hint">
                                        Monitors and secures cloud service usage by enforcing security policies across SaaS, PaaS, and IaaS platforms.
                                    </small>
                                    {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && 'Basic cloud visibility acceptable'}
                                          {form.dataClassification === 'internal' && 'Standard CASB controls recommended'}
                                          {form.dataClassification === 'confidential' && 'Advanced threat protection required'}
                                          {form.dataClassification === 'restricted' && 'Consider SSE/SASE for comprehensive coverage'}
                                      </small>
                                    )}
                                  <FieldWarning fieldName="casbControls" />
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
                                  className={getFieldWarning('sseControls') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select SSE protection...</option>
                                      <option value="none" className={getOptionSecurityClass('none', 'sseControls', form.dataClassification)}>No SSE</option>
                                      <option value="basic" className={getOptionSecurityClass('basic', 'sseControls', form.dataClassification)}>Basic SSE (CASB + SWG)</option>
                                      <option value="standard" className={getOptionSecurityClass('standard', 'sseControls', form.dataClassification)}>Standard SSE (CASB + SWG + ZTNA)</option>
                                      <option value="advanced" className={getOptionSecurityClass('advanced', 'sseControls', form.dataClassification)}>Advanced SSE with FWaaS</option>
                                      <option value="comprehensive" className={getOptionSecurityClass('comprehensive', 'sseControls', form.dataClassification)}>Comprehensive SSE platform</option>
                                      <option value="sase" className={getOptionSecurityClass('sase', 'sseControls', form.dataClassification)}>Full SASE architecture</option>
                                </select>
                                <small className="dc-field-hint">
                                  Cloud-delivered security services including CASB, Secure Web Gateway (SWG), ZTNA, and FWaaS to protect cloud egress traffic.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic SSE acceptable for cloud-first organisations'}
                                        {form.dataClassification === 'internal' && 'Standard SSE with ZTNA recommended'}
                                        {form.dataClassification === 'confidential' && 'Advanced SSE with FWaaS required'}
                                        {form.dataClassification === 'restricted' && 'Full SASE architecture required'}
                                    </small>
                                )}
                                <FieldWarning fieldName="sseControls" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Cloud Network Security</label>
                              </td>
                              <td>
                                <Select
                                    id="cloudNetworkSecurity"
                                    name="cloudNetworkSecurity"
                                    isMulti
                                    options={[
                                        { value: 'none', label: 'No cloud network controls' },
                                        { value: 'basic', label: 'Basic VPC/VNet with security groups' },
                                        { value: 'standard', label: 'VPC + Private subnets + NAT Gateway' },
                                        { value: 'advanced', label: 'Private endpoints + VPN Gateway + Network ACLs' },
                                        { value: 'comprehensive', label: 'Service mesh + Private Link + Transit Gateway' },
                                        { value: 'comprehensive+', label: 'Dedicated NVAs (virtual firewalls, IDS/IPS), direct ExpressRoute/Direct Connect/Interconnect' },
                                        { value: 'zero-trust', label: 'Zero Trust with ZTNA + micro-segmentation' }
                                    ]}
                                    value={Array.isArray(form.cloudNetworkSecurity)
                                        ? form.cloudNetworkSecurity.map(v => {
                                            const labels = {
                                                'none': 'No cloud network controls',
                                                'basic': 'Basic VPC/VNet with security groups',
                                                'standard': 'VPC + Private subnets + NAT Gateway',
                                                'advanced': 'Private endpoints + VPN Gateway + Network ACLs',
                                                'comprehensive': 'Service mesh + Private Link + Transit Gateway',
                                                'comprehensive+': 'Dedicated NVAs (virtual firewalls, IDS/IPS), direct ExpressRoute/Direct Connect/Interconnect',
                                                'zero-trust': 'Zero Trust with ZTNA + micro-segmentation'
                                            };
                                            return { value: v, label: labels[v] || v };
                                        })
                                        : []}
                                    onChange={handleMultiSelectChange('cloudNetworkSecurity')}
                                    styles={getSecurityStyles('cloudNetworkSecurity')}
                                    className={getSecurityClassName('cloudNetworkSecurity', form.cloudNetworkSecurity)}
                                    classNamePrefix="dc-select"
                                    placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                    Cloud network architecture and segmentation controls to protect workloads and data in cloud environments.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic VPC/VNet with security groups acceptable'}
                                        {form.dataClassification === 'internal' && 'Private subnets with NAT Gateway recommended'}
                                        {form.dataClassification === 'confidential' && 'Private endpoints and VPN Gateway required'}
                                        {form.dataClassification === 'restricted' && 'Zero Trust with micro-segmentation required'}
                                    </small>
                                )}
                                <FieldWarning fieldName="cloudNetworkSecurity" />
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
                                    className={getFieldWarning('sdwanControls') ? 'dc-field-warning' : 'dc-select'}
                                >
                                    <option value="">Select SD-WAN implementation...</option>
                                      <option value="traditional-wan" className={getOptionSecurityClass('traditional-wan', 'sdwanControls', form.dataClassification)}>Traditional WAN (no SD-WAN)</option>
                                      <option value="mpls" className={getOptionSecurityClass('mpls', 'sdwanControls', form.dataClassification)}>MPLS network</option>
                                      <option value="basic" className={getOptionSecurityClass('basic', 'sdwanControls', form.dataClassification)}>Basic SD-WAN (centralised control)</option>
                                      <option value="vpn" className={getOptionSecurityClass('vpn', 'sdwanControls', form.dataClassification)}>VPN-based connectivity</option>
                                      <option value="standard" className={getOptionSecurityClass('standard', 'sdwanControls', form.dataClassification)}>Standard SD-WAN with encryption</option>
                                      <option value="advanced" className={getOptionSecurityClass('advanced', 'sdwanControls', form.dataClassification)}>Advanced SD-WAN with security functions</option>
                                      <option value="secure" className={getOptionSecurityClass('secure', 'sdwanControls', form.dataClassification)}>Secure SD-WAN with integrated security</option>
                                      <option value="sase-integrated" className={getOptionSecurityClass('sase-integrated', 'sdwanControls', form.dataClassification)}>SASE-integrated SD-WAN</option>
                                  </select>
                                  <small className="dc-field-hint">
                                      Software-defined networking to optimise and secure WAN connectivity across branch offices, data centres, and clouds.
                                  </small>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && 'Traditional WAN or VPN acceptable, basic SD-WAN beneficial for efficiency'}
                                          {form.dataClassification === 'internal' && 'VPN or standard SD-WAN with encryption recommended'}
                                          {form.dataClassification === 'confidential' && 'Secure VPN or advanced SD-WAN with integrated security required'}
                                          {form.dataClassification === 'restricted' && 'SASE-integrated SD-WAN mandatory for Zero Trust architecture'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="sdwanControls" />
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
                                  className={getFieldWarning('saseArchitecture') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select SASE implementation...</option>
                                      <option value="none" className={getOptionSecurityClass('none', 'saseArchitecture', form.dataClassification)}>Traditional security stack (no SASE)</option>
                                      <option value="partial" className={getOptionSecurityClass('partial', 'saseArchitecture', form.dataClassification)}>Partial SASE (SSE components)</option>
                                      <option value="hybrid" className={getOptionSecurityClass('hybrid', 'saseArchitecture', form.dataClassification)}>Hybrid SASE (cloud + on-premises)</option>
                                      <option value="cloud-native" className={getOptionSecurityClass('cloud-native', 'saseArchitecture', form.dataClassification)}>Cloud-native SASE</option>
                                      <option value="full-sase" className={getOptionSecurityClass('full-sase', 'saseArchitecture', form.dataClassification)}>Full SASE with SD-WAN</option>
                                      <option value="zero-trust-sase" className={getOptionSecurityClass('zero-trust-sase', 'saseArchitecture', form.dataClassification)}>Zero Trust SASE platform</option>
                                  </select>
                                  <small className="dc-field-hint">
                                      Network + Security convergence: Secure Access Service Edge (SASE) architecture combining SD-WAN, SSE, and Zero Trust networking and security functions in the cloud.
                                  </small>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && 'Traditional stack acceptable, consider partial SASE for efficiency'}
                                          {form.dataClassification === 'internal' && 'Hybrid SASE recommended for modern organisations'}
                                          {form.dataClassification === 'confidential' && 'Cloud-native SASE with strong controls required'}
                                          {form.dataClassification === 'restricted' && 'Zero Trust SASE platform mandatory'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="saseArchitecture" />
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
                                    className={getFieldWarning('zeroTrustMaturity') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select Zero Trust maturity...</option>
                                      <option value="traditional" className={getOptionSecurityClass('traditional', 'zeroTrustMaturity', form.dataClassification)}>Traditional perimeter security</option>
                                      <option value="initial" className={getOptionSecurityClass('initial', 'zeroTrustMaturity', form.dataClassification)}>Initial ZT (identity-based access)</option>
                                      <option value="developing" className={getOptionSecurityClass('developing', 'zeroTrustMaturity', form.dataClassification)}>Developing ZT (device + identity)</option>
                                      <option value="defined" className={getOptionSecurityClass('defined', 'zeroTrustMaturity', form.dataClassification)}>Defined ZT (micro-segmentation)</option>
                                      <option value="managed" className={getOptionSecurityClass('managed', 'zeroTrustMaturity', form.dataClassification)}>Managed ZT (continuous verification)</option>
                                      <option value="optimised" className={getOptionSecurityClass('optimised', 'zeroTrustMaturity', form.dataClassification)}>Optimised ZT (ML/AI-driven)</option>
                                  </select>
                                  <small className="dc-field-hint">
                                      Never trust, always verify. Maturity level of Zero Trust architecture and principles within the organisation.
                                  </small>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && 'Traditional security acceptable, ZT beneficial'}
                                          {form.dataClassification === 'internal' && 'Developing ZT recommended (device + identity)'}
                                          {form.dataClassification === 'confidential' && 'Defined ZT required (micro-segmentation)'}
                                          {form.dataClassification === 'restricted' && 'Managed or Optimised ZT mandatory'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="zeroTrustMaturity" />
                              </td>                            
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Network Security Controls - All Protocols</label>
                              </td>
                              <td>
                                <Select
                                    id="networkSecurity"
                                    name="networkSecurity"
                                    isMulti
                                    options={[
                                        { value: 'basic', label: 'Basic firewall protection (port-based rules)' },
                                        { value: 'standard', label: 'Network segmentation + VLANs' },
                                        { value: 'advanced', label: 'Advanced IDS/IPS (all protocols)' },
                                        { value: 'nac', label: 'Network Access Control (NAC)' },
                                        { value: 'ngfw', label: 'Next-Gen Firewall with DPI' },
                                        { value: 'dns-security', label: 'DNS Security & Filtering' },
                                        { value: 'email-gateway', label: 'Email Security Gateway' },
                                        { value: 'sdp', label: 'Software-Defined Perimeter (SDP)' },
                                        { value: 'zero-trust', label: 'Zero Trust network architecture' },
                                        { value: 'micro-segmentation', label: 'Micro-segmentation with ZTNA' }
                                    ]}
                                    value={Array.isArray(form.networkSecurity)
                                        ? form.networkSecurity.map(v => {
                                            const labels = {
                                                'basic': 'Basic firewall protection (port-based rules)',
                                                'standard': 'Network segmentation + VLANs',
                                                'advanced': 'Advanced IDS/IPS (all protocols)',
                                                'nac': 'Network Access Control (NAC)',
                                                'ngfw': 'Next-Gen Firewall with DPI',
                                                'dns-security': 'DNS Security & Filtering',
                                                'email-gateway': 'Email Security Gateway',
                                                'sdp': 'Software-Defined Perimeter (SDP)',
                                                'zero-trust': 'Zero Trust network architecture',
                                                'micro-segmentation': 'Micro-segmentation with ZTNA'
                                            };
                                            return { value: v, label: labels[v] || v };
                                        })
                                        : []}
                                    onChange={handleMultiSelectChange('networkSecurity')}
                                    styles={getSecurityStyles('networkSecurity')}
                                    className={getSecurityClassName('networkSecurity', form.networkSecurity)}
                                    classNamePrefix="dc-select"
                                    placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                    Network security controls covering all protocols including SSH, SFTP, FTP, SMTP, DNS, and encrypted tunnels.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic firewall protection acceptable'}
                                        {form.dataClassification === 'internal' && 'Network segmentation recommended'}
                                        {form.dataClassification === 'confidential' && 'Advanced IDS/IPS required'}
                                        {form.dataClassification === 'restricted' && 'Zero Trust or micro-segmentation required'}
                                    </small>
                                )}
                                <FieldWarning fieldName="networkSecurity" />
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
                                    className={getFieldWarning('protocolGapCoverage') ? 'dc-field-warning' : 'dc-select'}
                                >
                                    <option value="">Select protocol coverage...</option>
                                    <option value="none" className={getOptionSecurityClass('none', 'protocolGapCoverage', form.dataClassification)}>No coverage of non-HTTP protocols</option>
                                    <option value="basic" className={getOptionSecurityClass('basic', 'protocolGapCoverage', form.dataClassification)}>Basic monitoring (SFTP, SSH logging)</option>
                                    <option value="advanced" className={getOptionSecurityClass('advanced', 'protocolGapCoverage', form.dataClassification)}>Advanced DPI (all encrypted protocols)</option>
                                    <option value="comprehensive" className={getOptionSecurityClass('comprehensive', 'protocolGapCoverage', form.dataClassification)}>Comprehensive inspection + SSL/TLS breakout</option>
                                    <option value="endpoint" className={getOptionSecurityClass('endpoint', 'protocolGapCoverage', form.dataClassification)}>Endpoint-based protection (agent monitoring)</option>
                                </select>
                                <small className="dc-field-hint">
                                    Coverage of non-HTTP protocols often missed by traditional web security controls, including SFTP, SSH, VPN tunnels, and encrypted traffic not inspected by WAF/CASB.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic monitoring acceptable'}
                                        {form.dataClassification === 'internal' && 'Advanced DPI recommended'}
                                        {form.dataClassification === 'confidential' && 'Comprehensive inspection required'}
                                        {form.dataClassification === 'restricted' && 'Endpoint-based protection mandatory'}
                                    </small>
                                )}
                                <FieldWarning fieldName="protocolGapCoverage" />
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
                              <td colSpan="2">
                                <small className="dc-field-hint">
                                Select the appropriate application security controls based on your data classification and organisational requirements.
                                </small>
                              </td>
                            </tr>
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
                                    <option value="none" className={getOptionSecurityClass('none', 'antivirusControls', form.dataClassification)}>No antivirus</option>
                                    <option value="basic" className={getOptionSecurityClass('basic', 'antivirusControls', form.dataClassification)}>Basic antivirus (signature-based)</option>
                                    <option value="standard" className={getOptionSecurityClass('standard', 'antivirusControls', form.dataClassification)}>Standard endpoint protection</option>
                                    <option value="advanced" className={getOptionSecurityClass('advanced', 'antivirusControls', form.dataClassification)}>Advanced threat protection (behavioural analysis)</option>
                                    <option value="enterprise" className={getOptionSecurityClass('enterprise', 'antivirusControls', form.dataClassification)}>Enterprise EDR/XDR solution</option>
                                    <option value="next-gen" className={getOptionSecurityClass('next-gen', 'antivirusControls', form.dataClassification)}>Next-gen with AI/ML detection</option>
                                </select>
                                <small className="dc-field-hint">
                                    Protection against viruses, malware, ransomware, and advanced threats at the endpoint level.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic antivirus acceptable for low-risk environments'}
                                        {form.dataClassification === 'internal' && 'Standard endpoint protection recommended'}
                                        {form.dataClassification === 'confidential' && 'Advanced threat protection required'}
                                        {form.dataClassification === 'restricted' && 'Enterprise EDR/XDR with AI/ML detection mandatory'}
                                    </small>
                                )}
                                <FieldWarning fieldName="antivirusControls" />
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
                                  <option value="none" className={getOptionSecurityClass('none', 'vulnerabilityScanning', form.dataClassification)}>No vulnerability scanning</option>
                                  <option value="manual" className={getOptionSecurityClass('manual', 'vulnerabilityScanning', form.dataClassification)}>Manual/ad-hoc scanning</option>
                                  <option value="scheduled" className={getOptionSecurityClass('scheduled', 'vulnerabilityScanning', form.dataClassification)}>Scheduled automated scanning</option>
                                  <option value="continuous" className={getOptionSecurityClass('continuous', 'vulnerabilityScanning', form.dataClassification)}>Continuous vulnerability assessment</option>
                                  <option value="comprehensive" className={getOptionSecurityClass('comprehensive', 'vulnerabilityScanning', form.dataClassification)}>Comprehensive SAST/DAST/IAST</option>
                                  <option value="devsecops" className={getOptionSecurityClass('devsecops', 'vulnerabilityScanning', form.dataClassification)}>DevSecOps integrated scanning</option>
                              </select>
                              <small className="dc-field-hint">
                                  Vulnerability management practices to identify, assess, and remediate security weaknesses in applications and infrastructure.
                              </small>
                              {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Manual/ad-hoc scanning acceptable for non-critical systems'}
                                      {form.dataClassification === 'internal' && 'Scheduled automated scanning recommended'}
                                      {form.dataClassification === 'confidential' && 'Continuous vulnerability assessment required'}
                                      {form.dataClassification === 'restricted' && 'DevSecOps integrated scanning with SAST/DAST mandatory'}
                                  </small>
                              )}
                              <FieldWarning fieldName="vulnerabilityScanning" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Application Testing</label>
                              </td>
                              <td>
                                <Select
                                  id="applicationTesting"
                                  name="applicationTesting"
                                  isMulti
                                  options={[
                                    { value: 'unit-testing', label: 'Unit testing' },
                                    { value: 'tdd', label: 'Test-driven development (TDD)' },
                                    { value: 'integration-testing', label: 'Integration testing' },
                                    { value: 'e2e-testing', label: 'End-to-end (E2E) testing' },
                                    { value: 'performance-testing', label: 'Performance testing' },
                                    { value: 'load-testing', label: 'Load testing' },
                                    { value: 'stress-testing', label: 'Stress testing' },
                                    { value: 'soak-testing', label: 'Soak testing' },
                                    { value: 'scaling-testing', label: 'Scaling testing' },
                                    { value: 'chaos-testing', label: 'Chaos engineering / resilience testing' },
                                    { value: 'regression-testing', label: 'Regression testing' },
                                    { value: 'smoke-testing', label: 'Smoke testing' },
                                    { value: 'api-testing', label: 'API testing' },
                                    { value: 'mutation-testing', label: 'Mutation testing' },
                                    { value: 'contract-testing', label: 'Contract testing' },
                                    { value: 'property-testing', label: 'Property-based testing' },
                                    { value: 'bdd', label: 'Behaviour-driven development (BDD)' },
                                    { value: 'ui-testing', label: 'User Interface (UI) testing' },
                                    { value: 'ux-testing', label: 'User experience (UX) testing' },
                                    { value: 'usability-testing', label: 'Usability testing' },
                                    { value: 'accessibility-testing', label: 'Accessibility testing' },
                                    { value: 'functional-testing', label: 'Functional testing' },
                                    { value: 'acceptance-testing', label: 'User acceptance testing (UAT)' }
                                  ]}
                                  value={Array.isArray(form.applicationTesting) ? form.applicationTesting.map(v => ({ value: v, label: (
                                    {
                                      'unit-testing': 'Unit testing',
                                      'tdd': 'Test-driven development (TDD)',
                                      'integration-testing': 'Integration testing',
                                      'e2e-testing': 'End-to-end (E2E) testing',
                                      'performance-testing': 'Performance testing',
                                      'load-testing': 'Load testing',
                                      'stress-testing': 'Stress testing',
                                      'soak-testing': 'Soak testing',
                                      'scaling-testing': 'Scaling testing',
                                      'chaos-testing': 'Chaos engineering / resilience testing',
                                      'regression-testing': 'Regression testing',
                                      'smoke-testing': 'Smoke testing',
                                      'api-testing': 'API testing',
                                      'mutation-testing': 'Mutation testing',
                                      'contract-testing': 'Contract testing',
                                      'accessibility-testing': 'Accessibility testing',
                                      'property-testing': 'Property-based testing',
                                      'bdd': 'Behaviour-driven development (BDD)',
                                      'ui-testing': 'User Interface (UI) testing',
                                      'ux-testing': 'User experience (UX) testing',
                                      'usability-testing': 'Usability testing',
                                      'functional-testing': 'Functional testing',
                                      'acceptance-testing': 'User acceptance testing (UAT)',
                                    }[v] || v
                                  ) })) : []}
                                  onChange={handleMultiSelectChange('applicationTesting')}
                                  styles={getSecurityStyles('applicationTesting')}
                                  className={getSecurityClassName('applicationTesting', form.applicationTesting)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                  Testing methodologies to validate functionality, performance, resilience, and quality of an application.
                                </small>                              
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Basic testing rigor sufficient'}
                                      {form.dataClassification === 'internal' && 'Enhanced testing rigor recommended'}
                                      {form.dataClassification === 'confidential' && 'Real-time testing rigor required'}
                                      {form.dataClassification === 'restricted' && 'Comprehensive testing rigor strongly recommended'}
                                  </small>
                                )}
                                <FieldWarning fieldName="applicationTesting" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Application Security Testing</label>
                              </td>
                              <td>
                                <Select
                                  id="applicationSecurityTesting"
                                  name="applicationSecurityTesting"
                                  isMulti
                                  options={[
                                    { value: 'dast', label: 'Dynamic application security testing (DAST)' },
                                    { value: 'sast', label: 'Static application security testing (SAST)' },
                                    { value: 'iast', label: 'Interactive application security testing (IAST)' },
                                    { value: 'fuzzing', label: 'Fuzz testing' },
                                    { value: 'authz-tests', label: 'Authentication & authorisation tests' },
                                    { value: 'business-logic', label: 'Business logic abuse testing' },
                                    { value: 'rate-limit-tests', label: 'Rate limiting & throttling tests' },
                                    { value: 'contract-testing', label: 'Contract / schema testing (OpenAPI/Pact)' },
                                    { value: 'schema-validation', label: 'Schema / input validation checks' },
                                    { value: 'manual-pen-test', label: 'Manual application penetration tests' },
                                    { value: 'red-team', label: 'Adversary simulation / red team' },
                                    { value: 'purple-team', label: 'Purple team exercises' },
                                    { value: 'config-hardening-review', label: 'Configuration & hardening review (headers/TLS)' },
                                    { value: 'threat-model-validation', label: 'Threat model validation' },
                                    { value: 'runtime-profiling', label: 'Runtime behaviour & security profiling' },
                                    { value: 'rast', label: 'Runtime application self-protection (RASP)' },
                                    { value: 'ci-integration', label: 'CI integration (automated gates)' }
                                  ]}
                                  value={Array.isArray(form.applicationSecurityTesting) ? form.applicationSecurityTesting.map(v => ({ value: v, label: (
                                    {
                                      'dast': 'Dynamic application security testing (DAST)',
                                      'sast': 'Static application security testing (SAST)',
                                      'iast': 'Interactive application security testing (IAST)',
                                      'fuzzing': 'Fuzz testing',
                                      'authz-tests': 'Authentication & authorisation tests',
                                      'business-logic': 'Business logic abuse testing',
                                      'rate-limit-tests': 'Rate limiting & throttling tests',
                                      'contract-testing': 'Contract / schema testing (OpenAPI/Pact)',
                                      'schema-validation': 'Schema / input validation checks',
                                      'manual-pen-test': 'Manual application penetration tests',
                                      'red-team': 'Adversary simulation / red team',
                                      'purple-team': 'Purple team exercises',
                                      'config-hardening-review': 'Configuration & hardening review (headers/TLS)',
                                      'threat-model-validation': 'Threat model validation',
                                      'runtime-profiling': 'Runtime behaviour & security profiling',
                                      'rast': 'Runtime application self-protection (RASP)',
                                      'ci-integration': 'CI integration (automated gates)'
                                    }[v] || v
                                  ) })) : []}
                                  onChange={handleMultiSelectChange('applicationSecurityTesting')}
                                  styles={getSecurityStyles('applicationSecurityTesting')}
                                  className={getSecurityClassName('applicationSecurityTesting', form.applicationSecurityTesting)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                  Security testing techniques to identify vulnerabilities, misconfigurations, and weaknesses in applications.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Basic testing rigor sufficient'}
                                      {form.dataClassification === 'internal' && 'Enhanced testing rigor recommended'}
                                      {form.dataClassification === 'confidential' && 'Real-time testing rigor required'}
                                      {form.dataClassification === 'restricted' && 'Comprehensive testing rigor strongly recommended'}
                                  </small>
                                )}
                                <FieldWarning fieldName="applicationSecurityTesting" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Application Logging & Telemetry</label>
                              </td>
                              <td>
                                <select
                                  id="applicationLogging"
                                  name="applicationLogging"
                                  value={form.applicationLogging}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('applicationLogging') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select application logging...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'applicationLogging', form.dataClassification)}>No application logging</option>
                                  <option value="basic" className={getOptionSecurityClass('basic', 'applicationLogging', form.dataClassification)}>Basic log aggregation</option>
                                  <option value="structured" className={getOptionSecurityClass('structured', 'applicationLogging', form.dataClassification)}>Structured logging (JSON/semantic)</option>
                                  <option value="telemetry" className={getOptionSecurityClass('telemetry', 'applicationLogging', form.dataClassification)}>Telemetry + metrics (OpenTelemetry)</option>
                                  <option value="centralised" className={getOptionSecurityClass('centralised', 'applicationLogging', form.dataClassification)}>Centralised SIEM logging + retention</option>
                                  <option value="correlation" className={getOptionSecurityClass('correlation', 'applicationLogging', form.dataClassification)}>Correlation with tracing & APM</option>
                                  <option value="observability" className={getOptionSecurityClass('observability', 'applicationLogging', form.dataClassification)}>Full stack observability with PII redaction</option>
                                  <option value="forensic" className={getOptionSecurityClass('forensic', 'applicationLogging', form.dataClassification)}>Forensic-level telemetry</option>
                                </select>
                                <small className="dc-field-hint">
                                  Application logging and telemetry practices to monitor, analyse, and respond to application behaviour and security events.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Basic logging acceptable for low-risk applications'}
                                      {form.dataClassification === 'internal' && 'Structured logging recommended'}
                                      {form.dataClassification === 'confidential' && 'Centralised logging with correlation required'}
                                      {form.dataClassification === 'restricted' && 'Forensic-level telemetry mandatory'}
                                  </small>
                                )}
                                <FieldWarning fieldName="applicationLogging" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Secure Headers & Transport Configuration</label>
                              </td>
                              <td>
                                <Select
                                  id="secureHeadersTransport"
                                  name="secureHeadersTransport"
                                  isMulti
                                  options={[
                                    { value: 'hsts', label: 'HTTP Strict Transport Security (HSTS)' },
                                    { value: 'x-frame', label: 'X-Frame-Options / clickjacking protection' },
                                    { value: 'xxs-protection', label: 'X-XSS-Protection against cross-site scripting attacks' },
                                    { value: 'csp', label: 'Content Security Policy (CSP) to prevent XSS and data injection' },
                                    { value: 'x-content-type-options', label: 'X-Content-Type-Options to prevent MIME-sniffing' },
                                    { value: 'secure-cookies', label: 'Secure cookies (Secure, HttpOnly, SameSite)' },
                                    { value: 'access-control', label: 'Access-Control-Allow-Origin (CORS) settings' },
                                    { value: 'cors', label: 'CORS restrictions' },
                                    { value: 'referrer-policy', label: 'Referrer-Policy' },
                                    { value: 'same-origin-policy', label: 'Same-Origin Policy enforcement' },
                                    { value: 'cross-origin-opener', label: 'Cross-Origin-Opener-Policy (COOP)' },
                                    { value: 'cross-origin-embedder', label: 'Cross-Origin-Embedder-Policy (COEP)' },
                                    { value: 'cross-origin-resource', label: 'Cross-Origin-Resource-Policy (CORP)' },
                                    { value: 'permissions-policy', label: 'Permissions-Policy (formerly Feature-Policy)' },
                                    { value: 'floc-blocking', label: 'FLoC blocking headers' },
                                    { value: 'server-header', label: 'Server header minimisation' },
                                    { value: 'x-robots', label: 'X-Robots-Tag for SEO and indexing control' },
                                    { value: 'tls-min', label: 'TLS minimum version enforced (e.g., TLS1.2+)' },
                                    { value: 'tls-cipher-config', label: 'TLS cipher suite configuration' },
                                    { value: 'mtls', label: 'Mutual TLS (mTLS)' },
                                    { value: 'ocsp-stapling', label: 'OCSP Stapling' },
                                    { value: 'redirect-https', label: 'Automatic HTTPS redirect' }
                                  ]}
                                  value={Array.isArray(form.secureHeadersTransport)
                                    ? form.secureHeadersTransport.map(v => {
                                        const labels = {
                                          'hsts': 'HTTP Strict Transport Security (HSTS)',
                                          'x-frame': 'X-Frame-Options / clickjacking protection',
                                          'xxs-protection': 'X-XSS-Protection against cross-site scripting attacks',
                                          'csp': 'Content Security Policy (CSP) to prevent XSS and data injection',
                                          'x-content-type-options': 'X-Content-Type-Options to prevent MIME-sniffing',
                                          'secure-cookies': 'Secure cookies (Secure, HttpOnly, SameSite)',
                                          'access-control': 'Access-Control-Allow-Origin (CORS) settings',
                                          'cors': 'CORS restrictions',
                                          'referrer-policy': 'Referrer-Policy',
                                          'same-origin-policy': 'Same-Origin Policy enforcement',
                                          'cross-origin-opener': 'Cross-Origin-Opener-Policy (COOP)',
                                          'cross-origin-embedder': 'Cross-Origin-Embedder-Policy (COEP)',
                                          'cross-origin-resource': 'Cross-Origin-Resource-Policy (CORP)',
                                          'permissions-policy': 'Permissions-Policy (formerly Feature-Policy)',
                                          'floc-blocking': 'FLoC blocking headers',
                                          'server-header': 'Server header minimisation',
                                          'x-robots': 'X-Robots-Tag for SEO and indexing control',
                                          'tls-min': 'TLS minimum version enforced (e.g., TLS1.2+)',
                                          'tls-cipher-config': 'TLS cipher suite configuration',
                                          'mtls': 'Mutual TLS (mTLS)',
                                          'ocsp-stapling': 'OCSP Stapling',
                                          'redirect-https': 'Automatic HTTPS redirect'
                                        };
                                        return { value: v, label: labels[v] || v };
                                      })
                                    : []}
                                  onChange={handleMultiSelectChange('secureHeadersTransport')}
                                  styles={getSecurityStyles('secureHeadersTransport')}
                                  className={getSecurityClassName('secureHeadersTransport', form.secureHeadersTransport)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                  Security headers and transport configurations to protect against common web vulnerabilities and ensure secure communication.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Basic security headers sufficient'}
                                      {form.dataClassification === 'internal' && 'Enhanced header configurations recommended'}
                                      {form.dataClassification === 'confidential' && 'Comprehensive header & transport security required'}
                                      {form.dataClassification === 'restricted' && 'Strict header policies & transport security mandatory'}
                                  </small>
                                )}
                                <FieldWarning fieldName="secureHeadersTransport" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Session Management Hardening</label>
                              </td>
                              <td>
                                <select
                                  id="sessionManagementHardening"
                                  name="sessionManagementHardening"
                                  value={form.sessionManagementHardening}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('sessionManagementHardening') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select session hardening...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'sessionManagementHardening', form.dataClassification)}>No session hardening</option>
                                  <option value="short-timeouts" className={getOptionSecurityClass('short-timeouts', 'sessionManagementHardening', form.dataClassification)}>Short session timeouts</option>
                                  <option value="rotation" className={getOptionSecurityClass('rotation', 'sessionManagementHardening', form.dataClassification)}>Token rotation / refresh token rotation</option>
                                  <option value="secure-cookie" className={getOptionSecurityClass('secure-cookie', 'sessionManagementHardening', form.dataClassification)}>Secure cookies (HttpOnly, Secure, SameSite)</option>
                                  <option value="reauth" className={getOptionSecurityClass('reauth', 'sessionManagementHardening', form.dataClassification)}>Re-authentication for sensitive operations with step-up MFA</option>
                                  <option value="session-binding" className={getOptionSecurityClass('session-binding', 'sessionManagementHardening', form.dataClassification)}>Session binding to client fingerprint/IP</option>
                                  <option value="single-signout" className={getOptionSecurityClass('single-signout', 'sessionManagementHardening', form.dataClassification)}>Single logout / session revocation</option>
                                  <option value="idle-timeout" className={getOptionSecurityClass('idle-timeout', 'sessionManagementHardening', form.dataClassification)}>Idle timeout + absolute timeout</option>
                                  <option value="adaptive-session" className={getOptionSecurityClass('adaptive-session', 'sessionManagementHardening', form.dataClassification)}>Adaptive session management (risk-based)</option>
                                </select>
                                <small className="dc-field-hint">
                                  Session management practices to enhance security, prevent session hijacking, and protect user sessions.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Short session timeouts acceptable'}
                                      {form.dataClassification === 'internal' && 'Token rotation and secure cookies recommended'}
                                      {form.dataClassification === 'confidential' && 'Re-authentication and session binding required'}
                                      {form.dataClassification === 'restricted' && 'Adaptive session management with MFA mandatory'}
                                  </small>
                                )}
                                <FieldWarning fieldName="sessionManagementHardening" />
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
                                    className={getFieldWarning('certificateLifecycle') ? 'dc-field-warning' : 'dc-select'}
                                >
                                    <option value="">Select certificate lifecycle management...</option>
                                    <option value="none" className={getOptionSecurityClass('none', 'certificateLifecycle', form.dataClassification)}>No certificate management</option>
                                    <option value="manual" className={getOptionSecurityClass('manual', 'certificateLifecycle', form.dataClassification)}>Manual certificate management</option>
                                    <option value="basic" className={getOptionSecurityClass('basic', 'certificateLifecycle', form.dataClassification)}>Basic certificate tracking</option>
                                    <option value="automated" className={getOptionSecurityClass('automated', 'certificateLifecycle', form.dataClassification)}>Automated certificate lifecycle</option>
                                    <option value="enterprise" className={getOptionSecurityClass('enterprise', 'certificateLifecycle', form.dataClassification)}>Enterprise PKI with CA</option>
                                    <option value="cloud-managed" className={getOptionSecurityClass('cloud-managed', 'certificateLifecycle', form.dataClassification)}>Cloud-managed certificates</option>
                                    <option value="zero-touch" className={getOptionSecurityClass('zero-touch', 'certificateLifecycle', form.dataClassification)}>Zero-touch certificate automation</option>
                                </select>
                                <small className="dc-field-hint">
                                  Practices for managing the lifecycle of digital certificates to ensure secure communications and identity verification.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Manual or basic certificate tracking acceptable'}
                                        {form.dataClassification === 'internal' && 'Automated certificate lifecycle recommended'}
                                        {form.dataClassification === 'confidential' && 'Enterprise PKI with automated renewal required'}
                                        {form.dataClassification === 'restricted' && 'Zero-touch automation with enterprise CA mandatory'}
                                    </small>
                                )}
                                <FieldWarning fieldName="certificateLifecycle" />
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
                                      <option value="none" className={getOptionSecurityClass('none', 'applicationControl', form.dataClassification)}>No application control</option>
                                      <option value="basic" className={getOptionSecurityClass('basic', 'applicationControl', form.dataClassification)}>Basic allow/deny lists</option>
                                      <option value="signature" className={getOptionSecurityClass('signature', 'applicationControl', form.dataClassification)}>Digital signature verification</option>
                                      <option value="behavioural" className={getOptionSecurityClass('behavioural', 'applicationControl', form.dataClassification)}>Behavioural application control</option>
                                      <option value="zero-trust" className={getOptionSecurityClass('zero-trust', 'applicationControl', form.dataClassification)}>Zero Trust application security</option>
                                      <option value="container" className={getOptionSecurityClass('container', 'applicationControl', form.dataClassification)}>Container & runtime protection</option>
                                      <option value="rasp" className={getOptionSecurityClass('rasp', 'applicationControl', form.dataClassification)}>Runtime Application Self-Protection (RASP)</option>
                                  </select>
                                  <small className="dc-field-hint">
                                    Software solutions for controlling and securing application execution to prevent unauthorised or malicious activities.
                                  </small>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && 'Basic allow/deny lists acceptable'}
                                          {form.dataClassification === 'internal' && 'Digital signature verification recommended'}
                                          {form.dataClassification === 'confidential' && 'Behavioural application control required'}
                                          {form.dataClassification === 'restricted' && 'Zero Trust application security with runtime protection mandatory'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="applicationControl" />
                              </td>
                          </tr>
                          <tr>
                              <td className="dc-field-cell-label">
                                  <label className="dc-form-label">Patch Management</label>
                              </td>
                              <td>
                                  {/* Converted to react-select multi */}
                                  <Select
                                      id="patchManagement"
                                      name="patchManagement"
                                      isMulti
                                      options={[
                                        { value: 'none', label: 'No patch management' },
                                        { value: 'manual', label: 'Manual patching' },
                                        { value: 'scheduled', label: 'Scheduled patch cycles' },
                                        { value: 'automated', label: 'Automated patch deployment' },
                                        { value: 'risk-based', label: 'Risk-based patch prioritisation' },
                                        { value: 'zero-downtime', label: 'Zero-downtime patching' },
                                        { value: 'immutable', label: 'Immutable infrastructure deployment' },
                                        { value: 'zero-day', label: 'Zero-day vulnerability management' }
                                      ]}
                                      value={
                                        (() => {
                                          const values = Array.isArray(form.patchManagement)
                                            ? form.patchManagement
                                            : (form.patchManagement ? [form.patchManagement] : []);
                                          const labels = {
                                            'none': 'No patch management',
                                            'manual': 'Manual patching',
                                            'scheduled': 'Scheduled patch cycles',
                                            'automated': 'Automated patch deployment',
                                            'risk-based': 'Risk-based patch prioritisation',
                                            'zero-downtime': 'Zero-downtime patching',
                                            'immutable': 'Immutable infrastructure deployment',
                                            'zero-day': 'Zero-day vulnerability management'
                                          };
                                          return values.map(v => ({ value: v, label: labels[v] || v }));
                                        })()
                                      }
                                      onChange={handleMultiSelectChange('patchManagement')}
                                      styles={getSecurityStyles('patchManagement')}
                                      className={getSecurityClassName('patchManagement', form.patchManagement)}
                                      classNamePrefix="dc-select"
                                      placeholder="Select one or more..."
                                  />
                                  <small className="dc-field-hint">
                                      Processes for applying security patches and updates to operating systems, applications, and firmware.
                                  </small>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && 'Manual or scheduled patching acceptable'}
                                          {form.dataClassification === 'internal' && 'Automated patch deployment recommended'}
                                          {form.dataClassification === 'confidential' && 'Risk-based patch prioritisation required'}
                                          {form.dataClassification === 'restricted' && 'Zero-downtime, immutable infrastructure, or zero-day vulnerability management mandatory'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="patchManagement" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                  <label className="dc-form-label">Code Integrity & Signing</label>
                              </td>
                              <td>
                                  <Select
                                      id="codeIntegrity"
                                      name="codeIntegrity"
                                      isMulti
                                      options={[
                                        { value: 'none', label: 'No code signing' },
                                        { value: 'basic', label: 'Basic code signing' },
                                        { value: 'sbom', label: 'Software Bill of Materials (SBOM)' },
                                        { value: 'trusted', label: 'Trusted publisher verification' },
                                        { value: 'supply-chain', label: 'Supply chain integrity checks' },
                                        { value: 'attestation', label: 'Code attestation & provenance' },
                                        { value: 'high-assurance', label: 'High-assurance code signing' }
                                      ]}
                                      value={Array.isArray(form.codeIntegrity)
                                        ? form.codeIntegrity.map(v => {
                                            const labels = {
                                              'none': 'No code signing',
                                              'basic': 'Basic code signing',
                                              'sbom': 'Software Bill of Materials (SBOM)',
                                              'trusted': 'Trusted publisher verification',
                                              'supply-chain': 'Supply chain integrity checks',
                                              'attestation': 'Code attestation & provenance',
                                              'high-assurance': 'High-assurance code signing'
                                            };
                                            return { value: v, label: labels[v] || v };
                                          })
                                        : []}
                                      onChange={handleMultiSelectChange('codeIntegrity')}
                                      styles={getSecurityStyles('codeIntegrity')}
                                      className={getSecurityClassName('codeIntegrity', form.codeIntegrity)}
                                      classNamePrefix="dc-select"
                                      placeholder="Select one or more..."
                                  />
                                  <small className="dc-field-hint">
                                      Ensuring the authenticity and integrity of code through digital signatures and verification processes.
                                  </small>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && 'Basic code signing recommended for distribution'}
                                          {form.dataClassification === 'internal' && 'Trusted publisher verification recommended'}
                                          {form.dataClassification === 'confidential' && 'Supply chain integrity checks with SBOM required'}
                                          {form.dataClassification === 'restricted' && 'Full code attestation and provenance tracking mandatory'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="codeIntegrity" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                  <label className="dc-form-label">SCA (Software Composition Analysis)</label>
                              </td>
                              <td>
                                  <Select
                                      id="sca"
                                      name="sca"
                                      isMulti
                                      options={[
                                        { value: 'none', label: 'No SCA' },
                                        { value: 'sbom-analysis', label: 'SBOM analysis' },
                                        { value: 'basic-dependency-scanning', label: 'Basic dependency scanning (SCA)' },
                                        { value: 'dependency-scanning', label: 'Transitive dependency scanning (SCA)' },
                                        { value: 'cicd-integration', label: 'CI/CD integration' },
                                        { value: 'cve-vuln', label: 'CVEs and Vulnerability detection' },
                                        { value: 'container-scanning', label: 'Container scanning' },
                                        { value: 'licence-compliance', label: 'Licence compliance' },
                                        { value: 'legal-review', label: 'Legal review / approval' }
                                      ]}
                                      value={Array.isArray(form.sca) ? form.sca.map(v => ({ value: v, label: (
                                          {
                                            'none': 'No SCA',
                                            'sbom-analysis': 'SBOM analysis',
                                            'basic-dependency-scanning': 'Basic dependency scanning (SCA)',
                                            'dependency-scanning': 'Transitive dependency scanning (SCA)',
                                            'cicd-integration': 'CI/CD integration',
                                            'cve-vuln': 'CVEs and Vulnerability detection',
                                            'container-scanning': 'Container scanning',
                                            'licence-compliance': 'Licence compliance',
                                            'legal-review': 'Legal review / approval'
                                          }[v] || v
                                      ) })) : []}
                                      onChange={handleMultiSelectChange('sca')}
                                      styles={getSecurityStyles('sca')}
                                      className={getSecurityClassName('sca', form.sca)}
                                      classNamePrefix="dc-select"
                                      placeholder="Select one or more..."
                                  />
                                  <small className="dc-field-hint">
                                      Processes for scanning third-party and open-source software dependencies and generating SBOMs.
                                  </small>                              
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Basic dependency scanning sufficient'}
                                      {form.dataClassification === 'internal' && 'Transitive dependency scanning recommended'}
                                      {form.dataClassification === 'confidential' && 'CI/CD integrated SCA with CVE detection required'}
                                      {form.dataClassification === 'restricted' && 'Comprehensive SCA with container scanning and legal review mandatory'}
                                  </small>
                                )}
                                  <FieldWarning fieldName="sca" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                  <label className="dc-form-label">OSS Licence Compliance</label>
                              </td>
                              <td>
                                  <Select
                                      id="ossLicenceCompliance"
                                      name="ossLicenceCompliance"
                                      isMulti
                                      options={[
                                        { value: 'none', label: 'No OSS licence compliance tracking' },
                                        { value: 'licence-scanning', label: 'Basic licence scanning' },
                                        { value: 'spdx-report', label: 'SPDX / SBOM licence reporting' },
                                        { value: 'cicd-integration', label: 'CI/CD integration' },
                                        { value: 'automated-enforcement', label: 'Automated policy enforcement' },
                                        { value: 'legal-review', label: 'Legal review / approval' }
                                      ]}
                                      value={Array.isArray(form.ossLicenceCompliance) ? form.ossLicenceCompliance.map(v => ({ value: v, label: (
                                          {
                                            'none': 'No OSS licence compliance tracking',
                                            'licence-scanning': 'Basic licence scanning',
                                            'spdx-report': 'SPDX / SBOM licence reporting',
                                            'cicd-integration': 'CI/CD integration',
                                            'automated-enforcement': 'Automated policy enforcement',
                                            'legal-review': 'Legal review / approval'
                                          }[v] || v
                                      ) })) : []}
                                      onChange={handleMultiSelectChange('ossLicenceCompliance')}
                                      styles={getSecurityStyles('ossLicenceCompliance')}
                                      className={getSecurityClassName('ossLicenceCompliance', form.ossLicenceCompliance)}
                                      classNamePrefix="dc-select"
                                      placeholder="Select one or more..."
                                  />
                                  <small className="dc-field-hint">
                                      Processes for ensuring compliance with open-source software licences in codebases.
                                  </small>
                                  {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic licence scanning sufficient'}
                                        {form.dataClassification === 'internal' && 'System Package Data Exchange (SPDX) documentation and Software Bill of Materials (SBOM) reporting with CI/CD integration recommended'}
                                        {form.dataClassification === 'confidential' && 'Automated policy enforcement with legal review required'}
                                        {form.dataClassification === 'restricted' && 'Comprehensive licence compliance with legal approval mandatory'}
                                    </small>
                                  )}
                                  <FieldWarning fieldName="ossLicenceCompliance" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                  <label className="dc-form-label">Secrets Scanning in Code Repos</label>
                              </td>
                              <td>
                                <Select
                                  id="secretsScanningRepos"
                                  name="secretsScanningRepos"
                                  isMulti
                                  options={[
                                    { value: 'none', label: 'No secrets scanning' },
                                    { value: 'manual-review', label: 'Manual code review for secrets' },
                                    { value: 'pre-commit', label: 'Pre-commit scanning (local checks)' },
                                    { value: 'ci-scanning', label: 'CI pipeline scanning (pre-merge)' },
                                    { value: 'scheduled-repo-scan', label: 'Scheduled repository scanning' },
                                    { value: 'server-side-hooks', label: 'Server-side hooks / pre-receive checks' },
                                    { value: 'secrets-management-integration', label: 'Secrets management integration (vault checks)' },
                                    { value: 'infra-secrets-scan', label: 'Infrastructure-as-code secrets scanning' }
                                  ]}
                                  value={Array.isArray(form.secretsScanningRepos) ? form.secretsScanningRepos.map(v => ({ value: v, label: (
                                    {
                                      'none': 'No secrets scanning',
                                      'manual-review': 'Manual code review for secrets',
                                      'pre-commit': 'Pre-commit scanning (local checks)',
                                      'ci-scanning': 'CI pipeline scanning (pre-merge)',
                                      'scheduled-repo-scan': 'Scheduled repository scanning',
                                      'server-side-hooks': 'Server-side hooks / pre-receive checks',
                                      'secrets-management-integration': 'Secrets management integration (vault checks)',
                                      'infra-secrets-scan': 'Infrastructure-as-code secrets scanning'
                                    }[v] || v
                                  ) })) : []}
                                  onChange={handleMultiSelectChange('secretsScanningRepos')}
                                  styles={getSecurityStyles('secretsScanningRepos')}
                                  className={getSecurityClassName('secretsScanningRepos', form.secretsScanningRepos)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                  Practices for scanning code repositories to detect and prevent hardcoded secrets and sensitive information.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Basic manual review recommended'}
                                      {form.dataClassification === 'internal' && 'Pre-commit and CI pipeline scanning recommended'}
                                      {form.dataClassification === 'confidential' && 'Scheduled repo scans and server-side hooks required'}
                                      {form.dataClassification === 'restricted' && '  Comprehensive scanning with secrets management integration mandatory'}
                                  </small>
                                )}
                                <FieldWarning fieldName="secretsScanningRepos" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                  <label className="dc-form-label">CI/CD Pipeline Security</label>
                              </td>
                              <td>
                                <Select
                                  id="ciCdPipelineSecurity"
                                  name="ciCdPipelineSecurity"
                                  isMulti
                                  options={[
                                    { value: 'none', label: 'No CI/CD pipeline security' },
                                    { value: 'approval-gates', label: 'Manual approval gates & manual review' },
                                    { value: 'least-privilege-runners', label: 'Least-privilege runner/service accounts' },
                                    { value: 'pipeline-scanning', label: 'Pipeline scanning (vulnerabilities & secrets)' },
                                    { value: 'secrets-protection', label: 'Secrets protection in pipeline (vault integration)' },
                                    { value: 'dast-sast', label: 'DAST/SAST scanning' },
                                    { value: 'signed-artifacts', label: 'Signed/artifact provenance verification' },
                                    { value: 'isolated-runners', label: 'Isolated / ephemeral build runners' },
                                    { value: 'supply-chain-gate', label: 'Supply chain security gates (SBOM / SCA)' },
                                    { value: 'dependency-caching-policy', label: 'Secure dependency caching & immutability' },
                                  ]}
                                  value={Array.isArray(form.ciCdPipelineSecurity) ? form.ciCdPipelineSecurity.map(v => ({ value: v, label: (
                                    {
                                      'none': 'No CI/CD pipeline security',
                                      'approval-gates': 'Manual approval gates & manual review',
                                      'pipeline-scanning': 'Pipeline scanning (vulnerabilities & secrets)',
                                      'secrets-protection': 'Secrets protection in pipeline (vault integration)',
                                      'dast-sast': 'DAST/SAST scanning',
                                      'signed-artifacts': 'Signed/artifact provenance verification',
                                      'least-privilege-runners': 'Least-privilege runner/service accounts',
                                      'isolated-runners': 'Isolated / ephemeral build runners',
                                      'supply-chain-gate': 'Supply chain security gates (SBOM / SCA)',
                                      'dependency-caching-policy': 'Secure dependency caching & immutability'
                                    }[v] || v
                                  ) })) : []}
                                  onChange={handleMultiSelectChange('ciCdPipelineSecurity')}
                                  styles={getSecurityStyles('ciCdPipelineSecurity')}
                                  className={getSecurityClassName('ciCdPipelineSecurity', form.ciCdPipelineSecurity)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                  Controls to secure build pipelines, artifact provenance, and runner isolation.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Approval gates and basic pipeline scanning recommended'}
                                      {form.dataClassification === 'internal' && 'DAST/SAST and signed artifacts verification recommended'}
                                      {form.dataClassification === 'confidential' && 'Least-privilege runners and supply chain gates required'}
                                      {form.dataClassification === 'restricted' && 'Comprehensive CI/CD security with dependency caching policy mandatory'}
                                  </small>
                                )}
                                <FieldWarning fieldName="ciCdPipelineSecurity" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                  <label className="dc-form-label">OS Hardening & Configuration</label>
                              </td>
                              <td>
                                  <Select
                                      id="osHardening"
                                      name="osHardening"
                                      isMulti
                                      options={[
                                        { value: 'none', label: 'No OS hardening' },
                                        { value: 'basic', label: 'Basic security configuration' },
                                        { value: 'cis', label: 'CIS Benchmarks compliance (generic)' },
                                        { value: 'cis-l1-server', label: 'CIS Benchmarks Level 1 (Server)' },
                                        { value: 'cis-l2-server', label: 'CIS Benchmarks Level 2 (Server)' },
                                        { value: 'cis-l1-workstation', label: 'CIS Benchmarks Level 1 (Workstation)' },
                                        { value: 'cis-l2-workstation', label: 'CIS Benchmarks Level 2 (Workstation)' },
                                        { value: 'stig', label: 'DISA STIG compliance (generic)' },
                                        { value: 'stig-moderate', label: 'DISA STIG (Moderate Baseline)' },
                                        { value: 'stig-high', label: 'DISA STIG (High Baseline)' },
                                        { value: 'scap-openscap', label: 'SCAP/OpenSCAP automated compliance' },
                                        { value: 'fips-mode', label: 'FIPS 140-2/3 mode enabled' },
                                        { value: 'selinux-enforcing', label: 'SELinux enforcing mode' },
                                        { value: 'apparmor-enforcing', label: 'AppArmor enforcing mode' },
                                        { value: 'secure-boot-tpm', label: 'Secure Boot + TPM' },
                                        { value: 'kernel-hardening-sysctl', label: 'Kernel/sysctl hardening' },
                                        { value: 'ssh-hardening', label: 'SSH configuration hardening' },
                                        { value: 'logging-auditd-hardened', label: 'Auditing (auditd/Windows Auditing) hardened' },
                                        { value: 'config-mgmt-baseline', label: 'Config mgmt baseline (Ansible/Puppet/Chef)' },
                                        { value: 'golden-image-immutable', label: 'Immutable golden image' },
                                        { value: 'readonly-filesystem', label: 'Read-only filesystem where possible' },
                                        { value: 'immutable', label: 'Immutable OS configuration' },
                                        { value: 'custom', label: 'Custom hardening profile' }
                                      ]}
                                      value={Array.isArray(form.osHardening)
                                        ? form.osHardening.map(v => ({ value: v, label: (
                                            {
                                              'none': 'No OS hardening',
                                              'basic': 'Basic security configuration',
                                              'cis': 'CIS Benchmarks compliance (generic)',
                                              'cis-l1-server': 'CIS Benchmarks Level 1 (Server)',
                                              'cis-l2-server': 'CIS Benchmarks Level 2 (Server)',
                                              'cis-l1-workstation': 'CIS Benchmarks Level 1 (Workstation)',
                                              'cis-l2-workstation': 'CIS Benchmarks Level 2 (Workstation)',
                                              'stig': 'DISA STIG compliance (generic)',
                                              'stig-moderate': 'DISA STIG (Moderate Baseline)',
                                              'stig-high': 'DISA STIG (High Baseline)',
                                              'scap-openscap': 'SCAP/OpenSCAP automated compliance',
                                              'fips-mode': 'FIPS 140-2/3 mode enabled',
                                              'selinux-enforcing': 'SELinux enforcing mode',
                                              'apparmor-enforcing': 'AppArmor enforcing mode',
                                              'secure-boot-tpm': 'Secure Boot (with UEFI) + Trusted Boot + Measured Boot + TPM',
                                              'kernel-hardening-sysctl': 'Kernel/sysctl hardening',
                                              'ssh-hardening': 'SSH configuration hardening',
                                              'logging-auditd-hardened': 'Auditing (auditd/Windows Auditing) hardened',
                                              'config-mgmt-baseline': 'Config mgmt baseline (Ansible/Puppet/Chef)',
                                              'golden-image-immutable': 'Immutable golden image',
                                              'readonly-filesystem': 'Read-only filesystem where possible',
                                              'immutable': 'Immutable OS configuration',
                                              'custom': 'Custom hardening profile'
                                            }[v] || v
                                          ) }))
                                        : []}
                                      onChange={handleMultiSelectChange('osHardening')}
                                      styles={getSecurityStyles('osHardening')}
                                      className={getSecurityClassName('osHardening', form.osHardening)}
                                      classNamePrefix="dc-select"
                                      placeholder="Select one or more..."
                                  />
                                  <small className="dc-field-hint">
                                      Practices for securing and hardening operating system configurations.
                                  </small>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && 'Basic security configuration recommended'}
                                          {form.dataClassification === 'internal' && 'CIS Benchmarks compliance recommended'}
                                          {form.dataClassification === 'confidential' && 'DISA STIG compliance or equivalent required'}
                                          {form.dataClassification === 'restricted' && 'Immutable OS with custom hardening profile mandatory'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="osHardening" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                  <label className="dc-form-label">OS Encryption (VM-Aware)</label>
                              </td>
                              <td>
                                  <Select
                                      id="osEncryption"
                                      name="osEncryption"
                                      isMulti
                                      options={[
                                        { value: 'none', label: 'No OS encryption' },
                                        { value: 'vm-guest-basic', label: 'VM Guest: Basic encryption (BitLocker/FileVault in VM)' },
                                        { value: 'vm-guest-full', label: 'VM Guest: Full disk encryption (dm-crypt/LUKS in VM)' },
                                        { value: 'vm-guest-vtpm', label: 'VM Guest: vTPM-backed encryption (Azure/AWS/GCP vTPM)' },
                                        { value: 'vm-host', label: 'VM Host: Hypervisor-level encryption (vSAN/Hyper-V host)' },
                                        { value: 'physical-host', label: 'Physical Host: Bare metal encryption with TPM' },
                                        { value: 'cloud-vm', label: 'Cloud VM: Provider-managed VM encryption' },
                                        { value: 'cloud-vm-vtpm', label: 'Cloud VM: Provider + vTPM encryption (Azure/AWS vTPM)' },
                                        { value: 'cloud-host', label: 'Cloud Host: Provider-managed host encryption' },
                                        { value: 'memory-encryption', label: 'Memory encryption (SME/TME/TXT)' },
                                        { value: 'layered-encryption', label: 'Layered: VM guest + host encryption' },
                                        { value: 'layered-vtpm', label: 'Layered: vTPM guest + host encryption' },
                                        { value: 'comprehensive', label: 'Comprehensive: All layers + memory + cache' }
                                      ]}
                                      value={Array.isArray(form.osEncryption)
                                        ? form.osEncryption.map(v => ({ value: v, label: (
                                            {
                                              'none': 'No OS encryption',
                                              'vm-guest-basic': 'VM Guest: Basic encryption (default Server Side Encryption in VM)',
                                              'vm-guest-full': 'VM Guest: Full disk encryption (dm-crypt/LUKS or BitLocker/FileVault in VM)',
                                              'vm-guest-vtpm': 'VM Guest: vTPM-backed encryption (Azure/AWS/GCP vTPM)',
                                              'vm-host': 'VM Host: Hypervisor-level encryption (vSAN/Hyper-V host)',
                                              'physical-host': 'Physical Host: Bare metal encryption with TPM',
                                              'cloud-vm': 'Cloud VM: Provider-managed VM encryption',
                                              'cloud-vm-vtpm': 'Cloud VM: Provider + vTPM encryption (Azure/AWS/GCP vTPM)',
                                              'cloud-host': 'Cloud Host: Provider-managed host encryption',
                                              'memory-encryption': 'Memory encryption (SME/TME/TXT)',
                                              'layered-encryption': 'Layered: VM guest + host encryption',
                                              'layered-vtpm': 'Layered: vTPM guest + host encryption',
                                              'comprehensive': 'Comprehensive: All layers + memory + cache'
                                            }[v] || v
                                          ) }))
                                        : []}
                                      onChange={handleMultiSelectChange('osEncryption')}
                                      styles={getSecurityStyles('osEncryption')}
                                      className={getSecurityClassName('osEncryption', form.osEncryption)}
                                      classNamePrefix="dc-select"
                                      placeholder="Select one or more..."
                                  />
                                  <small className="dc-field-hint">
                                      VM-aware encryption controls across guest OS, hypervisor, and physical host layers.
                                  </small>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && 'VM guest encryption acceptable; vTPM recommended for cloud environments'}
                                          {form.dataClassification === 'internal' && 'vTPM-backed or VM host encryption recommended for better security'}
                                          {form.dataClassification === 'confidential' && 'vTPM + layered encryption or physical TPM with host encryption required'}
                                          {form.dataClassification === 'restricted' && 'Comprehensive layered encryption with hardware/virtual TPM mandatory'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="osEncryption" />
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
                                      <option value="none" className={getOptionSecurityClass('none', 'mdmControls', form.dataClassification)}>No mobile device management</option>
                                      <option value="basic" className={getOptionSecurityClass('basic', 'mdmControls', form.dataClassification)}>Basic device registration</option>
                                      <option value="standard" className={getOptionSecurityClass('standard', 'mdmControls', form.dataClassification)}>Standard MDM (device policies)</option>
                                      <option value="comprehensive" className={getOptionSecurityClass('comprehensive', 'mdmControls', form.dataClassification)}>Comprehensive MDM suite</option>
                                      <option value="unified" className={getOptionSecurityClass('unified', 'mdmControls', form.dataClassification)}>Unified Endpoint Management (UEM)</option>
                                      <option value="zero-trust" className={getOptionSecurityClass('zero-trust', 'mdmControls', form.dataClassification)}>Zero Trust mobile security</option>
                                  </select>
                                  <small className="dc-field-hint">
                                      Selection of Mobile Device Management (MDM) solutions for enforcing security policies on mobile devices.
                                  </small>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && 'Basic device registration acceptable for low-risk access'}
                                          {form.dataClassification === 'internal' && 'Standard MDM with device policies recommended'}
                                          {form.dataClassification === 'confidential' && 'Comprehensive MDM suite with encryption required'}
                                          {form.dataClassification === 'restricted' && 'UEM or Zero Trust mobile security mandatory'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="mdmControls" />
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
                                      <option value="none" className={getOptionSecurityClass('none', 'mamControls', form.dataClassification)}>No application management</option>
                                      <option value="basic" className={getOptionSecurityClass('basic', 'mamControls', form.dataClassification)}>Basic app deployment</option>
                                      <option value="containerised" className={getOptionSecurityClass('containerised', 'mamControls', form.dataClassification)}>App containerisation</option>
                                      <option value="comprehensive" className={getOptionSecurityClass('comprehensive', 'mamControls', form.dataClassification)}>Comprehensive MAM suite</option>
                                      <option value="app-wrapping" className={getOptionSecurityClass('app-wrapping', 'mamControls', form.dataClassification)}>App wrapping with DLP</option>
                                      <option value="unified" className={getOptionSecurityClass('unified', 'mamControls', form.dataClassification)}>Unified Endpoint Management (UEM) with MAM</option>
                                      <option value="micro-vpn" className={getOptionSecurityClass('micro-vpn', 'mamControls', form.dataClassification)}>Micro-VPN per-app tunneling</option>
                                  </select>
                                  <small className="dc-field-hint">
                                     Selection of Mobile Application Management (MAM) solutions for securing corporate applications on mobile devices.
                                  </small>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && 'Basic app deployment acceptable'}
                                          {form.dataClassification === 'internal' && 'App containerisation recommended'}
                                          {form.dataClassification === 'confidential' && 'Comprehensive MAM with app wrapping required'}
                                          {form.dataClassification === 'restricted' && 'Micro-VPN per-app tunneling mandatory'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="mamControls" />
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
                                      <option value="none" className={getOptionSecurityClass('none', 'byodPolicy', form.dataClassification)}>No BYOD policy defined</option>
                                      <option value="limited" className={getOptionSecurityClass('limited', 'byodPolicy', form.dataClassification)}>Limited BYOD (email only)</option>
                                      <option value="standard" className={getOptionSecurityClass('standard', 'byodPolicy', form.dataClassification)}>Standard BYOD with MDM</option>
                                      <option value="managed" className={getOptionSecurityClass('managed', 'byodPolicy', form.dataClassification)}>Managed BYOD with MAM</option>
                                      <option value="container-based" className={getOptionSecurityClass('container-based', 'byodPolicy', form.dataClassification)}>Container-based BYOD</option>
                                      <option value="zero-trust-byod" className={getOptionSecurityClass('zero-trust-byod', 'byodPolicy', form.dataClassification)}>Zero Trust BYOD</option>
                                      <option value="prohibited" className={getOptionSecurityClass('prohibited', 'byodPolicy', form.dataClassification)}>BYOD prohibited</option>
                                  </select>
                                  <small className="dc-field-hint">
                                      Policy for employee-owned devices accessing corporate data and resources.
                                  </small>                                
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && 'Limited BYOD with basic controls acceptable'}
                                          {form.dataClassification === 'internal' && 'Standard BYOD with MAM enrollment acceptable, MAM recommended'}
                                          {form.dataClassification === 'confidential' && 'Managed BYOD with MAM containerisation required'}
                                          {form.dataClassification === 'restricted' && 'BYOD prohibited or Zero Trust BYOD with strict controls only'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="byodPolicy" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                  <label className="dc-form-label">Mobile Data Protection</label>
                              </td>
                              <td>
                                <Select
                                  id="mobileDataProtection"
                                  name="mobileDataProtection"
                                  isMulti
                                  options={[
                                    { value: 'none', label: 'No mobile data protection defined' },
                                    { value: 'basic', label: 'Basic PIN/password protection' },
                                    { value: 'encryption', label: 'Device encryption required' },
                                    { value: 'app-level', label: 'App-level encryption' },
                                    { value: 'comprehensive', label: 'Comprehensive mobile DLP' },
                                    { value: 'air-gapped', label: 'Air-gapped mobile access' },
                                    { value: 'virtual-desktop', label: 'Virtual desktop interface only' }
                                  ]}
                                  value={Array.isArray(form.mobileDataProtection) ? form.mobileDataProtection.map(v => ({ value: v, label: (
                                    {
                                      'none': 'No mobile data protection defined',
                                      'basic': 'Basic PIN/password protection',
                                      'encryption': 'Device encryption required',
                                      'app-level': 'App-level encryption',
                                      'comprehensive': 'Comprehensive mobile DLP',
                                      'air-gapped': 'Air-gapped mobile access',
                                      'virtual-desktop': 'Virtual desktop interface only',
                                    }[v] || v
                                  ) })) : []}
                                  onChange={handleMultiSelectChange('mobileDataProtection')}
                                  styles={getSecurityStyles('mobileDataProtection')}
                                  className={getSecurityClassName('mobileDataProtection', form.mobileDataProtection)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                  Data protection measures for mobile devices accessing corporate data.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic PIN protection acceptable'}
                                        {form.dataClassification === 'internal' && 'Device encryption recommended'}
                                        {form.dataClassification === 'confidential' && 'App-level encryption and mobile DLP required'}
                                        {form.dataClassification === 'restricted' && 'Air-gapped access or virtual desktop interface only'}
                                    </small>
                                )}
                                <FieldWarning fieldName="mobileDataProtection" />
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
                              <td colSpan="2">
                                <small className="dc-field-hint">
                                Select the appropriate remote access infrastructure controls based on your data classification and organisational requirements.
                                </small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                  <label className="dc-form-label">Virtual Desktop Infrastructure (VDI)</label>
                              </td>
                              <td>
                                  <Select
                                      id="vdiSolution"
                                      name="vdiSolution"
                                      isMulti
                                      options={[
                                        {
                                          label: 'VDI Type',
                                          options: [
                                            { value: 'none', label: 'No VDI' },
                                            { value: 'basic', label: 'Basic VDI (shared desktops)' },
                                            { value: 'persistent', label: 'Persistent VDI (dedicated desktops)' },
                                            { value: 'non-persistent', label: 'Non-persistent VDI (stateless)' },
                                            { value: 'remote-apps', label: 'RemoteApp / Published Apps' }
                                          ]
                                        },
                                        {
                                          label: 'VDI Platforms',
                                          options: [
                                            { value: 'avd', label: 'Azure Virtual Desktop (AVD)' },
                                            { value: 'windows-365', label: 'Windows 365 Cloud PC' },
                                            { value: 'citrix', label: 'Citrix Virtual Apps & Desktops' },
                                            { value: 'vmware-horizon', label: 'VMware Horizon' },
                                            { value: 'aws-workspaces', label: 'AWS WorkSpaces' },
                                            { value: 'google-cloud', label: 'Google Cloud Virtual Desktops' }
                                          ]
                                        },
                                        {
                                          label: 'Performance & Hardware',
                                          options: [
                                            { value: 'gpu-accelerated', label: 'GPU-accelerated Desktops/Apps' },
                                            { value: 'nvidia-vgpu', label: 'NVIDIA vGPU / AMD MxGPU' }
                                          ]
                                        },
                                        {
                                          label: 'Profiles & App Delivery',
                                          options: [
                                            { value: 'fslogix-profiles', label: 'FSLogix Profile Containers' },
                                            { value: 'app-layering', label: 'Application Layering (App Volumes/App Layering)' },
                                            { value: 'writable-volumes', label: 'Writable User Volumes' }
                                          ]
                                        },
                                        {
                                          label: 'Protocols',
                                          options: [
                                            { value: 'protocol-pcoip', label: 'Protocol: PCoIP' },
                                            { value: 'protocol-blast', label: 'Protocol: Blast Extreme' },
                                            { value: 'protocol-rdp-gateway', label: 'Protocol: RDP + RD Gateway' }
                                          ]
                                        },
                                        {
                                          label: 'Security & Controls',
                                          options: [
                                            { value: 'session-recording', label: 'Session Recording / Shadowing' },
                                            { value: 'device-redirection-control', label: 'Device Redirection Control (USB/Clipboard/Drive)' },
                                            { value: 'copy-paste-restricted', label: 'Copy/Paste Restricted' },
                                            { value: 'file-transfer-restricted', label: 'File Transfer Restricted' },
                                            { value: 'rbi', label: 'Remote Browser Isolation (RBI)' },
                                            { value: 'ztna-integration', label: 'ZTNA-integrated Broker' },
                                            { value: 'zero-trust-vdi', label: 'Zero Trust VDI with isolation' }
                                          ]
                                        },
                                        {
                                          label: 'Operations & Scale',
                                          options: [
                                            { value: 'autoscaling', label: 'Autoscaling / Elastic Pools' },
                                            { value: 'broker-ha', label: 'Broker High Availability' },
                                            { value: 'dr-failover', label: 'DR Failover / Multi-Region' },
                                            { value: 'thin-client-managed', label: 'Managed Thin Clients' }
                                          ]
                                        }
                                      ]}
                                      value={Array.isArray(form.vdiSolution)
                                        ? form.vdiSolution.map(v => ({ value: v, label: (
                                            {
                                              'none': 'No VDI',
                                              'basic': 'Basic VDI (shared desktops)',
                                              'persistent': 'Persistent VDI (dedicated desktops)',
                                              'non-persistent': 'Non-persistent VDI (stateless)',
                                              'remote-apps': 'RemoteApp / Published Apps',
                                              'avd': 'Azure Virtual Desktop (AVD)',
                                              'windows-365': 'Windows 365 Cloud PC',
                                              'citrix': 'Citrix Virtual Apps & Desktops',
                                              'vmware-horizon': 'VMware Horizon',
                                              'aws-workspaces': 'AWS WorkSpaces',
                                              'google-cloud': 'Google Cloud Virtual Desktops',
                                              'gpu-accelerated': 'GPU-accelerated Desktops/Apps',
                                              'nvidia-vgpu': 'NVIDIA vGPU / AMD MxGPU',
                                              'fslogix-profiles': 'FSLogix Profile Containers',
                                              'app-layering': 'Application Layering (App Volumes/App Layering)',
                                              'writable-volumes': 'Writable User Volumes',
                                              'protocol-pcoip': 'Protocol: PCoIP',
                                              'protocol-blast': 'Protocol: Blast Extreme',
                                              'protocol-rdp-gateway': 'Protocol: RDP + RD Gateway',
                                              'session-recording': 'Session Recording / Shadowing',
                                              'device-redirection-control': 'Device Redirection Control (USB/Clipboard/Drive)',
                                              'copy-paste-restricted': 'Copy/Paste Restricted',
                                              'file-transfer-restricted': 'File Transfer Restricted',
                                              'rbi': 'Remote Browser Isolation (RBI)',
                                              'ztna-integration': 'ZTNA-integrated Broker',
                                              'zero-trust-vdi': 'Zero Trust VDI with isolation',
                                              'autoscaling': 'Autoscaling / Elastic Pools',
                                              'broker-ha': 'Broker High Availability',
                                              'dr-failover': 'DR Failover / Multi-Region',
                                              'thin-client-managed': 'Managed Thin Clients'
                                            }[v] || v
                                          ) }))
                                        : []}
                                      onChange={handleMultiSelectChange('vdiSolution')}
                                      styles={getSecurityStyles('vdiSolution')} 
                                      className={getSecurityClassName('vdiSolution', form.vdiSolution)}
                                      classNamePrefix="dc-select"
                                      placeholder="Select one or more..."
                                  />
                                  <small className="dc-field-hint">
                                      Selection of Virtual Desktop Infrastructure (VDI) solutions and configurations.
                                  </small>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && 'Basic VDI acceptable for cost-effective remote access'}
                                          {form.dataClassification === 'internal' && 'Persistent or non-persistent VDI recommended'}
                                          {form.dataClassification === 'confidential' && 'Enterprise VDI (Citrix/VMware/AVD) with encryption required'}
                                          {form.dataClassification === 'restricted' && 'Zero Trust VDI with complete isolation mandatory'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="vdiSolution" />
                              </td>
                            </tr>
                            {/* VPN Access Controls */}
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">VPN Access Controls</label>
                              </td>
                              <td>
                                <Select
                                  id="vpnAccessControls"
                                  name="vpnAccessControls"
                                  isMulti
                                  options={[
                                    { value: 'tls-vpn', label: 'TLS VPN' },
                                    { value: 'ipsec-vpn', label: 'IPsec VPN' },
                                    { value: 'wireguard', label: 'WireGuard' },
                                    { value: 'split-tunnel', label: 'Split tunnel (restricted)' },
                                    { value: 'full-tunnel', label: 'Full tunnel' },
                                    { value: 'per-app-vpn', label: 'Per-app / micro-VPN' },
                                    { value: 'mfa-required', label: 'MFA required on VPN' },
                                    { value: 'posture-checks', label: 'Device posture checks (EDR/patch/encryption)' },
                                    { value: 'certificate-auth', label: 'Client certificate authentication' },
                                    { value: 'no-legacy-proto', label: 'Block legacy protocols (e.g., PPTP/L2TP w/o IPsec)' }
                                  ]}
                                  value={Array.isArray(form.vpnAccessControls)
                                    ? form.vpnAccessControls.map(v => {
                                        const labels = {
                                          'tls-vpn': 'TLS VPN',
                                          'ipsec-vpn': 'IPsec VPN',
                                          'wireguard': 'WireGuard',
                                          'split-tunnel': 'Split tunnel (restricted)',
                                          'full-tunnel': 'Full tunnel',
                                          'per-app-vpn': 'Per-app / micro-VPN',
                                          'certificate-auth': 'Client certificate authentication',
                                          'mfa-required': 'MFA required on VPN',
                                          'posture-checks': 'Device posture checks (EDR/patch/encryption)',
                                          'no-legacy-proto': 'Block legacy protocols (e.g., PPTP/L2TP w/o IPsec)'
                                        };
                                        return { value: v, label: labels[v] || v };
                                      })
                                    : []}
                                  onChange={handleMultiSelectChange('vpnAccessControls')}
                                  styles={getSecurityStyles('vpnAccessControls')}
                                  className={getSecurityClassName('vpnAccessControls', form.vpnAccessControls)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                  VPN access control measures for secure remote connectivity.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'TLS/IPsec acceptable; MFA recommended.'}
                                    {form.dataClassification === 'internal' && 'MFA + posture checks recommended.'}
                                    {form.dataClassification === 'confidential' && 'Full tunnel + MFA + posture required; avoid split tunnel.'}
                                    {form.dataClassification === 'restricted' && 'Per-app micro-VPN or ZTNA; split tunnel prohibited.'}
                                  </small>
                                )}
                                <FieldWarning fieldName="vpnAccessControls" />
                              </td>
                            </tr>
                            {/* Zero Trust Network Access (ZTNA) */}
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Zero Trust Network Access (ZTNA)</label>
                              </td>
                              <td>
                                <Select
                                  id="ztnaAccess"
                                  name="ztnaAccess"
                                  isMulti
                                  options={[
                                    { value: 'clientless', label: 'Clientless ZTNA (browser-based)' },
                                    { value: 'per-app', label: 'Per-app ZTNA policies' },
                                    { value: 'idp-integration', label: 'IdP integration (SAML/OIDC)' },
                                    { value: 'identity-aware-proxy', label: 'Identity-aware proxy' },
                                    { value: 'continuous-verification', label: 'Continuous verification' },
                                    { value: 'device-posture', label: 'Device posture gating' },
                                    { value: 'context-policy', label: 'Context/risk-based policies' },
                                    { value: 'agent-based', label: 'Agent-based ZTNA' },
                                    { value: 'micro-segmentation', label: 'Micro-segmentation for remote access' }
                                  ]}
                                  value={Array.isArray(form.ztnaAccess)
                                    ? form.ztnaAccess.map(v => {
                                        const labels = {
                                          'clientless': 'Clientless ZTNA (browser-based)',
                                          'per-app': 'Per-app ZTNA policies',
                                          'idp-integration': 'IdP integration (SAML/OIDC)',
                                          'identity-aware-proxy': 'Identity-aware proxy',
                                          'continuous-verification': 'Continuous verification',
                                          'device-posture': 'Device posture gating',
                                          'context-policy': 'Context/risk-based policies',
                                          'agent-based': 'Agent-based ZTNA',
                                          'micro-segmentation': 'Micro-segmentation for remote access'
                                        };
                                        return { value: v, label: labels[v] || v };
                                      })
                                    : []}
                                  onChange={handleMultiSelectChange('ztnaAccess')}
                                  styles={getSecurityStyles('ztnaAccess')}
                                  className={getSecurityClassName('ztnaAccess', form.ztnaAccess)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                  Zero Trust Network Access (ZTNA) configurations for secure remote access.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Clientless ZTNA is a simple start.'}
                                    {form.dataClassification === 'internal' && 'Per-app ZTNA with IdP recommended.'}
                                    {form.dataClassification === 'confidential' && 'Continuous verification + posture required.'}
                                    {form.dataClassification === 'restricted' && 'ZTNA with micro-segmentation mandatory.'}
                                  </small>
                                )}
                                <FieldWarning fieldName="ztnaAccess" />
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
                                  <option value="none" className={getOptionSecurityClass('none', 'jumpHosts', form.dataClassification)}>No jump hosts</option>
                                  <option value="basic" className={getOptionSecurityClass('basic', 'jumpHosts', form.dataClassification)}>Basic jump host (SSH/RDP relay)</option>
                                  <option value="hardened" className={getOptionSecurityClass('hardened', 'jumpHosts', form.dataClassification)}>Hardened jump hosts with logging and MFA</option>
                                  <option value="cloud-native" className={getOptionSecurityClass('cloud-native', 'jumpHosts', form.dataClassification)}>Cloud-native bastion services</option>
                                  <option value="privileged" className={getOptionSecurityClass('privileged', 'jumpHosts', form.dataClassification)}>Privileged Access Workstations (PAW) with session recording</option>
                                  <option value="zero-trust" className={getOptionSecurityClass('zero-trust', 'jumpHosts', form.dataClassification)}>Zero Trust jump hosts with privileged access management (PAM)</option>
                                  <option value="air-gapped" className={getOptionSecurityClass('air-gapped', 'jumpHosts', form.dataClassification)}>Air-gapped jump hosts</option>
                                </select>
                                <small className="dc-field-hint">
                                  Configuration of jump hosts or bastion hosts for secure administrative access. N.B. A jump box runs on or is accessed via a jump host, but naming is often used interchangeably and they may refer to the same concept in different contexts.
                                </small>
                                {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && 'Basic jump host acceptable for simple environments'}
                                          {form.dataClassification === 'internal' && 'Hardened jump hosts with comprehensive logging recommended'}
                                          {form.dataClassification === 'confidential' && 'Privileged Access Workstations (PAW) required'}
                                          {form.dataClassification === 'restricted' && 'Air-gapped or Zero Trust jump hosts mandatory'}
                                      </small>
                                  )}
                                <FieldWarning fieldName="jumpHosts" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                  <label className="dc-form-label">Remote Access Policy</label>
                              </td>
                              <td>
                                  <Select
                                      id="remoteAccessPolicy"
                                      name="remoteAccessPolicy"
                                      isMulti
                                      options={[
                                        {
                                          label: 'Base Policies',
                                          options: [
                                            { value: 'unrestricted', label: 'Unrestricted remote access' },
                                            { value: 'vpn-required', label: 'VPN required for remote access' },
                                            { value: 'managed-devices', label: 'Managed devices only' },
                                            { value: 'vdi-only', label: 'VDI/virtual desktop only' },
                                            { value: 'jump-host-only', label: 'Jump host access only' },
                                            { value: 'zero-trust', label: 'Zero Trust remote access' },
                                            { value: 'air-gapped-only', label: 'Air-gapped environment only' }
                                          ]
                                        },
                                        {
                                          label: 'Third-Party Remote Tools',
                                          options: [
                                            { value: 'third-party-remote-tools-allowed', label: 'Third-Party Remote Tools Allowed (Unbrokered)' },
                                            { value: 'third-party-remote-tools-brokered-only', label: 'Third-Party Tools via Broker Only' },
                                            { value: 'third-party-remote-tools-prohibited', label: 'Third-Party Remote Tools Prohibited' }
                                          ]
                                        },
                                        {
                                          label: 'Geo/Network Restrictions',
                                          options: [
                                            { value: 'public-ip-allowlist', label: 'Public IP address allowlist' },
                                            { value: 'network-allowlist', label: 'Corporate/network allowlist only' },
                                            { value: 'geo-allowlist', label: 'Geo allowlist / country restrictions' },
                                            { value: 'geo-blocking-high-risk', label: 'Block high-risk geographies' },
                                            { value: 'tor-proxy-vpn-blocking', label: 'Block Tor/anonymous proxy/VPN egress' }
                                          ]
                                        },
                                        {
                                          label: 'JIT & Approvals',
                                          options: [
                                            { value: 'jit-admin-required', label: 'Just-In-Time (JIT) admin required' },
                                            { value: 'pam-approval-required', label: 'PAM approval/workflow required' },
                                            { value: 'time-bound-access', label: 'Time-bound access windows' },
                                            { value: 'ticket-bound-access', label: 'Ticket-bound support/vendor access' }
                                          ]
                                        },
                                        {
                                          label: 'SSH Access Policy',
                                          options: [
                                            { value: 'ssh-none', label: 'No SSH access' },
                                            { value: 'ssh-anonymous', label: 'Anonymous SSH access' },
                                            { value: 'ssh-password', label: 'Password-based SSH access' },
                                            { value: 'ssh-interactive', label: 'Interactive SSH access with MFA' },
                                            { value: 'ssh-keys', label: 'SSH key-based access' },
                                            { value: 'ssh-certs', label: 'SSH certificates from a trusted CA' },
                                            { value: 'ssh-fido', label: 'FIDO2 / Hardware security keys based SSH access' },
                                            { value: 'ssh-brokered', label: 'Brokered SSH (e.g., SSM Session Manager)' }
                                          ]
                                        },
                                        {
                                          label: 'Session Protections',
                                          options: [
                                            { value: 'session-recording-required', label: 'Session recording required' },
                                            { value: 'watermarking', label: 'Watermarking of remote sessions' },
                                            { value: 'screenshot-print-restrictions', label: 'Screenshot/print restrictions' },
                                            { value: 'clipboard-restrictions', label: 'Clipboard/file transfer restrictions' }
                                          ]
                                        }
                                      ]}
                                      value={Array.isArray(form.remoteAccessPolicy)
                                        ? form.remoteAccessPolicy.map(v => ({ value: v, label: (
                                            {
                                              'unrestricted': 'Unrestricted remote access',
                                              'vpn-required': 'VPN required for remote access',
                                              'managed-devices': 'Managed devices only',
                                              'vdi-only': 'VDI/virtual desktop only',
                                              'jump-host-only': 'Jump host access only',
                                              'zero-trust': 'Zero Trust remote access',
                                              'air-gapped-only': 'Air-gapped environment only',
                                              'third-party-remote-tools-allowed': 'Third-party remote tools allowed (unbrokered)',
                                              'third-party-remote-tools-prohibited': 'Third-party remote tools prohibited',
                                              'third-party-remote-tools-brokered-only': 'Third-party tools via broker only',
                                              'public-ip-allowlist': 'Public IP address allowlist',
                                              'network-allowlist': 'Corporate/network allowlist only',
                                              'geo-allowlist': 'Geo allowlist / country restrictions',
                                              'geo-blocking-high-risk': 'Block high-risk geographies',
                                              'tor-proxy-vpn-blocking': 'Block Tor/anonymous proxy/VPN egress',
                                              'jit-admin-required': 'Just-In-Time (JIT) admin required',
                                              'pam-approval-required': 'PAM approval/workflow required',
                                              'time-bound-access': 'Time-bound access windows',
                                              'ticket-bound-access': 'Ticket-bound support/vendor access',
                                              'ssh-none': 'No SSH access',
                                              'ssh-anonymous': 'Anonymous SSH access',
                                              'ssh-password': 'Password-based SSH access',
                                              'ssh-interactive': 'Interactive SSH access',
                                              'ssh-keys': 'SSH key-based access',
                                              'ssh-certs': 'Short-lived SSH certificates (vs keys)',
                                              'ssh-fido': 'FIDO-based SSH access',
                                              'ssh-brokered': 'Brokered SSH (e.g., SSM Session Manager)',
                                              'session-recording-required': 'Session recording required',
                                              'watermarking': 'Watermarking of remote sessions',
                                              'screenshot-print-restrictions': 'Screenshot/print restrictions',
                                              'clipboard-restrictions': 'Clipboard/file transfer restrictions'
                                            }[v] || v
                                          ) }))
                                        : []}
                                      onChange={handleMultiSelectChange('remoteAccessPolicy')}
                                      styles={getSecurityStyles('remoteAccessPolicy')}
                                      className={getSecurityClassName('remoteAccessPolicy', form.remoteAccessPolicy)}
                                      classNamePrefix="dc-select"
                                      placeholder="Select one or more..."
                                  />
                                  <small className="dc-field-hint">
                                      Definition of remote access policies and restrictions.
                                  </small>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && 'VPN or managed device acceptable; consider brokered tools and geo restrictions.'}
                                          {form.dataClassification === 'internal' && 'Managed devices + VPN/VDI recommended; broker third-party tools.'}
                                          {form.dataClassification === 'confidential' && 'VDI/jump host + JIT/PAM + SSH certs + session recording; avoid split tunnel and third-party tools unless brokered.'}
                                          {form.dataClassification === 'restricted' && 'Zero Trust or air-gapped; JIT + PAM approvals + geo allowlist + Tor/proxy/VPN blocking; session recording mandatory.'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="remoteAccessPolicy" />
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
                                  <option value="none" className={getOptionSecurityClass('none', 'sessionIsolation', form.dataClassification)}>No session isolation</option>
                                  <option value="basic" className={getOptionSecurityClass('basic', 'sessionIsolation', form.dataClassification)}>Basic user session separation</option>
                                  <option value="process" className={getOptionSecurityClass('process', 'sessionIsolation', form.dataClassification)}>Process-level isolation</option>
                                  <option value="container" className={getOptionSecurityClass('container', 'sessionIsolation', form.dataClassification)}>Container-based isolation</option>
                                  <option value="vm" className={getOptionSecurityClass('vm', 'sessionIsolation', form.dataClassification)}>Virtual machine isolation</option>
                                  <option value="micro-vm" className={getOptionSecurityClass('micro-vm', 'sessionIsolation', form.dataClassification)}>Micro-VM isolation</option>
                                  <option value="air-gapped" className={getOptionSecurityClass('air-gapped', 'sessionIsolation', form.dataClassification)}>Complete air-gapped isolation</option>
                                </select>
                                <small className="dc-field-hint">
                                  Level of isolation enforced between remote user sessions and system components.
                                </small>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && 'Basic user session separation acceptable'}
                                          {form.dataClassification === 'internal' && 'Process or container-based isolation recommended'}
                                          {form.dataClassification === 'confidential' && 'Virtual machine isolation required'}
                                          {form.dataClassification === 'restricted' && 'Micro-VM or air-gapped isolation mandatory'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="sessionIsolation" />
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
                                    <option value="none" className={getOptionSecurityClass('none', 'remoteAccessMonitoring', form.dataClassification)}>No monitoring of remote access</option>
                                    <option value="basic" className={getOptionSecurityClass('basic', 'remoteAccessMonitoring', form.dataClassification)}>Basic connection logging</option>
                                    <option value="standard" className={getOptionSecurityClass('standard', 'remoteAccessMonitoring', form.dataClassification)}>Session recording (metadata)</option>
                                    <option value="comprehensive" className={getOptionSecurityClass('comprehensive', 'remoteAccessMonitoring', form.dataClassification)}>Full session recording</option>
                                    <option value="real-time" className={getOptionSecurityClass('real-time', 'remoteAccessMonitoring', form.dataClassification)}>Real-time monitoring & alerts</option>
                                    <option value="behavioural" className={getOptionSecurityClass('behavioural', 'remoteAccessMonitoring', form.dataClassification)}>Behavioural analytics</option>
                                    <option value="ai-powered" className={getOptionSecurityClass('ai-powered', 'remoteAccessMonitoring', form.dataClassification)}>AI-powered anomaly detection</option>
                                  </select>
                                  <small className="dc-field-hint">
                                      Level of monitoring and oversight for remote access sessions.
                                  </small>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && 'Basic connection logging acceptable'}
                                          {form.dataClassification === 'internal' && 'Session recording (metadata) recommended'}
                                          {form.dataClassification === 'confidential' && 'Full session recording with real-time monitoring required'}
                                          {form.dataClassification === 'restricted' && 'AI-powered anomaly detection with behavioural analytics mandatory'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="remoteAccessMonitoring" />
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
                                    <option value="none" className={getOptionSecurityClass('none', 'privilegedAccessManagement', form.dataClassification)}>No PAM solution</option>
                                    <option value="basic" className={getOptionSecurityClass('basic', 'privilegedAccessManagement', form.dataClassification)}>Basic password vault</option>
                                    <option value="standard" className={getOptionSecurityClass('standard', 'privilegedAccessManagement', form.dataClassification)}>Standard PAM with session management</option>
                                    <option value="advanced" className={getOptionSecurityClass('advanced', 'privilegedAccessManagement', form.dataClassification)}>Advanced PAM with analytics</option>
                                    <option value="enterprise" className={getOptionSecurityClass('enterprise', 'privilegedAccessManagement', form.dataClassification)}>Enterprise PAM suite</option>
                                    <option value="zero-trust-pam" className={getOptionSecurityClass('zero-trust-pam', 'privilegedAccessManagement', form.dataClassification)}>Zero Trust PAM platform</option>
                                </select>
                                <small className="dc-field-hint">
                                  Privileged Access Management (PAM) for administrative accounts.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic password vault acceptable for admin accounts'}
                                        {form.dataClassification === 'internal' && 'Standard PAM with session management recommended'}
                                        {form.dataClassification === 'confidential' && 'Advanced PAM with analytics and monitoring required'}
                                        {form.dataClassification === 'restricted' && 'Zero Trust PAM platform with complete oversight mandatory'}
                                    </small>
                                  )}
                                <FieldWarning fieldName="privilegedAccessManagement" />
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
                        <legend className="dc-legend dc-legend-monitoring-compliance">📊 Monitoring & Compliance</legend>
                        <table className="dc-field-table">  
                          <tbody>                        
                            <tr>
                              <td colSpan="2">
                                <small className="dc-field-hint">
                                Select the appropriate monitoring and compliance strategy based on your data classification and organisational requirements.
                                </small>
                              </td>
                            </tr>
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
                                  <option value="none" className={getOptionSecurityClass('none', 'threatMonitoring', form.dataClassification)}>No threat monitoring</option>  
                                  <option value="basic-logging" className={getOptionSecurityClass('basic-logging', 'threatMonitoring', form.dataClassification)}>
                                    Basic security logging
                                  </option>
                                  <option value="siem-integration" className={getOptionSecurityClass('siem-integration', 'threatMonitoring', form.dataClassification)}>
                                    SIEM integration
                                  </option>
                                  <option value="threat-detection" className={getOptionSecurityClass('threat-detection', 'threatMonitoring', form.dataClassification)}>
                                    Advanced threat detection
                                  </option>
                                  <option value="behavioural-analytics" className={getOptionSecurityClass('behavioural-analytics', 'threatMonitoring', form.dataClassification)}>
                                    User & entity behavioural analytics (UEBA)
                                  </option>
                                  <option value="ai-threat-hunting" className={getOptionSecurityClass('ai-threat-hunting', 'threatMonitoring', form.dataClassification)}>
                                    AI-powered threat hunting
                                  </option>
                                  <option value="zero-trust-monitoring" className={getOptionSecurityClass('zero-trust-monitoring', 'threatMonitoring', form.dataClassification)}>
                                    Zero-trust continuous verification
                                  </option>
                                  <option value="deception-technology" className={getOptionSecurityClass('deception-technology', 'threatMonitoring', form.dataClassification)}>
                                    Deception technology & honeypots
                                  </option>
                                  <option value="threat-intelligence" className={getOptionSecurityClass('threat-intelligence', 'threatMonitoring', form.dataClassification)}>
                                    Threat intelligence integration
                                  </option>
                                </select>
                                <small className="dc-field-hint">
                                   Monitoring for security threats, anomalies, and potential breaches.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
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
                                <Select
                                  id="availabilityMonitoring"
                                  name="availabilityMonitoring"
                                  isMulti
                                  options={[
                                    { value: 'none', label: 'No availability monitoring' },
                                    { value: 'basic-uptime', label: 'Basic uptime monitoring' },
                                    { value: 'log-monitoring', label: 'Log monitoring & analysis' },
                                    { value: 'observability-tools', label: 'Observability tools integration' },
                                    { value: 'infrastructure-monitoring', label: 'Infrastructure monitoring (CPU, memory, disk)' },
                                    { value: 'application-performance', label: 'Application Performance Monitoring (APM)' },
                                    { value: 'synthetic-monitoring', label: 'Synthetic transaction monitoring' },
                                    { value: 'real-user-monitoring', label: 'Real User Monitoring (RUM)' },
                                    { value: 'user-experience-monitoring', label: 'User Experience Monitoring' },
                                    { value: 'distributed-tracing', label: 'Distributed tracing & observability' },
                                    { value: 'predictive-analytics', label: 'Predictive failure analytics' },
                                    { value: 'chaos-engineering', label: 'Chaos engineering & resilience testing' },
                                    { value: 'auto-remediation', label: 'AI-driven auto-remediation' },
                                    { value: 'comprehensive-observability', label: 'Comprehensive observability platform' }
                                  ]}
                                  value={(Array.isArray(form.availabilityMonitoring)
                                    ? form.availabilityMonitoring
                                    : [form.availabilityMonitoring].filter(Boolean)).map(v => {
                                        const labels = {
                                          'none': 'No availability monitoring',
                                          'basic-uptime': 'Basic uptime monitoring',
                                          'log-monitoring': 'Log monitoring & analysis',
                                          'observability-tools': 'Observability tools integration',
                                          'infrastructure-monitoring': 'Infrastructure monitoring (CPU, memory, disk)',
                                          'application-performance': 'Application Performance Monitoring (APM)',
                                          'synthetic-monitoring': 'Synthetic transaction monitoring',
                                          'real-user-monitoring': 'Real User Monitoring (RUM)',
                                          'user-experience-monitoring': 'User Experience Monitoring',
                                          'distributed-tracing': 'Distributed tracing & observability',
                                          'predictive-analytics': 'Predictive failure analytics',
                                          'chaos-engineering': 'Chaos engineering & resilience testing',
                                          'auto-remediation': 'AI-driven auto-remediation',
                                          'comprehensive-observability': 'Comprehensive observability platform'
                                        };
                                        return { value: v, label: labels[v] || v };
                                      })}
                                  onChange={handleMultiSelectChange('availabilityMonitoring')}
                                  styles={getSecurityStyles('availabilityMonitoring')}
                                  className={getSecurityClassName('availabilityMonitoring', form.availabilityMonitoring)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                    Monitoring for system availability, performance, and reliability.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic availability monitoring - minimal business impact if unavailable'}
                                        {form.dataClassification === 'internal' && 'Log and infrastructure monitoring - moderate business impact during outages'}
                                        {form.dataClassification === 'confidential' && 'Observability tools and real user monitoring - significant business impact and customer-facing services'}
                                        {form.dataClassification === 'restricted' && 'Predictive analytics + chaos engineering - critical business operations cannot afford downtime'}
                                    </small>
                                )}
                                <FieldWarning fieldName="availabilityMonitoring" />
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
                                  className={getFieldWarning('auditLogging') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select audit level...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'auditLogging', form.dataClassification)}>No audit logging</option>
                                  <option value="minimal" className={getOptionSecurityClass('minimal', 'auditLogging', form.dataClassification)}>Minimal logging</option>
                                  <option value="standard" className={getOptionSecurityClass('standard', 'auditLogging', form.dataClassification)}>Standard audit trail</option>
                                  <option value="detailed" className={getOptionSecurityClass('detailed', 'auditLogging', form.dataClassification)}>Detailed logging</option>
                                  <option value="comprehensive" className={getOptionSecurityClass('comprehensive', 'auditLogging', form.dataClassification)}>Comprehensive audit trail</option>
                                  <option value="forensic" className={getOptionSecurityClass('forensic', 'auditLogging', form.dataClassification)}>Forensic-level logging</option>
                                  <option value="immutable-logs" className={getOptionSecurityClass('immutable-logs', 'auditLogging', form.dataClassification)}>Immutable & tamper-evident logs</option>
                                  <option value="real-time-logging" className={getOptionSecurityClass('real-time-logging', 'auditLogging', form.dataClassification)}>Real-time log streaming & analysis</option>
                                  <option value="ai-driven-analysis" className={getOptionSecurityClass('ai-driven-analysis', 'auditLogging', form.dataClassification)}>AI-driven log analysis & anomaly detection</option>
                              </select>
                              <small className="dc-field-hint">
                                  Level of audit logging for system events, user activities, and security incidents.
                              </small>
                              {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Minimal logging acceptable'}
                                      {form.dataClassification === 'internal' && 'Standard audit trail recommended'}
                                      {form.dataClassification === 'confidential' && 'Detailed logging recommended'}
                                      {form.dataClassification === 'restricted' && 'Comprehensive or forensic logging required'}
                                  </small>
                              )}
                              <FieldWarning fieldName="auditLogging" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Penetration Testing</label>
                              </td>
                              <td>
                                <select
                                  id="penetrationTesting"
                                  name="penetrationTesting"
                                  value={form.penetrationTesting}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('penetrationTesting') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select penetration testing...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'penetrationTesting', form.dataClassification)}>No penetration testing</option>
                                  <option value="internal" className={getOptionSecurityClass('internal', 'penetrationTesting', form.dataClassification)}>Internal pentest only</option>
                                  <option value="third-party" className={getOptionSecurityClass('third-party', 'penetrationTesting', form.dataClassification)}>Third-party penetration testing</option>
                                  <option value="on-demand" className={getOptionSecurityClass('on-demand', 'penetrationTesting', form.dataClassification)}>On-demand (post-release)</option>
                                  <option value="scheduled" className={getOptionSecurityClass('scheduled', 'penetrationTesting', form.dataClassification)}>Scheduled (annual/quarterly)</option>
                                  <option value="red-team" className={getOptionSecurityClass('red-team', 'penetrationTesting', form.dataClassification)}>Red team engagements</option>
                                  <option value="purple-team" className={getOptionSecurityClass('purple-team', 'penetrationTesting', form.dataClassification)}>Purple team engagements</option>
                                  <option value="bug-bounty" className={getOptionSecurityClass('bug-bounty', 'penetrationTesting', form.dataClassification)}>Bug bounty programs</option>
                                  <option value="continuous" className={getOptionSecurityClass('continuous', 'penetrationTesting', form.dataClassification)}>Continuous penetration testing with automated pentesting tools</option>
                                </select>
                                <small className="dc-field-hint">
                                  Frequency and rigor of penetration testing to identify vulnerabilities.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Internal or third-party pentest sufficient'}
                                        {form.dataClassification === 'internal' && 'Third-party or on-demand pentest recommended'}
                                        {form.dataClassification === 'confidential' && 'Scheduled pentests with red team engagements required'}
                                        {form.dataClassification === 'restricted' && 'Continuous penetration testing strongly recommended'}
                                    </small>
                                )}
                                <FieldWarning fieldName="penetrationTesting" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">SOC Capability</label>
                              </td>
                              <td>
                                <select
                                  id="socCapability"
                                  name="socCapability"
                                  value={form.socCapability}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('socCapability') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select SOC capability...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'socCapability', form.dataClassification)}>No SOC</option>
                                  <option value="basic-monitoring" className={getOptionSecurityClass('basic-monitoring', 'socCapability', form.dataClassification)}>Basic security monitoring</option>
                                  <option value="8x5" className={getOptionSecurityClass('8x5', 'socCapability', form.dataClassification)}>8x5 SOC (business hours)</option>
                                  <option value="24x7" className={getOptionSecurityClass('24x7', 'socCapability', form.dataClassification)}>24x7 SOC</option>
                                  <option value="managed-soc" className={getOptionSecurityClass('managed-soc', 'socCapability', form.dataClassification)}>Managed SOC (outsourced)</option>
                                  <option value="hybrid-soc" className={getOptionSecurityClass('hybrid-soc', 'socCapability', form.dataClassification)}>Hybrid SOC (in-house + managed)</option>
                                  <option value="ai-augmented" className={getOptionSecurityClass('ai-augmented', 'socCapability', form.dataClassification)}>AI-augmented SOC</option>
                                  <option value="mssp-mdr-xdr" className={getOptionSecurityClass('mssp-mdr-xdr', 'socCapability', form.dataClassification)}>MSSP/MDR/XDR</option>
                                </select>
                                <small className="dc-field-hint">
                                  Security Operations Centre coverage: Hours of operation, staffing model, and automation capabilities for security monitoring and incident response.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic monitoring or no SOC (at risk) acceptable for public data'}
                                        {form.dataClassification === 'internal' && '8x5 SOC or basic monitoring recommended for internal data'}
                                        {form.dataClassification === 'confidential' && '24x7 SOC coverage recommended for confidential data'}
                                        {form.dataClassification === 'restricted' && '24x7 SOC with AI augmentation required for restricted data'}
                                    </small>
                                )}
                                <FieldWarning fieldName="socCapability" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Compliance Automation</label>
                              </td>
                              <td>
                                <select
                                  id="complianceAutomation"
                                  name="complianceAutomation"
                                  value={form.complianceAutomation}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('complianceAutomation') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select compliance automation level...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'complianceAutomation', form.dataClassification)}>No compliance checks</option>
                                  <option value="manual" className={getOptionSecurityClass('manual', 'complianceAutomation', form.dataClassification)}>Manual ad-hoc compliance checks</option>
                                  <option value="scheduled-scans" className={getOptionSecurityClass('scheduled-scans', 'complianceAutomation', form.dataClassification)}>Scheduled compliance scans and audits</option>
                                  <option value="continuous" className={getOptionSecurityClass('continuous', 'complianceAutomation', form.dataClassification)}>Continuous compliance monitoring</option>
                                  <option value="policy-as-code" className={getOptionSecurityClass('policy-as-code', 'complianceAutomation', form.dataClassification)}>Policy-as-code enforcement</option>
                                  <option value="auto-remediation" className={getOptionSecurityClass('auto-remediation', 'complianceAutomation', form.dataClassification)}>Auto-remediation of violations</option>
                                  <option value="compliance-dashboard" className={getOptionSecurityClass('compliance-dashboard', 'complianceAutomation', form.dataClassification)}>Real-time compliance dashboards</option>
                                </select>
                                <small className="dc-field-hint">
                                  Level of automation for compliance validation, policy enforcement, and regulatory reporting (e.g., SOC 2, ISO 27001, GDPR, HIPAA).
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Manual compliance checks acceptable'}
                                      {form.dataClassification === 'internal' && 'Scheduled scans recommended'}
                                      {form.dataClassification === 'confidential' && 'Continuous compliance monitoring required'}
                                      {form.dataClassification === 'restricted' && 'Policy-as-code and auto-remediation strongly recommended'}
                                  </small>
                                )}
                                <FieldWarning fieldName="complianceAutomation" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Security Metrics Tracked</label>
                              </td>
                              <td>
                                <Select
                                  isMulti
                                  id="securityMetrics"
                                  name="securityMetrics"
                                  value={
                                    form.securityMetrics && Array.isArray(form.securityMetrics)
                                      ? form.securityMetrics.map(val => ({ value: val, label: (
                                          {
                                            'mttd': 'Mean Time to Detect (MTTD)',
                                            'mtta': 'Mean Time to Acknowledge (MTTA)',
                                            'investigation-time': 'Investigation time',
                                            'mttr': 'Mean Time to Resolve / Remediation (MTTR)',
                                            'incident-volume': 'Incident volume & trends',
                                            'false-positive-rate': 'False positive rate',
                                            'vulnerability-count': 'Vulnerability count by severity',
                                            'patch-compliance': 'Patch compliance rate',
                                            'sla-adherence': 'SLA / SLO adherence (detection & response)',
                                            'risk-score': 'Overall security risk score',
                                            'breach-likelihood': 'Breach likelihood score',
                                            'control-effectiveness': 'Security control effectiveness',
                                            'business-impact-metrics': 'Business impact metrics',
                                            'remediation-cost': 'Remediation cost'
                                          }[val] || val
                                        ) }))
                                      : []
                                  }
                                  options={[
                                    { value: 'mttd', label: 'Mean Time to Detect (MTTD)' },
                                    { value: 'mtta', label: 'Mean Time to Acknowledge (MTTA)' },
                                    { value: 'investigation-time', label: 'Average Investigation Time' },
                                    { value: 'mttr', label: 'Mean Time to Resolve (MTTR)' },
                                    { value: 'incident-volume', label: 'Incident volume & trends' },
                                    { value: 'false-positive-rate', label: 'False positive rate' },
                                    { value: 'vulnerability-count', label: 'Vulnerability count by severity' },
                                    { value: 'patch-compliance', label: 'Patch compliance rate' },
                                    { value: 'sla-adherence', label: 'SLA / SLO adherence (detection & response)' },
                                    { value: 'risk-score', label: 'Overall security risk score' },
                                    { value: 'breach-likelihood', label: 'Breach likelihood score' },
                                    { value: 'control-effectiveness', label: 'Security control effectiveness' },
                                    { value: 'business-impact-metrics', label: 'Business impact metrics' },
                                    { value: 'remediation-cost', label: 'Remediation cost' }
                                  ]}
                                  onChange={handleMultiSelectChange('securityMetrics')}
                                  styles={getSecurityStyles('securityMetrics')}
                                  className={getSecurityClassName('securityMetrics', form.securityMetrics)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select security metrics..."
                                />
                                <small className="dc-field-hint">
                                  Key Performance Indicators (KPIs) and security metrics tracked for operational visibility and continuous improvement.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Basic metrics such as MTTD and incident volume'}
                                      {form.dataClassification === 'internal' && 'Additional metrics including incident volume and vulnerability count'}
                                      {form.dataClassification === 'confidential' && 'Comprehensive metrics including SLA / SLO adherence and risk score'}
                                      {form.dataClassification === 'restricted' && 'Full suite of metrics including control effectiveness and business impact'}
                                  </small>
                                )}
                                <FieldWarning fieldName="securityMetrics" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Audit Trail Retention</label>
                              </td>
                              <td>
                                <select
                                  id="auditTrailRetention"
                                  name="auditTrailRetention"
                                  value={form.auditTrailRetention}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('auditTrailRetention') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select retention period...</option>
                                  <option value="30-days" className={getOptionSecurityClass('30-days', 'auditTrailRetention', form.dataClassification)}>30 days</option>
                                  <option value="90-days" className={getOptionSecurityClass('90-days', 'auditTrailRetention', form.dataClassification)}>90 days</option>
                                  <option value="180-days" className={getOptionSecurityClass('180-days', 'auditTrailRetention', form.dataClassification)}>180 days</option>
                                  <option value="1-year" className={getOptionSecurityClass('1-year', 'auditTrailRetention', form.dataClassification)}>1 year</option>
                                  <option value="2-years" className={getOptionSecurityClass('2-years', 'auditTrailRetention', form.dataClassification)}>2 years</option>
                                  <option value="3-years" className={getOptionSecurityClass('3-years', 'auditTrailRetention', form.dataClassification)}>3 years</option>
                                  <option value="5-years" className={getOptionSecurityClass('5-years', 'auditTrailRetention', form.dataClassification)}>5 years</option>
                                  <option value="7-years" className={getOptionSecurityClass('7-years', 'auditTrailRetention', form.dataClassification)}>7 years (compliance-driven)</option>
                                  <option value="indefinite" className={getOptionSecurityClass('indefinite', 'auditTrailRetention', form.dataClassification)}>Indefinite retention</option>
                                </select>
                                <small className="dc-field-hint">
                                  Duration for retaining audit logs, security events, and access records for forensics, compliance, and incident investigation.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && '30-90 days acceptable for public data'}
                                        {form.dataClassification === 'internal' && '90-180 days recommended for internal data'}
                                        {form.dataClassification === 'confidential' && '1-2 years recommended for confidential data'}
                                        {form.dataClassification === 'restricted' && '3+ years required for restricted data and regulatory compliance'}
                                    </small>
                                )}
                                <FieldWarning fieldName="auditTrailRetention" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Change Management Integration</label>
                              </td>
                              <td>
                                <select
                                  id="changeManagementIntegration"
                                  name="changeManagementIntegration"
                                  value={form.changeManagementIntegration}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('changeManagementIntegration') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select change management integration...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'changeManagementIntegration', form.dataClassification)}>No formal change management</option>
                                  <option value="manual-approval" className={getOptionSecurityClass('manual-approval', 'changeManagementIntegration', form.dataClassification)}>Manual approval process</option>
                                  <option value="ticket-based" className={getOptionSecurityClass('ticket-based', 'changeManagementIntegration', form.dataClassification)}>Ticket-based change control</option>
                                  <option value="cab-review" className={getOptionSecurityClass('cab-review', 'changeManagementIntegration', form.dataClassification)}>Change Advisory Board (CAB) review</option>
                                  <option value="automated-workflow" className={getOptionSecurityClass('automated-workflow', 'changeManagementIntegration', form.dataClassification)}>Automated workflow approvals</option>
                                  <option value="gitops" className={getOptionSecurityClass('gitops', 'changeManagementIntegration', form.dataClassification)}>GitOps / Infrastructure-as-Code</option>
                                  <option value="continuous-delivery" className={getOptionSecurityClass('continuous-delivery', 'changeManagementIntegration', form.dataClassification)}>Continuous delivery with gates</option>
                                </select>
                                <small className="dc-field-hint">
                                  Integration with IT change management processes to track, approve, and audit security-relevant changes to infrastructure and applications.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Manual approval or no formal process acceptable for public data'}
                                      {form.dataClassification === 'internal' && 'Ticket-based change control recommended for internal data'}
                                      {form.dataClassification === 'confidential' && 'Change Advisory Board (CAB) review recommended for confidential data'}
                                      {form.dataClassification === 'restricted' && 'Formal change management with automated workflows and approvals required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="changeManagementIntegration" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Security Testing Frequency</label>
                              </td>
                              <td>
                                <select
                                  id="securityTestingFrequency"
                                  name="securityTestingFrequency"
                                  value={form.securityTestingFrequency}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('securityTestingFrequency') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select testing frequency...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'securityTestingFrequency', form.dataClassification)}>No security testing</option>
                                  <option value="ad-hoc" className={getOptionSecurityClass('ad-hoc', 'securityTestingFrequency', form.dataClassification)}>Ad-hoc / on-demand only</option>
                                  <option value="annual" className={getOptionSecurityClass('annual', 'securityTestingFrequency', form.dataClassification)}>Annual testing</option>
                                  <option value="semi-annual" className={getOptionSecurityClass('semi-annual', 'securityTestingFrequency', form.dataClassification)}>Semi-annual (twice yearly)</option>
                                  <option value="quarterly" className={getOptionSecurityClass('quarterly', 'securityTestingFrequency', form.dataClassification)}>Quarterly testing</option>
                                  <option value="monthly" className={getOptionSecurityClass('monthly', 'securityTestingFrequency', form.dataClassification)}>Monthly testing</option>
                                  <option value="continuous" className={getOptionSecurityClass('continuous', 'securityTestingFrequency', form.dataClassification)}>Continuous automated testing</option>
                                  <option value="pre-release-continuous" className={getOptionSecurityClass('pre-release-continuous', 'securityTestingFrequency', form.dataClassification)}>Pre-release + continuous</option>
                                </select>
                                <small className="dc-field-hint">
                                  Frequency of security testing activities including vulnerability assessments, penetration tests, security code reviews, and automated scans.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Annual or ad-hoc testing acceptable for public data'}
                                        {form.dataClassification === 'internal' && 'Semi-annual or quarterly testing recommended for internal data'}
                                        {form.dataClassification === 'confidential' && 'Quarterly or monthly testing recommended for confidential data'}
                                        {form.dataClassification === 'restricted' && 'Continuous automated testing required for restricted data'}
                                    </small>
                                )}  
                                <FieldWarning fieldName="securityTestingFrequency" />
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
                              <td colSpan="2">
                                <small className="dc-field-hint">
                                Select the appropriate data lifecycle management strategy based on your data classification and organisational requirements.
                                </small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Migration Strategy (Lower → Higher Trust)</label>
                              </td>
                              <td>
                                <select
                                  id="dataMigrationStrategy"
                                  name="dataMigrationStrategy"
                                  value={form.dataMigrationStrategy}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataMigrationStrategy') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select migration strategy...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'dataMigrationStrategy', form.dataClassification)}>No formal migration process</option>
                                  <option value="manual-migration" className={getOptionSecurityClass('manual-migration', 'dataMigrationStrategy', form.dataClassification)}>Manual migration with validation</option>
                                  <option value="scripted-migration" className={getOptionSecurityClass('scripted-migration', 'dataMigrationStrategy', form.dataClassification)}>Scripted migration with checkpoints</option>
                                  <option value="etl-pipeline" className={getOptionSecurityClass('etl-pipeline', 'dataMigrationStrategy', form.dataClassification)}>ETL pipeline with data quality checks</option>
                                  <option value="change-data-capture" className={getOptionSecurityClass('change-data-capture', 'dataMigrationStrategy', form.dataClassification)}>Change Data Capture (CDC)</option>
                                  <option value="real-time-sync" className={getOptionSecurityClass('real-time-sync', 'dataMigrationStrategy', form.dataClassification)}>Real-time data synchronisation</option>
                                  <option value="zero-downtime" className={getOptionSecurityClass('zero-downtime', 'dataMigrationStrategy', form.dataClassification)}>Zero-downtime migration strategy</option>
                                </select>
                                <small className="dc-field-hint">
                                  <strong>Migration approach:</strong> Moving data from lower trust to higher trust environments (e.g., dev → test → staging → production). Security controls must be maintained or enhanced during migration, never weakened.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Manual migration acceptable for public data'}
                                        {form.dataClassification === 'internal' && 'Scripted migration with validation recommended'}
                                        {form.dataClassification === 'confidential' && 'ETL pipeline with data quality checks required'}
                                        {form.dataClassification === 'restricted' && 'Real-time sync or zero-downtime strategy required'}
                                    </small>  
                                )}
                                <FieldWarning fieldName="dataMigrationStrategy" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Downgrade Controls (Higher → Lower Trust)</label>
                              </td>
                              <td>
                                <select
                                  id="dataDowngradeControls"
                                  name="dataDowngradeControls"
                                  value={form.dataDowngradeControls}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataDowngradeControls') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select downgrade controls...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'dataDowngradeControls', form.dataClassification)}>No controls (prohibited)</option>
                                  <option value="manual-approval" className={getOptionSecurityClass('manual-approval', 'dataDowngradeControls', form.dataClassification)}>Manual approval required</option>
                                  <option value="anonymisation" className={getOptionSecurityClass('anonymisation', 'dataDowngradeControls', form.dataClassification)}>Anonymisation/de-identification</option>
                                  <option value="data-masking" className={getOptionSecurityClass('data-masking', 'dataDowngradeControls', form.dataClassification)}>Data masking/obfuscation</option>
                                  <option value="tokenisation" className={getOptionSecurityClass('tokenisation', 'dataDowngradeControls', form.dataClassification)}>Tokenisation of sensitive fields</option>
                                  <option value="synthetic-data" className={getOptionSecurityClass('synthetic-data', 'dataDowngradeControls', form.dataClassification)}>Synthetic data generation</option>
                                  <option value="irreversible-anonymisation" className={getOptionSecurityClass('irreversible-anonymisation', 'dataDowngradeControls', form.dataClassification)}>Irreversible anonymisation</option>
                                  <option value="differential-privacy" className={getOptionSecurityClass('differential-privacy', 'dataDowngradeControls', form.dataClassification)}>Differential privacy</option>
                                </select>
                                <small className="dc-field-hint">
                                  <strong>Downgrade controls:</strong> Populating lower trust systems (dev/test/analytics) with data from higher trust environments (production). Sensitive data must be removed, masked, tokenised, or synthetically generated to prevent exposure. Never copy production data to non-production without sanitisation.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Manual approval acceptable for public data'}
                                        {form.dataClassification === 'internal' && 'Data masking or anonymisation recommended before downgrade'}
                                        {form.dataClassification === 'confidential' && 'Tokenisation or synthetic data generation required'}
                                        {form.dataClassification === 'restricted' && 'Irreversible anonymisation required - no production data in lower environments'}
                                    </small>
                                )}
                                <FieldWarning fieldName="dataDowngradeControls" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Versioning Strategy</label>
                              </td>
                              <td>
                                <select
                                  id="dataVersioningStrategy"
                                  name="dataVersioningStrategy"
                                  value={form.dataVersioningStrategy}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataVersioningStrategy') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select versioning strategy...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'dataVersioningStrategy', form.dataClassification)}>No versioning</option>
                                  <option value="snapshot-based" className={getOptionSecurityClass('snapshot-based', 'dataVersioningStrategy', form.dataClassification)}>Snapshot-based versioning</option>
                                  <option value="incremental" className={getOptionSecurityClass('incremental', 'dataVersioningStrategy', form.dataClassification)}>Incremental version tracking</option>
                                  <option value="full-versioning" className={getOptionSecurityClass('full-versioning', 'dataVersioningStrategy', form.dataClassification)}>Full versioning with rollback</option>
                                  <option value="git-like" className={getOptionSecurityClass('git-like', 'dataVersioningStrategy', form.dataClassification)}>Git-like version control</option>
                                  <option value="time-travel-queries" className={getOptionSecurityClass('time-travel-queries', 'dataVersioningStrategy', form.dataClassification)}>Time travel queries</option>
                                  <option value="blockchain-immutable" className={getOptionSecurityClass('blockchain-immutable', 'dataVersioningStrategy', form.dataClassification)}>Blockchain/immutable ledger</option>
                                </select>
                                <small className="dc-field-hint">
                                  <strong>Version control:</strong> How historical versions are managed for audit trails, compliance, and recovery scenarios.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Snapshot-based versioning acceptable for public data'}
                                        {form.dataClassification === 'internal' && 'Incremental version tracking recommended'}
                                        {form.dataClassification === 'confidential' && 'Full versioning with rollback capability recommended'}
                                        {form.dataClassification === 'restricted' && 'Immutable ledger or comprehensive version history required'}
                                    </small>
                                )}  
                                <FieldWarning fieldName="dataVersioningStrategy" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Redundancy/Replication Level</label>
                              </td>
                              <td>
                                <select
                                  id="dataRedundancyLevel"
                                  name="dataRedundancyLevel"
                                  value={form.dataRedundancyLevel}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataRedundancyLevel') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select redundancy level...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'dataRedundancyLevel', form.dataClassification)}>No redundancy</option>
                                  <option value="single-site-raid" className={getOptionSecurityClass('single-site-raid', 'dataRedundancyLevel', form.dataClassification)}>Single-site RAID/mirroring</option>
                                  <option value="multi-az" className={getOptionSecurityClass('multi-az', 'dataRedundancyLevel', form.dataClassification)}>Multi-AZ (availability zones)</option>
                                  <option value="cross-region-passive" className={getOptionSecurityClass('cross-region-passive', 'dataRedundancyLevel', form.dataClassification)}>Cross-region active-passive</option>
                                  <option value="cross-region-active" className={getOptionSecurityClass('cross-region-active', 'dataRedundancyLevel', form.dataClassification)}>Cross-region active-active</option>
                                  <option value="multi-cloud" className={getOptionSecurityClass('multi-cloud', 'dataRedundancyLevel', form.dataClassification)}>Multi-cloud replication</option>
                                  <option value="geo-distributed" className={getOptionSecurityClass('geo-distributed', 'dataRedundancyLevel', form.dataClassification)}>Geo-distributed replication</option>
                                </select>
                                <small className="dc-field-hint">
                                  <strong>Replication strategy:</strong> Directly impacts RTO/RPO and availability SLOs. Consider the CAP theorem trade-offs: Consistency, Availability, and Partition tolerance - you can only guarantee two of three. Higher replication increases availability but may impact consistency or latency.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Single-site RAID acceptable for public data'}
                                        {form.dataClassification === 'internal' && 'Multi-AZ replication recommended'}
                                        {form.dataClassification === 'confidential' && 'Cross-region active-passive recommended for business continuity'}
                                        {form.dataClassification === 'restricted' && 'Cross-region active-active or multi-cloud required for critical data'}
                                    </small>
                                )}
                                <FieldWarning fieldName="dataRedundancyLevel" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">HA/DR Testing Frequency</label>
                              </td>
                              <td>
                                <select
                                  id="haDrTestingFrequency"
                                  name="haDrTestingFrequency"
                                  value={form.haDrTestingFrequency}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('haDrTestingFrequency') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select HA/DR testing frequency...</option>
                                  <option value="never" className={getOptionSecurityClass('never', 'haDrTestingFrequency', form.dataClassification)}>Never tested</option>
                                  <option value="annual" className={getOptionSecurityClass('annual', 'haDrTestingFrequency', form.dataClassification)}>Annual failover testing</option>
                                  <option value="semi-annual" className={getOptionSecurityClass('semi-annual', 'haDrTestingFrequency', form.dataClassification)}>Semi-annual testing</option>
                                  <option value="quarterly" className={getOptionSecurityClass('quarterly', 'haDrTestingFrequency', form.dataClassification)}>Quarterly testing</option>
                                  <option value="monthly" className={getOptionSecurityClass('monthly', 'haDrTestingFrequency', form.dataClassification)}>Monthly testing</option>
                                  <option value="continuous" className={getOptionSecurityClass('continuous', 'haDrTestingFrequency', form.dataClassification)}>Continuous chaos engineering</option>
                                </select>
                                <small className="dc-field-hint">
                                  <strong>High Availability / Disaster Recovery testing:</strong> Validates failover procedures, recovery processes, and verifies that RTO/RPO objectives are achievable. Untested HA/DR plans often fail during actual incidents.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Annual HA/DR testing acceptable for public data'}
                                        {form.dataClassification === 'internal' && 'Semi-annual or quarterly testing recommended'}
                                        {form.dataClassification === 'confidential' && 'Quarterly testing required for business-critical systems'}
                                        {form.dataClassification === 'restricted' && 'Monthly testing or continuous chaos engineering required'}
                                    </small>
                                )}
                                <FieldWarning fieldName="haDrTestingFrequency" />
                              </td>
                            </tr>
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
                                  <option value="none" className={getOptionSecurityClass('none', 'backupStrategy', form.dataClassification)}>
                                    No backup
                                  </option>
                                  <option value="basic" className={getOptionSecurityClass('basic', 'backupStrategy', form.dataClassification)}>
                                    Basic backups
                                  </option>
                                  <option value="encrypted" className={getOptionSecurityClass('encrypted', 'backupStrategy', form.dataClassification)}>
                                    Encrypted backups
                                  </option>
                                  <option value="geo-redundant" className={getOptionSecurityClass('geo-redundant', 'backupStrategy', form.dataClassification)}>
                                    Geo-redundant encrypted backups
                                  </option>
                                  <option value="immutable" className={getOptionSecurityClass('immutable', 'backupStrategy', form.dataClassification)}>
                                    Immutable backups
                                  </option>
                                  <option value="air-gapped" className={getOptionSecurityClass('air-gapped', 'backupStrategy', form.dataClassification)}>
                                    Air-gapped backups
                                  </option>
                                  </select>
                                  <small className="dc-field-hint">
                                      3-2-1 backup heuristic: 3 copies of data, 2 local but different devices, 1 off-site. Consider the backup technology (e.g. snapshots, continuous data protection), frequency (e.g. real-time, hourly, daily), and recovery objectives (RPO/RTO).
                                  </small>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && 'Basic backups acceptable'}
                                          {form.dataClassification === 'internal' && 'Encrypted backups recommended'}
                                          {form.dataClassification === 'confidential' && 'Geo-redundant encrypted backups recommended'}
                                          {form.dataClassification === 'restricted' && 'Air-gapped or immutable backups required'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="backupStrategy" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Backup Testing Frequency</label>
                              </td>
                              <td>
                                <select
                                  id="backupTestingFrequency"
                                  name="backupTestingFrequency"
                                  value={form.backupTestingFrequency}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('backupTestingFrequency') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select testing frequency...</option>
                                  <option value="never" className={getOptionSecurityClass('never', 'backupTestingFrequency', form.dataClassification)}>Never tested</option>
                                  <option value="annual" className={getOptionSecurityClass('annual', 'backupTestingFrequency', form.dataClassification)}>Annual validation</option>
                                  <option value="semi-annual" className={getOptionSecurityClass('semi-annual', 'backupTestingFrequency', form.dataClassification)}>Semi-annual testing</option>
                                  <option value="quarterly" className={getOptionSecurityClass('quarterly', 'backupTestingFrequency', form.dataClassification)}>Quarterly testing</option>
                                  <option value="monthly" className={getOptionSecurityClass('monthly', 'backupTestingFrequency', form.dataClassification)}>Monthly testing</option>
                                  <option value="continuous" className={getOptionSecurityClass('continuous', 'backupTestingFrequency', form.dataClassification)}>Continuous automated validation</option>
                                </select>
                                <small className="dc-field-hint">
                                  <strong>Backup validation:</strong> Critical operational control - untested backups are often unrecoverable when needed. Regular testing validates backup integrity, recovery procedures, and RTO/RPO assumptions.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Annual testing acceptable for public data'}
                                        {form.dataClassification === 'internal' && 'Semi-annual or quarterly testing recommended'}
                                        {form.dataClassification === 'confidential' && 'Quarterly testing required for business-critical data'}
                                        {form.dataClassification === 'restricted' && 'Monthly or continuous automated validation required'}
                                    </small>
                                )}
                                <FieldWarning fieldName="backupTestingFrequency" />
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
                                  <option value="7-days" className={getOptionSecurityClass('7-days', 'backupRetentionPeriod', form.dataClassification)}>7 days</option>
                                  <option value="30-days" className={getOptionSecurityClass('30-days', 'backupRetentionPeriod', form.dataClassification)}>30 days</option>
                                  <option value="90-days" className={getOptionSecurityClass('90-days', 'backupRetentionPeriod', form.dataClassification)}>90 days</option>
                                  <option value="6-months" className={getOptionSecurityClass('6-months', 'backupRetentionPeriod', form.dataClassification)}>6 months</option>
                                  <option value="1-year" className={getOptionSecurityClass('1-year', 'backupRetentionPeriod', form.dataClassification)}>1 year</option>
                                  <option value="2-years" className={getOptionSecurityClass('2-years', 'backupRetentionPeriod', form.dataClassification)}>2 years</option>
                                  <option value="3-years" className={getOptionSecurityClass('3-years', 'backupRetentionPeriod', form.dataClassification)}>3 years</option>
                                  <option value="5-years" className={getOptionSecurityClass('5-years', 'backupRetentionPeriod', form.dataClassification)}>5 years</option>
                                  <option value="7-years" className={getOptionSecurityClass('7-years', 'backupRetentionPeriod', form.dataClassification)}>7 years</option>
                                  <option value="match-data" className={getOptionSecurityClass('match-data', 'backupRetentionPeriod', form.dataClassification)}>Match data retention</option>
                                  <option value="indefinite" className={getOptionSecurityClass('indefinite', 'backupRetentionPeriod', form.dataClassification)}>Indefinite retention</option>
                                  </select>
                                  <small className="dc-field-hint">
                                      How long backup copies are maintained for recovery purposes. Also consider what else is required to recover the data, such as maintaining the original application or system for longer retention periods. Also consider legal/regulatory requirements for backup retention and the cost of storage and maintaining recovery infrastructure and processes.
                                  </small>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && '30-90 days acceptable for public data'}
                                          {form.dataClassification === 'internal' && '90 days to 1 year recommended for internal data'}
                                          {form.dataClassification === 'confidential' && '1-3 years recommended for confidential data'}
                                          {form.dataClassification === 'restricted' && '5+ years required for restricted data'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="backupRetentionPeriod" />
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
                                <option value="30-days" className={getOptionSecurityClass('30-days', 'dataRetentionPolicy', form.dataClassification)}>30 days</option>
                                <option value="90-days" className={getOptionSecurityClass('90-days', 'dataRetentionPolicy', form.dataClassification)}>90 days</option>
                                <option value="1-year" className={getOptionSecurityClass('1-year', 'dataRetentionPolicy', form.dataClassification)}>1 year</option>
                                <option value="3-years" className={getOptionSecurityClass('3-years', 'dataRetentionPolicy', form.dataClassification)}>3 years</option>
                                <option value="5-years" className={getOptionSecurityClass('5-years', 'dataRetentionPolicy', form.dataClassification)}>5 years</option>
                                <option value="7-years" className={getOptionSecurityClass('7-years', 'dataRetentionPolicy', form.dataClassification)}>7 years</option>
                                <option value="10-years" className={getOptionSecurityClass('10-years', 'dataRetentionPolicy', form.dataClassification)}>10 years</option>
                                <option value="indefinite-legal-hold" className={getOptionSecurityClass('indefinite-legal-hold', 'dataRetentionPolicy', form.dataClassification)}>Indefinite (legal hold)</option>
                                <option value="indefinite-no-policy" className={getOptionSecurityClass('indefinite-no-policy', 'dataRetentionPolicy', form.dataClassification)}>Indefinite (no policy)</option>
                                <option value="custom" className={getOptionSecurityClass('custom', 'dataRetentionPolicy', form.dataClassification)}>Custom period</option>
                                </select>
                                <small className="dc-field-hint">
                                    How long the data must be kept for business/legal purposes. 
                                    When data needs to be retained for extended periods, also consider the technology that will need to be maintained to access the data over the same period. Also consider legal/regulatory requirements for data retention and the cost of storage.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && '90 days to 1 year acceptable for public data'}
                                        {form.dataClassification === 'internal' && '1-3 years recommended for internal data'}
                                        {form.dataClassification === 'confidential' && '3-7 years recommended for confidential data'}
                                        {form.dataClassification === 'restricted' && '7+ years or indefinite retention required for restricted data'}
                                    </small>
                                )}
                                <FieldWarning fieldName="dataRetentionPolicy" />
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
                                  <option value="none" className={getOptionSecurityClass('none', 'archivePolicy', form.dataClassification)}>No archiving</option>
                                  <option value="short-term" className={getOptionSecurityClass('short-term', 'archivePolicy', form.dataClassification)}>Inactivity based, cool short-term archive (30-90 days)</option>
                                  <option value="cold-storage" className={getOptionSecurityClass('cold-storage', 'archivePolicy', form.dataClassification)}>Cold storage (90-180 days)</option>
                                  <option value="glacier" className={getOptionSecurityClass('glacier', 'archivePolicy', form.dataClassification)}>Glacier/deep archive (180+ days)</option>
                                  <option value="tape-archive" className={getOptionSecurityClass('tape-archive', 'archivePolicy', form.dataClassification)}>Tape archive (1+ year)</option>
                                  <option value="legal-hold" className={getOptionSecurityClass('legal-hold', 'archivePolicy', form.dataClassification)}>Legal hold archive</option>
                                  <option value="regulatory" className={getOptionSecurityClass('regulatory', 'archivePolicy', form.dataClassification)}>Regulatory compliance archive</option>
                                  <option value="custom" className={getOptionSecurityClass('custom', 'archivePolicy', form.dataClassification)}>Custom archive policy</option>
                              </select>
                              <small className="dc-field-hint">
                                  Long-term storage policy for infrequently accessed data. Also consider how archived data is discoverable and retrievable over its lifetime and the technology that needs to be maintained to access the data on retrieval from archive.
                              </small>
                              {form.dataClassification && (
                                <small className="dc-field-hint">
                                  <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Short-term or cold storage acceptable for public data'}
                                      {form.dataClassification === 'internal' && 'Cold storage or glacier recommended'}
                                      {form.dataClassification === 'confidential' && 'Glacier or tape archive recommended'}
                                      {form.dataClassification === 'restricted' && 'Tape archive or legal/regulatory hold required'}
                                </small>
                              )}
                              <FieldWarning fieldName="archivePolicy" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">End-of-Life (EOL) Process</label>
                              </td>
                              <td>
                                <select
                                  id="dataEolProcess"
                                  name="dataEolProcess"
                                  value={form.dataEolProcess}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataEolProcess') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select EOL process...</option>
                                  <option value="ad-hoc" className={getOptionSecurityClass('ad-hoc', 'dataEolProcess', form.dataClassification)}>Ad-hoc deletion</option>
                                  <option value="formal-review" className={getOptionSecurityClass('formal-review', 'dataEolProcess', form.dataClassification)}>Formal review process</option>
                                  <option value="legal-review" className={getOptionSecurityClass('legal-review', 'dataEolProcess', form.dataClassification)}>Legal review required</option>
                                  <option value="automated-workflow" className={getOptionSecurityClass('automated-workflow', 'dataEolProcess', form.dataClassification)}>Automated EOL workflow</option>
                                  <option value="chain-of-custody" className={getOptionSecurityClass('chain-of-custody', 'dataEolProcess', form.dataClassification)}>Chain-of-custody tracking</option>
                                  <option value="compliance-driven" className={getOptionSecurityClass('compliance-driven', 'dataEolProcess', form.dataClassification)}>Compliance-driven EOL automation</option>
                                </select>
                                <small className="dc-field-hint">
                                  <strong>Data decommissioning:</strong> Systematic approach when data reaches end-of-life. Ensures proper governance, audit trails, and compliance when data is archived or destroyed.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Formal review process acceptable for public data'}
                                        {form.dataClassification === 'internal' && 'Formal review with documentation recommended'}
                                        {form.dataClassification === 'confidential' && 'Legal review and automated workflow recommended'}
                                        {form.dataClassification === 'restricted' && 'Chain-of-custody tracking and compliance-driven automation required'}
                                    </small>
                                )}
                                <FieldWarning fieldName="dataEolProcess" />
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
                                  <option value="none" className={getOptionSecurityClass('none', 'dataDisposalMethod', form.dataClassification)}>No disposal</option>
                                  <option value="manual" className={getOptionSecurityClass('manual', 'dataDisposalMethod', form.dataClassification)}>
                                    Manual deletion
                                  </option>
                                  <option value="secure-wipe" className={getOptionSecurityClass('secure-wipe', 'dataDisposalMethod', form.dataClassification)}>
                                    Secure wipe
                                  </option>
                                  <option value="cryptographic" className={getOptionSecurityClass('cryptographic', 'dataDisposalMethod', form.dataClassification)}>
                                    Cryptographic erasure
                                  </option>
                                  <option value="degaussing" className={getOptionSecurityClass('degaussing', 'dataDisposalMethod', form.dataClassification)}>
                                    Degaussing
                                  </option>
                                  <option value="physical" className={getOptionSecurityClass('physical', 'dataDisposalMethod', form.dataClassification)}>
                                    Physical destruction
                                  </option>
                                  <option value="witnessed" className={getOptionSecurityClass('witnessed', 'dataDisposalMethod', form.dataClassification)}>
                                    Witnessed destruction
                                  </option>
                                  <option value="certified" className={getOptionSecurityClass('certified', 'dataDisposalMethod', form.dataClassification)}>
                                    Certified disposal
                                  </option>
                                  </select>
                                  <small className="dc-field-hint">
                                      Method used to permanently dispose of data at end-of-life. Choose methods that ensure data cannot be recovered, especially for sensitive information.
                                  </small>
                                  {form.dataClassification && (
                                      <small className="dc-field-hint">
                                          <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                          {form.dataClassification === 'public' && 'Manual deletion acceptable'}
                                          {form.dataClassification === 'internal' && 'Secure wipe recommended'}
                                          {form.dataClassification === 'confidential' && 'Cryptographic erasure recommended'}
                                          {form.dataClassification === 'restricted' && 'Physical or witnessed destruction required'}
                                      </small>
                                  )}
                                  <FieldWarning fieldName="dataDisposalMethod" />
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
                              <td colSpan="2">
                                <small className="dc-field-hint">
                                Select the appropriate compliance and governance strategy based on your data classification and organisational requirements.
                                </small>
                              </td>
                            </tr>
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
                                    Reference your Business Impact Assessment (<a href="../bia" target="_blank" rel="noopener noreferrer">BIA</a>) to determine impact level. If not available, use the following guidelines:
                                  </small>
                                </label>
                              </td>
                              <td>
                                <select
                                  id="businessImpactLevel"
                                  name="businessImpactLevel"
                                  value={form.businessImpactLevel}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('businessImpactLevel') ? 'dc-field-warning' : 'dc-select'}
                                >
                                    <option value="">Select business impact...</option>
                                    <option value="low" className={getOptionSecurityClass('low', 'businessImpactLevel', form.dataClassification)}>Low - Minimal business impact</option>
                                    <option value="medium" className={getOptionSecurityClass('medium', 'businessImpactLevel', form.dataClassification)}>Medium - Moderate business impact</option>
                                    <option value="high" className={getOptionSecurityClass('high', 'businessImpactLevel', form.dataClassification)}>High - Significant business impact</option>
                                    <option value="critical" className={getOptionSecurityClass('critical', 'businessImpactLevel', form.dataClassification)}>Critical - impact to business critical systems</option>
                                    <option value="catastrophic" className={getOptionSecurityClass('catastrophic', 'businessImpactLevel', form.dataClassification)}>Catastrophic - Organisation-wide impact</option>
                                </select>
                                <small className="dc-field-hint">
                                  Potential impact on business operations if the data/system is compromised, unavailable, or lost.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                      <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Typically low to medium impact acceptable'}
                                        {form.dataClassification === 'internal' && 'Medium impact level recommended'}
                                        {form.dataClassification === 'confidential' && 'High impact level recommended'}
                                        {form.dataClassification === 'restricted' && 'Critical or catastrophic impact level required'}   
                                    </small>
                                )}  
                              <FieldWarning fieldName="businessImpactLevel" />
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
                                  className={getFieldWarning('availabilitySLO') ? 'dc-field-warning' : 'dc-select'}
                              >
                                  <option value="">Select availability target...</option>
                                  <option value="95" className={getOptionSecurityClass('95', 'availabilitySLO', form.dataClassification)}>95% (36.5 hours downtime/year)</option>
                                  <option value="99" className={getOptionSecurityClass('99', 'availabilitySLO', form.dataClassification)}>99% (3.65 days downtime/year)</option>
                                  <option value="99.5" className={getOptionSecurityClass('99.5', 'availabilitySLO', form.dataClassification)}>99.5% (1.83 days downtime/year)</option>
                                  <option value="99.9" className={getOptionSecurityClass('99.9', 'availabilitySLO', form.dataClassification)}>99.9% (8.77 hours downtime/year)</option>
                                  <option value="99.95" className={getOptionSecurityClass('99.95', 'availabilitySLO', form.dataClassification)}>99.95% (4.38 hours downtime/year)</option>
                                  <option value="99.99" className={getOptionSecurityClass('99.99', 'availabilitySLO', form.dataClassification)}>99.99% (52.6 minutes downtime/year)</option>
                                  <option value="99.999" className={getOptionSecurityClass('99.999', 'availabilitySLO', form.dataClassification)}>99.999% (5.26 minutes downtime/year)</option>
                              </select>
                              <small className="dc-field-hint">
                                  Service Level Objective for system availability (N.B. every additional &quot;9&quot; doubles the cost and complexity. &gt; 99.5% exceeds typical cost/benefit ratio of most organisations)
                              </small>
                              {form.businessImpactLevel && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.businessImpactLevel.toUpperCase()} impact:</strong>{' '}
                                      {form.businessImpactLevel === 'low' && '95% - 99% availability acceptable'}
                                      {form.businessImpactLevel === 'medium' && '99% - 99.5% availability recommended'}
                                      {form.businessImpactLevel === 'high' && '99.5% - 99.9% availability recommended'}
                                      {form.businessImpactLevel === 'critical' && '99.9% - 99.99% availability recommended'}
                                      {form.businessImpactLevel === 'catastrophic' && '99.99% - 99.999% availability required'}
                                  </small>
                                )}
                                <FieldWarning fieldName="availabilitySLO" />
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
                                  className={getFieldWarning('rto') ? 'dc-field-warning' : 'dc-select'}
                              >
                                  <option value="">Select RTO...</option>
                                  <option value="immediate" className={getOptionSecurityClass('immediate', 'rto', form.dataClassification)}>Immediate (&lt; 1 minute: HA)</option>
                                  <option value="5-minutes" className={getOptionSecurityClass('5-minutes', 'rto', form.dataClassification)}>5 minutes</option>
                                  <option value="15-minutes" className={getOptionSecurityClass('15-minutes', 'rto', form.dataClassification)}>15 minutes</option>
                                  <option value="30-minutes" className={getOptionSecurityClass('30-minutes', 'rto', form.dataClassification)}>30 minutes</option>
                                  <option value="1-hour" className={getOptionSecurityClass('1-hour', 'rto', form.dataClassification)}>1 hour</option>
                                  <option value="4-hours" className={getOptionSecurityClass('4-hours', 'rto', form.dataClassification)}>4 hours</option>
                                  <option value="8-hours" className={getOptionSecurityClass('8-hours', 'rto', form.dataClassification)}>8 hours (same business day)</option>
                                  <option value="24-hours" className={getOptionSecurityClass('24-hours', 'rto', form.dataClassification)}>24 hours (next business day)</option>
                                  <option value="48-hours" className={getOptionSecurityClass('48-hours', 'rto', form.dataClassification)}>48 hours</option>
                                  <option value="72-hours" className={getOptionSecurityClass('72-hours', 'rto', form.dataClassification)}>72 hours</option>
                                  <option value="5-days" className={getOptionSecurityClass('5-days', 'rto', form.dataClassification)}>5 days</option>
                                  <option value="1-week" className={getOptionSecurityClass('1-week', 'rto', form.dataClassification)}>1 week</option>
                                  <option value="1-month" className={getOptionSecurityClass('1-month', 'rto', form.dataClassification)}>1 month</option>
                              </select>
                              <small className="dc-field-hint">
                                  Maximum acceptable time to restore service after disruption (subject to type of disruption)
                              </small>
                              {form.businessImpactLevel && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.businessImpactLevel.toUpperCase()} impact:</strong>{' '}
                                      {form.businessImpactLevel === 'low' && '24 hours - 5 days RTO acceptable'}
                                      {form.businessImpactLevel === 'medium' && '4 hours - 24 hours RTO recommended'}
                                      {form.businessImpactLevel === 'high' && '1 hour - 4 hours RTO recommended'}
                                      {form.businessImpactLevel === 'critical' && '15 minutes - 1 hour RTO recommended'}
                                      {form.businessImpactLevel === 'catastrophic' && 'Immediate to 15 minutes RTO required'}
                                  </small>
                                )}
                                <FieldWarning fieldName="recoveryTimeObjective" />
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
                                  className={getFieldWarning('rpo') ? 'dc-field-warning' : 'dc-select'}
                              >
                                  <option value="">Select RPO...</option>
                                  <option value="zero" className={getOptionSecurityClass('zero', 'rpo', form.dataClassification)}>Zero data loss (synchronous replication)</option>
                                  <option value="5-minutes" className={getOptionSecurityClass('5-minutes', 'rpo', form.dataClassification)}>5 minutes</option>
                                  <option value="15-minutes" className={getOptionSecurityClass('15-minutes', 'rpo', form.dataClassification)}>15 minutes</option>
                                  <option value="30-minutes" className={getOptionSecurityClass('30-minutes', 'rpo', form.dataClassification)}>30 minutes</option>
                                  <option value="1-hour" className={getOptionSecurityClass('1-hour', 'rpo', form.dataClassification)}>1 hour</option>
                                  <option value="4-hours" className={getOptionSecurityClass('4-hours', 'rpo', form.dataClassification)}>4 hours</option>
                                  <option value="8-hours" className={getOptionSecurityClass('8-hours', 'rpo', form.dataClassification)}>8 hours</option>
                                  <option value="12-hours" className={getOptionSecurityClass('12-hours', 'rpo', form.dataClassification)}>12 hours</option>
                                  <option value="24-hours" className={getOptionSecurityClass('24-hours', 'rpo', form.dataClassification)}>24 hours (daily backup)</option>
                                  <option value="48-hours" className={getOptionSecurityClass('48-hours', 'rpo', form.dataClassification)}>48 hours</option>
                                  <option value="72-hours" className={getOptionSecurityClass('72-hours', 'rpo', form.dataClassification)}>72 hours</option>
                                  <option value="5-days" className={getOptionSecurityClass('5-days', 'rpo', form.dataClassification)}>5 days</option>
                                  <option value="1-week" className={getOptionSecurityClass('1-week', 'rpo', form.dataClassification)}>1 week</option>
                                  <option value="1-month" className={getOptionSecurityClass('1-month', 'rpo', form.dataClassification)}>1 month</option>
                              </select>
                              <small className="dc-field-hint">
                                  Maximum acceptable data loss in case of disruption (Achieving &lt; 15 minutes RPO exceeds typical cost/benefit ratio of most organisations)
                              </small>
                              {form.businessImpactLevel && (
                                  <small className="dc-field-hint">
                                      <strong>Recommendation for {form.businessImpactLevel.toUpperCase()} impact:</strong>{' '}
                                      {form.businessImpactLevel === 'low' && '4 - 24 hours RPO acceptable'}
                                      {form.businessImpactLevel === 'medium' && '30 minutes - 4 hours RPO recommended'}
                                      {form.businessImpactLevel === 'high' && '15 - 30 minutes RPO recommended'}
                                      {form.businessImpactLevel === 'critical' && '5 - 15 minutes RPO recommended'}
                                      {form.businessImpactLevel === 'catastrophic' && 'zero data loss (synchronous replication) required'}
                                  </small>
                                )}
                                <FieldWarning fieldName="recoveryPointObjective" />
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
                                  className={getFieldWarning('incidentResponse') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select response level...</option>
                                  <option value="standard" className={getOptionSecurityClass('standard', 'incidentResponse', form.dataClassification)}>Standard response (days)</option>
                                  <option value="priority" className={getOptionSecurityClass('priority', 'incidentResponse', form.dataClassification)}>Priority response (hours)</option>
                                  <option value="urgent" className={getOptionSecurityClass('urgent', 'incidentResponse', form.dataClassification)}>Urgent response (&lt; 1 hour)</option>
                                  <option value="immediate" className={getOptionSecurityClass('immediate', 'incidentResponse', form.dataClassification)}>Immediate response (&lt; 15 min)</option>
                                  <option value="emergency" className={getOptionSecurityClass('emergency', 'incidentResponse', form.dataClassification)}>Emergency response (&lt; 5 min)</option>
                                </select>
                                <small className="dc-field-hint">
                                    Time to acknowledge and begin responding to incidents affecting the system. Faster response times are critical for high-impact systems to minimise downtime and data loss.
                                </small>
                                {form.businessImpactLevel && (
                                    <small className="dc-field-hint">
                                        <strong>Recommendation for {form.businessImpactLevel.toUpperCase()} impact:</strong>{' '}
                                        {form.businessImpactLevel === 'low' && 'Standard response (24-72 hours) acceptable'}
                                        {form.businessImpactLevel === 'medium' && 'Priority response (4-8 hours) recommended'}
                                        {form.businessImpactLevel === 'high' && 'Urgent response (< 1 hour) recommended'}
                                        {form.businessImpactLevel === 'critical' && 'Immediate response (< 15 minutes) required'}
                                        {form.businessImpactLevel === 'catastrophic' && 'Emergency response (< 5 minutes) required'}
                                    </small>
                                  )}
                                <FieldWarning fieldName="incidentResponse" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Architecture Governance</label>
                              </td>
                              <td>
                                <select
                                  id="architectureGovernance"
                                  name="architectureGovernance"
                                  value={form.architectureGovernance}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('architectureGovernance') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select architecture governance maturity...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'architectureGovernance', form.dataClassification)}>No formal architecture governance</option>
                                  <option value="ad-hoc" className={getOptionSecurityClass('ad-hoc', 'architectureGovernance', form.dataClassification)}>Ad-hoc architecture reviews</option>
                                  <option value="arb-quarterly" className={getOptionSecurityClass('arb-quarterly', 'architectureGovernance', form.dataClassification)}>Architecture Review Board (ARB) - quarterly reviews</option>
                                  <option value="arb-monthly" className={getOptionSecurityClass('arb-monthly', 'architectureGovernance', form.dataClassification)}>Architecture Review Board (ARB) - monthly reviews</option>
                                  <option value="arb-regular" className={getOptionSecurityClass('arb-regular', 'architectureGovernance', form.dataClassification)}>Architecture Review Board (ARB) - regular reviews</option>
                                  <option value="adr-maintained" className={getOptionSecurityClass('adr-maintained', 'architectureGovernance', form.dataClassification)}>Architecture Decision Records (ADRs) maintained</option>
                                  <option value="roadmap-maintained" className={getOptionSecurityClass('roadmap-maintained', 'architectureGovernance', form.dataClassification)}>Architecture roadmap maintained</option>
                                  <option value="tech-radar" className={getOptionSecurityClass('tech-radar', 'architectureGovernance', form.dataClassification)}>Technology radar / strategic planning</option>
                                  <option value="ea-framework" className={getOptionSecurityClass('ea-framework', 'architectureGovernance', form.dataClassification)}>Enterprise Architecture framework (TOGAF/Zachman)</option>
                                  <option value="continuous-review" className={getOptionSecurityClass('continuous-review', 'architectureGovernance', form.dataClassification)}>Continuous architecture reviews and governance</option>
                                  <option value="fitness-functions" className={getOptionSecurityClass('fitness-functions', 'architectureGovernance', form.dataClassification)}>Architecture fitness functions</option>
                                </select>
                                <small className="dc-field-hint">
                                  <strong>Architecture governance maturity:</strong> Formal processes for architecture review, decision-making, strategic planning, and ensuring technical decisions align with business strategy, requirements, and compliance needs.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Ad-hoc reviews or basic roadmap acceptable for public data'}
                                        {form.dataClassification === 'internal' && 'ARB with quarterly reviews or maintained roadmap recommended'}
                                        {form.dataClassification === 'confidential' && 'Regular ARB reviews + ADRs + strategic planning recommended'}
                                        {form.dataClassification === 'restricted' && 'EA framework + continuous reviews + fitness functions required for restricted data'}
                                    </small>
                                )}
                                <FieldWarning fieldName="architectureGovernance" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Third-Party Risk Management</label>
                              </td>
                              <td>
                                <Select
                                  id="thirdPartyRiskManagement"
                                  name="thirdPartyRiskManagement"
                                  isMulti
                                  options={[
                                    { value: 'none', label: 'No third-party assessment' },
                                    { value: 'basic-questionnaire', label: 'Basic security questionnaire' },
                                    { value: 'annual-review', label: 'Annual vendor reviews' },
                                    { value: 'vendor-risk-scoring', label: 'Vendor risk scoring program' },
                                    { value: 'on-site-audits', label: 'On-site security audits' },
                                    { value: 'continuous-monitoring', label: 'Continuous vendor monitoring' },
                                    { value: 'sla-enforcement', label: 'SLA enforcement and penalties' },
                                    { value: 'supply-chain-security', label: 'Supply chain security program' },
                                    { value: 'escrow-accountability', label: 'Escrow and accountability measures' },
                                    { value: 'insurance-verification', label: 'Insurance verification' },
                                    { value: 'cyber-security-attestation', label: 'Cyber security attestation (e.g. SOC 2, ISO 27001)' },
                                    { value: 'regulatory-compliance', label: 'Regulatory compliance (e.g. PCI DSS, HIPAA)' },
                                    { value: 'privacy-impact-assessment', label: 'Privacy impact assessment (PIA - APP/GDPR compliance)' },
                                    { value: 'ethical-sourcing-review', label: 'Ethical sourcing review' },
                                    { value: 'modern-slavery-assessment', label: 'Modern slavery risk assessment' },
                                    { value: 'nth-tier-transparency', label: 'Nth-tier supplier transparency' },
                                    { value: 'comprehensive-tprm', label: 'Comprehensive TPRM (security + slavery + supply chain)' }
                                  ]}
                                  value={(Array.isArray(form.thirdPartyRiskManagement)
                                    ? form.thirdPartyRiskManagement
                                    : [form.thirdPartyRiskManagement].filter(Boolean)).map(v => {
                                      const labels = {
                                        'none': 'No third-party assessment',
                                        'basic-questionnaire': 'Basic security questionnaire',
                                        'annual-review': 'Annual vendor reviews',
                                        'vendor-risk-scoring': 'Vendor risk scoring program',
                                        'on-site-audits': 'On-site security audits',
                                        'continuous-monitoring': 'Continuous vendor monitoring',
                                        'sla-enforcement': 'SLA enforcement and penalties',
                                        'supply-chain-security': 'Supply chain security program',
                                        'escrow-accountability': 'Escrow and accountability measures',
                                        'insurance-verification': 'Insurance verification',
                                        'cyber-security-attestation': 'Cyber security attestation (e.g. SOC 2, ISO 27001, PCI DSS)',
                                        'regulatory-compliance': 'Regulatory compliance (e.g. APP 8, HIPAA)',
                                        'privacy-impact-assessment': 'Privacy impact assessment (PIA - APP/GDPR compliance)',
                                        'ethical-sourcing-review': 'Ethical sourcing review',
                                        'modern-slavery-assessment': 'Modern slavery risk assessment',
                                        'nth-tier-transparency': 'Nth-tier supplier transparency',
                                        'comprehensive-tprm': 'Comprehensive TPRM (security + slavery + supply chain)'
                                      };
                                      return { value: v, label: labels[v] || v };
                                    })}
                                  onChange={handleMultiSelectChange('thirdPartyRiskManagement')}
                                  styles={getSecurityStyles('thirdPartyRiskManagement')}
                                  className={getSecurityClassName('thirdPartyRiskManagement', form.thirdPartyRiskManagement)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                  <strong>Vendor/supplier assessment:</strong> Third-party breaches are a leading cause of security incidents. Under Australian Privacy Act APP 8, organisations must take reasonable steps to ensure overseas recipients comply with APPs when disclosing personal information. Australian Modern Slavery Act 2018 requires entities with consolidated revenue ≥$100M AUD to report on modern slavery risks in operations and supply chains. Consider Nth-tier supplier transparency, forced labour indicators, and ethical sourcing programs.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic questionnaire acceptable; consider modern slavery assessment if applicable'}
                                        {form.dataClassification === 'internal' && 'Annual vendor reviews with supply chain visibility recommended'}
                                        {form.dataClassification === 'confidential' && 'Continuous monitoring, risk scoring, and modern slavery assessment required; verify supplier labour practices and data handling'}
                                        {form.dataClassification === 'restricted' && 'Comprehensive TPRM required: security + Modern Slavery Act compliance + supply chain mapping (APP 8, Nth-tier suppliers, forced labour indicators, ethical sourcing verification)'}
                                    </small>
                                )}
                                <FieldWarning fieldName="thirdPartyRiskManagement" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Processing Agreement (DPA) Status</label>
                              </td>
                              <td>
                                <select
                                  id="dpaStatus"
                                  name="dpaStatus"
                                  value={form.dpaStatus}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dpaStatus') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select DPA status...</option>
                                  <option value="not-applicable" className={getOptionSecurityClass('not-applicable', 'dpaStatus', form.dataClassification)}>Not applicable (no processors)</option>
                                  <option value="app8-compliant" className={getOptionSecurityClass('app8-compliant', 'dpaStatus', form.dataClassification)}>APP 8 compliant agreements in place</option>
                                  <option value="dpa-in-place" className={getOptionSecurityClass('dpa-in-place', 'dpaStatus', form.dataClassification)}>Data Processing Agreement (DPA) in place</option>
                                  <option value="standard-contractual-clauses" className={getOptionSecurityClass('standard-contractual-clauses', 'dpaStatus', form.dataClassification)}>Standard Contractual Clauses (GDPR)</option>
                                  <option value="binding-corporate-rules" className={getOptionSecurityClass('binding-corporate-rules', 'dpaStatus', form.dataClassification)}>Binding Corporate Rules (BCR)</option>
                                  <option value="adequacy-decision" className={getOptionSecurityClass('adequacy-decision', 'dpaStatus', form.dataClassification)}>Adequacy decision (GDPR)</option>
                                </select>
                                <small className="dc-field-hint">
                                  <strong>Processor agreements:</strong> Required when third parties process data on your behalf. Australian Privacy Act requires APP 8 compliance for overseas disclosures. GDPR requires DPAs for processors handling EU personal data.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Requirements for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Not typically required for public data'}
                                        {form.dataClassification === 'internal' && 'APP 8 compliant agreements recommended for overseas processors'}
                                        {form.dataClassification === 'confidential' && 'DPA agreements required for all processors'}
                                        {form.dataClassification === 'restricted' && 'Standard Contractual Clauses or BCR required for cross-border transfers (GDPR); APP 8 compliance mandatory'}
                                    </small>
                                )}
                                <FieldWarning fieldName="dpaStatus" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Regulatory Reporting Obligations</label>
                              </td>
                              <td>
                                <select
                                  id="regulatoryReporting"
                                  name="regulatoryReporting"
                                  value={form.regulatoryReporting}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('regulatoryReporting') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select reporting obligations...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'regulatoryReporting', form.dataClassification)}>No regulatory reporting required</option>
                                  <option value="internal-only" className={getOptionSecurityClass('internal-only', 'regulatoryReporting', form.dataClassification)}>Internal reporting only</option>
                                  <option value="ndb-scheme" className={getOptionSecurityClass('ndb-scheme', 'regulatoryReporting', form.dataClassification)}>Notifiable Data Breaches (NDB) scheme - OAIC</option>
                                  <option value="gdpr-72-hours" className={getOptionSecurityClass('gdpr-72-hours', 'regulatoryReporting', form.dataClassification)}>GDPR breach notification (72 hours)</option>
                                  <option value="mandatory-incident-reporting" className={getOptionSecurityClass('mandatory-incident-reporting', 'regulatoryReporting', form.dataClassification)}>Mandatory incident reporting</option>
                                  <option value="real-time-regulatory" className={getOptionSecurityClass('real-time-regulatory', 'regulatoryReporting', form.dataClassification)}>Real-time regulatory reporting</option>
                                </select>
                                <small className="dc-field-hint">
                                  <strong>Breach notification requirements:</strong> Australian Privacy Act Notifiable Data Breaches (NDB) scheme requires OAIC notification when an eligible data breach is likely to result in serious harm. GDPR requires notification within 72 hours of becoming aware. Consider also Essential 8 and Critical Infrastructure reporting requirements where applicable.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Requirements for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Internal reporting typically sufficient'}
                                        {form.dataClassification === 'internal' && 'Internal reporting with escalation procedures recommended'}
                                        {form.dataClassification === 'confidential' && 'NDB scheme notification required for breaches likely to cause serious harm; GDPR 72-hour notification if EU data involved'}
                                        {form.dataClassification === 'restricted' && 'Mandatory NDB scheme reporting to OAIC; GDPR notification; consider Critical Infrastructure obligations (SOCI Act)'}
                                    </small>
                                )}
                                <FieldWarning fieldName="regulatoryReporting" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Audit Frequency</label>
                              </td>
                              <td>
                                <select
                                  id="auditFrequency"
                                  name="auditFrequency"
                                  value={form.auditFrequency}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('auditFrequency') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select audit frequency...</option>
                                  <option value="never" className={getOptionSecurityClass('never', 'auditFrequency', form.dataClassification)}>Never audited</option>
                                  <option value="ad-hoc" className={getOptionSecurityClass('ad-hoc', 'auditFrequency', form.dataClassification)}>Ad-hoc audits</option>
                                  <option value="annual" className={getOptionSecurityClass('annual', 'auditFrequency', form.dataClassification)}>Annual audit</option>
                                  <option value="semi-annual" className={getOptionSecurityClass('semi-annual', 'auditFrequency', form.dataClassification)}>Semi-annual audits</option>
                                  <option value="quarterly" className={getOptionSecurityClass('quarterly', 'auditFrequency', form.dataClassification)}>Quarterly audits</option>
                                  <option value="continuous" className={getOptionSecurityClass('continuous', 'auditFrequency', form.dataClassification)}>Continuous compliance monitoring</option>
                                </select>
                                <small className="dc-field-hint">
                                  <strong>Independent validation:</strong> Regular audits validate controls are effective and compliant. Consider OAIC privacy assessments, Essential 8 maturity assessments, IRAP audits, and ISO 27001 audits where applicable.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Ad-hoc or annual audits acceptable'}
                                        {form.dataClassification === 'internal' && 'Annual audits recommended'}
                                        {form.dataClassification === 'confidential' && 'Semi-annual or quarterly audits required'}
                                        {form.dataClassification === 'restricted' && 'Quarterly audits or continuous monitoring required (Essential 8 maturity assessments, OAIC privacy compliance)'}
                                    </small>
                                )}
                                <FieldWarning fieldName="auditFrequency" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Residency/Sovereignty</label>
                              </td>
                              <td>
                                <select
                                  id="dataResidency"
                                  name="dataResidency"
                                  value={form.dataResidency}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataResidency') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select data residency requirements...</option>
                                  <option value="no-restrictions" className={getOptionSecurityClass('no-restrictions', 'dataResidency', form.dataClassification)}>No geographic restrictions</option>
                                  <option value="preferred-australia" className={getOptionSecurityClass('preferred-australia', 'dataResidency', form.dataClassification)}>Preferred: Australia/NZ</option>
                                  <option value="must-australia" className={getOptionSecurityClass('must-australia', 'dataResidency', form.dataClassification)}>Must remain in Australia</option>
                                  <option value="must-jurisdiction" className={getOptionSecurityClass('must-jurisdiction', 'dataResidency', form.dataClassification)}>Must remain in jurisdiction (state/territory)</option>
                                  <option value="sovereign-cloud" className={getOptionSecurityClass('sovereign-cloud', 'dataResidency', form.dataClassification)}>Sovereign cloud (Australian operators)</option>
                                  <option value="must-on-premises" className={getOptionSecurityClass('must-on-premises', 'dataResidency', form.dataClassification)}>Must remain on-premises</option>
                                </select>
                                <small className="dc-field-hint">
                                  <strong>Geographic restrictions:</strong> Data location requirements for storage and processing. Australian Privacy Act APP 8.1 requires reasonable steps for overseas disclosures. Consider Protective Security Policy Framework (PSPF), SOCI Act for Critical Infrastructure, and Defence Industry Security Program (DISP) requirements. GDPR also restricts transfers outside EEA without adequate safeguards.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Requirements for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'No restrictions typically required'}
                                        {form.dataClassification === 'internal' && 'Preferred Australia/NZ recommended'}
                                        {form.dataClassification === 'confidential' && 'Must remain in Australia (APP 8 compliance); sovereign cloud operators recommended'}
                                        {form.dataClassification === 'restricted' && 'Must remain in Australia with sovereign cloud or on-premises (PSPF, SOCI Act, DISP requirements); GDPR adequacy required for EU data'}
                                    </small>
                                )}
                                <FieldWarning fieldName="dataResidency" />
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
                              <td colSpan="2">
                                <small className="dc-field-hint">
                                Select the appropriate Privacy and Rights Management approach based on your data classification and organisational requirements.
                                </small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Privacy by Design:</label>
                              </td>
                              <td>
                                <select
                                  id="privacyByDesign"
                                  name="privacyByDesign"
                                  value={form.privacyByDesign}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('privacyByDesign') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select privacy approach...</option>
                                  <option value="basic-privacy" className={getOptionSecurityClass('basic-privacy', 'privacyByDesign', form.dataClassification)}>Basic Privacy Considerations</option>
                                  <option value="privacy-assessment" className={getOptionSecurityClass('privacy-assessment', 'privacyByDesign', form.dataClassification)}>Privacy Impact Assessment</option>
                                  <option value="privacy-by-design" className={getOptionSecurityClass('privacy-by-design', 'privacyByDesign', form.dataClassification)}>Privacy by Design Principles</option>
                                  <option value="privacy-engineering" className={getOptionSecurityClass('privacy-engineering', 'privacyByDesign', form.dataClassification)}>Privacy Engineering Framework</option>
                                  <option value="differential-privacy" className={getOptionSecurityClass('differential-privacy', 'privacyByDesign', form.dataClassification)}>Differential Privacy</option>
                                  <option value="zero-knowledge" className={getOptionSecurityClass('zero-knowledge', 'privacyByDesign', form.dataClassification)}>Zero-Knowledge Architectures</option>
                                </select>
                                <small className="dc-field-hint">Approach for integrating privacy into system design (GDPR Art. 25 and APP 11)</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic privacy considerations acceptable'} 
                                        {form.dataClassification === 'internal' && 'Privacy Impact Assessment or Privacy by Design recommended'}
                                        {form.dataClassification === 'confidential' && 'Privacy by Design or Privacy Engineering Framework required'}
                                        {form.dataClassification === 'restricted' && 'Differential Privacy or Zero-Knowledge Architectures required'}
                                    </small>
                                )}
                                <FieldWarning fieldName="privacyByDesign" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Automated Privacy Controls & PETs:</label>
                              </td>
                              <td>
                                <select
                                  id="automatedPrivacyControlsPets"
                                  name="automatedPrivacyControlsPets"
                                  value={form.automatedPrivacyControlsPets}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('automatedPrivacyControlsPets') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select PET approach...</option>
                                  <option value="basic-anonymisation" className={getOptionSecurityClass('basic-anonymisation', 'automatedPrivacyControlsPets', form.dataClassification)}>Basic Anonymisation</option>
                                  <option value="tokenisation" className={getOptionSecurityClass('tokenisation', 'automatedPrivacyControlsPets', form.dataClassification)}>Tokenisation & Pseudonymisation</option>
                                  <option value="differential-privacy" className={getOptionSecurityClass('differential-privacy', 'automatedPrivacyControlsPets', form.dataClassification)}>Differential Privacy</option>
                                  <option value="homomorphic-encryption" className={getOptionSecurityClass('homomorphic-encryption', 'automatedPrivacyControlsPets', form.dataClassification)}>Homomorphic Encryption</option>
                                  <option value="secure-mpc" className={getOptionSecurityClass('secure-mpc', 'automatedPrivacyControlsPets', form.dataClassification)}>Secure Multi-Party Computation (MPC)</option>
                                  <option value="comprehensive-pets" className={getOptionSecurityClass('comprehensive-pets', 'automatedPrivacyControlsPets', form.dataClassification)}>Comprehensive PETs Framework</option>
                                </select>
                                <small className="dc-field-hint">
                                  {form.dataClassification === 'public' && 'Basic anonymisation for published data'}
                                  {form.dataClassification === 'internal' && 'Tokenisation and pseudonymisation for internal analytics'}
                                  {form.dataClassification === 'confidential' && 'Differential privacy or homomorphic encryption for sensitive operations'}
                                  {form.dataClassification === 'restricted' && 'Secure MPC or comprehensive PETs framework for highly sensitive data'}
                                  <br/>Privacy-Enhancing Technologies (PETs) under APP 11 (security safeguards) and CDR technical standards. Implements automated controls to minimise privacy risks while enabling data utility.
                                </small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                      <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                      {form.dataClassification === 'public' && 'Basic anonymisation for published data'}
                                      {form.dataClassification === 'internal' && 'Tokenisation and pseudonymisation for internal analytics'}
                                      {form.dataClassification === 'confidential' && 'Differential privacy or homomorphic encryption for sensitive operations required'}
                                      {form.dataClassification === 'restricted' && 'Secure MPC or comprehensive PETs framework for highly sensitive data required'}
                                    </small>
                                )}
                                <FieldWarning fieldName="automatedPrivacyControlsPets" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataMinimisation') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select minimisation strategy...</option>
                                  <option value="basic-reduction" className={getOptionSecurityClass('basic-reduction', 'dataMinimisation', form.dataClassification)}>Basic Data Reduction</option>
                                  <option value="purpose-based" className={getOptionSecurityClass('purpose-based', 'dataMinimisation', form.dataClassification)}>Purpose-Based Collection</option>
                                  <option value="automated-pruning" className={getOptionSecurityClass('automated-pruning', 'dataMinimisation', form.dataClassification)}>Automated Data Pruning</option>
                                  <option value="intelligent-sampling" className={getOptionSecurityClass('intelligent-sampling', 'dataMinimisation', form.dataClassification)}>Intelligent Data Sampling</option>
                                  <option value="synthetic-data" className={getOptionSecurityClass('synthetic-data', 'dataMinimisation', form.dataClassification)}>Synthetic Data Generation</option>
                                  <option value="ephemeral-storage" className={getOptionSecurityClass('ephemeral-storage', 'dataMinimisation', form.dataClassification)}>Ephemeral Storage</option>
                                  <option value="privacy-preserving-analytics" className={getOptionSecurityClass('privacy-preserving-analytics', 'dataMinimisation', form.dataClassification)}>Privacy-Preserving Analytics</option>
                                  <option value="federated-analytics" className={getOptionSecurityClass('federated-analytics', 'dataMinimisation', form.dataClassification)}>Federated Analytics</option>
                                </select>
                                <small className="dc-field-hint">Approach for minimising data collection (GDPR Art. 5(1)(c) and APP 3)</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic data reduction acceptable'}
                                        {form.dataClassification === 'internal' && 'Purpose-Based Collection recommended'}
                                        {form.dataClassification === 'confidential' && 'Automated Data Minimisation recommended'}
                                        {form.dataClassification === 'restricted' && 'Comprehensive Data Minimisation recommended'}
                                    </small>
                                )}
                                <FieldWarning fieldName="dataMinimisation" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('appDataCollectionLimitations') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select collection approach...</option>
                                  <option value="unrestricted-collection" className={getOptionSecurityClass('unrestricted-collection', 'appDataCollectionLimitations', form.dataClassification)}>Unrestricted Data Collection</option>
                                  <option value="purpose-limitation" className={getOptionSecurityClass('purpose-limitation', 'appDataCollectionLimitations', form.dataClassification)}>Purpose-Limited Collection</option>
                                  <option value="necessity-test" className={getOptionSecurityClass('necessity-test', 'appDataCollectionLimitations', form.dataClassification)}>Necessity Test Applied</option>
                                  <option value="proportionality-assessment" className={getOptionSecurityClass('proportionality-assessment', 'appDataCollectionLimitations', form.dataClassification)}>Proportionality Assessment</option>
                                  <option value="minimal-collection" className={getOptionSecurityClass('minimal-collection', 'appDataCollectionLimitations', form.dataClassification)}>Minimal Data Collection Only</option>
                                  <option value="strict-purpose-binding" className={getOptionSecurityClass('strict-purpose-binding', 'appDataCollectionLimitations', form.dataClassification)}>Strict Purpose Binding</option>
                                </select>
                                <small className="dc-field-hint">Approach for limiting data collection (APP 3, APP 4, and APP 6)</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Data collection should be minimised for public data.'}
                                        {form.dataClassification === 'internal' && 'Data collection should be minimised to what is necessary for internal data.'}
                                        {form.dataClassification === 'confidential' && 'Data collection should be proportional to the purpose for confidential data.'}
                                        {form.dataClassification === 'restricted' && 'Data collection should be minimised and strictly controlled for restricted data.'}
                                    </small>
                                )}
                                <FieldWarning fieldName="appDataCollectionLimitations" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('appSolicitedUnsolicited') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select handling approach...</option>
                                  <option value="solicited-only" className={getOptionSecurityClass('solicited-only', 'appSolicitedUnsolicited', form.dataClassification)}>Solicited Data Only</option>
                                  <option value="unsolicited-review" className={getOptionSecurityClass('unsolicited-review', 'appSolicitedUnsolicited', form.dataClassification)}>Unsolicited Data Review Process</option>
                                  <option value="automatic-destruction" className={getOptionSecurityClass('automatic-destruction', 'appSolicitedUnsolicited', form.dataClassification)}>Automatic Unsolicited Data Destruction</option>
                                  <option value="lawful-retention" className={getOptionSecurityClass('lawful-retention', 'appSolicitedUnsolicited', form.dataClassification)}>Lawful Retention Assessment</option>
                                  <option value="segregated-handling" className={getOptionSecurityClass('segregated-handling', 'appSolicitedUnsolicited', form.dataClassification)}>Segregated Data Handling</option>
                                  <option value="comprehensive-policy" className={getOptionSecurityClass('comprehensive-policy', 'appSolicitedUnsolicited', form.dataClassification)}>Comprehensive Solicitation Policy</option>
                                </select>
                                <small className="dc-field-hint">Select how the application handles solicited and unsolicited data.</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Accept solicited data only'}
                                        {form.dataClassification === 'internal' && 'Accept solicited data with review of unsolicited data'}
                                        {form.dataClassification === 'confidential' && 'Accept solicited data with retention assessment and automatic unsolicited data destruction'}
                                        {form.dataClassification === 'restricted' && 'Restricted data is subject to comprehensive solicitation policies, segregated and strict handling controls'}
                                    </small>
                                )}
                                <FieldWarning fieldName="appSolicitedUnsolicited" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('appCollectionNotice') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select data collection notice approach...</option>
                                  <option value="basic-notice" className={getOptionSecurityClass('basic-notice', 'appCollectionNotice', form.dataClassification)}>Basic Collection Notice</option>
                                  <option value="detailed-notice" className={getOptionSecurityClass('detailed-notice', 'appCollectionNotice', form.dataClassification)}>Detailed Collection Notice</option>
                                  <option value="layered-notice" className={getOptionSecurityClass('layered-notice', 'appCollectionNotice', form.dataClassification)}>Layered Privacy Notice</option>
                                  <option value="just-in-time" className={getOptionSecurityClass('just-in-time', 'appCollectionNotice', form.dataClassification)}>Just-in-Time Notices</option>
                                  <option value="interactive-notice" className={getOptionSecurityClass('interactive-notice', 'appCollectionNotice', form.dataClassification)}>Interactive Privacy Notices</option>
                                  <option value="comprehensive-disclosure" className={getOptionSecurityClass('comprehensive-disclosure', 'appCollectionNotice', form.dataClassification)}>Comprehensive Purpose Disclosure</option>
                                </select>
                                <small className="dc-field-hint">Approach for informing users about data collection (APP 5)</small>                                
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic Collection Notice recommended'}
                                        {form.dataClassification === 'internal' && 'Detailed Collection Notice recommended'}
                                        {form.dataClassification === 'confidential' && 'Layered Privacy Notice recommended'}
                                        {form.dataClassification === 'restricted' && 'Comprehensive Purpose Disclosure recommended'}
                                    </small>
                                )}
                                <FieldWarning fieldName="appCollectionNotice" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('appNotificationRequirements') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select notification approach...</option>
                                  <option value="basic-notifications" className={getOptionSecurityClass('basic-notifications', 'appNotificationRequirements', form.dataClassification)}>Basic Privacy Notifications</option>
                                  <option value="proactive-notifications" className={getOptionSecurityClass('proactive-notifications', 'appNotificationRequirements', form.dataClassification)}>Proactive Customer Notifications</option>
                                  <option value="automated-notifications" className={getOptionSecurityClass('automated-notifications', 'appNotificationRequirements', form.dataClassification)}>Automated Notification System</option>
                                  <option value="personalised-notifications" className={getOptionSecurityClass('personalised-notifications', 'appNotificationRequirements', form.dataClassification)}>Personalised Privacy Communications</option>
                                  <option value="multi-channel-notifications" className={getOptionSecurityClass('multi-channel-notifications', 'appNotificationRequirements', form.dataClassification)}>Multi-Channel Notification System</option>
                                  <option value="intelligent-notifications" className={getOptionSecurityClass('intelligent-notifications', 'appNotificationRequirements', form.dataClassification)}>Intelligent Notification Management</option>
                                </select>
                                <small className="dc-field-hint">Notification of the collection of personal information and cross-border disclosure (APP 5 and APP 8)</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic Privacy Notifications recommended'}
                                        {form.dataClassification === 'internal' && 'Proactive Customer Notifications recommended'}
                                        {form.dataClassification === 'confidential' && 'Automated Notification System recommended'}
                                        {form.dataClassification === 'restricted' && 'Personalised Privacy Communications recommended'}
                                    </small>
                                )}
                                <FieldWarning fieldName="appNotificationRequirements" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('appThirdPartyCollection') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select third party approach...</option>
                                  <option value="notification-only" className={getOptionSecurityClass('notification-only', 'appThirdPartyCollection', form.dataClassification)}>Notification of Third Party Sources</option>
                                  <option value="consent-required" className={getOptionSecurityClass('consent-required', 'appThirdPartyCollection', form.dataClassification)}>Explicit Consent Required</option>
                                  <option value="source-verification" className={getOptionSecurityClass('source-verification', 'appThirdPartyCollection', form.dataClassification)}>Third Party Source Verification</option>
                                  <option value="purpose-alignment" className={getOptionSecurityClass('purpose-alignment', 'appThirdPartyCollection', form.dataClassification)}>Purpose Alignment Verification</option>
                                  <option value="comprehensive-tracking" className={getOptionSecurityClass('comprehensive-tracking', 'appThirdPartyCollection', form.dataClassification)}>Comprehensive Source Tracking</option>
                                  <option value="no-third-party" className={getOptionSecurityClass('no-third-party', 'appThirdPartyCollection', form.dataClassification)}>No Third Party Collection</option>
                                </select>
                                <small className="dc-field-hint">Approach for managing third-party data collection (GDPR Art. 28 and APP 6 and APP 7)</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Notification of Third Party Sources is recommended for public data.'}
                                        {form.dataClassification === 'internal' && 'Explicit Consent is required for internal data.'}
                                        {form.dataClassification === 'confidential' && 'Third Party Source Verification is required for confidential data.'}
                                        {form.dataClassification === 'restricted' && 'Purpose Alignment Verification and tracking is required for restricted data with potential restrictions on third-party collection.'}
                                    </small>
                                )}
                                <FieldWarning fieldName="appThirdPartyCollection" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Cross-Border Data Transfer Compliance:</label>
                              </td>
                              <td>
                                <select
                                  id="crossBorderDataTransferCompliance"
                                  name="crossBorderDataTransferCompliance"
                                  value={form.crossBorderDataTransferCompliance}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('crossBorderDataTransferCompliance') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select transfer mechanism...</option>
                                  <option value="data-localisation" className={getOptionSecurityClass('data-localisation', 'crossBorderDataTransferCompliance', form.dataClassification)}>Data Localisation + Encryption-in-Transit</option>
                                  <option value="notification-only" className={getOptionSecurityClass('notification-only', 'crossBorderDataTransferCompliance', form.dataClassification)}>APP 8 Notification Only</option>
                                  <option value="australian-sccs" className={getOptionSecurityClass('australian-sccs', 'crossBorderDataTransferCompliance', form.dataClassification)}>Australian Standard Contractual Clauses</option>
                                  <option value="apec-cbpr" className={getOptionSecurityClass('apec-cbpr', 'crossBorderDataTransferCompliance', form.dataClassification)}>APEC CBPR Certification</option>
                                  <option value="gdpr-adequacy" className={getOptionSecurityClass('gdpr-adequacy', 'crossBorderDataTransferCompliance', form.dataClassification)}>GDPR Adequacy Decisions + SCCs/BCRs</option>
                                  <option value="comprehensive-framework" className={getOptionSecurityClass('comprehensive-framework', 'crossBorderDataTransferCompliance', form.dataClassification)}>Comprehensive Cross-Border Framework</option>
                                  <option value="no-cross-border" className={getOptionSecurityClass('no-cross-border', 'crossBorderDataTransferCompliance', form.dataClassification)}>No Cross-Border Data Transfers</option>
                                </select>
                                <small className="dc-field-hint">Mechanisms for compliant cross-border data transfers under APP 8 (cross-border disclosure), GDPR Arts. 44-50, and SOCI Act requirements. Must notify individuals and ensure equivalent protection.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Data localisation and optional encryption-in-transit recommended'}
                                    {form.dataClassification === 'internal' && 'APP 8 notification and Australian SCCs for internal data transfers'}
                                    {form.dataClassification === 'confidential' && 'APEC CBPR or GDPR adequacy mechanisms with encryption required'}
                                    {form.dataClassification === 'restricted' && 'Comprehensive framework with encryption, SCCs, and continuous monitoring required, or no cross-border data transfers allowed.'}
                                  </small>
                                )}
                                <FieldWarning fieldName="crossBorderDataTransferCompliance" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('consentManagement') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select consent approach...</option>
                                  <option value="basic-consent" className={getOptionSecurityClass('basic-consent', 'consentManagement', form.dataClassification)}>Basic Consent Forms</option>
                                  <option value="granular-consent" className={getOptionSecurityClass('granular-consent', 'consentManagement', form.dataClassification)}>Granular Consent Management</option>
                                  <option value="dynamic-consent" className={getOptionSecurityClass('dynamic-consent', 'consentManagement', form.dataClassification)}>Dynamic Consent Platform</option>
                                  <option value="consent-preferences" className={getOptionSecurityClass('consent-preferences', 'consentManagement', form.dataClassification)}>Consent Preferences Centre</option>
                                  <option value="consent-auditing" className={getOptionSecurityClass('consent-auditing', 'consentManagement', form.dataClassification)}>Consent Auditing & Compliance</option>
                                  <option value="consent-automation" className={getOptionSecurityClass('consent-automation', 'consentManagement', form.dataClassification)}>Consent Lifecycle Automation</option>
                                  <option value="consent-revocation" className={getOptionSecurityClass('consent-revocation', 'consentManagement', form.dataClassification)}>Consent Revocation Mechanism</option>
                                  <option value="consent-analytics" className={getOptionSecurityClass('consent-analytics', 'consentManagement', form.dataClassification)}>Consent Analytics & Reporting</option>
                                  <option value="blockchain-consent" className={getOptionSecurityClass('blockchain-consent', 'consentManagement', form.dataClassification)}>Blockchain-Based Consent</option>
                                </select>
                                <small className="dc-field-hint">Approach for managing user consent (GDPR Art. 7)</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic Consent Forms acceptable'}
                                        {form.dataClassification === 'internal' && 'Granular Consent Management recommended'}
                                        {form.dataClassification === 'confidential' && 'Dynamic Consent Platform required'}
                                        {form.dataClassification === 'restricted' && 'Blockchain-Based Consent required'}
                                    </small>
                                )}
                                <FieldWarning fieldName="consentManagement" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Consent Withdrawal Mechanism:</label>
                              </td>
                              <td>
                                <select
                                  id="consentWithdrawalMechanism"
                                  name="consentWithdrawalMechanism"
                                  value={form.consentWithdrawalMechanism}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('consentWithdrawalMechanism') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select withdrawal approach...</option>
                                  <option value="manual-request" className={getOptionSecurityClass('manual-request', 'consentWithdrawalMechanism', form.dataClassification)}>Manual Consent Withdrawal Request</option>
                                  <option value="self-service-portal" className={getOptionSecurityClass('self-service-portal', 'consentWithdrawalMechanism', form.dataClassification)}>Self-Service Withdrawal Portal</option>
                                  <option value="one-click-withdrawal" className={getOptionSecurityClass('one-click-withdrawal', 'consentWithdrawalMechanism', form.dataClassification)}>One-Click Consent Withdrawal</option>
                                  <option value="automated-propagation" className={getOptionSecurityClass('automated-propagation', 'consentWithdrawalMechanism', form.dataClassification)}>Automated System-Wide Propagation</option>
                                  <option value="real-time-cessation" className={getOptionSecurityClass('real-time-cessation', 'consentWithdrawalMechanism', form.dataClassification)}>Real-Time Data Processing Cessation</option>
                                  <option value="verified-withdrawal" className={getOptionSecurityClass('verified-withdrawal', 'consentWithdrawalMechanism', form.dataClassification)}>Verified Withdrawal with Audit Trail</option>
                                </select>
                                <small className="dc-field-hint">Mechanism for users to withdraw consent under APP 2 (opt-out rights) and GDPR Art. 7(3). Must cascade consent withdrawal across all dependent systems.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Manual request or self-service portal acceptable'}
                                    {form.dataClassification === 'internal' && 'Self-service portal with automated propagation recommended'}
                                    {form.dataClassification === 'confidential' && 'One-click withdrawal with automated propagation required'}
                                    {form.dataClassification === 'restricted' && 'Real-time cessation with verified withdrawal and audit trail required'}
                                  </small>
                                )}
                                <FieldWarning fieldName="consentWithdrawalMechanism" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">APP Customer Access & Rights Automation:</label>
                              </td>
                              <td>
                                <select
                                  id="appCustomerAccess"
                                  name="appCustomerAccess"
                                  value={form.appCustomerAccess}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('appCustomerAccess') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select access & automation approach...</option>
                                  <option value="manual-requests" className={getOptionSecurityClass('manual-requests', 'appCustomerAccess', form.dataClassification)}>Manual Customer Requests</option>
                                  <option value="customer-portal" className={getOptionSecurityClass('customer-portal', 'appCustomerAccess', form.dataClassification)}>Customer Self-Service Portal</option>
                                  <option value="automated-access" className={getOptionSecurityClass('automated-access', 'appCustomerAccess', form.dataClassification)}>Automated Data Access Provision</option>
                                  <option value="structured-export" className={getOptionSecurityClass('structured-export', 'appCustomerAccess', form.dataClassification)}>Structured Data Export</option>
                                  <option value="api-access" className={getOptionSecurityClass('api-access', 'appCustomerAccess', form.dataClassification)}>API-Based Customer Access</option>
                                  <option value="real-time-access" className={getOptionSecurityClass('real-time-access', 'appCustomerAccess', form.dataClassification)}>Real-Time Data Access</option>
                                  <option value="comprehensive-rights-platform" className={getOptionSecurityClass('comprehensive-rights-platform', 'appCustomerAccess', form.dataClassification)}>Comprehensive Rights Management Platform</option>
                                </select>
                                <small className="dc-field-hint">Covers access and automation for data subject rights under APP 12 (access) and GDPR Arts. 15-22. Typical response timelines: 30 days (APPs) and 1 month (GDPR), with limited extensions.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">                                    
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Manual requests or portal access acceptable for low-risk data'}
                                    {form.dataClassification === 'internal' && 'Portal access with basic automation recommended'}
                                    {form.dataClassification === 'confidential' && 'Automated access with structured export/API and audit trail required'}
                                    {form.dataClassification === 'restricted' && 'Real-time access via comprehensive rights platform with full auditability required'}
                                  </small>
                                )}
                                <FieldWarning fieldName="appCustomerAccess" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('appDataCorrection') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select correction approach...</option>
                                  <option value="manual-correction" className={getOptionSecurityClass('manual-correction', 'appDataCorrection', form.dataClassification)}>Manual Data Correction Process</option>
                                  <option value="audit-trail-correction" className={getOptionSecurityClass('audit-trail-correction', 'appDataCorrection', form.dataClassification)}>Correction with Audit Trail</option>
                                  <option value="customer-correction" className={getOptionSecurityClass('customer-correction', 'appDataCorrection', form.dataClassification)}>Customer Self-Correction Portal</option>
                                  <option value="workflow-correction" className={getOptionSecurityClass('workflow-correction', 'appDataCorrection', form.dataClassification)}>Automated Correction Workflows</option>
                                  <option value="verified-correction" className={getOptionSecurityClass('verified-correction', 'appDataCorrection', form.dataClassification)}>Verified Data Correction</option>
                                  <option value="real-time-correction" className={getOptionSecurityClass('real-time-correction', 'appDataCorrection', form.dataClassification)}>Real-Time Data Correction</option>
                                  <option value="automated-verification" className={getOptionSecurityClass('automated-verification', 'appDataCorrection', form.dataClassification)}>Automated Verification Processes</option>
                                </select>
                                <small className="dc-field-hint">Approach for ensuring data correction compliance (AAP 10 and APP 13)</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Manual Data Correction Process recommended'}
                                        {form.dataClassification === 'internal' && 'Customer Self-Correction Portal recommended'}
                                        {form.dataClassification === 'confidential' && 'Automated Correction Workflows recommended'}
                                        {form.dataClassification === 'restricted' && 'Real-Time Data Correction recommended'}
                                    </small>
                                )}
                                <FieldWarning fieldName="appDataCorrection" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('appDataRetentionDisposal') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select retention approach...</option>
                                  <option value="manual-review" className={getOptionSecurityClass('manual-review', 'appDataRetentionDisposal', form.dataClassification)}>Manual Retention Review</option>
                                  <option value="business-purpose" className={getOptionSecurityClass('business-purpose', 'appDataRetentionDisposal', form.dataClassification)}>Business Purpose-Based Retention</option>
                                  <option value="automated-disposal" className={getOptionSecurityClass('automated-disposal', 'appDataRetentionDisposal', form.dataClassification)}>Automated Data Disposal</option>
                                  <option value="value-based-retention" className={getOptionSecurityClass('value-based-retention', 'appDataRetentionDisposal', form.dataClassification)}>Value-Based Retention Assessment</option>
                                  <option value="intelligent-lifecycle" className={getOptionSecurityClass('intelligent-lifecycle', 'appDataRetentionDisposal', form.dataClassification)}>Intelligent Data Lifecycle Management</option>
                                  <option value="compliance-driven" className={getOptionSecurityClass('compliance-driven', 'appDataRetentionDisposal', form.dataClassification)}>Compliance-Driven Retention</option>
                                  <option value="automated-enforcement" className={getOptionSecurityClass('automated-enforcement', 'appDataRetentionDisposal', form.dataClassification)}>Automated Retention Enforcement</option>
                                </select>
                                <small className="dc-field-hint">Approach for ensuring data retention and disposal compliance (APP 11)</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Data minimisation and basic retention policies recommended.'}
                                        {form.dataClassification === 'internal' && 'Enhanced retention and disposal controls recommended.'}
                                        {form.dataClassification === 'confidential' && 'Strict retention and secure disposal required.'}
                                        {form.dataClassification === 'restricted' && 'Comprehensive retention and disposal policies mandatory.'}
                                    </small>
                                )}
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('rightToErasure') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select erasure capability...</option>
                                  <option value="manual-deletion" className={getOptionSecurityClass('manual-deletion', 'rightToErasure', form.dataClassification)}>Manual Data Deletion</option>
                                  <option value="automated-deletion" className={getOptionSecurityClass('automated-deletion', 'rightToErasure', form.dataClassification)}>Automated Deletion Workflows</option>
                                  <option value="secure-erasure" className={getOptionSecurityClass('secure-erasure', 'rightToErasure', form.dataClassification)}>Cryptographic Secure Erasure</option>
                                  <option value="cross-system-erasure" className={getOptionSecurityClass('cross-system-erasure', 'rightToErasure', form.dataClassification)}>Cross-System Data Erasure</option>
                                  <option value="verified-erasure" className={getOptionSecurityClass('verified-erasure', 'rightToErasure', form.dataClassification)}>Verified Complete Erasure</option>
                                  <option value="immutable-erasure" className={getOptionSecurityClass('immutable-erasure', 'rightToErasure', form.dataClassification)}>Immutable Erasure Records</option>
                                  <option value="erasure-auditing" className={getOptionSecurityClass('erasure-auditing', 'rightToErasure', form.dataClassification)}>Erasure Auditing & Compliance</option>
                                </select>
                                <small className="dc-field-hint">Approach for ensuring data erasure compliance (GDPR Art. 17)</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Data should be deleted promptly when no longer needed.'}
                                        {form.dataClassification === 'internal' && 'Internal data should be deleted according to retention policies.'}
                                        {form.dataClassification === 'confidential' && 'Confidential data requires secure and verifiable deletion.'}
                                        {form.dataClassification === 'restricted' && 'Restricted data must be deleted with strict compliance and auditing.'}
                                    </small>
                                )}
                                <FieldWarning fieldName="rightToErasure" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Privacy Training & Awareness:</label>
                              </td>
                              <td>
                                <select
                                  id="privacyTrainingAwareness"
                                  name="privacyTrainingAwareness"
                                  value={form.privacyTrainingAwareness}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('privacyTrainingAwareness') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select training approach...</option>
                                  <option value="basic-orientation" className={getOptionSecurityClass('basic-orientation', 'privacyTrainingAwareness', form.dataClassification)}>Basic Privacy Orientation</option>
                                  <option value="annual-training" className={getOptionSecurityClass('annual-training', 'privacyTrainingAwareness', form.dataClassification)}>Annual Privacy Training</option>
                                  <option value="role-based-training" className={getOptionSecurityClass('role-based-training', 'privacyTrainingAwareness', form.dataClassification)}>Role-Based Privacy Training</option>
                                  <option value="continuous-learning" className={getOptionSecurityClass('continuous-learning', 'privacyTrainingAwareness', form.dataClassification)}>Continuous Privacy Learning Program</option>
                                  <option value="privacy-engineering" className={getOptionSecurityClass('privacy-engineering', 'privacyTrainingAwareness', form.dataClassification)}>Privacy Engineering Certification</option>
                                  <option value="comprehensive-culture" className={getOptionSecurityClass('comprehensive-culture', 'privacyTrainingAwareness', form.dataClassification)}>Comprehensive Privacy Culture Program</option>
                                </select>
                                <small className="dc-field-hint">Privacy training program under APP 1 (open and transparent management). Staff handling personal information must understand APP obligations, NDB scheme requirements, and data handling practices.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Basic orientation for all staff acceptable'}
                                    {form.dataClassification === 'internal' && 'Annual training for all staff, role-based for data handlers'}
                                    {form.dataClassification === 'confidential' && 'Role-based training with continuous learning required'}
                                    {form.dataClassification === 'restricted' && 'Privacy engineering certification for technical staff, comprehensive culture program required'}
                                  </small>
                                )}
                                <FieldWarning fieldName="privacyTrainingAwareness" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Copyright & Fair Use Compliance:</label>
                              </td>
                              <td>
                                <Select
                                  id="copyrightFairUseCompliance"
                                  name="copyrightFairUseCompliance"
                                  isMulti
                                  options={[
                                    { value: 'no-copyrighted-material', label: 'No Copyrighted Material Used' },
                                    { value: 'licensed-content', label: 'Licensed Content Only' },
                                    { value: 'fair-dealing', label: 'Fair Dealing Assessment (AU Copyright Act s40-103C)' },
                                    { value: 'content-verification', label: 'Automated Copyright Verification' },
                                    { value: 'usage-tracking', label: 'Usage Tracking and Reporting' },
                                    { value: 'rights-clearance', label: 'Rights Clearance Management System' },
                                    { value: 'licence-compliance', label: 'Licence Compliance Management' },
                                    { value: 'attribution-management', label: 'Attribution Management' },
                                    { value: 'comprehensive-ipr', label: 'Comprehensive IP Rights Framework' }
                                  ]}
                                  value={(Array.isArray(form.copyrightFairUseCompliance)
                                    ? form.copyrightFairUseCompliance
                                    : [form.copyrightFairUseCompliance].filter(Boolean)).map(v => {
                                      const labels = {
                                        'no-copyrighted-material': 'No Copyrighted Material Used',
                                        'licensed-content': 'Licensed Content Only',
                                        'fair-dealing': 'Fair Dealing Assessment (AU Copyright Act s40-103C)',
                                        'content-verification': 'Automated Copyright Verification',
                                        'usage-tracking': 'Usage Tracking and Reporting',
                                        'rights-clearance': 'Rights Clearance Management System',
                                        'licence-compliance': 'Licence Compliance Management',
                                        'attribution-management': 'Attribution Management',
                                        'comprehensive-ipr': 'Comprehensive IP Rights Framework'
                                      };
                                      return { value: v, label: labels[v] || v };
                                    })}
                                  onChange={handleMultiSelectChange('copyrightFairUseCompliance')}
                                  styles={getSecurityStyles('copyrightFairUseCompliance')}
                                  className={getSecurityClassName('copyrightFairUseCompliance', form.copyrightFairUseCompliance)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">Compliance with Australian Copyright Act 1968 fair dealing provisions (research/study, criticism/review, news reporting, parody/satire, accessibility). Ensure copyrighted material is used with consent, proper attribution, or under statutory exceptions. Consider AI training data copyright implications.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">                                    
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Fair dealing or licensed content for public materials'}
                                    {form.dataClassification === 'internal' && 'Licensed content or fair dealing with usage tracking'}
                                    {form.dataClassification === 'confidential' && 'Automated copyright verification and rights clearance required'}
                                    {form.dataClassification === 'restricted' && 'Comprehensive IP rights framework with legal review required'}
                                  </small>
                                )}
                                <FieldWarning fieldName="copyrightFairUseCompliance" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Indigenous Data Sovereignty:</label>
                              </td>
                              <td>
                                <Select
                                  id="indigenousDataSovereignty"
                                  name="indigenousDataSovereignty"
                                  isMulti
                                  options={[
                                    { value: 'not-applicable', label: 'Not Applicable - No Indigenous Data' },
                                    { value: 'basic-consultation', label: 'Basic Consultation with Indigenous Communities' },
                                    { value: 'cultural-sensitivity-training', label: 'Cultural Sensitivity Training' },
                                    { value: 'care-principles', label: 'CARE Principles (Collective Benefit, Authority, Responsibility, Ethics)' },
                                    { value: 'indigenous-governance', label: 'Indigenous Data Governance Framework' },
                                    { value: 'community-ownership', label: 'Community Ownership & Control Model' },
                                    { value: 'comprehensive-ids', label: 'Comprehensive IDS with Benefit-Sharing' }
                                  ]}
                                  value={(Array.isArray(form.indigenousDataSovereignty)
                                    ? form.indigenousDataSovereignty
                                    : [form.indigenousDataSovereignty].filter(Boolean)).map(v => {
                                      const labels = {
                                        'not-applicable': 'Not Applicable - No Indigenous Data',
                                        'basic-consultation': 'Basic Consultation with Indigenous Communities',
                                        'cultural-sensitivity-training': 'Cultural Sensitivity Training',
                                        'care-principles': 'CARE Principles (Collective Benefit, Authority, Responsibility, Ethics)',
                                        'indigenous-governance': 'Indigenous Data Governance Framework',
                                        'community-ownership': 'Community Ownership & Control Model',
                                        'comprehensive-ids': 'Comprehensive IDS with Benefit-Sharing'
                                      };
                                      return { value: v, label: labels[v] || v };
                                    })}
                                  onChange={handleMultiSelectChange('indigenousDataSovereignty')}
                                  styles={getSecurityStyles('indigenousDataSovereignty')}
                                  className={getSecurityClassName('indigenousDataSovereignty', form.indigenousDataSovereignty)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">
                                  Australian First Nations right to own, control, and benefit from data pertaining to their culture, lands, and heritage under CARE Principles and Indigenous Data Sovereignty (IDS). Aligns with UNDRIP, Closing the Gap, and Maiam nayri Wingara framework. Ensures Indigenous peoples have authority over collection, access, use, and reuse of their data, including cultural and intellectual property protections, and equitable benefit-sharing from research and commercial use.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">                               
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Basic consultation if publishing Indigenous cultural data'}
                                    {form.dataClassification === 'internal' && 'CARE principles adherence for internal Indigenous data'}
                                    {form.dataClassification === 'confidential' && 'Indigenous governance framework with community approval required'}
                                    {form.dataClassification === 'restricted' && 'Community ownership model or comprehensive IDS with benefit-sharing agreements required'}
                                  </small>
                                )}
                                <FieldWarning fieldName="indigenousDataSovereignty" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('accessibilityCompliance') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select accessibility approach...</option>
                                  <option value="basic-accessibility" className={getOptionSecurityClass('basic-accessibility', 'accessibilityCompliance', form.dataClassification)}>Basic Accessibility Features</option>
                                  <option value="wcag-a" className={getOptionSecurityClass('wcag-a', 'accessibilityCompliance', form.dataClassification)}>WCAG 2.2 Level A Compliance</option>
                                  <option value="wcag-aa" className={getOptionSecurityClass('wcag-aa', 'accessibilityCompliance', form.dataClassification)}>WCAG 2.2 Level AA Compliance</option>
                                  <option value="wcag-aaa" className={getOptionSecurityClass('wcag-aaa', 'accessibilityCompliance', form.dataClassification)}>WCAG 2.2 Level AAA Compliance</option>
                                  <option value="adaptive-interfaces" className={getOptionSecurityClass('adaptive-interfaces', 'accessibilityCompliance', form.dataClassification)}>Adaptive User Interfaces</option>
                                  <option value="universal-design" className={getOptionSecurityClass('universal-design', 'accessibilityCompliance', form.dataClassification)}>Universal Design Principles</option>
                                </select>
                                <small className="dc-field-hint">Approach for ensuring accessibility compliance (DDA - Disability Discrimination Act, and WCAG - Web Content Accessibility Guidelines)</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">                               
                                      <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'WCAG 2.2 Level AA Compliance required'}
                                        {form.dataClassification === 'internal' && 'WCAG 2.2 Level AAA Compliance recommended'}
                                        {form.dataClassification === 'confidential' && 'WCAG 2.2 Level AAA Compliance recommended'}
                                        {form.dataClassification === 'restricted' && 'WCAG 2.2 Level AAA Compliance recommended'}
                                  </small>
                                )}
                                <FieldWarning fieldName="accessibilityCompliance" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Assistive Technology Support:</label>
                              </td>
                              <td>
                                <Select
                                  id="assistiveTechnologySupport"
                                  name="assistiveTechnologySupport"
                                  isMulti
                                  options={[
                                    { value: 'screen-reader', label: 'Basic Screen Reader Support' },
                                    { value: 'keyboard-navigation', label: 'Full Keyboard Navigation' },
                                    { value: 'voice-control', label: 'Voice Control Integration' },
                                    { value: 'eye-tracking', label: 'Eye Tracking Support' },
                                    { value: 'switch-control', label: 'Switch Control Interfaces' },
                                    { value: 'comprehensive-assistive', label: 'Comprehensive Assistive Tech Support' }
                                  ]}
                                  value={(Array.isArray(form.assistiveTechnologySupport)
                                    ? form.assistiveTechnologySupport
                                    : [form.assistiveTechnologySupport].filter(Boolean)).map(v => {
                                      const labels = {
                                        'screen-reader': 'Basic Screen Reader Support',
                                        'keyboard-navigation': 'Full Keyboard Navigation',
                                        'voice-control': 'Voice Control Integration',
                                        'eye-tracking': 'Eye Tracking Support',
                                        'switch-control': 'Switch Control Interfaces',
                                        'comprehensive-assistive': 'Comprehensive Assistive Tech Support'
                                      };
                                      return { value: v, label: labels[v] || v };
                                    })}
                                  onChange={handleMultiSelectChange('assistiveTechnologySupport')}
                                  styles={getSecurityStyles('assistiveTechnologySupport')}
                                  className={getSecurityClassName('assistiveTechnologySupport', form.assistiveTechnologySupport)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">Approach for ensuring assistive technology compatibility and support (DDA and WCAG)</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Assistive technology support should be provided as per WCAG AA standards.'}
                                        {form.dataClassification === 'internal' && 'Assistive technology support should be provided as per WCAG AAA standards.'}
                                        {form.dataClassification === 'confidential' && 'Assistive technology support should be provided as per WCAG AAA standards.'}
                                        {form.dataClassification === 'restricted' && 'Assistive technology support should be provided as per WCAG AAA standards.'}
                                    </small>
                                )}
                                <FieldWarning fieldName="assistiveTechnologySupport" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Inclusive Data Access Design:</label>
                              </td>
                              <td>
                                <Select
                                  id="inclusiveDataAccessDesign"
                                  name="inclusiveDataAccessDesign"
                                  isMulti
                                  options={[
                                    { value: 'standard-interface', label: 'Standard Interface Design' },
                                    { value: 'high-contrast', label: 'High Contrast Options' },
                                    { value: 'scalable-text', label: 'Scalable Text & UI Elements' },
                                    { value: 'responsive-design', label: 'Responsive Design' },
                                    { value: 'alternative-formats', label: 'Alternative Data Format Options' },
                                    { value: 'cognitive-accessibility', label: 'Cognitive Accessibility Features' },
                                    { value: 'multi-sensory', label: 'Multi-Sensory Data Presentation' }
                                  ]}
                                  value={(Array.isArray(form.inclusiveDataAccessDesign)
                                    ? form.inclusiveDataAccessDesign
                                    : [form.inclusiveDataAccessDesign].filter(Boolean)).map(v => {
                                      const labels = {
                                        'standard-interface': 'Standard Interface Design',
                                        'high-contrast': 'High Contrast Options',
                                        'scalable-text': 'Scalable Text & UI Elements',
                                        'responsive-design': 'Responsive Design',
                                        'alternative-formats': 'Alternative Data Format Options',
                                        'cognitive-accessibility': 'Cognitive Accessibility Features',
                                        'multi-sensory': 'Multi-Sensory Data Presentation'
                                      };
                                      return { value: v, label: labels[v] || v };
                                    })}
                                  onChange={handleMultiSelectChange('inclusiveDataAccessDesign')}
                                  styles={getSecurityStyles('inclusiveDataAccessDesign')}
                                  className={getSecurityClassName('inclusiveDataAccessDesign', form.inclusiveDataAccessDesign)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">Approach for ensuring inclusive data access and representation (DDA and WCAG)</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Inclusive data access principles recommended'}
                                        {form.dataClassification === 'internal' && 'Inclusive data access principles recommended'}
                                        {form.dataClassification === 'confidential' && 'Inclusive data access principles recommended'}
                                        {form.dataClassification === 'restricted' && 'Inclusive data access principles recommended'}
                                    </small>
                                )}
                                <FieldWarning fieldName="inclusiveDataAccessDesign" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Workplace Accessibility Accommodation:</label>
                              </td>
                              <td>
                                <Select
                                  id="workplaceAccessibilityAccommodation"
                                  name="workplaceAccessibilityAccommodation"
                                  isMulti
                                  options={[
                                    { value: 'standard-workstation', label: 'Standard Workstation Setup' },
                                    { value: 'ergonomic-adjustments', label: 'Ergonomic Adjustments Available' },
                                    { value: 'assistive-hardware', label: 'Assistive Hardware Provision' },
                                    { value: 'flexible-interfaces', label: 'Flexible Interface Configurations' },
                                    { value: 'remote-accessibility', label: 'Remote Work Accessibility Support' },
                                    { value: 'comprehensive-accommodation', label: 'Comprehensive Accommodation Program' }
                                  ]}
                                  value={(Array.isArray(form.workplaceAccessibilityAccommodation)
                                    ? form.workplaceAccessibilityAccommodation
                                    : [form.workplaceAccessibilityAccommodation].filter(Boolean)).map(v => {
                                      const labels = {
                                        'standard-workstation': 'Standard Workstation Setup',
                                        'ergonomic-adjustments': 'Ergonomic Adjustments Available',
                                        'assistive-hardware': 'Assistive Hardware Provision',
                                        'flexible-interfaces': 'Flexible Interface Configurations',
                                        'remote-accessibility': 'Remote Work Accessibility Support',
                                        'comprehensive-accommodation': 'Comprehensive Accommodation Program'
                                      };
                                      return { value: v, label: labels[v] || v };
                                    })}
                                  onChange={handleMultiSelectChange('workplaceAccessibilityAccommodation')}
                                  styles={getSecurityStyles('workplaceAccessibilityAccommodation')}
                                  className={getSecurityClassName('workplaceAccessibilityAccommodation', form.workplaceAccessibilityAccommodation)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">Approach for ensuring workplace accessibility and inclusion (DDA)</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Inclusive workplace accessibility policies recommended'}
                                        {form.dataClassification === 'internal' && 'Inclusive workplace accessibility policies recommended'}
                                        {form.dataClassification === 'confidential' && 'Inclusive workplace accessibility policies recommended'}
                                        {form.dataClassification === 'restricted' && 'Inclusive workplace accessibility policies recommended'}
                                    </small>
                                )}
                                <FieldWarning fieldName="workplaceAccessibilityAccommodation" />
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
                              <td colSpan="2">
                                <small className="dc-field-hint">
                                Select the appropriate Zero Trust and Cloud-Native Data Security measures based on your data classification and organisational requirements.
                                </small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Microsegmentation:</label>
                              </td>
                              <td>
                                <select
                                  id="dataMicrosegmentation"
                                  name="dataMicrosegmentation"
                                  value={form.dataMicrosegmentation}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataMicrosegmentation') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select segmentation approach...</option>
                                  <option value="network-segmentation" className={getOptionSecurityClass('network-segmentation', 'dataMicrosegmentation', form.dataClassification)}>Network-Level Segmentation</option>
                                  <option value="environment-segmentation" className={getOptionSecurityClass('environment-segmentation', 'dataMicrosegmentation', form.dataClassification)}>Environment-Based Segmentation</option>
                                  <option value="application-segmentation" className={getOptionSecurityClass('application-segmentation', 'dataMicrosegmentation', form.dataClassification)}>Application-Level Segmentation</option>
                                  <option value="data-layer-segmentation" className={getOptionSecurityClass('data-layer-segmentation', 'dataMicrosegmentation', form.dataClassification)}>Data Layer Segmentation</option>
                                  <option value="user-segmentation" className={getOptionSecurityClass('user-segmentation', 'dataMicrosegmentation', form.dataClassification)}>User/Role-Based Segmentation</option>
                                  <option value="context-aware-segmentation" className={getOptionSecurityClass('context-aware-segmentation', 'dataMicrosegmentation', form.dataClassification)}>Context-Aware Segmentation</option>
                                  <option value="intent-based-segmentation" className={getOptionSecurityClass('intent-based-segmentation', 'dataMicrosegmentation', form.dataClassification)}>Intent-Based Segmentation</option>
                                  <option value="zero-trust-segmentation" className={getOptionSecurityClass('zero-trust-segmentation', 'dataMicrosegmentation', form.dataClassification)}>Zero Trust Microsegmentation</option>
                                  <option value="dynamic-segmentation" className={getOptionSecurityClass('dynamic-segmentation', 'dataMicrosegmentation', form.dataClassification)}>Dynamic Policy Segmentation</option>
                                </select>
                                <small className="dc-field-hint">Approach for segmenting data access in cloud-native environments</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Network segmentation recommended'}
                                        {form.dataClassification === 'internal' && 'Environment and application segmentation recommended'}
                                        {form.dataClassification === 'confidential' && 'Data and user segmentation recommended'}
                                        {form.dataClassification === 'restricted' && 'Context aware, zero-trust microsegmentation required'}
                                    </small>
                                )}
                                <FieldWarning fieldName="dataMicrosegmentation" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Container Data Protection:</label>
                              </td>
                              <td>
                                <Select
                                  id="containerDataProtection"
                                  name="containerDataProtection"
                                  isMulti
                                  options={[
                                    { value: 'none', label: 'No container security' },
                                    { value: 'basic-secrets', label: 'Basic Kubernetes secrets' },
                                    { value: 'basic-scanning', label: 'Basic container scanning' },
                                    { value: 'encrypted-secrets', label: 'Encrypted Secrets Management' },
                                    { value: 'vault-integration', label: 'External Vault Integration' },
                                    { value: 'runtime-protection', label: 'Runtime container protection' },
                                    { value: 'network-policies', label: 'Container network policies' },
                                    { value: 'admission-controls', label: 'Admission Controller Policies' },
                                    { value: 'service-mesh-security', label: 'Service mesh security (Istio, Linkerd)' },
                                    { value: 'ebpf-runtime', label: 'eBPF-based runtime security' }
                                  ]}
                                  value={Array.isArray(form.containerDataProtection)
                                    ? form.containerDataProtection.map(v => {
                                        const labels = {
                                          'none': 'No container security',
                                          'basic-secrets': 'Basic Kubernetes secrets',
                                          'basic-scanning': 'Basic container scanning',
                                          'encrypted-secrets': 'Encrypted Secrets Management',
                                          'vault-integration': 'External Vault Integration',
                                          'runtime-protection': 'Runtime container protection',
                                          'network-policies': 'Container network policies',
                                          'admission-controls': 'Admission Controller Policies',
                                          'service-mesh-security': 'Service mesh security (Istio, Linkerd)',
                                          'ebpf-runtime': 'eBPF-based runtime security'
                                        };
                                        return { value: v, label: labels[v] || v };
                                      })
                                    : []}
                                  onChange={handleMultiSelectChange('containerDataProtection')}
                                  styles={getSecurityStyles('containerDataProtection')}
                                  className={getSecurityClassName('containerDataProtection', form.containerDataProtection)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">Approach for protecting data in containerised environments including runtime security, scanning, and network controls</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic container scanning and basic secrets management recommended'}
                                        {form.dataClassification === 'internal' && 'Basic container scanning and encrypted secrets management recommended'}
                                        {form.dataClassification === 'confidential' && 'Runtime container protection and networking policies recommended'}
                                        {form.dataClassification === 'restricted' && 'Comprehensive container security including network policies, admission controls, and service mesh security recommended'}
                                    </small>
                                )}
                                <FieldWarning fieldName="containerDataProtection" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('multiCloudDataGovernance') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select governance approach...</option>
                                  <option value="single-cloud" className={getOptionSecurityClass('single-cloud', 'multiCloudDataGovernance', form.dataClassification)}>Single Cloud Provider</option>
                                  <option value="multi-cloud-basic" className={getOptionSecurityClass('multi-cloud-basic', 'multiCloudDataGovernance', form.dataClassification)}>Basic Multi-Cloud Setup</option>
                                  <option value="cloud-agnostic" className={getOptionSecurityClass('cloud-agnostic', 'multiCloudDataGovernance', form.dataClassification)}>Cloud-Agnostic Policies</option>
                                  <option value="unified-governance" className={getOptionSecurityClass('unified-governance', 'multiCloudDataGovernance', form.dataClassification)}>Unified Data Governance</option>
                                  <option value="federated-governance" className={getOptionSecurityClass('federated-governance', 'multiCloudDataGovernance', form.dataClassification)}>Federated Data Governance</option>
                                  <option value="sovereign-cloud" className={getOptionSecurityClass('sovereign-cloud', 'multiCloudDataGovernance', form.dataClassification)}>Data Sovereign Cloud</option>
                                  <option value="cloud-first" className={getOptionSecurityClass('cloud-first', 'multiCloudDataGovernance', form.dataClassification)}>Cloud-First Strategy</option>
                                  <option value="cloud-right" className={getOptionSecurityClass('cloud-right', 'multiCloudDataGovernance', form.dataClassification)}>Cloud-Right Strategy</option>
                                  <option value="hybrid-cloud" className={getOptionSecurityClass('hybrid-cloud', 'multiCloudDataGovernance', form.dataClassification)}>Hybrid Cloud Strategy</option>
                                  <option value="on-premises-only" className={getOptionSecurityClass('on-premises-only', 'multiCloudDataGovernance', form.dataClassification)}>On-Premises Only</option>
                                </select>
                                <small className="dc-field-hint">Approach for managing multi-cloud data governance</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Select based on business needs, technology roadmap, cloud capabilities, staff capabilties, and cloud compliance'}
                                        {form.dataClassification === 'internal' && 'Select based on business needs, technology roadmap, cloud capabilities, staff capabilties, and cloud compliance'}
                                        {form.dataClassification === 'confidential' && 'Select based on business needs, technology roadmap, cloud capabilities, staff capabilties, and cloud compliance'}
                                        {form.dataClassification === 'restricted' && 'Select based on business needs, technology roadmap, cloud capabilities, staff capabilties, and cloud compliance'}
                                    </small>
                                )}
                                <FieldWarning fieldName="multiCloudDataGovernance" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('iacSecurityScanning') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select IaC security approach...</option>
                                  <option value="manual-review" className={getOptionSecurityClass('manual-review', 'iacSecurityScanning', form.dataClassification)}>Manual Code Review</option>
                                  <option value="template-validation" className={getOptionSecurityClass('template-validation', 'iacSecurityScanning', form.dataClassification)}>Template Validation</option>
                                  <option value="basic-scanning" className={getOptionSecurityClass('basic-scanning', 'iacSecurityScanning', form.dataClassification)}>Basic Security Scanning</option>
                                  <option value="policy-as-code" className={getOptionSecurityClass('policy-as-code', 'iacSecurityScanning', form.dataClassification)}>Policy as Code</option>
                                  <option value="automated-compliance" className={getOptionSecurityClass('automated-compliance', 'iacSecurityScanning', form.dataClassification)}>Automated Compliance Checks</option>
                                  <option value="continuous-iac-scanning" className={getOptionSecurityClass('continuous-iac-scanning', 'iacSecurityScanning', form.dataClassification)}>Continuous IaC Scanning</option>
                                  <option value="shift-left-iac-security" className={getOptionSecurityClass('shift-left-iac-security', 'iacSecurityScanning', form.dataClassification)}>Shift-Left IaC Security</option>
                                  <option value="runtime-iac-assurance" className={getOptionSecurityClass('runtime-iac-assurance', 'iacSecurityScanning', form.dataClassification)}>Runtime IaC Assurance</option>
                                </select>
                                <small className="dc-field-hint">Approach for ensuring continuous compliance in IaC</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Manual code review recommended for public data as a minimum security measure.'}
                                        {form.dataClassification === 'internal' && 'Template validation and basic scanning recommended for internal data.'}
                                        {form.dataClassification === 'confidential' && 'Policy as Code and automated compliance recommended for confidential data.'}
                                        {form.dataClassification === 'restricted' && 'Continuous IaC scanning and shift-left security recommended for restricted data.'}
                                    </small>
                                )}
                                <FieldWarning fieldName="iacSecurityScanning" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Continuous Verification:</label>
                              </td>
                              <td>
                                <select
                                  id="continuousVerification"
                                  name="continuousVerification"
                                  value={form.continuousVerification}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('continuousVerification') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select verification approach...</option>
                                  <option value="periodic-reauth" className={getOptionSecurityClass('periodic-reauth', 'continuousVerification', form.dataClassification)}>Periodic Re-Authentication</option>
                                  <option value="per-request" className={getOptionSecurityClass('per-request', 'continuousVerification', form.dataClassification)}>Per-Request Re-Auth</option>
                                  <option value="continuous-eval" className={getOptionSecurityClass('continuous-eval', 'continuousVerification', form.dataClassification)}>Continuous Policy Evaluation</option>
                                  <option value="risk-rescoring" className={getOptionSecurityClass('risk-rescoring', 'continuousVerification', form.dataClassification)}>Session Risk Re-Scoring</option>
                                  <option value="behavioural-monitoring" className={getOptionSecurityClass('behavioural-monitoring', 'continuousVerification', form.dataClassification)}>Behavioural Monitoring & Anomaly Detection</option>
                                  <option value="adaptive-verification" className={getOptionSecurityClass('adaptive-verification', 'continuousVerification', form.dataClassification)}>Adaptive Continuous Verification</option>
                                  <option value="real-time-assessment" className={getOptionSecurityClass('real-time-assessment', 'continuousVerification', form.dataClassification)}>Real-Time Risk Assessment</option>
                                </select>
                                <small className="dc-field-hint">Core Zero Trust tenet (never trust, always verify). Aligns with ASD ISM/PSPF.</small>
                                <small className="dc-field-hint">
                                  <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                  {form.dataClassification === 'public' && 'Periodic re-auth acceptable for low risk'}
                                  {form.dataClassification === 'internal' && 'Per-request re-auth for sensitive actions recommended'}
                                  {form.dataClassification === 'confidential' && 'Continuous evaluation with risk re-scoring and behavioural monitoring required'}
                                  {form.dataClassification === 'restricted' && 'Real-time risk assessment with adaptive-verification required'}
                                </small>
                                <FieldWarning fieldName="continuousVerification" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Just-in-Time Data Access:</label>
                              </td>
                              <td>
                                <select
                                  id="justInTimeDataAccess"
                                  name="justInTimeDataAccess"
                                  value={form.justInTimeDataAccess}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('justInTimeDataAccess') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select JIT approach...</option>
                                  <option value="manual-approval" className={getOptionSecurityClass('manual-approval', 'justInTimeDataAccess', form.dataClassification)}>Manual Time-Boxed Approvals</option>
                                  <option value="brokered-access" className={getOptionSecurityClass('brokered-access', 'justInTimeDataAccess', form.dataClassification)}>Brokered Access (PAM/ZTNA)</option>
                                  <option value="automated-approval" className={getOptionSecurityClass('automated-approval', 'justInTimeDataAccess', form.dataClassification)}>Automated JIT with Policies</option>
                                  <option value="ephemeral-creds" className={getOptionSecurityClass('ephemeral-creds', 'justInTimeDataAccess', form.dataClassification)}>Ephemeral Credentials</option>
                                  <option value="context-aware-access" className={getOptionSecurityClass('context-aware-access', 'justInTimeDataAccess', form.dataClassification)}>Context-Aware JIT Access</option>
                                  <option value="real-time-provisioning" className={getOptionSecurityClass('real-time-provisioning', 'justInTimeDataAccess', form.dataClassification)}>Real-Time Access Provisioning</option>
                                </select>
                                <small className="dc-field-hint">Reduces standing privileges; complements privileged session controls.</small>
                                <small className="dc-field-hint">
                                  <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                  {form.dataClassification === 'public' && 'Manual approvals sufficient'}
                                  {form.dataClassification === 'internal' && 'Time-boxed access recommended'}
                                  {form.dataClassification === 'confidential' && 'Ephemeral credentials with brokered access required'}
                                  {form.dataClassification === 'restricted' && 'Automated JIT with policy engine and full audit required'}
                                </small>
                                <FieldWarning fieldName="justInTimeDataAccess" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Risk-Based Authentication:</label>
                              </td>
                              <td>
                                <select
                                  id="riskBasedAuthentication"
                                  name="riskBasedAuthentication"
                                  value={form.riskBasedAuthentication}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('riskBasedAuthentication') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select adaptive auth...</option>
                                  <option value="static" className={getOptionSecurityClass('static', 'riskBasedAuthentication', form.dataClassification)}>Static Policies Only</option>
                                  <option value="geo-ip" className={getOptionSecurityClass('geo-ip', 'riskBasedAuthentication', form.dataClassification)}>Basic Geo/IP & Velocity</option>
                                  <option value="device-posture" className={getOptionSecurityClass('device-posture', 'riskBasedAuthentication', form.dataClassification)}>Device Posture & Context</option>
                                  <option value="behaviour-analytics" className={getOptionSecurityClass('behaviour-analytics', 'riskBasedAuthentication', form.dataClassification)}>Behavioural Analytics + Step-Up MFA</option>
                                  <option value="continuous-risk" className={getOptionSecurityClass('continuous-risk', 'riskBasedAuthentication', form.dataClassification)}>Continuous Risk Assessment</option>
                                </select>
                                <small className="dc-field-hint">Adaptive controls at access time; aligns with ASD Essential Eight maturity uplift.</small>
                                <small className="dc-field-hint">
                                  <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                  {form.dataClassification === 'public' && 'Static acceptable for public data portals'}
                                  {form.dataClassification === 'internal' && 'Geo/IP checks recommended'}
                                  {form.dataClassification === 'confidential' && 'Device posture + step-up MFA required'}
                                  {form.dataClassification === 'restricted' && 'Behavioural analytics with continuous step-up required'}
                                </small>
                                <FieldWarning fieldName="riskBasedAuthentication" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Device Trust Verification:</label>
                              </td>
                              <td>
                                <select
                                  id="deviceTrustVerification"
                                  name="deviceTrustVerification"
                                  value={form.deviceTrustVerification}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('deviceTrustVerification') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select device trust level...</option>
                                  <option value="unknown-block" className={getOptionSecurityClass('unknown-block', 'deviceTrustVerification', form.dataClassification)}>Unknown Devices Blocked</option>
                                  <option value="mdm-enrolled" className={getOptionSecurityClass('mdm-enrolled', 'deviceTrustVerification', form.dataClassification)}>MDM Enrolled Devices</option>
                                  <option value="posture-attested" className={getOptionSecurityClass('posture-attested', 'deviceTrustVerification', form.dataClassification)}>Posture Attested (AV, Patch, Disk Enc)</option>
                                  <option value="continuous-edr" className={getOptionSecurityClass('continuous-edr', 'deviceTrustVerification', form.dataClassification)}>Continuous EDR Telemetry</option>
                                </select>
                                <small className="dc-field-hint">Validates device health before granting data access (ISM device controls).</small>
                                <small className="dc-field-hint">
                                  <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                  {form.dataClassification === 'public' && 'Unknown device blocking sufficient'}
                                  {form.dataClassification === 'internal' && 'MDM enrollment recommended'}
                                  {form.dataClassification === 'confidential' && 'Posture attestation required'}
                                  {form.dataClassification === 'restricted' && 'Continuous EDR telemetry required'}
                                </small>
                                <FieldWarning fieldName="deviceTrustVerification" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Serverless Data Security:</label>
                              </td>
                              <td>
                                <select
                                  id="serverlessDataSecurity"
                                  name="serverlessDataSecurity"
                                  value={form.serverlessDataSecurity}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('serverlessDataSecurity') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select serverless control...</option>
                                  <option value="basic-iam" className={getOptionSecurityClass('basic-iam', 'serverlessDataSecurity', form.dataClassification)}>Basic Function IAM</option>
                                  <option value="least-privilege" className={getOptionSecurityClass('least-privilege', 'serverlessDataSecurity', form.dataClassification)}>Least Privilege per Function</option>
                                  <option value="secret-mgmt" className={getOptionSecurityClass('secret-mgmt', 'serverlessDataSecurity', form.dataClassification)}>External Secret Management</option>
                                  <option value="runtime-policy" className={getOptionSecurityClass('runtime-policy', 'serverlessDataSecurity', form.dataClassification)}>Runtime Policy/Inspection</option>
                                  <option value="function-isolation" className={getOptionSecurityClass('function-isolation', 'serverlessDataSecurity', form.dataClassification)}>Function Isolation & VPC/VNet</option>
                                  <option value="ephemeral-encryption" className={getOptionSecurityClass('ephemeral-encryption', 'serverlessDataSecurity', form.dataClassification)}>Ephemeral Storage Encryption</option>
                                  <option value="advanced-security" className={getOptionSecurityClass('advanced-security', 'serverlessDataSecurity', form.dataClassification)}>Advanced Serverless Security Controls</option>
                                </select>
                                <small className="dc-field-hint">Controls for Function as a Service (FaaS) workloads (short-lived storage, IAM sprawl, secrets).</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic serverless security controls'}
                                        {form.dataClassification === 'internal' && 'Least privilege principles and secret management'}
                                        {form.dataClassification === 'confidential' && 'Runtime policy and function isolation'}
                                        {form.dataClassification === 'restricted' && 'Ephemeral storage encryption and advanced serverless security controls'}
                                    </small>
                                )}
                                <FieldWarning fieldName="serverlessDataSecurity" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Cloud DSPM for Data Assets:</label>
                              </td>
                              <td>
                                <select
                                  id="cspmDataAssets"
                                  name="cspmDataAssets"
                                  value={form.cspmDataAssets}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('cspmDataAssets') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select DSPM maturity...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'cspmDataAssets', form.dataClassification)}>No Discovery</option>
                                  <option value="discovery-only" className={getOptionSecurityClass('discovery-only', 'cspmDataAssets', form.dataClassification)}>Data Asset Discovery Only</option>
                                  <option value="classification" className={getOptionSecurityClass('classification', 'cspmDataAssets', form.dataClassification)}>Classification & Tagging</option>
                                  <option value="misconfig-detect" className={getOptionSecurityClass('misconfig-detect', 'cspmDataAssets', form.dataClassification)}>Misconfiguration Detection</option>
                                  <option value="auto-remediation" className={getOptionSecurityClass('auto-remediation', 'cspmDataAssets', form.dataClassification)}>Automated Remediation</option>
                                </select>
                                <small className="dc-field-hint">Continuous discovery/classification of cloud data assets (DSPM/CSPM).</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Discovery only'}
                                        {form.dataClassification === 'internal' && 'Discovery and Classification'}
                                        {form.dataClassification === 'confidential' && 'Discovery, Classification & Misconfiguration Detection'}
                                        {form.dataClassification === 'restricted' && 'Full DSPM including Automated Remediation'}
                                    </small>
                                )}
                                <FieldWarning fieldName="cspmDataAssets" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Cloud Egress & Private Connectivity:</label>
                              </td>
                              <td>
                                <select
                                  id="cloudEgressControls"
                                  name="cloudEgressControls"
                                  value={form.cloudEgressControls}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('cloudEgressControls') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select egress posture...</option>
                                  <option value="unrestricted" className={getOptionSecurityClass('unrestricted', 'cloudEgressControls', form.dataClassification)}>Unrestricted Egress</option>
                                  <option value="firewall-inspection" className={getOptionSecurityClass('firewall-inspection', 'cloudEgressControls', form.dataClassification)}>Internet via Firewall Inspection</option>
                                  <option value="allow-list" className={getOptionSecurityClass('allow-list', 'cloudEgressControls', form.dataClassification)}>Egress Allow-List Policies</option>
                                  <option value="org-wide-dlp" className={getOptionSecurityClass('org-wide-dlp', 'cloudEgressControls', form.dataClassification)}>Org-Wide Egress with DLP</option>
                                  <option value="casb" className={getOptionSecurityClass('casb', 'cloudEgressControls', form.dataClassification)}>CASB/SDP Enforced Egress</option>
                                  <option value="private-connectivity" className={getOptionSecurityClass('private-connectivity', 'cloudEgressControls', form.dataClassification)}>Private Connectivity Only (No Internet)</option>
                                  <option value="private-endpoints" className={getOptionSecurityClass('private-endpoints', 'cloudEgressControls', form.dataClassification)}>Private Endpoints/PrivateLink/PSC</option>
                                </select>
                                <small className="dc-field-hint">Controls for preventing exfiltration; internet traffic via firewall, private connectivity for sensitive data. Align with PSPF/SOCI for critical flows.</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Unrestricted egress permissable, but discouraged. Firewall inspection recommended.'}
                                        {form.dataClassification === 'internal' && 'Allow-List or firewall inspection recommended at a minimum.'}
                                        {form.dataClassification === 'confidential' && 'Data loss prevention measures and CASB enforced egress required.'}
                                        {form.dataClassification === 'restricted' && 'Private Connectivity including the use of private endpoints required. Public egress should be restricted.'}
                                    </small>
                                )}
                                <FieldWarning fieldName="cloudEgressControls" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Cloud Ingress & Public Exposure:</label>
                              </td>
                              <td>
                                <select
                                  id="cloudIngressControls"
                                  name="cloudIngressControls"
                                  value={form.cloudIngressControls}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('cloudIngressControls') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select ingress posture...</option>
                                  <option value="direct-public" className={getOptionSecurityClass('direct-public', 'cloudIngressControls', form.dataClassification)}>Direct Public Endpoints</option>
                                  <option value="reverse-proxy" className={getOptionSecurityClass('reverse-proxy', 'cloudIngressControls', form.dataClassification)}>Reverse Proxy Access</option>
                                  <option value="cloud-waf" className={getOptionSecurityClass('cloud-waf', 'cloudIngressControls', form.dataClassification)}>Cloud WAF (AWS WAF, Azure WAF, GCP WAF, Cloudflare, etc)</option>
                                  <option value="api-gateway" className={getOptionSecurityClass('api-gateway', 'cloudIngressControls', form.dataClassification)}>API Gateway with Rate Limiting</option>
                                  <option value="cdn-ddos" className={getOptionSecurityClass('cdn-ddos', 'cloudIngressControls', form.dataClassification)}>CDN + DDoS Protection</option>
                                  <option value="bot-protection" className={getOptionSecurityClass('bot-protection', 'cloudIngressControls', form.dataClassification)}>Bot Protection Services</option>
                                  <option value="zero-trust-ingress" className={getOptionSecurityClass('zero-trust-ingress', 'cloudIngressControls', form.dataClassification)}>Zero Trust Ingress (ZTNA)</option>
                                  <option value="private-only" className={getOptionSecurityClass('private-only', 'cloudIngressControls', form.dataClassification)}>Private Access Only (No Public Exposure)</option>
                                </select>
                                <small className="dc-field-hint">Controls for protecting inbound data flows: cloud WAFs, API gateways, CDN/DDoS protection, and zero trust ingress. Aligns with ASD ISM cloud security controls.</small>
                                <small className="dc-field-hint">
                                  <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                  {form.dataClassification === 'public' && 'Cloud WAF and CDN recommended for public-facing services'}
                                  {form.dataClassification === 'internal' && 'Cloud WAF + API gateway or private access for internal data'}
                                  {form.dataClassification === 'confidential' && 'Zero Trust ingress or private-only access required'}
                                  {form.dataClassification === 'restricted' && 'Private-only access required; no public endpoints'}
                                </small>
                                <FieldWarning fieldName="cloudIngressControls" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Workload Identity Federation:</label>
                              </td>
                              <td>
                                <select
                                  id="workloadIdentityFederation"
                                  name="workloadIdentityFederation"
                                  value={form.workloadIdentityFederation}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('workloadIdentityFederation') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select identity model...</option>
                                  <option value="long-lived-keys" className={getOptionSecurityClass('long-lived-keys', 'workloadIdentityFederation', form.dataClassification)}>Long-Lived Keys</option>
                                  <option value="short-lived-tokens" className={getOptionSecurityClass('short-lived-tokens', 'workloadIdentityFederation', form.dataClassification)}>Short-Lived IAM Tokens</option>
                                  <option value="automated-rotation" className={getOptionSecurityClass('automated-rotation', 'workloadIdentityFederation', form.dataClassification)}>Automated Key Rotation</option>
                                  <option value="oidc-federation" className={getOptionSecurityClass('oidc-federation', 'workloadIdentityFederation', form.dataClassification)}>OIDC Federation</option>
                                  <option value="spiffe-spire" className={getOptionSecurityClass('spiffe-spire', 'workloadIdentityFederation', form.dataClassification)}>SPIFFE/SPIRE Secretless Identities</option>
                                  <option value="zero-trust-identities" className={getOptionSecurityClass('zero-trust-identities', 'workloadIdentityFederation', form.dataClassification)}>Zero Trust Workload Identities</option>
                                </select>
                                <small className="dc-field-hint">Eliminate embedded credentials; prefer federation and secretless identities.</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Short-lived tokens acceptable'}
                                        {form.dataClassification === 'internal' && 'Long-lived keys discouraged; prefer automated rotation'}
                                        {form.dataClassification === 'confidential' && 'Automated rotation or zero trust identities required'}
                                        {form.dataClassification === 'restricted' && 'Zero trust workload identities required'}
                                    </small>
                                )}
                                <FieldWarning fieldName="workloadIdentityFederation" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </fieldset>
                    </td>
                  </tr>

                  {/* AI/ML Data Security & Responsible AI */}
                  <tr>
                    <td colSpan="2">
                      <fieldset className="dc-fieldset dc-fieldset-ai-ml">
                        <legend className="dc-legend dc-legend-ai-ml">🤖 AI/ML Data Security & Responsible AI</legend>
                        <table className="dc-field-table">
                          <tbody>
                            <tr>
                              <td colSpan="2"><small className="dc-field-hint">Select the appropriate AI/ML Data Security measures based on your data classification and organisational requirements. Also see <a href="../airisk" target="_blank" rel="noopener noreferrer">AI Risk Assessment Form</a></small></td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Training Data Protection:</label>
                              </td>
                              <td>
                                <select
                                  id="trainingDataProtection"
                                  name="trainingDataProtection"
                                  value={form.trainingDataProtection}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('trainingDataProtection') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select training data approach...</option>
                                  <option value="basic-anonymisation" className={getOptionSecurityClass('basic-anonymisation', 'trainingDataProtection', form.dataClassification)}>Basic Data Anonymisation</option>
                                  <option value="data-masking" className={getOptionSecurityClass('data-masking', 'trainingDataProtection', form.dataClassification)}>Data Masking</option>
                                  <option value="synthetic-training" className={getOptionSecurityClass('synthetic-training', 'trainingDataProtection', form.dataClassification)}>Synthetic Training Data</option>
                                  <option value="differential-privacy" className={getOptionSecurityClass('differential-privacy', 'trainingDataProtection', form.dataClassification)}>Differential Privacy</option>
                                  <option value="federated-learning" className={getOptionSecurityClass('federated-learning', 'trainingDataProtection', form.dataClassification)}>Federated Learning</option>
                                  <option value="secure-multiparty" className={getOptionSecurityClass('secure-multiparty', 'trainingDataProtection', form.dataClassification)}>Secure Multi-Party Computation</option>
                                  <option value="homomorphic-encryption" className={getOptionSecurityClass('homomorphic-encryption', 'trainingDataProtection', form.dataClassification)}>Homomorphic Encryption</option>
                                </select>
                                <small className="dc-field-hint">Approach for protecting training data used in AI/ML models. ISO/IEC 23894:2023 (AI Risk Management) and ISO/IEC 27001:2022 Annex A.5.7 emphasise protecting AI training datasets.</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Anonymisation or basic data protection measures are recommended.'}
                                        {form.dataClassification === 'internal' && 'Data masking and synthetic training data are recommended.'}
                                        {form.dataClassification === 'confidential' && 'Differential Privacy and federated learning are recommended.'}
                                        {form.dataClassification === 'restricted' && 'Secure multi-party computation and homomorphic encryption are recommended.'}
                                    </small>
                                )}
                                <FieldWarning fieldName="trainingDataProtection" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('aiGovernance') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select AI governance approach...</option>
                                  <option value="basic-oversight" className={getOptionSecurityClass('basic-oversight', 'aiGovernance', form.dataClassification)}>Basic AI Oversight</option>
                                  <option value="ai-ethics-board" className={getOptionSecurityClass('ai-ethics-board', 'aiGovernance', form.dataClassification)}>AI Ethics Board</option>
                                  <option value="algorithmic-auditing" className={getOptionSecurityClass('algorithmic-auditing', 'aiGovernance', form.dataClassification)}>Algorithmic Auditing</option>
                                  <option value="responsible-ai" className={getOptionSecurityClass('responsible-ai', 'aiGovernance', form.dataClassification)}>Responsible AI Framework</option>
                                  <option value="ai-risk-management" className={getOptionSecurityClass('ai-risk-management', 'aiGovernance', form.dataClassification)}>AI Risk Management</option>
                                  <option value="ai-explainability" className={getOptionSecurityClass('ai-explainability', 'aiGovernance', form.dataClassification)}>AI Explainability Requirements</option>
                                </select>
                                <small className="dc-field-hint">Select the appropriate AI governance approach for ensuring AI model transparency and accountabilitybased on your data classification and regulatory obligations.</small>
                                <small className="dc-field-hint">ISO/IEC 42001:2023 (AI Management System) and ISO/IEC 23894:2023 provide frameworks for AI governance and risk management.</small>
                                {form.dataClassification && (
                                    <small className="dc-field-hint">
                                        <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                        {form.dataClassification === 'public' && 'Basic AI Oversight acceptable'}
                                        {form.dataClassification === 'internal' && 'AI Ethics Board or Algorithmic Auditing recommended'}
                                        {form.dataClassification === 'confidential' && 'Responsible AI Framework or AI Risk Management required'}
                                        {form.dataClassification === 'restricted' && 'Full AI Explainability Requirements required'}
                                    </small>
                                )}
                                <FieldWarning fieldName="aiGovernance" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">AI Model Explainability & Transparency:</label>
                              </td>
                              <td>
                                <select
                                  id="aiModelExplainability"
                                  name="aiModelExplainability"
                                  value={form.aiModelExplainability}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('aiModelExplainability') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select explainability level...</option>
                                  <option value="black-box" className={getOptionSecurityClass('black-box', 'aiModelExplainability', form.dataClassification)}>Black-Box Model (No Explainability)</option>
                                  <option value="basic-logging" className={getOptionSecurityClass('basic-logging', 'aiModelExplainability', form.dataClassification)}>Basic Logging & Metrics</option>
                                  <option value="feature-importance" className={getOptionSecurityClass('feature-importance', 'aiModelExplainability', form.dataClassification)}>Feature Importance</option>
                                  <option value="local-explanations" className={getOptionSecurityClass('local-explanations', 'aiModelExplainability', form.dataClassification)}>Local Explanations</option>
                                  <option value="global-explanations" className={getOptionSecurityClass('global-explanations', 'aiModelExplainability', form.dataClassification)}>Global Explanations</option>
                                  <option value="lime-shap" className={getOptionSecurityClass('lime-shap', 'aiModelExplainability', form.dataClassification)}>LIME/SHAP Explanations</option>
                                  <option value="counterfactuals" className={getOptionSecurityClass('counterfactuals', 'aiModelExplainability', form.dataClassification)}>Counterfactual Explanations</option>
                                  <option value="human-readable" className={getOptionSecurityClass('human-readable', 'aiModelExplainability', form.dataClassification)}>Human-Readable Explanations</option>
                                  <option value="model-agnostic" className={getOptionSecurityClass('model-agnostic', 'aiModelExplainability', form.dataClassification)}>Model-Agnostic Explanations</option>
                                  <option value="interpretable-models" className={getOptionSecurityClass('interpretable-models', 'aiModelExplainability', form.dataClassification)}>Interpretable Models</option>
                                  <option value="full-audit-trail" className={getOptionSecurityClass('full-audit-trail', 'aiModelExplainability', form.dataClassification)}>Full Audit Trail & Lineage</option>
                                </select>
                                <small className="dc-field-hint">Select the appropriate AI model explainability and transparency level based on your data classification and regulatory obligations.</small>
                                <small className="dc-field-hint">Australian AI Ethics Principle: Transparency & Explainability. ISO/IEC 42001:2023 Section 6.2.3 and ISO/IEC 23894:2023 address AI transparency requirements. Critical for high-risk AI under proposed regulations. Supports APP compliance for automated decision-making transparency.</small>
                                <small className="dc-field-hint">
                                  <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                  {form.dataClassification === 'public' && 'Basic logging acceptable for low-risk models'}
                                  {form.dataClassification === 'internal' && 'LIME/SHAP or human-readable explanations recommended'}
                                  {form.dataClassification === 'confidential' && 'Human-readable explanations with audit trail required'}
                                  {form.dataClassification === 'restricted' && 'Full audit trail required for high-risk AI decisions'}
                                </small>
                                <FieldWarning fieldName="aiModelExplainability" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Algorithmic Bias Detection & Mitigation:</label>
                              </td>
                              <td>
                                <select
                                  id="algorithmicBiasDetection"
                                  name="algorithmicBiasDetection"
                                  value={form.algorithmicBiasDetection}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('algorithmicBiasDetection') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select bias control approach...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'algorithmicBiasDetection', form.dataClassification)}>No Bias Testing</option>
                                  <option value="pre-deployment" className={getOptionSecurityClass('pre-deployment', 'algorithmicBiasDetection', form.dataClassification)}>Pre-Deployment Bias Testing</option>
                                  <option value="post-deployment" className={getOptionSecurityClass('post-deployment', 'algorithmicBiasDetection', form.dataClassification)}>Post-Deployment Bias Testing</option>
                                  <option value="continuous-monitoring" className={getOptionSecurityClass('continuous-monitoring', 'algorithmicBiasDetection', form.dataClassification)}>Continuous Bias Monitoring</option>
                                  <option value="human-in-the-loop" className={getOptionSecurityClass('human-in-the-loop', 'algorithmicBiasDetection', form.dataClassification)}>Human-in-the-Loop Feedback</option>
                                  <option value="representative-data" className={getOptionSecurityClass('representative-data', 'algorithmicBiasDetection', form.dataClassification)}>Representative Training Data</option>
                                  <option value="algorithmic-auditing" className={getOptionSecurityClass('algorithmic-auditing', 'algorithmicBiasDetection', form.dataClassification)}>Algorithmic and Statistical Auditing</option>
                                  <option value="fairness-metrics" className={getOptionSecurityClass('fairness-metrics', 'algorithmicBiasDetection', form.dataClassification)}>Fairness Metrics & Reporting</option>
                                  <option value="bias-remediation" className={getOptionSecurityClass('bias-remediation', 'algorithmicBiasDetection', form.dataClassification)}>Bias Remediation Program</option>
                                </select>
                                <small className="dc-field-hint">Select the appropriate bias control approach based on your data classification and regulatory obligations.</small>
                                <small className="dc-field-hint">Australian AI Ethics Principle: Fairness. ISO/IEC 23894:2023 Section 6.4 and ISO/IEC TR 24027:2021 (Bias in AI) address fairness requirements. Essential for Indigenous data, gender, age discrimination compliance under DDA. Critical for credit, employment, legal decisions.</small>
                                <small className="dc-field-hint">                                  
                                  <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                  {form.dataClassification === 'public' && 'Pre-deployment testing recommended'}
                                  {form.dataClassification === 'internal' && 'Continuous monitoring for internal decision systems'}
                                  {form.dataClassification === 'confidential' && 'Fairness metrics and reporting required'}
                                  {form.dataClassification === 'restricted' && 'Comprehensive bias remediation program required'}
                                </small>
                                <FieldWarning fieldName="algorithmicBiasDetection" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">AI Model Card & Documentation:</label>
                              </td>
                              <td>
                                <select
                                  id="aiModelCards"
                                  name="aiModelCards"
                                  value={form.aiModelCards}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('aiModelCards') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select documentation level...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'aiModelCards', form.dataClassification)}>No Model Documentation</option>
                                  <option value="basic-docs" className={getOptionSecurityClass('basic-docs', 'aiModelCards', form.dataClassification)}>Basic Model Documentation</option>
                                  <option value="version-history" className={getOptionSecurityClass('version-history', 'aiModelCards', form.dataClassification)}>Version History & Change Logs</option>
                                  <option value="model-cards" className={getOptionSecurityClass('model-cards', 'aiModelCards', form.dataClassification)}>Model Cards (Performance, Limitations)</option>
                                  <option value="detailed-cards" className={getOptionSecurityClass('detailed-cards', 'aiModelCards', form.dataClassification)}>Detailed Model Cards (Use Cases, Bias)</option>
                                  <option value="data-sheets" className={getOptionSecurityClass('data-sheets', 'aiModelCards', form.dataClassification)}>Data Sheets for Datasets</option>
                                  <option value="training-procedures" className={getOptionSecurityClass('training-procedures', 'aiModelCards', form.dataClassification)}>Training Data and Procedures Documentation</option>
                                  <option value="evaluation-metrics" className={getOptionSecurityClass('evaluation-metrics', 'aiModelCards', form.dataClassification)}>Evaluation Metrics and Testing Procedures</option>
                                  <option value="ethical-considerations" className={getOptionSecurityClass('ethical-considerations', 'aiModelCards', form.dataClassification)}>Ethical Considerations and Impact Assessments</option>
                                  <option value="usage-guidelines" className={getOptionSecurityClass('usage-guidelines', 'aiModelCards', form.dataClassification)}>Usage Guidelines and Best Practices</option>                                  
                                  <option value="comprehensive-lineage" className={getOptionSecurityClass('comprehensive-lineage', 'aiModelCards', form.dataClassification)}>Comprehensive Lineage & Provenance</option>
                                  <option value="regulatory-compliance" className={getOptionSecurityClass('regulatory-compliance', 'aiModelCards', form.dataClassification)}>Regulatory Compliance Documentation</option>
                                  <option value="audit-reports" className={getOptionSecurityClass('audit-reports', 'aiModelCards', form.dataClassification)}>Internal and Third-Party Audit Reports</option>
                                  <option value="public-transparency" className={getOptionSecurityClass('public-transparency', 'aiModelCards', form.dataClassification)}>Public Transparency Reports</option>
                                </select>
                                <small className="dc-field-hint">Select the appropriate AI model documentation level based on your data classification and regulatory obligations.</small>
                                <small className="dc-field-hint">Aligns with Responsible AI best practices and ISO/IEC 42001:2023 Section 7.3 (Documented Information); supports APP compliance for automated decision transparency. Documents intended use, limitations, bias testing, and performance metrics.</small>
                                <small className="dc-field-hint">
                                  <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                  {form.dataClassification === 'public' && 'Model cards recommended for public-facing AI'}
                                  {form.dataClassification === 'internal' && 'Model cards with performance metrics recommended'}
                                  {form.dataClassification === 'confidential' && 'Comprehensive lineage documentation required'}
                                  {form.dataClassification === 'restricted' && 'Full lineage with public transparency where applicable'}
                                </small>
                                <FieldWarning fieldName="aiModelCards" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Human-in-the-Loop for High-Risk Decisions:</label>
                              </td>
                              <td>
                                <select
                                  id="humanInLoopAi"
                                  name="humanInLoopAi"
                                  value={form.humanInLoopAi}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('humanInLoopAi') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select human oversight level...</option>
                                  <option value="fully-automated" className={getOptionSecurityClass('fully-automated', 'humanInLoopAi', form.dataClassification)}>Fully Automated (No Human Review)</option>
                                  <option value="review-on-escalation" className={getOptionSecurityClass('review-on-escalation', 'humanInLoopAi', form.dataClassification)}>Human Review on Escalation</option>
                                  <option value="human-on-loop" className={getOptionSecurityClass('human-on-loop', 'humanInLoopAi', form.dataClassification)}>Human-on-the-Loop (Active Monitoring)</option>
                                  <option value="human-in-loop" className={getOptionSecurityClass('human-in-loop', 'humanInLoopAi', form.dataClassification)}>Human-in-the-Loop (Required Approval)</option>
                                  <option value="meaningful-control" className={getOptionSecurityClass('meaningful-control', 'humanInLoopAi', form.dataClassification)}>Meaningful Human Control</option>
                                </select>
                                <small className="dc-field-hint">Select the appropriate human oversight level based on your data classification and regulatory obligations.</small>
                                <small className="dc-field-hint">Australian AI Ethics Principle: Human-centered values. ISO/IEC 42001:2023 Section 6.4.2 and ISO/IEC 23894:2023 emphasise human oversight. Critical for credit, employment, legal, health decisions. Required for high-risk AI systems under proposed regulations.</small>
                                <small className="dc-field-hint">
                                  <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                  {form.dataClassification === 'public' && 'Review on escalation for low-risk decisions'}
                                  {form.dataClassification === 'internal' && 'Human-on-loop for internal processes'}
                                  {form.dataClassification === 'confidential' && 'Human-in-loop required for sensitive decisions'}
                                  {form.dataClassification === 'restricted' && 'Meaningful human control required for high-risk decisions'}
                                </small>
                                <FieldWarning fieldName="humanInLoopAi" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Model Output Monitoring & Data Leakage Prevention:</label>
                              </td>
                              <td>
                                <select
                                  id="modelDataLeakagePrevention"
                                  name="modelDataLeakagePrevention"
                                  value={form.modelDataLeakagePrevention}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('modelDataLeakagePrevention') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select leakage prevention approach...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'modelDataLeakagePrevention', form.dataClassification)}>No Output Monitoring</option>
                                  <option value="basic-filtering" className={getOptionSecurityClass('basic-filtering', 'modelDataLeakagePrevention', form.dataClassification)}>Basic Output Filtering</option>
                                  <option value="pii-detection" className={getOptionSecurityClass('pii-detection', 'modelDataLeakagePrevention', form.dataClassification)}>PII Detection & Redaction</option>
                                  <option value="access-controls" className={getOptionSecurityClass('access-controls', 'modelDataLeakagePrevention', form.dataClassification)}>Access Controls</option>
                                  <option value="watermarking" className={getOptionSecurityClass('watermarking', 'modelDataLeakagePrevention', form.dataClassification)}>Watermarking</option>
                                  <option value="usage-monitoring" className={getOptionSecurityClass('usage-monitoring', 'modelDataLeakagePrevention', form.dataClassification)}>Usage Monitoring</option>
                                  <option value="automated-alerting" className={getOptionSecurityClass('automated-alerting', 'modelDataLeakagePrevention', form.dataClassification)}>Automated Alerting</option>
                                  <option value="differential-privacy" className={getOptionSecurityClass('differential-privacy', 'modelDataLeakagePrevention', form.dataClassification)}>Differential Privacy</option>
                                  <option value="model-inversion" className={getOptionSecurityClass('model-inversion', 'modelDataLeakagePrevention', form.dataClassification)}>Model Inversion Protection</option>
                                  <option value="comprehensive-prevention" className={getOptionSecurityClass('comprehensive-prevention', 'modelDataLeakagePrevention', form.dataClassification)}>Comprehensive Leakage Prevention</option>
                                </select>
                                <small className="dc-field-hint">Select the appropriate data leakage prevention measures based on your data classification and regulatory obligations.</small>
                                <small className="dc-field-hint">Prevents training data reconstruction attacks, membership inference, and unintended data disclosure. ISO/IEC 27001:2022 Annex A.8.24 (Information Leakage) and ISO/IEC 23894:2023 address AI-specific data leakage risks. Critical for confidential/restricted data in AI models.</small>
                                <small className="dc-field-hint">
                                  <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                  {form.dataClassification === 'public' && 'Basic filtering for public models'}
                                  {form.dataClassification === 'internal' && 'PII detection for internal data'}
                                  {form.dataClassification === 'confidential' && 'Model inversion protection required'}
                                  {form.dataClassification === 'restricted' && 'Comprehensive prevention with continuous monitoring required'}
                                </small>  
                                <FieldWarning fieldName="modelDataLeakagePrevention" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">AI Safety & Adversarial Robustness:</label>
                              </td>
                              <td>
                                <select
                                  id="aiSafetyAdversarial"
                                  name="aiSafetyAdversarial"
                                  value={form.aiSafetyAdversarial}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('aiSafetyAdversarial') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select safety level...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'aiSafetyAdversarial', form.dataClassification)}>No Safety Testing</option>
                                  <option value="input-validation" className={getOptionSecurityClass('input-validation', 'aiSafetyAdversarial', form.dataClassification)}>Input Validation & Sanitisation</option>
                                  <option value="adversarial-testing" className={getOptionSecurityClass('adversarial-testing', 'aiSafetyAdversarial', form.dataClassification)}>Adversarial Training and Testing</option>
                                  <option value="red-teaming" className={getOptionSecurityClass('red-teaming', 'aiSafetyAdversarial', form.dataClassification)}>Red-Teaming & Penetration Testing</option>
                                  <option value="continuous-safety" className={getOptionSecurityClass('continuous-safety', 'aiSafetyAdversarial', form.dataClassification)}>Continuous Safety Monitoring</option>
                                </select>
                                <small className="dc-field-hint">Select the appropriate AI safety and adversarial robustness measures based on your data classification and regulatory obligations.</small>
                                <small className="dc-field-hint">Australian AI Ethics Principle: Reliability & Safety. ISO/IEC 23894:2023 Section 6.5 and ISO/IEC 24029:2021 (AI Robustness) address adversarial robustness. Prevents data poisoning, adversarial examples, model extraction. Aligns with ASD guidance on AI system security.</small>
                                <small className="dc-field-hint">
                                  <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                  {form.dataClassification === 'public' && 'Input validation for public-facing AI'}
                                  {form.dataClassification === 'internal' && 'Adversarial testing for internal models'}
                                  {form.dataClassification === 'confidential' && 'Red-teaming required for sensitive data'}
                                  {form.dataClassification === 'restricted' && 'Continuous safety monitoring with red-teaming required'}
                                </small>
                                <FieldWarning fieldName="aiSafetyAdversarial" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">AI Data Lineage & Provenance:</label>
                              </td>
                              <td>
                                <select
                                  id="aiDataLineage"
                                  name="aiDataLineage"
                                  value={form.aiDataLineage}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('aiDataLineage') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select lineage tracking...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'aiDataLineage', form.dataClassification)}>No Lineage Tracking</option>
                                  <option value="basic-tracking" className={getOptionSecurityClass('basic-tracking', 'aiDataLineage', form.dataClassification)}>Basic Training Data Tracking</option>
                                  <option value="automated-lineage" className={getOptionSecurityClass('automated-lineage', 'aiDataLineage', form.dataClassification)}>Automated Data Lineage</option>
                                  <option value="cryptographic-provenance" className={getOptionSecurityClass('cryptographic-provenance', 'aiDataLineage', form.dataClassification)}>Cryptographic Provenance</option>
                                  <option value="immutable-audit" className={getOptionSecurityClass('immutable-audit', 'aiDataLineage', form.dataClassification)}>Immutable Audit Trail</option>
                                </select>
                                <small className="dc-field-hint">Select the appropriate AI data lineage and provenance tracking based on your data classification and regulatory obligations.</small>
                                <small className="dc-field-hint">Critical for AI/ML Principle 4 (Transparency and Explainability) and Principle 6 (Reliability and Safety); ISO/IEC 23894:2023 Section 7.3 addresses continuous AI monitoring. Detects concept drift, data drift, and performance degradation. Ensures models remain accurate and safe over time as real-world conditions change. Essential for maintaining model trustworthiness and compliance with Australian AI Ethics Principles.</small>
                                <small className="dc-field-hint">
                                  <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                  {form.dataClassification === 'public' && 'Basic tracking for public models'}
                                  {form.dataClassification === 'internal' && 'Automated lineage recommended'}
                                  {form.dataClassification === 'confidential' && 'Cryptographic provenance required'}
                                  {form.dataClassification === 'restricted' && 'Immutable audit trail required for regulatory compliance'}
                                </small>
                                <FieldWarning fieldName="aiDataLineage" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Model Versioning & Rollback Controls:</label>
                              </td>
                              <td>
                                <select
                                  id="modelVersioningRollback"
                                  name="modelVersioningRollback"
                                  value={form.modelVersioningRollback}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('modelVersioningRollback') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select versioning approach...</option>
                                  <option value="manual" className={getOptionSecurityClass('manual', 'modelVersioningRollback', form.dataClassification)}>Manual Version Management</option>
                                  <option value="version-tagging" className={getOptionSecurityClass('version-tagging', 'modelVersioningRollback', form.dataClassification)}>Version Tagging & Registry</option>
                                  <option value="automated-cicd" className={getOptionSecurityClass('automated-cicd', 'modelVersioningRollback', form.dataClassification)}>Automated CI/CD for Models</option>
                                  <option value="blue-green" className={getOptionSecurityClass('blue-green', 'modelVersioningRollback', form.dataClassification)}>Blue-Green Deployments</option>
                                  <option value="canary-deployments" className={getOptionSecurityClass('canary-deployments', 'modelVersioningRollback', form.dataClassification)}>Canary Deployments</option>
                                  <option value="ab-testing" className={getOptionSecurityClass('ab-testing', 'modelVersioningRollback', form.dataClassification)}>A/B Testing Framework</option>
                                  <option value="instant-rollback" className={getOptionSecurityClass('instant-rollback', 'modelVersioningRollback', form.dataClassification)}>Instant Rollback Capability</option>
                                </select>
                                <small className="dc-field-hint">Select the appropriate model versioning and rollback controls based on your data classification and regulatory obligations.</small>
                                <small className="dc-field-hint">Essential for production AI safety; enables quick response to model drift, bias discovery, or performance degradation. ISO/IEC 42001:2023 Section 9 (Performance Evaluation) and ISO/IEC 23894:2023 emphasise AI lifecycle management. Supports incident response and change management.</small>
                                <small className="dc-field-hint">
                                  <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                  {form.dataClassification === 'public' && 'Version tagging for production models'}
                                  {form.dataClassification === 'internal' && 'Automated CI/CD recommended'}
                                  {form.dataClassification === 'confidential' && 'A/B testing with rollback required'}
                                  {form.dataClassification === 'restricted' && 'Instant rollback with full audit trail required'}
                                </small>
                                <FieldWarning fieldName="modelVersioningRollback" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">AI Model Drift Detection & Retraining:</label>
                              </td>
                              <td>
                                <select
                                  id="aiModelDrift"
                                  name="aiModelDrift"
                                  value={form.aiModelDrift}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('aiModelDrift') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select drift detection approach...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'aiModelDrift', form.dataClassification)}>No Drift Monitoring</option>
                                  <option value="manual-review" className={getOptionSecurityClass('manual-review', 'aiModelDrift', form.dataClassification)}>Manual Periodic Review</option>
                                  <option value="statistical-monitoring" className={getOptionSecurityClass('statistical-monitoring', 'aiModelDrift', form.dataClassification)}>Statistical Drift Monitoring</option>
                                  <option value="automated-detection" className={getOptionSecurityClass('automated-detection', 'aiModelDrift', form.dataClassification)}>Automated Drift Detection & Alerts</option>
                                  <option value="auto-retraining" className={getOptionSecurityClass('auto-retraining', 'aiModelDrift', form.dataClassification)}>Automated Retraining Pipeline</option>
                                  <option value="continuous-learning" className={getOptionSecurityClass('continuous-learning', 'aiModelDrift', form.dataClassification)}>Continuous Learning with Human Oversight</option>
                                </select>
                                <small className="dc-field-hint">Select the appropriate AI model drift detection and retraining approach based on your data classification and regulatory obligations.</small>
                                <small className="dc-field-hint">Critical for AI/ML Principle 4 (Transparency and Explainability) and Principle 6 (Reliability and Safety); ISO/IEC 23894:2023 Section 7.3 addresses continuous AI monitoring. Detects concept drift, data drift, and performance degradation. Ensures models remain accurate and safe over time as real-world conditions change. Essential for maintaining model trustworthiness and compliance with Australian AI Ethics Principles.</small>
                                <small className="dc-field-hint">
                                  <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                  {form.dataClassification === 'public' && 'Manual review acceptable for non-critical models'}
                                  {form.dataClassification === 'internal' && 'Statistical monitoring recommended'}
                                  {form.dataClassification === 'confidential' && 'Automated detection with alerts required'}
                                  {form.dataClassification === 'restricted' && 'Continuous learning with mandatory human oversight required'}
                                </small>
                                <FieldWarning fieldName="aiModelDrift" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Third-Party AI/ML Model Risk Assessment:</label>
                              </td>
                              <td>
                                <select
                                  id="thirdPartyAiRisk"
                                  name="thirdPartyAiRisk"
                                  value={form.thirdPartyAiRisk}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('thirdPartyAiRisk') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select assessment approach...</option>
                                  <option value="vendor-assurance" className={getOptionSecurityClass('vendor-assurance', 'thirdPartyAiRisk', form.dataClassification)}>Vendor Assurance Only</option>
                                  <option value="model-cards-review" className={getOptionSecurityClass('model-cards-review', 'thirdPartyAiRisk', form.dataClassification)}>Model Cards Review</option>
                                  <option value="independent-testing" className={getOptionSecurityClass('independent-testing', 'thirdPartyAiRisk', form.dataClassification)}>Independent Testing & Validation</option>
                                  <option value="continuous-validation" className={getOptionSecurityClass('continuous-validation', 'thirdPartyAiRisk', form.dataClassification)}>Continuous Third-Party Validation</option>
                                  <option value="no-third-party" className={getOptionSecurityClass('no-third-party', 'thirdPartyAiRisk', form.dataClassification)}>No Third-Party Models Permitted</option>
                                </select>
                                <small className="dc-field-hint">Select the appropriate third-party AI/ML model risk assessment approach based on your data classification and regulatory obligations.</small>
                                <small className="dc-field-hint">Frontier models (GPT, Claude, Gemini, Qwen, Kimi, Llama/Muse Spark, etc) and pre-trained models carry bias, security, and privacy risks. ISO/IEC 42001:2023 Section 6.3.3 (Third-Party AI Systems) and ISO/IEC 23894:2023 address third-party AI risk. Aligns with OAIC guidance on AI processors under APPs. Assess training data sources, bias, and data handling.</small>
                                <small className="dc-field-hint">
                                  <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                  {form.dataClassification === 'public' && 'Assess vendor assurance for third-party APIs'}
                                  {form.dataClassification === 'internal' && 'Model cards review for third-party APIs'}
                                  {form.dataClassification === 'confidential' && 'Independent testing for internal use'}
                                  {form.dataClassification === 'restricted' && 'No third-party models or comprehensive validation with data residency controls'}
                                </small>
                                <FieldWarning fieldName="thirdPartyAiRisk" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">AI Supply Chain Transparency (SBOM for AI):</label>
                              </td>
                              <td>
                                <select
                                  id="aiSupplyChainTransparency"
                                  name="aiSupplyChainTransparency"
                                  value={form.aiSupplyChainTransparency}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('aiSupplyChainTransparency') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select transparency level...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'aiSupplyChainTransparency', form.dataClassification)}>No AI Inventory</option>
                                  <option value="model-inventory" className={getOptionSecurityClass('model-inventory', 'aiSupplyChainTransparency', form.dataClassification)}>Basic AI Model Inventory</option>
                                  <option value="training-sources" className={getOptionSecurityClass('training-sources', 'aiSupplyChainTransparency', form.dataClassification)}>Training Data Sources Documented</option>
                                  <option value="full-ai-bom" className={getOptionSecurityClass('full-ai-bom', 'aiSupplyChainTransparency', form.dataClassification)}>Full AI-BOM (Models, Data, Dependencies)</option>
                                  <option value="supply-chain-verification" className={getOptionSecurityClass('supply-chain-verification', 'aiSupplyChainTransparency', form.dataClassification)}>Supply Chain Verification & Attestation</option>
                                  <option value="third-party-audits" className={getOptionSecurityClass('third-party-audits', 'aiSupplyChainTransparency', form.dataClassification)}>Third-Party Audits</option>
                                </select>
                                <small className="dc-field-hint">Select the appropriate AI supply chain transparency level based on your data classification and regulatory obligations.</small>
                                <small className="dc-field-hint">Emerging best practice (AI-BOM); ISO/IEC 42001:2023 Section 7.3 and ISO/IEC 5230:2020 (OpenChain for AI) emphasise supply chain transparency. Understand upstream AI components, training data sources, model dependencies, and third-party libraries. Critical for copyright compliance and supply chain security.</small>
                                <small className="dc-field-hint">
                                  <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                  {form.dataClassification === 'public' && 'Model inventory for public-facing AI'}
                                  {form.dataClassification === 'internal' && 'Training sources documentation recommended'}
                                  {form.dataClassification === 'confidential' && 'Full AI-BOM required for supply chain visibility'}
                                  {form.dataClassification === 'restricted' && 'Supply chain verification with cryptographic attestation required'}
                                </small>
                                <FieldWarning fieldName="aiSupplyChainTransparency" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </fieldset>
                    </td>
                  </tr>

                  {/* Supply Chain Data Security & Third-Party Risk */}
                  <tr>
                    <td colSpan="2">
                      <fieldset className="dc-fieldset dc-fieldset-supply-chain">
                        <legend className="dc-legend dc-legend-supply-chain">⛓️ Supply Chain Data Security & Third-Party Risk</legend>
                        <table className="dc-field-table">
                          <tbody>                                                        
                            <tr>
                              <td colSpan="2">
                                <small className="dc-field-hint">
                                Select the appropriate Supply Chain Data Security and Third-Party Risk approach based on your data classification and organisational requirements.
                                </small>
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('thirdPartyDataProcessing') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select processing approach...</option>
                                  <option value="basic-agreements" className={getOptionSecurityClass('basic-agreements', 'thirdPartyDataProcessing', form.dataClassification)}>Basic Data Processing Agreements (DPAs)</option>
                                  <option value="enhanced-dpa" className={getOptionSecurityClass('enhanced-dpa', 'thirdPartyDataProcessing', form.dataClassification)}>Enhanced DPA with Security Requirements</option>
                                  <option value="vendor-assessment" className={getOptionSecurityClass('vendor-assessment', 'thirdPartyDataProcessing', form.dataClassification)}>Regular Vendor Security Assessments</option>
                                  <option value="continuous-monitoring" className={getOptionSecurityClass('continuous-monitoring', 'thirdPartyDataProcessing', form.dataClassification)}>Continuous Vendor Monitoring</option>
                                  <option value="zero-trust-vendors" className={getOptionSecurityClass('zero-trust-vendors', 'thirdPartyDataProcessing', form.dataClassification)}>Zero Trust Vendor Access</option>
                                  <option value="data-sovereignty" className={getOptionSecurityClass('data-sovereignty', 'thirdPartyDataProcessing', form.dataClassification)}>Data Sovereignty Controls</option>
                                </select>
                                <small className="dc-field-hint">Approach for managing third-party data processing risks and compliance. Ensure DPAs with security/privacy obligations, vendor assessments, and continuous monitoring. Refs: Privacy Act APP 8 (Cross-border Disclosure), GDPR Article 28 (Processors), ISO/IEC 27001 A.15 (Supplier Relationships), APRA CPS 234 Section 30-36 (material service providers).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Basic agreements acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'Standard agreements with security clauses recommended'}
                                    {form.dataClassification === 'confidential' && 'Enhanced agreements with strict security and privacy requirements required'}
                                    {form.dataClassification === 'restricted' && 'Comprehensive agreements with continuous monitoring and zero trust access required'}
                                  </small>
                                )}
                                <FieldWarning fieldName="thirdPartyDataProcessing" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('supplyChainDataMapping') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select mapping approach...</option>
                                  <option value="basic-inventory" className={getOptionSecurityClass('basic-inventory', 'supplyChainDataMapping', form.dataClassification)}>Basic Supplier Inventory</option>
                                  <option value="data-flow-mapping" className={getOptionSecurityClass('data-flow-mapping', 'supplyChainDataMapping', form.dataClassification)}>Data Flow Mapping</option>
                                  <option value="risk-based-mapping" className={getOptionSecurityClass('risk-based-mapping', 'supplyChainDataMapping', form.dataClassification)}>Risk-Based Data Mapping</option>
                                  <option value="automated-discovery" className={getOptionSecurityClass('automated-discovery', 'supplyChainDataMapping', form.dataClassification)}>Automated Data Flow Discovery</option>
                                  <option value="continuous-mapping" className={getOptionSecurityClass('continuous-mapping', 'supplyChainDataMapping', form.dataClassification)}>Continuous Supply Chain Mapping</option>
                                  <option value="blockchain-provenance" className={getOptionSecurityClass('blockchain-provenance', 'supplyChainDataMapping', form.dataClassification)}>Blockchain Data Provenance</option>
                                </select>
                                <small className="dc-field-hint">Map data flows through supply chain (N-tier visibility). Understand which suppliers/sub-processors access what data, where data resides, and data lineage. Critical for GDPR Article 30 Records of Processing, Privacy Act APP 1 accountability. Refs: ISO/IEC 27036-1 (Supplier relationships), NIST SP 800-161r1 (Cyber Supply Chain Risk Management).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Basic supplier inventory acceptable'}
                                    {form.dataClassification === 'internal' && 'Data flow mapping recommended'}
                                    {form.dataClassification === 'confidential' && 'Risk-based data mapping required'}
                                    {form.dataClassification === 'restricted' && 'Continuous supply chain mapping required'}
                                  </small>
                                )}
                                <FieldWarning fieldName="supplyChainDataMapping" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Build Provenance & Artifact Signing (SLSA):</label>
                              </td>
                              <td>
                                <select
                                  id="buildProvenanceSigning"
                                  name="buildProvenanceSigning"
                                  value={form.buildProvenanceSigning}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('buildProvenanceSigning') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select provenance level...</option>
                                  <option value="none">None</option>
                                  <option value="ad-hoc-logs" className={getOptionSecurityClass('ad-hoc-logs', 'buildProvenanceSigning', form.dataClassification)}>Ad-hoc Build Logs</option>
                                  <option value="slsa-l1-provenance" className={getOptionSecurityClass('slsa-l1-provenance', 'buildProvenanceSigning', form.dataClassification)}>SLSA Level 1 + Package Provenance</option>
                                  <option value="slsa-l2-hosted" className={getOptionSecurityClass('slsa-l2-hosted', 'buildProvenanceSigning', form.dataClassification)}>SLSA Level 2 + Hosted Builds</option>
                                  <option value="slsa-l3-hardened" className={getOptionSecurityClass('slsa-l3-hardened', 'buildProvenanceSigning', form.dataClassification)}>SLSA Level 3 + Hardened Builds</option>
                                </select>
                                <small className="dc-field-hint">Use in-toto/Sigstore cosign attestations. Refs: Supply-chain Levels for Software Artifacts (SLSA) v1.0+, NIST SP 800-218 SSDF, ISO/IEC 27002:2022 A.8.30.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Vendor attestations acceptable'}
                                    {form.dataClassification === 'internal' && 'SLSA L1: Provenance of how packages are built'}
                                    {form.dataClassification === 'confidential' && 'SLSA L2: Signed provernance of the hosted build platform indicating no tampering post build'}
                                    {form.dataClassification === 'restricted' && 'SLSA L3: Hardened build platform provenance indicating no tampering during the build process'}
                                  </small>
                                )}
                                <FieldWarning fieldName="buildProvenanceSigning" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Secure Development Practices (NIST SSDF):</label>
                              </td>
                              <td>
                                <select
                                  id="secureDevPracticesSsdf"
                                  name="secureDevPracticesSsdf"
                                  value={form.secureDevPracticesSsdf}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('secureDevPracticesSsdf') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select SSDF maturity...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'secureDevPracticesSsdf', form.dataClassification)}>None</option>
                                  <option value="policy-only" className={getOptionSecurityClass('policy-only', 'secureDevPracticesSsdf', form.dataClassification)}>Policy Only</option>
                                  <option value="partial-ssdf" className={getOptionSecurityClass('partial-ssdf', 'secureDevPracticesSsdf', form.dataClassification)}>Partial SSDF Adoption</option>
                                  <option value="ssdf-baseline" className={getOptionSecurityClass('ssdf-baseline', 'secureDevPracticesSsdf', form.dataClassification)}>SSDF Baseline Implemented</option>
                                  <option value="ssdf-independent-assessment" className={getOptionSecurityClass('ssdf-independent-assessment', 'secureDevPracticesSsdf', form.dataClassification)}>SSDF + Independent Assessment</option>
                                </select>
                                <small className="dc-field-hint">Codify the Secure Development Lifecycle (SDL) / Secure Software Development Framework (SSDF) in contracts. Refs: NIST SP 800-218, ISO/IEC 27001:2022 A.5.36, ASD ISM.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Policy only acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'Partial SSDF adoption recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'Comprehensive SDL/SSDF implementation required'}
                                    {form.dataClassification === 'restricted' && 'Advanced SDL/SSDF with independent assessment required'}
                                  </small>
                                )}
                                <FieldWarning fieldName="secureDevPracticesSsdf" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Vulnerability Disclosure & Patch SLAs:</label>
                              </td>
                              <td>
                                <select
                                  id="vulnerabilityDisclosureSla"
                                  name="vulnerabilityDisclosureSla"
                                  value={form.vulnerabilityDisclosureSla}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('vulnerabilityDisclosureSla') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select VDP/SLA level...</option>
                                  <option value="no-vdp" className={getOptionSecurityClass('no-vdp', 'vulnerabilityDisclosureSla', form.dataClassification)}>No VDP</option>
                                  <option value="informal-vdp" className={getOptionSecurityClass('informal-vdp', 'vulnerabilityDisclosureSla', form.dataClassification)}>Informal VDP</option>
                                  <option value="coordinated-vdp" className={getOptionSecurityClass('coordinated-vdp', 'vulnerabilityDisclosureSla', form.dataClassification)}>Coordinated VDP</option>
                                  <option value="vdp-sla-30-14-7" className={getOptionSecurityClass('vdp-sla-30-14-7', 'vulnerabilityDisclosureSla', form.dataClassification)}>VDP + 30/14/7-day SLAs</option>
                                  <option value="vdp-sla-emergency" className={getOptionSecurityClass('vdp-sla-emergency', 'vulnerabilityDisclosureSla', form.dataClassification)}>VDP + SLAs + Emergency Patches</option>
                                </select>
                                <small className="dc-field-hint">Include VDP and patch SLAs in DPA/MSA. Refs: ISO/IEC 29147, ISO/IEC 30111, OAIC NDB timelines.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Basic VDP acceptable'}
                                    {form.dataClassification === 'internal' && 'Coordinated VDP recommended'}
                                    {form.dataClassification === 'confidential' && 'VDP + SLAs required'}
                                    {form.dataClassification === 'restricted' && 'VDP + SLAs + Emergency Patches required'}
                                  </small>
                                )}
                                <FieldWarning fieldName="vulnerabilityDisclosureSla" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Supplier Security Assurance Evidence:</label>
                              </td>
                              <td>
                                <Select
                                  id="supplierSecurityAssurance"
                                  name="supplierSecurityAssurance"
                                  isMulti
                                  options={[
                                    { value: 'none', label: 'None' },
                                    { value: 'self-attestation', label: 'Self-Attestation' },
                                    { value: 'iso27001', label: 'ISO/IEC 27001 Certification' },
                                    { value: 'soc2-irap', label: 'SOC 2 Type II / IRAP' },
                                    { value: 'third-party-audit', label: 'Third-Party Security Audit' },
                                    { value: 'on-site-audits', label: 'On-Site Audits' },
                                    { value: 'escrow-accountability', label: 'Escrow Accountability' },
                                    { value: 'insurance-verification', label: 'Insurance Verification' },
                                    { value: 'privacy-impact-assessment', label: 'Privacy Impact Assessment / Data Protection Impact Assessment' },
                                    { value: 'ethical-sourcing-review', label: 'Ethical Sourcing Review' },
                                    { value: 'modern-slavery', label: 'Modern Slavery Assessment' },
                                    { value: 'regulatory-compliance', label: 'Regulatory Compliance (e.g. HIPAA, PCI-DSS)' },
                                    { value: 'infrastructure-security-assessment', label: 'Infrastructure Security Assessment' },
                                    { value: 'data-protection-assessment', label: 'Data Protection Assessment' },
                                    { value: 'cybersecurity-maturity-assessment', label: 'Cybersecurity Maturity Assessment' },
                                    { value: 'vendor-risk-management', label: 'Vendor Risk Management Program' },
                                    { value: 'continuous-assurance', label: 'Continuous Control Evidence' }
                                  ]}
                                  value={(Array.isArray(form.supplierSecurityAssurance)
                                    ? form.supplierSecurityAssurance
                                    : [form.supplierSecurityAssurance].filter(Boolean)).map(v => {
                                      const labels = {
                                        'none': 'None',
                                        'self-attestation': 'Self-Attestation',
                                        'iso27001': 'ISO/IEC 27001 Certification',
                                        'soc2-irap': 'SOC 2 Type II / IRAP',
                                        'third-party-audit': 'Third-Party Security Audit',
                                        'on-site-audits': 'On-Site Audits',
                                        'escrow-accountability': 'Escrow Accountability',
                                        'insurance-verification': 'Insurance Verification',
                                        'privacy-impact-assessment': 'Privacy Impact Assessment / Data Protection Impact Assessment',
                                        'ethical-sourcing-review': 'Ethical Sourcing Review',
                                        'modern-slavery': 'Modern Slavery Assessment',
                                        'regulatory-compliance': 'Regulatory Compliance (e.g. HIPAA, PCI-DSS)',
                                        'infrastructure-security-assessment': 'Infrastructure Security Assessment',
                                        'data-protection-assessment': 'Data Protection Assessment',
                                        'cybersecurity-maturity-assessment': 'Cybersecurity Maturity Assessment',
                                        'vendor-risk-management': 'Vendor Risk Management Program',
                                        'continuous-assurance': 'Continuous Control Evidence'
                                      };
                                      return { value: v, label: labels[v] || v };
                                    })}
                                  onChange={handleMultiSelectChange('supplierSecurityAssurance')}
                                  styles={getSecurityStyles('supplierSecurityAssurance')}
                                  className={getSecurityClassName('supplierSecurityAssurance', form.supplierSecurityAssurance)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">Require scope covering your data/services. Refs: ISO/IEC 27036 (supplier relationships), PSPF/ISM.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Attestation of basic security controls'}
                                    {form.dataClassification === 'internal' && 'Attestation of audit compliance'}
                                    {form.dataClassification === 'confidential' && 'Supply chain security assurance'}
                                    {form.dataClassification === 'restricted' && 'Security maturity assessment'}
                                  </small>
                                )}
                                <FieldWarning fieldName="supplierSecurityAssurance" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Artifact/Dependency Policy Enforcement:</label>
                              </td>
                              <td>
                                <select
                                  id="dependencyPolicyEnforcement"
                                  name="dependencyPolicyEnforcement"
                                  value={form.dependencyPolicyEnforcement}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dependencyPolicyEnforcement') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select enforcement level...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'dependencyPolicyEnforcement', form.dataClassification)}>None</option>
                                  <option value="allowlist-registries" className={getOptionSecurityClass('allowlist-registries', 'dependencyPolicyEnforcement', form.dataClassification)}>Allowlist Registries</option>
                                  <option value="pinned-versions" className={getOptionSecurityClass('pinned-versions', 'dependencyPolicyEnforcement', form.dataClassification)}>Pinned Versions</option>
                                  <option value="verified-publishers" className={getOptionSecurityClass('verified-publishers', 'dependencyPolicyEnforcement', form.dataClassification)}>Verified Publishers (Sigstore)</option>
                                  <option value="opa-signed-only" className={getOptionSecurityClass('opa-signed-only', 'dependencyPolicyEnforcement', form.dataClassification)}>Policy-as-Code (OPA) + Signed Only</option>
                                </select>
                                <small className="dc-field-hint">Prevent typosquatting/poisoned deps. Refs: NIST SSDF, ISO/IEC 27002 A.8.7.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Allowlist Registries'}
                                    {form.dataClassification === 'internal' && 'Pinned Versions'}
                                    {form.dataClassification === 'confidential' && 'Verified Publishers (Sigstore)'}
                                    {form.dataClassification === 'restricted' && 'Policy-as-Code (OPA) + Signed Only'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dependencyPolicyEnforcement" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Runtime Supply Chain Controls (Containers/Images):</label>
                              </td>
                              <td>
                                <select
                                  id="runtimeSupplyChainControls"
                                  name="runtimeSupplyChainControls"
                                  value={form.runtimeSupplyChainControls}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('runtimeSupplyChainControls') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select runtime controls...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'runtimeSupplyChainControls', form.dataClassification)}>None</option>
                                  <option value="pre-deploy-scan" className={getOptionSecurityClass('pre-deploy-scan', 'runtimeSupplyChainControls', form.dataClassification)}>Pre-Deploy Scan</option>
                                  <option value="signed-only-admission" className={getOptionSecurityClass('signed-only-admission', 'runtimeSupplyChainControls', form.dataClassification)}>Signed-Only Admission</option>
                                  <option value="runtime-ebpf-ids" className={getOptionSecurityClass('runtime-ebpf-ids', 'runtimeSupplyChainControls', form.dataClassification)}>Runtime eBPF/IDS</option>
                                  <option value="continuous-posture-drift-prevention" className={getOptionSecurityClass('continuous-posture-drift-prevention', 'runtimeSupplyChainControls', form.dataClassification)}>Continuous Posture + Drift Prevention</option>
                                </select>
                                <small className="dc-field-hint">Select the appropriate software runtime supply chain controls based on your data classification and security requirements.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Pre-Deploy Scans'}
                                    {form.dataClassification === 'internal' && 'Signed-Only Admission'}
                                    {form.dataClassification === 'confidential' && 'Runtime eBPF/IDS'}
                                    {form.dataClassification === 'restricted' && 'Continuous Posture + Drift Prevention'}
                                  </small>
                                )}
                                <FieldWarning fieldName="runtimeSupplyChainControls" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Fourth-Party Flowdown & Oversight:</label>
                              </td>
                              <td>
                                <select
                                  id="fourthPartyFlowdown"
                                  name="fourthPartyFlowdown"
                                  value={form.fourthPartyFlowdown}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('fourthPartyFlowdown') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select flowdown level...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'fourthPartyFlowdown', form.dataClassification)}>None</option>
                                  <option value="flowdown-clauses" className={getOptionSecurityClass('flowdown-clauses', 'fourthPartyFlowdown', form.dataClassification)}>Flowdown Clauses</option>
                                  <option value="registry-4th-parties" className={getOptionSecurityClass('registry-4th-parties', 'fourthPartyFlowdown', form.dataClassification)}>Registry of Fourth Parties</option>
                                  <option value="risk-based-4th-assessment" className={getOptionSecurityClass('risk-based-4th-assessment', 'fourthPartyFlowdown', form.dataClassification)}>Risk-Based Assessments</option>
                                  <option value="continuous-monitoring-4th" className={getOptionSecurityClass('continuous-monitoring-4th', 'fourthPartyFlowdown', form.dataClassification)}>Continuous Monitoring of Fourth Parties</option>
                                </select>
                                <small className="dc-field-hint">Select the appropriate fourth-party flowdown and oversight level based on your data classification and regulatory obligations and potential risk impact exposure.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Assessment of flowdown clauses in public data'}
                                    {form.dataClassification === 'internal' && 'Registry of fourth parties'}
                                    {form.dataClassification === 'confidential' && 'Risk-based assessment of fourth parties'}
                                    {form.dataClassification === 'restricted' && 'Continuous monitoring of fourth parties'}
                                  </small>
                                )}
                                <FieldWarning fieldName="fourthPartyFlowdown" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Residency & Sovereignty Attestation:</label>
                              </td>
                              <td>
                                <select
                                  id="dataResidencyRequirements"
                                  name="dataResidencyRequirements"
                                  value={form.dataResidencyRequirements}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataResidencyRequirements') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select residency level...</option>
                                  <option value="unrestricted" className={getOptionSecurityClass('unrestricted', 'dataResidencyRequirements', form.dataClassification)}>Unrestricted</option>
                                  <option value="preferred-regions" className={getOptionSecurityClass('preferred-regions', 'dataResidencyRequirements', form.dataClassification)}>Preferred Regions</option>
                                  <option value="restricted-regions" className={getOptionSecurityClass('restricted-regions', 'dataResidencyRequirements', form.dataClassification)}>Restricted Regions</option>
                                  <option value="au-only" className={getOptionSecurityClass('au-only', 'dataResidencyRequirements', form.dataClassification)}>Australian Only</option>
                                  <option value="au-attestation" className={getOptionSecurityClass('au-attestation', 'dataResidencyRequirements', form.dataClassification)}>Australian Only with Attestation</option>
                                  <option value="au-indigenous-sovereignty" className={getOptionSecurityClass('au-indigenous-sovereignty', 'dataResidencyRequirements', form.dataClassification)}>Australian Only with Indigenous Data Sovereignty Controls</option>
                                </select>
                                <small className="dc-field-hint">Select the appropriate data residency requirement based on your data classification and regulatory obligations. Align with APP 8, SOCI Act, CARE Principles/UNDRIP; require signed location attestations.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'No data residency requirements for public data'}
                                    {form.dataClassification === 'internal' && 'Define acceptable data residency locations for internal data.'}
                                    {form.dataClassification === 'confidential' && 'Australian data residency requirements apply.'}
                                    {form.dataClassification === 'restricted' && 'Require Australian data residency / Indigenous Data Sovereignty attestations for restricted data.'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataResidencyRequirements" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Third-Party Access Architecture (Vendors):</label>
                              </td>
                              <td>
                                <select
                                  id="thirdPartyAccessArchitecture"
                                  name="thirdPartyAccessArchitecture"
                                  value={form.thirdPartyAccessArchitecture}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('thirdPartyAccessArchitecture') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select access architecture...</option>
                                  <option value="public-endpoints" className={getOptionSecurityClass('public-endpoints', 'thirdPartyAccessArchitecture', form.dataClassification)}>Public Endpoints</option>
                                  <option value="vpn" className={getOptionSecurityClass('vpn', 'thirdPartyAccessArchitecture', form.dataClassification)}>VPN</option>
                                  <option value="private-peering" className={getOptionSecurityClass('private-peering', 'thirdPartyAccessArchitecture', form.dataClassification)}>Private Peering</option>
                                  <option value="installed-agent" className={getOptionSecurityClass('installed-agent', 'thirdPartyAccessArchitecture', form.dataClassification)}>Installed Vendor Agent / Broker for remote access</option>
                                  <option value="vdi" className={getOptionSecurityClass('vdi', 'thirdPartyAccessArchitecture', form.dataClassification)}>VDI (Virtual Desktop Infrastructure)</option>
                                  <option value="vpam" className={getOptionSecurityClass('vpam', 'thirdPartyAccessArchitecture', form.dataClassification)}>Vendor Privileged Access Management (VPAM)</option>
                                  <option value="ztna-jit" className={getOptionSecurityClass('ztna-jit', 'thirdPartyAccessArchitecture', form.dataClassification)}>ZTNA with Just-In-Time Access</option>
                                  <option value="ztna-device-posture-session-recording" className={getOptionSecurityClass('ztna-device-posture-session-recording', 'thirdPartyAccessArchitecture', form.dataClassification)}>ZTNA + Device Posture + Session Recording</option>
                                </select>
                                <small className="dc-field-hint">Select the appropriate third-party access architecture based on your data classification and security requirements, keeping least-privilege and session audit in mind.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Access public data via public endpoints'}
                                    {form.dataClassification === 'internal' && 'Access internal data via VPN or private peering'}
                                    {form.dataClassification === 'confidential' && 'Access confidential data via Virtual Desktop Infrastructure (VDI) or Vendor Privileged Access Management (VPAM)'}
                                    {form.dataClassification === 'restricted' && 'Access restricted data via Zero-Trust-Network-Access (ZTNA)'}
                                  </small>
                                )}
                                <FieldWarning fieldName="thirdPartyAccessArchitecture" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Incident/Breach Notification Obligations:</label>
                              </td>
                              <td>
                                <select
                                  id="incidentBreachNotification"
                                  name="incidentBreachNotification"
                                  value={form.incidentBreachNotification}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('incidentBreachNotification') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select notification timeline...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'incidentBreachNotification', form.dataClassification)}>None</option>
                                  <option value="72h" className={getOptionSecurityClass('72h', 'incidentBreachNotification', form.dataClassification)}>72 hours</option>
                                  <option value="48h" className={getOptionSecurityClass('48h', 'incidentBreachNotification', form.dataClassification)}>48 hours</option>
                                  <option value="24h" className={getOptionSecurityClass('24h', 'incidentBreachNotification', form.dataClassification)}>24 hours</option>
                                  <option value="realtime-4h" className={getOptionSecurityClass('realtime-4h', 'incidentBreachNotification', form.incidentBreachNotification)}>Real-time (≤4h) with joint comms runbook</option>
                                </select>
                                <small className="dc-field-hint">Incident/Breach notification timelines should align with regulatory obligations and internal risk management policies. Refs: OAIC NDB, SOCI Act.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && '72 hours'}
                                    {form.dataClassification === 'internal' && '48 hours'}
                                    {form.dataClassification === 'confidential' && '24 hours'}
                                    {form.dataClassification === 'restricted' && 'Within 4 hours'}
                                  </small>
                                )}
                                <FieldWarning fieldName="incidentBreachNotification" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Vendor Stability & Market Position:</label>
                              </td>
                              <td>
                                <select
                                  id="vendorStabilityMarketPosition"
                                  name="vendorStabilityMarketPosition"
                                  value={form.vendorStabilityMarketPosition}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('vendorStabilityMarketPosition') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select vendor stability assessment...</option>
                                  <option value="not-assessed" className={getOptionSecurityClass('not-assessed', 'vendorStabilityMarketPosition', form.dataClassification)}>Not Assessed</option>
                                  <option value="startup-emerging" className={getOptionSecurityClass('startup-emerging', 'vendorStabilityMarketPosition', form.dataClassification)}>Startup/Emerging (High Risk)</option>
                                  <option value="established-niche" className={getOptionSecurityClass('established-niche', 'vendorStabilityMarketPosition', form.dataClassification)}>Established Niche Player</option>
                                  <option value="regional-leader" className={getOptionSecurityClass('regional-leader', 'vendorStabilityMarketPosition', form.dataClassification)}>Regional Market Leader</option>
                                  <option value="gartner-challenger-visionary" className={getOptionSecurityClass('gartner-challenger-visionary', 'vendorStabilityMarketPosition', form.dataClassification)}>Gartner / Forrester Challenger/Visionary + Regional Presence</option>
                                  <option value="gartner-leader-local" className={getOptionSecurityClass('gartner-leader-local', 'vendorStabilityMarketPosition', form.dataClassification)}>Gartner / Forrester Leader + Strong Local Presence</option>
                                  <option value="critical-infrastructure-vetted" className={getOptionSecurityClass('critical-infrastructure-vetted', 'vendorStabilityMarketPosition', form.dataClassification)}>Critical Infrastructure Vetted (SOCI/PSPF)</option>
                                </select>
                                <small className="dc-field-hint">Assess vendor viability: market share, Gartner/Forrester quadrant, local presence (AU/NZ), company age, geo-political risk, reputation. Critical for concentration risk and exit planning. Refs: ISO/IEC 27036, APRA CPS 230 (material service providers), SOCI Act.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Assessment not required for public data.'}
                                    {form.dataClassification === 'internal' && 'Acceptable to use small vendors with proper due diligence.'}
                                    {form.dataClassification === 'confidential' && 'Vendors must meet stringent security and compliance requirements with a regional presence.'}
                                    {form.dataClassification === 'restricted' && 'Only highly vetted vendors with robust security and compliance measures are acceptable.'}
                                  </small>
                                )}
                                <FieldWarning fieldName="vendorStabilityMarketPosition" />
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
                              <td colSpan="2">
                                <small className="dc-field-hint">Advanced threat protection and quantum-ready security measures help safeguard against sophisticated attacks and future-proof your security posture.</small>
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Insider Threat Detection:</label>
                              </td>
                              <td>
                                <select
                                  id="insiderThreatDetection"
                                  name="insiderThreatDetection"
                                  value={form.insiderThreatDetection}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('insiderThreatDetection') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select detection approach...</option>
                                  <option value="basic-logging" className={getOptionSecurityClass('basic-logging', 'insiderThreatDetection', form.dataClassification)}>Basic Activity Logging</option>
                                  <option value="rule-based-monitoring" className={getOptionSecurityClass('rule-based-monitoring', 'insiderThreatDetection', form.dataClassification)}>Rule-Based Monitoring</option>
                                  <option value="data-loss-prevention" className={getOptionSecurityClass('data-loss-prevention', 'insiderThreatDetection', form.dataClassification)}>Data Loss Prevention</option>
                                  <option value="user-activity-monitoring" className={getOptionSecurityClass('user-activity-monitoring', 'insiderThreatDetection', form.dataClassification)}>User Activity Monitoring</option>
                                  <option value="behavioural-analytics" className={getOptionSecurityClass('behavioural-analytics', 'insiderThreatDetection', form.dataClassification)}>User Entity and Behavioural Analytics (UEBA)</option>
                                  <option value="ml-anomaly" className={getOptionSecurityClass('ml-anomaly', 'insiderThreatDetection', form.dataClassification)}>ML-Based Anomaly Detection</option>
                                  <option value="real-time-monitoring" className={getOptionSecurityClass('real-time-monitoring', 'insiderThreatDetection', form.dataClassification)}>Real-Time Insider Monitoring</option>
                                  <option value="psychological-indicators" className={getOptionSecurityClass('psychological-indicators', 'insiderThreatDetection', form.dataClassification)}>Psychological Risk Indicators</option>
                                  <option value="comprehensive-program" className={getOptionSecurityClass('comprehensive-program', 'insiderThreatDetection', form.dataClassification)}>Comprehensive Insider Program</option>
                                </select>
                                <small className="dc-field-hint">Detect malicious or negligent insiders through behavioural analytics, anomaly detection, and risk indicators. Combine technical monitoring with HR/psychological factors. Refs: NIST SP 800-53 PS-8 (Personnel Sanctions), ISO/IEC 27002 A.6.4 (Disciplinary Process), ASD ISM (Personnel Security).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Use of basic security measures and monitoring for public data.'}
                                    {form.dataClassification === 'internal' && 'Use rule-based monitoring and DLP (Data Loss Prevention) for internal data.'}
                                    {form.dataClassification === 'confidential' && 'Analyse user activity and behaviour for confidential data.'}
                                    {form.dataClassification === 'restricted' && 'Implement comprehensive insider threat programs for restricted data.'}
                                  </small>
                                )}
                                <FieldWarning fieldName="insiderThreatDetection" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('uebaDataOperations') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select UEBA approach...</option>
                                  <option value="basic-monitoring" className={getOptionSecurityClass('basic-monitoring', 'uebaDataOperations', form.dataClassification)}>Basic User Monitoring</option>
                                  <option value="statistical-analysis" className={getOptionSecurityClass('statistical-analysis', 'uebaDataOperations', form.dataClassification)}>Statistical Baseline Analysis</option>
                                  <option value="ml-behavioural" className={getOptionSecurityClass('ml-behavioural', 'uebaDataOperations', form.dataClassification)}>ML Behavioural Modeling</option>
                                  <option value="advanced-ueba" className={getOptionSecurityClass('advanced-ueba', 'uebaDataOperations', form.dataClassification)}>Advanced UEBA Platform</option>
                                  <option value="ai-driven-detection" className={getOptionSecurityClass('ai-driven-detection', 'uebaDataOperations', form.dataClassification)}>AI-Driven Anomaly Detection</option>
                                  <option value="integrated-response" className={getOptionSecurityClass('integrated-response', 'uebaDataOperations', form.dataClassification)}>Integrated Response Automation</option>
                                </select>
                                <small className="dc-field-hint">User Entity and Behavioural Analytics (UEBA) for data access/operations. Baseline normal behaviour, detect anomalies (unusual downloads, access patterns, exfiltration). Refs: NIST SP 800-53 SI-4 (Information System Monitoring), ISO/IEC 27001 A.12.4.1 (Event Logging), MITRE ATT&CK (Exfiltration tactics).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Use of basic monitoring is recommended for public data.'}
                                    {form.dataClassification === 'internal' && 'Use of statistical baseline analysis is recommended for internal data.'}
                                    {form.dataClassification === 'confidential' && 'Use of ML behavioural modeling is recommended for confidential data.'}
                                    {form.dataClassification === 'restricted' && 'Use of advanced UEBA platform is recommended for restricted data.'}
                                  </small>
                                )}
                                <FieldWarning fieldName="uebaDataOperations" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('postQuantumCryptography') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select quantum readiness...</option>
                                  <option value="current-algorithms" className={getOptionSecurityClass('current-algorithms', 'postQuantumCryptography', form.dataClassification)}>Current Classical Algorithms</option>
                                  <option value="quantum-assessment" className={getOptionSecurityClass('quantum-assessment', 'postQuantumCryptography', form.dataClassification)}>Quantum Risk Assessment</option>
                                  <option value="hybrid-algorithms" className={getOptionSecurityClass('hybrid-algorithms', 'postQuantumCryptography', form.dataClassification)}>Hybrid Classical-Quantum Algorithms</option>
                                  <option value="nist-approved" className={getOptionSecurityClass('nist-approved', 'postQuantumCryptography', form.dataClassification)}>NIST-Approved PQC Algorithms</option>
                                  <option value="crypto-agility" className={getOptionSecurityClass('crypto-agility', 'postQuantumCryptography', form.dataClassification)}>Crypto-Agility Framework</option>
                                  <option value="quantum-safe" className={getOptionSecurityClass('quantum-safe', 'postQuantumCryptography', form.dataClassification)}>Full Quantum-Safe Implementation</option>
                                  <option value="full-post-quantum" className={getOptionSecurityClass('full-post-quantum', 'postQuantumCryptography', form.dataClassification)}>Full Post-Quantum Cryptography Adoption</option>
                                </select>
                                <small className="dc-field-hint">Readiness for post-quantum cryptographic standards to protect against quantum computer attacks (harvest-now-decrypt-later threat). NIST selected CRYSTALS-Kyber, CRYSTALS-Dilithium, SPHINCS+. Refs: NIST FIPS 203/204/205 (PQC standards), ISO/IEC 18033-8 (encryption algorithms), ASD guidance on quantum-safe cryptography.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Can use current classical algorithms on public data'}
                                    {form.dataClassification === 'internal' && 'Perform a quantum risk assessment for internal data'}
                                    {form.dataClassification === 'confidential' && 'Adopt NIST approved quantum algorithms for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Implement full post-quantum cryptography for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="postQuantumCryptography" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('cryptoAgility') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select agility approach...</option>
                                  <option value="static-crypto" className={getOptionSecurityClass('static-crypto', 'cryptoAgility', form.dataClassification)}>Static Cryptographic Implementation</option>
                                  <option value="configurable-crypto" className={getOptionSecurityClass('configurable-crypto', 'cryptoAgility', form.dataClassification)}>Configurable Crypto Parameters</option>
                                  <option value="modular-crypto" className={getOptionSecurityClass('modular-crypto', 'cryptoAgility', form.dataClassification)}>Modular Cryptographic Architecture</option>
                                  <option value="api-driven" className={getOptionSecurityClass('api-driven', 'cryptoAgility', form.dataClassification)}>API-Driven Crypto Selection</option>
                                  <option value="automated-migration" className={getOptionSecurityClass('automated-migration', 'cryptoAgility', form.dataClassification)}>Automated Algorithm Migration</option>
                                  <option value="dynamic-crypto" className={getOptionSecurityClass('dynamic-crypto', 'cryptoAgility', form.dataClassification)}>Dynamic Cryptographic Adaptation</option>
                                </select>
                                <small className="dc-field-hint">Approach for adapting cryptographic methods to changing threats and standards. Enables rapid algorithm updates without major code changes. Critical for transitioning to post-quantum cryptography. Refs: NIST SP 800-131A (Crypto Algorithm Transitions), ISO/IEC 18033 (Encryption Algorithms), NIST NCCoE Crypto Agility project.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Use of static cryptographic methods is generally sufficient for public data.'}
                                    {form.dataClassification === 'internal' && 'Consider configurable or modular cryptographic approaches for internal data to balance security and flexibility.'}
                                    {form.dataClassification === 'confidential' && 'Modular and API-driven cryptographic methods are recommended for confidential data to ensure adaptability and security.'}
                                  </small>
                                )}
                                <FieldWarning fieldName="cryptoAgility" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Threat Intelligence Integration & Sharing:</label>
                              </td>
                              <td>
                                <select
                                  id="threatIntelligenceSharing"
                                  name="threatIntelligenceSharing"
                                  value={form.threatIntelligenceSharing}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('threatIntelligenceSharing') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select threat intelligence maturity...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'threatIntelligenceSharing', form.dataClassification)}>None</option>
                                  <option value="internal-feeds" className={getOptionSecurityClass('internal-feeds', 'threatIntelligenceSharing', form.dataClassification)}>Internal TI Feeds Only</option>
                                  <option value="open-source-ti" className={getOptionSecurityClass('open-source-ti', 'threatIntelligenceSharing', form.dataClassification)}>Open-Source TI Feeds</option>
                                  <option value="commercial-ti" className={getOptionSecurityClass('commercial-ti', 'threatIntelligenceSharing', form.dataClassification)}>Commercial TI (MISP/STIX/TAXII)</option>
                                  <option value="industry-isacs" className={getOptionSecurityClass('industry-isacs', 'threatIntelligenceSharing', form.dataClassification)}>Industry-Specific Information Sharing and Analysis Centres (ISACs)</option>
                                  <option value="automated-response" className={getOptionSecurityClass('automated-response', 'threatIntelligenceSharing', form.dataClassification)}>Real-Time Automated Response</option>
                                </select>
                                <small className="dc-field-hint">Integrate Australian Cyber Security Centre (ACSC) alerts, CISA KEV catalog, MITRE ATT&CK for data-centric TTPs. Refs: ACSC Cyber Threat Intelligence Sharing, ASD ISM.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                  <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                  {form.dataClassification === 'public' && ('Internal threat intelligence sharing is recommended for public data.')}
                                  {form.dataClassification === 'internal' && ('Adoption of threat intelligence sharing within the organisation is recommended for internal data.')}
                                  {form.dataClassification === 'confidential' && ('Collaboration with trusted external threat intelligence sources is recommended for confidential data.')}
                                  {form.dataClassification === 'restricted' && ('Threat intelligence near real-time response and collaboration with external sources is recommended for restricted data.')}
                                  </small>
                                )}
                                <FieldWarning fieldName="threatIntelligenceSharing" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Ransomware & Data Extortion Defenses:</label>
                              </td>
                              <td>
                                <Select
                                  id="ransomwareDataExtortionDefense"
                                  name="ransomwareDataExtortionDefense"
                                  isMulti
                                  options={[
                                    { value: 'basic-backup', label: 'Basic Backup Only' },
                                    { value: 'data-watermarking', label: 'Data Watermarking' },
                                    { value: 'immutable-backups', label: 'Immutable Backups' },
                                    { value: 'behavioural-detection', label: 'Behavioural Ransomware Detection' },
                                    { value: 'incident-response-playbook', label: 'Incident Response (IR) Playbook' },
                                    { value: 'air-gapped-tested', label: 'Air-Gapped + Tested Recovery' },
                                    { value: 'offline-crypto-escrow', label: 'Offline Crypto Key Escrow' },
                                    { value: 'forensic-readiness', label: 'Forensic Readiness' },
                                    { value: 'cyber-insurance', label: 'Cyber Insurance Coverage' },
                                    { value: 'negotiation-support', label: 'Ransomware Negotiation Support' },
                                    { value: 'legal-privacy-consultation', label: 'Legal & Privacy Consultation' },
                                    { value: 'comprehensive-ir', label: 'Comprehensive Incident Response (IR) + Negotiation Plan' }
                                  ]}
                                  value={(Array.isArray(form.ransomwareDataExtortionDefense)
                                    ? form.ransomwareDataExtortionDefense
                                    : [form.ransomwareDataExtortionDefense].filter(Boolean)).map(v => {
                                      const labels = {
                                        'basic-backup': 'Basic Backup Only',
                                        'data-watermarking': 'Data Watermarking',
                                        'immutable-backups': 'Immutable Backups',
                                        'behavioural-detection': 'Behavioural Ransomware Detection',
                                        'incident-response-playbook': 'Incident Response (IR) Playbook',
                                        'air-gapped-tested': 'Air-Gapped + Tested Recovery',
                                        'offline-crypto-escrow': 'Offline Crypto Key Escrow',
                                        'forensic-readiness': 'Forensic Readiness',
                                        'cyber-insurance': 'Cyber Insurance Coverage',
                                        'negotiation-support': 'Ransomware Negotiation Support',
                                        'legal-privacy-consultation': 'Legal & Privacy Consultation',
                                        'comprehensive-ir': 'Comprehensive Incident Response (IR) + Negotiation Plan'
                                      };
                                      return { value: v, label: labels[v] || v };
                                    })}
                                  onChange={handleMultiSelectChange('ransomwareDataExtortionDefense')}
                                  styles={getSecurityStyles('ransomwareDataExtortionDefense')}
                                  className={getSecurityClassName('ransomwareDataExtortionDefense', form.ransomwareDataExtortionDefense)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">Critical for double-extortion (encrypt + leak) attacks. Test recovery drills quarterly. Refs: ACSC ransomware guidance, Essential Eight (backups), OAIC NDB for breach disclosure.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint"> <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Basic backup and recovery measures are recommended.'}
                                    {form.dataClassification === 'internal' && 'Immutable backups are recommended.'}
                                    {form.dataClassification === 'confidential' && 'Immutable backups with offline crypto key escrow are recommended.'}
                                    {form.dataClassification === 'restricted' && 'Comprehensive IR + negotiation plan with air-gapped tested recovery is recommended.'}
                                  </small>
                                )}
                                <FieldWarning fieldName="ransomwareDataExtortionDefense" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Deception Technologies (Honeytokens for Data):</label>
                              </td>
                              <td>
                                <select
                                  id="deceptionTechnologiesData"
                                  name="deceptionTechnologiesData"
                                  value={form.deceptionTechnologiesData}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('deceptionTechnologiesData') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select deception maturity...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'deceptionTechnologiesData', form.dataClassification)}>None</option>
                                  <option value="basic-honeypots" className={getOptionSecurityClass('basic-honeypots', 'deceptionTechnologiesData', form.dataClassification)}>Basic Honeypots</option>
                                  <option value="honeyfiles-tokens" className={getOptionSecurityClass('honeyfiles-tokens', 'deceptionTechnologiesData', form.dataClassification)}>Honeyfiles/Honeytokens in Data Stores</option>
                                  <option value="network-deception" className={getOptionSecurityClass('network-deception', 'deceptionTechnologiesData', form.dataClassification)}>Network Deception (Honeynets)</option>
                                  <option value="deceptive-credentials" className={getOptionSecurityClass('deceptive-credentials', 'deceptionTechnologiesData', form.dataClassification)}>Deceptive Credentials</option>
                                  <option value="adaptive-deception" className={getOptionSecurityClass('adaptive-deception', 'deceptionTechnologiesData', form.dataClassification)}>Adaptive Deception Techniques</option>
                                  <option value="full-deception-fabric" className={getOptionSecurityClass('full-deception-fabric', 'deceptionTechnologiesData', form.dataClassification)}>Full Deception Fabric</option>
                                </select>
                                <small className="dc-field-hint">Early warning for lateral movement/data theft; minimal false positives. Deploy honeytokens in databases, file shares, APIs. Refs: MITRE ATT&CK Technique T1565 (Data Manipulation detection).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint"> <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Basic honeypots deployed for early warning.'}
                                    {form.dataClassification === 'internal' && 'Basic honeypots with honeytokens and honeynets in internal data stores.'}
                                    {form.dataClassification === 'confidential' && 'Deceptive credentials and adaptive deception techniques deployed.'}
                                    {form.dataClassification === 'restricted' && 'Full deception fabric deployed for comprehensive coverage.'}
                                  </small>
                                )}
                                <FieldWarning fieldName="deceptionTechnologiesData" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Homomorphic/Confidential Computing:</label>
                              </td>
                              <td>
                                <select
                                  id="homomorphicConfidentialComputing"
                                  name="homomorphicConfidentialComputing"
                                  value={form.homomorphicConfidentialComputing}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('homomorphicConfidentialComputing') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select confidential computing level...</option>
                                  <option value="not-applicable" className={getOptionSecurityClass('not-applicable', 'homomorphicConfidentialComputing', form.dataClassification)}>Not Applicable</option>
                                  <option value="research-pilot" className={getOptionSecurityClass('research-pilot', 'homomorphicConfidentialComputing', form.dataClassification)}>Research/Pilot</option>
                                  <option value="production-specific" className={getOptionSecurityClass('production-specific', 'homomorphicConfidentialComputing', form.dataClassification)}>Production for Specific Workloads</option>
                                  <option value="tee-sgx-sev" className={getOptionSecurityClass('tee-sgx-sev', 'homomorphicConfidentialComputing', form.dataClassification)}>TEE (Intel SGX/AMD SEV/ARM TrustZone)</option>
                                  <option value="confidential-enclaves" className={getOptionSecurityClass('confidential-enclaves', 'homomorphicConfidentialComputing', form.dataClassification)}>Confidential Enclaves</option>
                                  <option value="secure-mpc" className={getOptionSecurityClass('secure-mpc', 'homomorphicConfidentialComputing', form.dataClassification)}>Secure Multi-Party Computation (MPC)</option>
                                  <option value="full-homomorphic" className={getOptionSecurityClass('full-homomorphic', 'homomorphicConfidentialComputing', form.dataClassification)}>Full Homomorphic Encryption</option>
                                  <option value="comprehensive-privacy-compute" className={getOptionSecurityClass('comprehensive-privacy-compute', 'homomorphicConfidentialComputing', form.dataClassification)}>Comprehensive Privacy-Preserving Computation</option>
                                </select>
                                <small className="dc-field-hint">Next-gen crypto for processing encrypted data without decryption. TEEs provide hardware-based isolation. Quantum-resistant potential. Refs: ISO/IEC 23894:2023 (emerging AI security), NIST IR 8309 (confidential computing).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint"> <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Public data encryption requirements are minimal, but encryption is recommended for sensitive public data.'}
                                    {form.dataClassification === 'internal' && 'Internal data should be encrypted at rest and in transit to prevent unauthorised access. Consider using internal workloads to build homomorphic/confidential computing capabilities.'}
                                    {form.dataClassification === 'confidential' && 'Confidential data requires strong encryption both at rest and in transit. Homomorphic and confidential computing can help process sensitive data securely without exposing it.'}
                                    {form.dataClassification === 'restricted' && 'Restricted data demands the highest level of encryption and security controls. Leveraging homomorphic and confidential computing ensures that sensitive operations can be performed securely, even in potentially untrusted environments.'}
                                  </small>
                                )}
                                <FieldWarning fieldName="homomorphicConfidentialComputing" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Secure Cryptographic Key Lifecycle (Pre/Post-Quantum):</label>
                              </td>
                              <td>
                                <Select
                                  id="cryptographicKeyLifecycle"
                                  name="cryptographicKeyLifecycle"
                                  isMulti
                                  options={[
                                    { value: 'software-keys', label: 'Software Keys Only' },
                                    { value: 'distributed-km', label: 'Distributed Key Management' },
                                    { value: 'automated-key-rotation', label: 'Automated Key Rotation & Revocation' },
                                    { value: 'crypto-shredding', label: 'Crypto-Shredding for Secure Deletion' },
                                    { value: 'hsm', label: 'Hardware Security Module (HSM)' },
                                    { value: 'qkd-prep', label: 'Quantum Key Distribution (QKD) Preparation' },
                                    { value: 'post-quantum-km', label: 'Post-Quantum Key Management Integration' },
                                    { value: 'end-to-end-quantum-safe', label: 'End-to-End Quantum-Safe Key Management' }
                                  ]}
                                  value={(Array.isArray(form.cryptographicKeyLifecycle)
                                    ? form.cryptographicKeyLifecycle
                                    : [form.cryptographicKeyLifecycle].filter(Boolean)).map(v => {
                                      const labels = {
                                        'software-keys': 'Software Keys Only',
                                        'distributed-km': 'Distributed Key Management',
                                        'automated-key-rotation': 'Automated Key Rotation & Revocation',
                                        'crypto-shredding': 'Crypto-Shredding for Secure Deletion',
                                        'hsm': 'Hardware Security Module (HSM)',
                                        'qkd-prep': 'Quantum Key Distribution (QKD) Preparation',
                                        'post-quantum-km': 'Post-Quantum Key Management Integration',
                                        'end-to-end-quantum-safe': 'End-to-End Quantum-Safe Key Management'
                                      };
                                      return { value: v, label: labels[v] || v };
                                    })}
                                  onChange={handleMultiSelectChange('cryptographicKeyLifecycle')}
                                  styles={getSecurityStyles('cryptographicKeyLifecycle')}
                                  className={getSecurityClassName('cryptographicKeyLifecycle', form.cryptographicKeyLifecycle)}
                                  classNamePrefix="dc-select"
                                  placeholder="Select one or more..."
                                />
                                <small className="dc-field-hint">Bridge current and post-quantum key management. Critical for long-term data confidentiality (harvest-now-decrypt-later threats). Refs: NIST SP 800-57 (Key Management), ASD ISM crypto guidance.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint"> <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Acceptable to use traditional software keys for public data'}
                                    {form.dataClassification === 'internal' && 'Use a distributed key management approach with automated key rotation for internal data'}
                                    {form.dataClassification === 'confidential' && 'Implement strict key management policies, including hardware security modules (HSMs) and regular key rotation for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Adopt post quantum key management and advanced cryptographic controls for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="cryptographicKeyLifecycle" />
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
                              <td colSpan="2"><small className="dc-field-hint">Ensure that you have a defined process managing the data access lifecycle; this includes data discovery, classification, access requests and approvals, monitoring, and recertification of access. Access is a tension between productivity enablement and security, organisational capabilities / maturity and effort, efficiency and compliance, benefits and risks.</small></td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Access Governance:</label>
                              </td>
                              <td>
                                <select
                                  id="dataAccessGovernance"
                                  name="dataAccessGovernance"
                                  value={form.dataAccessGovernance}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataAccessGovernance') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select governance model...</option>
                                  <option value="self-service-governed" className={getOptionSecurityClass('self-service-governed', 'dataAccessGovernance', form.dataClassification)}>Self-Service with Governance</option>
                                  <option value="centralised-control" className={getOptionSecurityClass('centralised-control', 'dataAccessGovernance', form.dataClassification)}>Centralised Data Control</option>
                                  <option value="federated-governance" className={getOptionSecurityClass('federated-governance', 'dataAccessGovernance', form.dataClassification)}>Federated Data Governance</option>
                                  <option value="data-mesh" className={getOptionSecurityClass('data-mesh', 'dataAccessGovernance', form.dataClassification)}>Data Mesh Architecture</option>
                                  <option value="risk-based-access" className={getOptionSecurityClass('risk-based-access', 'dataAccessGovernance', form.dataClassification)}>Risk-Based Access Control</option>
                                  <option value="adaptive-governance" className={getOptionSecurityClass('adaptive-governance', 'dataAccessGovernance', form.dataClassification)}>Adaptive Data Governance</option>
                                </select>
                                <small className="dc-field-hint">Model for governing data access and usage. Balance centralised control vs. federated/mesh architectures. Data mesh treats data as products with domain ownership. Refs: DAMA-DMBOK (Data Governance), ISO/IEC 38500 (IT Governance), ISO/IEC 27001 A.5 (Information Security Policies).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint"> <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Self-Service with Governance'}
                                    {form.dataClassification === 'internal' && 'Centralised Data Control'}
                                    {form.dataClassification === 'confidential' && 'Federated Data Governance'}
                                    {form.dataClassification === 'restricted' && 'Data Mesh Architecture'}
                                  </small>
                                )}  
                                <FieldWarning fieldName="dataAccessGovernance" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('selfServiceDataAccess') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select self-service approach...</option>
                                  <option value="no-self-service" className={getOptionSecurityClass('no-self-service', 'selfServiceDataAccess', form.dataClassification)}>No Self-Service Access</option>
                                  <option value="limited-self-service" className={getOptionSecurityClass('limited-self-service', 'selfServiceDataAccess', form.dataClassification)}>Limited Self-Service Catalogs</option>
                                  <option value="guided-self-service" className={getOptionSecurityClass('guided-self-service', 'selfServiceDataAccess', form.dataClassification)}>Guided Self-Service Platform</option>
                                  <option value="automated-provisioning" className={getOptionSecurityClass('automated-provisioning', 'selfServiceDataAccess', form.dataClassification)}>Automated Access Provisioning</option>
                                  <option value="ai-assisted-access" className={getOptionSecurityClass('ai-assisted-access', 'selfServiceDataAccess', form.dataClassification)}>AI-Assisted Data Discovery</option>
                                  <option value="full-democratisation" className={getOptionSecurityClass('full-democratisation', 'selfServiceDataAccess', form.dataClassification)}>Full Data Democratisation</option>
                                </select>
                                <small className="dc-field-hint">Approach to enabling self-service data access with guardrails. Empower users while maintaining governance and security. Reduces bottlenecks and increases business agility. Refs: ISO/IEC 27001 A.9.1.2 (Access to networks/services), NIST SP 800-53 AC-3 (Access Enforcement), APRA CPS 234 (information asset access).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint"> <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'No self-service access is typically required for public data.'}
                                    {form.dataClassification === 'internal' && 'Limited self-service access may be appropriate for internal data, balancing ease of access with governance.'}
                                    {form.dataClassification === 'confidential' && 'Automated access provisioning is recommended for confidential data to ensure proper governance while enabling efficient access.'}
                                    {form.dataClassification === 'restricted' && 'Full democratisation of data access with AI assistance and guardrails is recommended for restricted data, ensuring maximum flexibility while maintaining strict governance and security.'}
                                  </small> 
                                )}
                                <FieldWarning fieldName="selfServiceDataAccess" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataAccessBalancing') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select balancing strategy...</option>
                                  <option value="business-value" className={getOptionSecurityClass('business-value', 'dataAccessBalancing', form.dataClassification)}>Business Value Optimisation</option>
                                  <option value="risk-reward" className={getOptionSecurityClass('risk-reward', 'dataAccessBalancing', form.dataClassification)}>Risk-Reward Balancing</option>
                                  <option value="dynamic-balancing" className={getOptionSecurityClass('dynamic-balancing', 'dataAccessBalancing', form.dataClassification)}>Dynamic Access Balancing</option>
                                  <option value="context-aware" className={getOptionSecurityClass('context-aware', 'dataAccessBalancing', form.dataClassification)}>Context-Aware Access Control</option>
                                  <option value="security-first" className={getOptionSecurityClass('security-first', 'dataAccessBalancing', form.dataClassification)}>Security-First Approach</option>
                                  <option value="zero-trust-access" className={getOptionSecurityClass('zero-trust-access', 'dataAccessBalancing', form.dataClassification)}>Zero Trust Data Access</option>
                                </select>
                                <small className="dc-field-hint">Strategy for balancing data access and security based on risk, context, and business value. Zero trust assumes breach and verifies continuously. Refs: NIST SP 800-207 (Zero Trust Architecture), ISO/IEC 27005 (Information Security Risk Management), ASD Essential Eight (user application hardening).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint"> <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Business Value Optimisation'}
                                    {form.dataClassification === 'internal' && 'Risk-Reward Balancing'}
                                    {form.dataClassification === 'confidential' && 'Dynamic Access Balancing'}
                                    {form.dataClassification === 'restricted' && 'Context-Aware Access Control'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataAccessBalancing" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataLiteracyPrograms') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select literacy approach...</option>
                                  <option value="no-formal-program" className={getOptionSecurityClass('no-formal-program', 'dataLiteracyPrograms', form.dataClassification)}>No Formal Program</option>
                                  <option value="basic-training" className={getOptionSecurityClass('basic-training', 'dataLiteracyPrograms', form.dataClassification)}>Basic Data Training</option>
                                  <option value="role-based-training" className={getOptionSecurityClass('role-based-training', 'dataLiteracyPrograms', form.dataClassification)}>Role-Based Data Training</option>
                                  <option value="continuous-education" className={getOptionSecurityClass('continuous-education', 'dataLiteracyPrograms', form.dataClassification)}>Continuous Data Education</option>
                                  <option value="data-culture" className={getOptionSecurityClass('data-culture', 'dataLiteracyPrograms', form.dataClassification)}>Data-Driven Culture Program</option>
                                  <option value="data-champions" className={getOptionSecurityClass('data-champions', 'dataLiteracyPrograms', form.dataClassification)}>Data Champions Initiative</option>
                                  <option value="comprehensive-literacy" className={getOptionSecurityClass('comprehensive-literacy', 'dataLiteracyPrograms', form.dataClassification)}>Comprehensive Literacy Program</option>
                                </select>
                                <small className="dc-field-hint">Programs aimed at improving data literacy across the organisation. Empowers users to understand, interpret, and use data responsibly. Supports data-driven decision making and reduces misuse risks. Refs: DAMA-DMBOK (Data Stewardship), ISO/IEC 27001 A.7.2.2 (Information security awareness/training), Privacy Act APP 1 (staff training).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint"> <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'No formal program required'}
                                    {form.dataClassification === 'internal' && 'Basic data training recommended'}
                                    {form.dataClassification === 'confidential' && 'Role-based data training recommended'}
                                    {form.dataClassification === 'restricted' && 'Comprehensive literacy program recommended'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataLiteracyPrograms" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('controlledDataSharing') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select sharing approach...</option>
                                  <option value="no-external-sharing" className={getOptionSecurityClass('no-external-sharing', 'controlledDataSharing', form.dataClassification)}>No External Data Sharing</option>
                                  <option value="manual-approval" className={getOptionSecurityClass('manual-approval', 'controlledDataSharing', form.dataClassification)}>Manual Approval Process</option>
                                  <option value="api-controlled" className={getOptionSecurityClass('api-controlled', 'controlledDataSharing', form.dataClassification)}>API-Controlled Data Sharing</option>
                                  <option value="automated-governance" className={getOptionSecurityClass('automated-governance', 'controlledDataSharing', form.dataClassification)}>Automated Sharing Governance</option>
                                  <option value="federated-sharing" className={getOptionSecurityClass('federated-sharing', 'controlledDataSharing', form.dataClassification)}>Federated Data Sharing</option>
                                  <option value="privacy-preserving" className={getOptionSecurityClass('privacy-preserving', 'controlledDataSharing', form.dataClassification)}>Privacy-Preserving Data Sharing</option>
                                </select>
                                <small className="dc-field-hint">Approach for sharing data internally and externally while protecting privacy. Privacy-preserving techniques include differential privacy, secure multi-party computation, federated learning. Refs: Privacy Act APP 6 (Use/Disclosure), GDPR Article 5(1)(b) (Purpose Limitation), ISO/IEC 20889 (Privacy Enhancing Techniques), ISO/IEC 27018 (PII in public clouds).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint"> <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Manual approval process recommended'}
                                    {form.dataClassification === 'internal' && 'Manual approval process recommended, API-controlled data sharing preferred.'}
                                    {form.dataClassification === 'confidential' && 'API-controlled data sharing recommended, automated governance preferred.'}
                                    {form.dataClassification === 'restricted' && 'Automated governance and privacy-preserving data sharing recommended.'}
                                  </small>
                                )}
                                <FieldWarning fieldName="controlledDataSharing" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Catalog & Discovery Maturity:</label>
                              </td>
                              <td>
                                <select
                                  id="dataCatalogDiscovery"
                                  name="dataCatalogDiscovery"
                                  value={form.dataCatalogDiscovery}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataCatalogDiscovery') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select catalog maturity...</option>
                                  <option value="no-catalog" className={getOptionSecurityClass('no-catalog', 'dataCatalogDiscovery', form.dataClassification)}>No Catalog</option>
                                  <option value="manual-documentation" className={getOptionSecurityClass('manual-documentation', 'dataCatalogDiscovery', form.dataClassification)}>Manual Documentation</option>
                                  <option value="basic-metadata-catalog" className={getOptionSecurityClass('basic-metadata-catalog', 'dataCatalogDiscovery', form.dataClassification)}>Basic Metadata Catalog</option>
                                  <option value="automated-discovery-glossary" className={getOptionSecurityClass('automated-discovery-glossary', 'dataCatalogDiscovery', form.dataClassification)}>Automated Discovery + Business Glossary</option>
                                  <option value="ai-semantic-search" className={getOptionSecurityClass('ai-semantic-search', 'dataCatalogDiscovery', form.dataClassification)}>AI-Powered Semantic Search</option>
                                  <option value="unified-data-fabric" className={getOptionSecurityClass('unified-data-fabric', 'dataCatalogDiscovery', form.dataClassification)}>Unified Data Fabric</option>
                                  <option value="automated-lineage" className={getOptionSecurityClass('automated-lineage', 'dataCatalogDiscovery', form.dataClassification)}>Automated Data Lineage</option>
                                </select>
                                <small className="dc-field-hint">How users discover and understand available data assets. Enable self-service by making data findable. Refs: ISO/IEC 11179 (Metadata Registries), DAMA-DMBOK, DCAM (Data Management Capability Assessment).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint"> <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Manual Documentation is recommended for public data.'}
                                    {form.dataClassification === 'internal' && 'Basic Metadata Catalog is recommended for internal data.'}
                                    {form.dataClassification === 'confidential' && 'Automated Discovery + Business Glossary is recommended for confidential data.'}
                                    {form.dataClassification === 'restricted' && 'AI-Powered Semantic Search or Unified Data Fabric is recommended for restricted data.'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataCatalogDiscovery" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Dynamic Data Masking / Anonymisation for Self-Service:</label>
                              </td>
                              <td>
                                <select
                                  id="dynamicDataMaskingSelfService"
                                  name="dynamicDataMaskingSelfService"
                                  value={form.dynamicDataMaskingSelfService}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dynamicDataMaskingSelfService') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select masking approach...</option>
                                  <option value="no-masking" className={getOptionSecurityClass('no-masking', 'dynamicDataMaskingSelfService', form.dataClassification)}>No Masking</option>
                                  <option value="static-masking" className={getOptionSecurityClass('static-masking', 'dynamicDataMaskingSelfService', form.dataClassification)}>Static Masking (Pre-Production)</option>
                                  <option value="role-based-masking" className={getOptionSecurityClass('role-based-masking', 'dynamicDataMaskingSelfService', form.dataClassification)}>Role-Based Masking</option>
                                  <option value="context-aware-masking" className={getOptionSecurityClass('context-aware-masking', 'dynamicDataMaskingSelfService', form.dataClassification)}>Context-Aware Masking</option>
                                  <option value="dynamic-field-masking" className={getOptionSecurityClass('dynamic-field-masking', 'dynamicDataMaskingSelfService', form.dataClassification)}>Dynamic Field-Level Masking</option>
                                  <option value="differential-privacy" className={getOptionSecurityClass('differential-privacy', 'dynamicDataMaskingSelfService', form.dataClassification)}>Differential Privacy</option>
                                  <option value="synthetic-data-generation" className={getOptionSecurityClass('synthetic-data-generation', 'dynamicDataMaskingSelfService', form.dataClassification)}>Synthetic Data Generation</option>
                                </select>
                                <small className="dc-field-hint">Enable broad access while protecting sensitive data. Balance democratisation with privacy. Refs: ISO/IEC 20889 (Privacy Enhancing Techniques), OAIC De-identification Guide, GDPR Article 32 (Pseudonymisation).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint"> <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Static masking is recommended for public data.'}
                                    {form.dataClassification === 'internal' && 'Role-based masking is recommended for internal data.'}
                                    {form.dataClassification === 'confidential' && 'Context-aware masking is recommended for confidential data.'}
                                    {form.dataClassification === 'restricted' && 'Dynamic field-level masking is recommended for restricted data.'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dynamicDataMaskingSelfService" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Access Request & Approval Workflow:</label>
                              </td>
                              <td>
                                <select
                                  id="dataAccessRequestWorkflow"
                                  name="dataAccessRequestWorkflow"
                                  value={form.dataAccessRequestWorkflow}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataAccessRequestWorkflow') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select workflow maturity...</option>
                                  <option value="email-requests" className={getOptionSecurityClass('email-requests', 'dataAccessRequestWorkflow', form.dataClassification)}>Email-Based Requests</option>
                                  <option value="ticketing-system" className={getOptionSecurityClass('ticketing-system', 'dataAccessRequestWorkflow', form.dataClassification)}>Ticketing System</option>
                                  <option value="self-service-portal" className={getOptionSecurityClass('self-service-portal', 'dataAccessRequestWorkflow', form.dataClassification)}>Self-Service Portal</option>
                                  <option value="jit-access-provisioning" className={getOptionSecurityClass('jit-access-provisioning', 'dataAccessRequestWorkflow', form.dataClassification)}>Just-In-Time Access Provisioning</option>
                                  <option value="risk-based-auto-approval" className={getOptionSecurityClass('risk-based-auto-approval', 'dataAccessRequestWorkflow', form.dataClassification)}>Automated Risk-Based Approval</option>
                                  <option value="continuous-certification" className={getOptionSecurityClass('continuous-certification', 'dataAccessRequestWorkflow', form.dataClassification)}>Continuous Access Certification</option>
                                </select>
                                <small className="dc-field-hint">Streamline and govern access requests with automation and risk-based decisions. Reduce time-to-access while maintaining security. Refs: ISO/IEC 27001 A.9.2.1, NIST SP 800-53 AC-2 (Account Management).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint"> <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Email-Based Requests'}
                                    {form.dataClassification === 'internal' && 'Ticketing System'}
                                    {form.dataClassification === 'confidential' && 'Self-Service Portal'}
                                    {form.dataClassification === 'restricted' && 'Just-In-Time Access Provisioning'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataAccessRequestWorkflow" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Usage Analytics & Monitoring:</label>
                              </td>
                              <td>
                                <select
                                  id="dataUsageAnalytics"
                                  name="dataUsageAnalytics"
                                  value={form.dataUsageAnalytics}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataUsageAnalytics') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select analytics maturity...</option>
                                  <option value="no-tracking" className={getOptionSecurityClass('no-tracking', 'dataUsageAnalytics', form.dataClassification)}>No Usage Tracking</option>
                                  <option value="basic-access-logs" className={getOptionSecurityClass('basic-access-logs', 'dataUsageAnalytics', form.dataClassification)}>Basic Access Logs</option>
                                  <option value="usage-metrics" className={getOptionSecurityClass('usage-metrics', 'dataUsageAnalytics', form.dataClassification)}>Usage Metrics</option>
                                  <option value="role-based-analytics" className={getOptionSecurityClass('role-based-analytics', 'dataUsageAnalytics', form.dataClassification)}>Role-Based Usage Analytics</option>
                                  <option value="usage-dashboards" className={getOptionSecurityClass('usage-dashboards', 'dataUsageAnalytics', form.dataClassification)}>Usage Dashboards</option>
                                  <option value="user-behaviour-analytics" className={getOptionSecurityClass('user-behaviour-analytics', 'dataUsageAnalytics', form.dataClassification)}>User Behaviour Analytics</option>
                                  <option value="anomaly-detection" className={getOptionSecurityClass('anomaly-detection', 'dataUsageAnalytics', form.dataClassification)}>Anomaly Detection</option>
                                  <option value="purpose-based-monitoring" className={getOptionSecurityClass('purpose-based-monitoring', 'dataUsageAnalytics', form.dataClassification)}>Purpose-Based Usage Monitoring</option>
                                  <option value="ai-usage-insights" className={getOptionSecurityClass('ai-usage-insights', 'dataUsageAnalytics', form.dataClassification)}>AI-Powered Usage Insights</option>
                                </select>
                                <small className="dc-field-hint">Understand who uses what data, detect anomalies, optimise access, and demonstrate accountability. Refs: GDPR Article 5(2) (Accountability), ISO/IEC 27001 A.12.4 (Logging and Monitoring), Privacy Act APP 1 (accountability).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint"> <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Basic usage tracking and analytics are recommended for public data.'}
                                    {form.dataClassification === 'internal' && 'Internal data should have detailed usage tracking and analytics to ensure proper access and accountability.'}
                                    {form.dataClassification === 'confidential' && 'Confidential data requires comprehensive usage and behavioural analytics to monitor access and detect anomalies.'}
                                    {form.dataClassification === 'restricted' && 'Restricted data demands the highest level of usage monitoring and analytics to ensure security and compliance.'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataUsageAnalytics" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Entitlement & Attribution Model:</label>
                              </td>
                              <td>
                                <select
                                  id="dataEntitlementModel"
                                  name="dataEntitlementModel"
                                  value={form.dataEntitlementModel}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataEntitlementModel') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select entitlement model...</option>
                                  <option value="no-attribution" className={getOptionSecurityClass('no-attribution', 'dataEntitlementModel', form.dataClassification)}>No Attribution (Owner-Only)</option>
                                  <option value="rbac" className={getOptionSecurityClass('rbac', 'dataEntitlementModel', form.dataClassification)}>RBAC (Role-Based Access Control)</option>
                                  <option value="abac" className={getOptionSecurityClass('abac', 'dataEntitlementModel', form.dataClassification)}>ABAC (Attribute-Based Access Control)</option>
                                  <option value="rebac" className={getOptionSecurityClass('rebac', 'dataEntitlementModel', form.dataClassification)}>ReBAC (Relationship-Based Access Control)</option>
                                  <option value="dynamic-context-aware" className={getOptionSecurityClass('dynamic-context-aware', 'dataEntitlementModel', form.dataClassification)}>Dynamic Context-Aware Entitlements</option>
                                  <option value="policy-based-automation" className={getOptionSecurityClass('policy-based-automation', 'dataEntitlementModel', form.dataClassification)}>Policy-Based Automation (OPA/Cedar)</option>
                                  <option value="zero-trust-entitlements" className={getOptionSecurityClass('zero-trust-entitlements', 'dataEntitlementModel', form.dataClassification)}>Zero Trust Entitlements</option>
                                </select>
                                <small className="dc-field-hint">Define who can access what based on roles, attributes, relationships, and context. Evolution: RBAC → ABAC → ReBAC. Refs: NIST SP 800-162 (ABAC), ISO/IEC 10181-3 (Access Control Framework).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint"> <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Requires minimal access control, typically RBAC is sufficient.'}
                                    {form.dataClassification === 'internal' && 'Requires moderate access control, consider RBAC or ABAC.'}
                                    {form.dataClassification === 'confidential' && 'Requires strict access control, ABAC or ReBAC recommended.'}
                                    {form.dataClassification === 'restricted' && 'Requires the highest level of access control, consider dynamic context-aware entitlements.'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataEntitlementModel" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Access Recertification & Review:</label>
                              </td>
                              <td>
                                <select
                                  id="dataAccessRecertification"
                                  name="dataAccessRecertification"
                                  value={form.dataAccessRecertification}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataAccessRecertification') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select recertification approach...</option>
                                  <option value="no-recertification" className={getOptionSecurityClass('no-recertification', 'dataAccessRecertification', form.dataClassification)}>No Recertification</option>
                                  <option value="annual-recertification" className={getOptionSecurityClass('annual-recertification', 'dataAccessRecertification', form.dataClassification)}>Annual Recertification</option>
                                  <option value="quarterly-recertification" className={getOptionSecurityClass('quarterly-recertification', 'dataAccessRecertification', form.dataClassification)}>Quarterly Recertification</option>
                                  <option value="role-based-recertification" className={getOptionSecurityClass('role-based-recertification', 'dataAccessRecertification', form.dataClassification)}>Role-Based Recertification</option>
                                  <option value="usage-based-recertification" className={getOptionSecurityClass('usage-based-recertification', 'dataAccessRecertification', form.dataClassification)}>Usage-Based Recertification</option>
                                  <option value="manager-attestation" className={getOptionSecurityClass('manager-attestation', 'dataAccessRecertification', form.dataClassification)}>Manager Attestation Workflows</option>
                                  <option value="risk-based-recertification" className={getOptionSecurityClass('risk-based-recertification', 'dataAccessRecertification', form.dataClassification)}>Risk-Based Dynamic Recertification</option>
                                  <option value="continuous-certification" className={getOptionSecurityClass('continuous-certification', 'dataAccessRecertification', form.dataClassification)}>Automated Continuous Certification</option>
                                </select>
                                <small className="dc-field-hint">Ensure access remains appropriate over time (least privilege). Detect and remediate access creep. Refs: ISO/IEC 27001 A.9.2.5 (User Access Reviews), SOC 2 (Logical Access), APRA CPS 234 Section 34-35.</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint"> <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Annual Recertification is recommended.'}
                                    {form.dataClassification === 'internal' && 'Quarterly or role-based recertification is recommended.'}
                                    {form.dataClassification === 'confidential' && 'Role-based or usage-based recertification is recommended.'}
                                    {form.dataClassification === 'restricted' && 'Continuous certification is recommended.'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataAccessRecertification" />
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
                              <td colSpan="2"><small className="dc-field-hint">Data security and automation are critical for protecting sensitive information and ensuring compliance. Implementing robust discovery, classification, and access controls helps mitigate risks and streamline data management processes.</small></td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Discovery & Automation:</label>
                              </td>
                              <td>
                                <select
                                  id="dataDiscoveryAutomation"
                                  name="dataDiscoveryAutomation"
                                  value={form.dataDiscoveryAutomation}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataDiscoveryAutomation') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select data discovery approach...</option>
                                  <option value="manual-inventory" className={getOptionSecurityClass('manual-inventory', 'dataDiscoveryAutomation', form.dataClassification)}>Manual Data Inventory</option>
                                  <option value="automated-scanning" className={getOptionSecurityClass('automated-scanning', 'dataDiscoveryAutomation', form.dataClassification)}>Automated Data Scanning</option>
                                  <option value="ml-based-discovery" className={getOptionSecurityClass('ml-based-discovery', 'dataDiscoveryAutomation', form.dataClassification)}>ML-Based Data Discovery</option>
                                  <option value="continuous-discovery" className={getOptionSecurityClass('continuous-discovery', 'dataDiscoveryAutomation', form.dataClassification)}>Continuous Data Discovery</option>
                                  <option value="cross-platform-discovery" className={getOptionSecurityClass('cross-platform-discovery', 'dataDiscoveryAutomation', form.dataClassification)}>Cross-Platform Discovery</option>
                                  <option value="real-time-classification" className={getOptionSecurityClass('real-time-classification', 'dataDiscoveryAutomation', form.dataClassification)}>Real-Time Classification</option>
                                  <option value="hybrid-discovery" className={getOptionSecurityClass('hybrid-discovery', 'dataDiscoveryAutomation', form.dataClassification)}>Hybrid Discovery Approach</option>
                                </select>
                                <small className="dc-field-hint">Approach required for discovering data across multiple environments (on-prem, cloud, SaaS). Automated discovery reduces shadow data and unknown data sprawl. Refs: Gartner DSPM, ISO/IEC 27001 A.8.1 (Asset Inventory), NIST CSF PR.DS-1 (Data-at-rest protection).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Manual inventory or scheduled automated scanning acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'Automated scanning recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'ML-based or continuous discovery recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Cross-platform discovery with real-time classification required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataDiscoveryAutomation" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('sensitiveDataScanning') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select scanning approach...</option>
                                  <option value="periodic-scans" className={getOptionSecurityClass('periodic-scans', 'sensitiveDataScanning', form.dataClassification)}>Periodic Manual Scans</option>
                                  <option value="scheduled-automated" className={getOptionSecurityClass('scheduled-automated', 'sensitiveDataScanning', form.dataClassification)}>Scheduled Automated Scans</option>
                                  <option value="continuous-scanning" className={getOptionSecurityClass('continuous-scanning', 'sensitiveDataScanning', form.dataClassification)}>Continuous Data Scanning</option>
                                  <option value="cross-repository" className={getOptionSecurityClass('cross-repository', 'sensitiveDataScanning', form.dataClassification)}>Cross-Repository Scanning</option>
                                  <option value="intelligent-scanning" className={getOptionSecurityClass('intelligent-scanning', 'sensitiveDataScanning', form.dataClassification)}>Intelligent Content Scanning</option>
                                  <option value="compliance-scanning" className={getOptionSecurityClass('compliance-scanning', 'sensitiveDataScanning', form.dataClassification)}>Compliance-Driven Scanning</option>
                                </select>
                                <small className="dc-field-hint">Approach required for scanning data for sensitive content (PII, PHI, PCI, credentials, secrets). Use pattern matching, ML, NLP to detect sensitive data in structured/unstructured sources. Refs: Privacy Act APP 11 (Security), GDPR Article 32 (Security), ISO/IEC 27002 A.8.11 (Data Masking).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Periodic scans acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'Scheduled automated scanning recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'Continuous cross repository scanning recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Compliance and intelligent cross-repository scanning required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="sensitiveDataScanning" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('contentBasedClassification') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select classification method...</option>
                                  <option value="manual-tagging" className={getOptionSecurityClass('manual-tagging', 'contentBasedClassification', form.dataClassification)}>Manual Tagging</option>
                                  <option value="user-driven" className={getOptionSecurityClass('user-driven', 'contentBasedClassification', form.dataClassification)}>User-Driven Classification</option>
                                  <option value="keyword-based" className={getOptionSecurityClass('keyword-based', 'contentBasedClassification', form.dataClassification)}>Keyword-Based Classification</option>
                                  <option value="metadata-driven" className={getOptionSecurityClass('metadata-driven', 'contentBasedClassification', form.dataClassification)}>Metadata-Driven Classification</option>
                                  <option value="rule-based" className={getOptionSecurityClass('rule-based', 'contentBasedClassification', form.dataClassification)}>Rule-Based Classification</option>
                                  <option value="pattern-matching" className={getOptionSecurityClass('pattern-matching', 'contentBasedClassification', form.dataClassification)}>Pattern Matching</option>
                                  <option value="regex-classification" className={getOptionSecurityClass('regex-classification', 'contentBasedClassification', form.dataClassification)}>Regex-Based Classification</option>
                                  <option value="ml-classification" className={getOptionSecurityClass('ml-classification', 'contentBasedClassification', form.dataClassification)}>Machine Learning Classification</option>
                                  <option value="ai-powered-classification" className={getOptionSecurityClass('ai-powered-classification', 'contentBasedClassification', form.dataClassification)}>AI-Powered Classification</option>
                                  <option value="semantic-analysis" className={getOptionSecurityClass('semantic-analysis', 'contentBasedClassification', form.dataClassification)}>Semantic Analysis</option>
                                  <option value="contextual-classification" className={getOptionSecurityClass('contextual-classification', 'contentBasedClassification', form.dataClassification)}>Contextual Classification</option>
                                </select>
                                <small className="dc-field-hint">Method used for classifying content based on context, semantics, and sensitivity. Automated classification reduces human error and scales across large datasets. Refs: ISO/IEC 27001 A.8.2 (Information Classification), ASD ISM (Information Classification), PSPF (Sensitive & classified information).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'User driven manual tagging acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'Rule and keyword based metadata driven classification acceptable'}
                                    {form.dataClassification === 'confidential' && 'Pattern matching with regex and ML/AI classification recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'AI-powered contextual/semantic classification required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="contentBasedClassification" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Security Posture Management (DSPM):</label>
                              </td>
                              <td>
                                <select
                                  id="dataSecurityPostureManagement"
                                  name="dataSecurityPostureManagement"
                                  value={form.dataSecurityPostureManagement}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataSecurityPostureManagement') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select DSPM maturity...</option>
                                  <option value="no-dspm" className={getOptionSecurityClass('no-dspm', 'dataSecurityPostureManagement', form.dataClassification)}>No DSPM</option>
                                  <option value="manual-inventories" className={getOptionSecurityClass('manual-inventories', 'dataSecurityPostureManagement', form.dataClassification)}>Manual Data Inventories</option>
                                  <option value="dspm-discovery" className={getOptionSecurityClass('dspm-discovery', 'dataSecurityPostureManagement', form.dataClassification)}>DSPM Tool (Discovery Only)</option>
                                  <option value="dspm-risk-scoring" className={getOptionSecurityClass('dspm-risk-scoring', 'dataSecurityPostureManagement', form.dataClassification)}>DSPM + Risk Scoring</option>
                                  <option value="dspm-auto-remediation" className={getOptionSecurityClass('dspm-auto-remediation', 'dataSecurityPostureManagement', form.dataClassification)}>DSPM + Auto-Remediation</option>
                                  <option value="cloud-native-dspm" className={getOptionSecurityClass('cloud-native-dspm', 'dataSecurityPostureManagement', form.dataClassification)}>Cloud-Native DSPM (Multi-Cloud)</option>
                                </select>
                                <small className="dc-field-hint">Continuous visibility into data location, classification, access, and security posture. DSPM provides holistic data risk assessment across clouds, on-prem, SaaS. Refs: Gartner DSPM category, ISO/IEC 27001 A.8.1 (Asset Inventory), NIST CSF Identify function, APRA CPS 234 (information asset identification).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Manual inventories acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'DSPM discovery recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'DSPM with risk scoring recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'DSPM with auto-remediation and multi-cloud coverage required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataSecurityPostureManagement" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Loss Prevention (DLP) Automation:</label>
                              </td>
                              <td>
                                <select
                                  id="dlpAutomation"
                                  name="dlpAutomation"
                                  value={form.dlpAutomation}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dlpAutomation') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select DLP maturity...</option>
                                  <option value="no-dlp" className={getOptionSecurityClass('no-dlp', 'dlpAutomation', form.dataClassification)}>No DLP</option>
                                  <option value="email-dlp" className={getOptionSecurityClass('email-dlp', 'dlpAutomation', form.dataClassification)}>Email DLP Only</option>
                                  <option value="endpoint-dlp" className={getOptionSecurityClass('endpoint-dlp', 'dlpAutomation', form.dataClassification)}>Endpoint DLP</option>
                                  <option value="network-dlp" className={getOptionSecurityClass('network-dlp', 'dlpAutomation', form.dataClassification)}>Network DLP</option>
                                  <option value="cloud-dlp" className={getOptionSecurityClass('cloud-dlp', 'dlpAutomation', form.dataClassification)}>Cloud DLP (SaaS/IaaS)</option>
                                  <option value="integrated-dlp" className={getOptionSecurityClass('integrated-dlp', 'dlpAutomation', form.dataClassification)}>Integrated DLP Suite</option>
                                  <option value="ai-contextual-dlp" className={getOptionSecurityClass('ai-contextual-dlp', 'dlpAutomation', form.dataClassification)}>AI-Powered DLP with Contextual Analysis</option>
                                </select>
                                <small className="dc-field-hint">Prevent unauthorised data exfiltration and enforce data handling policies. DLP monitors email, web, USB, cloud uploads, copy/paste. Refs: ISO/IEC 27002 A.8.8 (Information Leakage Prevention), NIST SP 800-53 SC-7 (Boundary Protection), Privacy Act APP 11 (Security safeguards).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Email or endpoint DLP optional for public data'}
                                    {form.dataClassification === 'internal' && 'Endpoint and network DLP recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'Integrated DLP suite recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'AI-powered contextual DLP required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dlpAutomation" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Labeling & Tagging Automation:</label>
                              </td>
                              <td>
                                <select
                                  id="dataLabelingTaggingAutomation"
                                  name="dataLabelingTaggingAutomation"
                                  value={form.dataLabelingTaggingAutomation}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataLabelingTaggingAutomation') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select labeling maturity...</option>
                                  <option value="manual-labeling" className={getOptionSecurityClass('manual-labeling', 'dataLabelingTaggingAutomation', form.dataClassification)}>Manual Labeling</option>
                                  <option value="user-prompted" className={getOptionSecurityClass('user-prompted', 'dataLabelingTaggingAutomation', form.dataClassification)}>User-Prompted Labeling</option>
                                  <option value="auto-suggested" className={getOptionSecurityClass('auto-suggested', 'dataLabelingTaggingAutomation', form.dataClassification)}>Auto-Suggested Labels</option>
                                  <option value="automated-ml" className={getOptionSecurityClass('automated-ml', 'dataLabelingTaggingAutomation', form.dataClassification)}>Automated ML Labeling</option>
                                  <option value="persistent-labels" className={getOptionSecurityClass('persistent-labels', 'dataLabelingTaggingAutomation', form.dataClassification)}>Persistent Classification Labels (Metadata)</option>
                                  <option value="real-time-contextual" className={getOptionSecurityClass('real-time-contextual', 'dataLabelingTaggingAutomation', form.dataClassification)}>Real-Time Contextual Labeling</option>
                                  <option value="cross-system-propagation" className={getOptionSecurityClass('cross-system-propagation', 'dataLabelingTaggingAutomation', form.dataClassification)}>Cross-System Label Propagation</option>
                                </select>
                                <small className="dc-field-hint">Ensure data is properly classified and labeled for security controls. Labels drive DLP, access controls, encryption, retention. Persistent metadata travels with data. Refs: ISO/IEC 27001 A.8.2 (Information Classification), ASD ISM (Marking), PSPF (Security Classification System).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Manual or user-prompted labeling acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'Auto-suggested labels recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'Automated ML with persistent labels recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Real-time contextual labeling with persistent metadata required for restricted data'}
                                  </small>
                                )}  
                                <FieldWarning fieldName="dataLabelingTaggingAutomation" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Rights & Policy Enforcement Automation:</label>
                              </td>
                              <td>
                                <select
                                  id="dataPolicyEnforcementAutomation"
                                  name="dataPolicyEnforcementAutomation"
                                  value={form.dataPolicyEnforcementAutomation}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataPolicyEnforcementAutomation') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select policy enforcement maturity...</option>
                                  <option value="manual-enforcement" className={getOptionSecurityClass('manual-enforcement', 'dataPolicyEnforcementAutomation', form.dataClassification)}>Manual Policy Enforcement</option>
                                  <option value="basic-policy-rules" className={getOptionSecurityClass('basic-policy-rules', 'dataPolicyEnforcementAutomation', form.dataClassification)}>Basic Policy Rules</option>
                                  <option value="abac-policy-engine" className={getOptionSecurityClass('abac-policy-engine', 'dataPolicyEnforcementAutomation', form.dataClassification)}>ABAC Policy Engine</option>
                                  <option value="real-time-pdp" className={getOptionSecurityClass('real-time-pdp', 'dataPolicyEnforcementAutomation', form.dataClassification)}>Real-Time Policy Decision Point (PDP)</option>
                                  <option value="ai-policy-recommendations" className={getOptionSecurityClass('ai-policy-recommendations', 'dataPolicyEnforcementAutomation', form.dataClassification)}>AI-Driven Policy Recommendations</option>
                                  <option value="self-healing-conflicts" className={getOptionSecurityClass('self-healing-conflicts', 'dataPolicyEnforcementAutomation', form.dataClassification)}>Self-Healing Policy Conflicts</option>
                                </select>
                                <small className="dc-field-hint">Automate enforcement of access policies, entitlements, and data governance rules. Policy engines evaluate attributes/context to make real-time access decisions. Refs: NIST SP 800-162 (ABAC), ISO/IEC 10181-3 (Access Control Framework), XACML (eXtensible Access Control Markup Language).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Basic policy rules acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'ABAC policy engine recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'Real-time PDP recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'AI-driven recommendations with self-healing required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataPolicyEnforcementAutomation" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Security Orchestration, Automation & Response (SOAR) for Data:</label>
                              </td>
                              <td>
                                <select
                                  id="soarDataIncidents"
                                  name="soarDataIncidents"
                                  value={form.soarDataIncidents}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('soarDataIncidents') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select SOAR maturity...</option>
                                  <option value="no-automation" className={getOptionSecurityClass('no-automation', 'soarDataIncidents', form.dataClassification)}>No Automation</option>
                                  <option value="basic-ticketing" className={getOptionSecurityClass('basic-ticketing', 'soarDataIncidents', form.dataClassification)}>Basic Incident Ticketing</option>
                                  <option value="playbook-response" className={getOptionSecurityClass('playbook-response', 'soarDataIncidents', form.dataClassification)}>Playbook-Based Response</option>
                                  <option value="semi-automated" className={getOptionSecurityClass('semi-automated', 'soarDataIncidents', form.dataClassification)}>Semi-Automated Workflows</option>
                                  <option value="full-soar" className={getOptionSecurityClass('full-soar', 'soarDataIncidents', form.dataClassification)}>Full SOAR Integration</option>
                                  <option value="ai-augmented" className={getOptionSecurityClass('ai-augmented', 'soarDataIncidents', form.dataClassification)}>AI-Augmented Response</option>
                                </select>
                                <small className="dc-field-hint">Automate security incident response workflows for data breaches, anomalies, and exfiltration attempts. SOAR reduces MTTD (Mean Time to Detect) and MTTR (Mean Time to Respond). Refs: NIST SP 800-61r2 (Incident Handling), ISO/IEC 27035 (Incident Management), OAIC NDB scheme (notification obligations).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Basic ticketing acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'Playbook-based response recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'Semi-automated workflows recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Full SOAR with AI-augmented response required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="soarDataIncidents" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Automated Compliance Reporting & Auditing:</label>
                              </td>
                              <td>
                                <select
                                  id="automatedComplianceReporting"
                                  name="automatedComplianceReporting"
                                  value={form.automatedComplianceReporting}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('automatedComplianceReporting') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select reporting maturity...</option>
                                  <option value="manual-reports" className={getOptionSecurityClass('manual-reports', 'automatedComplianceReporting', form.dataClassification)}>Manual Compliance Reports</option>
                                  <option value="scheduled-generation" className={getOptionSecurityClass('scheduled-generation', 'automatedComplianceReporting', form.dataClassification)}>Scheduled Report Generation</option>
                                  <option value="continuous-monitoring" className={getOptionSecurityClass('continuous-monitoring', 'automatedComplianceReporting', form.dataClassification)}>Continuous Compliance Monitoring</option>
                                  <option value="auto-audit-evidence" className={getOptionSecurityClass('auto-audit-evidence', 'automatedComplianceReporting', form.dataClassification)}>Auto-Generated Audit Evidence</option>
                                  <option value="real-time-dashboards" className={getOptionSecurityClass('real-time-dashboards', 'automatedComplianceReporting', form.dataClassification)}>Real-Time Compliance Dashboards</option>
                                  <option value="predictive-risk" className={getOptionSecurityClass('predictive-risk', 'automatedComplianceReporting', form.dataClassification)}>Predictive Compliance Risk</option>
                                </select>
                                <small className="dc-field-hint">Automate evidence collection and reporting for regulatory compliance (Privacy Act, GDPR, SOC 2, ISO 27001). Continuous monitoring detects drift and non-compliance in real-time. Refs: SOC 2 (Continuous Monitoring), ISO/IEC 27001 A.18.1 (Compliance), APRA CPS 234, GDPR Article 5(2) (Accountability).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Manual reporting acceptable for public data; scheduled report generation recommended.'}
                                    {form.dataClassification === 'internal' && 'Scheduled report generation acceptable for internal data, continuous monitoring recommended.'}
                                    {form.dataClassification === 'confidential' && 'Continuous monitoring and auto-generated evidence and dashboards recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Real-time dashboards and predictive risk analytics required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="automatedComplianceReporting" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Automated Data Lifecycle Management:</label>
                              </td>
                              <td>
                                <select
                                  id="automatedDataLifecycle"
                                  name="automatedDataLifecycle"
                                  value={form.automatedDataLifecycle}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('automatedDataLifecycle') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select lifecycle automation...</option>
                                  <option value="manual-lifecycle" className={getOptionSecurityClass('manual-lifecycle', 'automatedDataLifecycle', form.dataClassification)}>Manual Lifecycle Management</option>
                                  <option value="scheduled-archival" className={getOptionSecurityClass('scheduled-archival', 'automatedDataLifecycle', form.dataClassification)}>Scheduled Archival/Deletion</option>
                                  <option value="policy-based" className={getOptionSecurityClass('policy-based', 'automatedDataLifecycle', form.dataClassification)}>Policy-Based Retention</option>
                                  <option value="automated-ttl" className={getOptionSecurityClass('automated-ttl', 'automatedDataLifecycle', form.dataClassification)}>Automated TTL (Time-to-Live)</option>
                                  <option value="ml-optimisation" className={getOptionSecurityClass('ml-optimisation', 'automatedDataLifecycle', form.dataClassification)}>ML-Driven Lifecycle Optimisation</option>
                                  <option value="event-driven" className={getOptionSecurityClass('event-driven', 'automatedDataLifecycle', form.dataClassification)}>Event-Driven Lifecycle Triggers</option>
                                </select>
                                <small className="dc-field-hint">Automate retention, archival, and deletion based on policies and regulations. Reduces storage costs, litigation risk, and ensures compliance with data minimisation. Refs: Privacy Act APP 11.2 (Retention), GDPR Article 5(1)(e) (Storage Limitation), ISO/IEC 27001 A.8.3 (Media Handling), NARA (National Archives records management).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Manual lifecycle management acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'Scheduled archival/deletion recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'Policy-based retention with automated TTL and event-driven triggers recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'ML-driven lifecycle optimisation with event-driven triggers required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="automatedDataLifecycle" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">API Security & Data Flow Monitoring Automation:</label>
                              </td>
                              <td>
                                <select
                                  id="apiSecurityDataFlowMonitoring"
                                  name="apiSecurityDataFlowMonitoring"
                                  value={form.apiSecurityDataFlowMonitoring}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('apiSecurityDataFlowMonitoring') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select API security maturity...</option>
                                  <option value="no-monitoring" className={getOptionSecurityClass('no-monitoring', 'apiSecurityDataFlowMonitoring', form.dataClassification)}>No API Monitoring</option>
                                  <option value="gateway-logging" className={getOptionSecurityClass('gateway-logging', 'apiSecurityDataFlowMonitoring', form.dataClassification)}>API Gateway Logging</option>
                                  <option value="security-scanning" className={getOptionSecurityClass('security-scanning', 'apiSecurityDataFlowMonitoring', form.dataClassification)}>API Security Scanning</option>
                                  <option value="real-time-detection" className={getOptionSecurityClass('real-time-detection', 'apiSecurityDataFlowMonitoring', form.dataClassification)}>Real-Time API Threat Detection</option>
                                  <option value="data-leakage-prevention" className={getOptionSecurityClass('data-leakage-prevention', 'apiSecurityDataFlowMonitoring', form.dataClassification)}>API Data Leakage Prevention</option>
                                  <option value="behaviour-analytics" className={getOptionSecurityClass('behaviour-analytics', 'apiSecurityDataFlowMonitoring', form.dataClassification)}>API Behaviour Analytics</option>
                                </select>
                                <small className="dc-field-hint">Monitor and secure data flows through APIs, detect anomalies, shadow APIs, and excessive data exposure. APIs are a primary data exfiltration vector. Refs: OWASP API Security Top 10, ISO/IEC 27034 (Application Security), NIST SP 800-204 (Microservices Security), ASD ISM (Gateway protections).</small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'API gateway logging acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'API security scanning recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'Real-time API threat detection and data leakage prevention recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Real-time detection with behaviour analytics and data leakage prevention required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="apiSecurityDataFlowMonitoring" />
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
                              <td colSpan="2"><small className="dc-field-hint">Data governance ensures proper management, quality, and security of data across the organisation.</small></td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Lineage Tracking:</label>
                              </td>
                              <td>
                                <select
                                  id="dataLineageTracking"
                                  name="dataLineageTracking"
                                  value={form.dataLineageTracking}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataLineageTracking') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select lineage approach...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'dataLineageTracking', form.dataClassification)}>
                                    No Lineage Tracking
                                  </option>
                                  <option value="manual-documentation" className={getOptionSecurityClass('manual-documentation', 'dataLineageTracking', form.dataClassification)}>
                                    Manual Documentation
                                  </option>
                                  <option value="metadata-driven" className={getOptionSecurityClass('metadata-driven', 'dataLineageTracking', form.dataClassification)}>
                                    Metadata-Driven Lineage
                                  </option>
                                  <option value="automated-discovery" className={getOptionSecurityClass('automated-discovery', 'dataLineageTracking', form.dataClassification)}>
                                    Automated Discovery & Mapping
                                  </option>
                                  <option value="real-time-tracking" className={getOptionSecurityClass('real-time-tracking', 'dataLineageTracking', form.dataClassification)}>
                                    Real-time Lineage Tracking
                                  </option>
                                  <option value="end-to-end-visibility" className={getOptionSecurityClass('end-to-end-visibility', 'dataLineageTracking', form.dataClassification)}>
                                    End-to-End Data Visibility
                                  </option>
                                  <option value="impact-analysis" className={getOptionSecurityClass('impact-analysis', 'dataLineageTracking', form.dataClassification)}>
                                    Impact Analysis & Change Management
                                  </option>
                                </select>
                                <small className="dc-field-hint">
                                  Track data origins, transformations, and destinations across systems. Critical for impact analysis, regulatory compliance (GDPR Article 30), and understanding data dependencies. Refs: DAMA-DMBOK (Data Lineage), ISO/IEC 25012 (Data Quality), GDPR Article 30 (Records of Processing Activities), Privacy Act APP 1.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Manual documentation acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'Metadata-driven lineage recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'Automated discovery and real-time lineage tracking recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'End-to-end visibility with impact analysis required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataLineageTracking" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('recordPrimacyManagement') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select primacy approach...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'recordPrimacyManagement', form.dataClassification)}>
                                    No Primacy Management
                                  </option>
                                  <option value="source-system-priority" className={getOptionSecurityClass('source-system-priority', 'recordPrimacyManagement', form.dataClassification)}>
                                    Source System Priority
                                  </option>
                                  <option value="master-data-management" className={getOptionSecurityClass('master-data-management', 'recordPrimacyManagement', form.dataClassification)}>
                                    Master Data Management (MDM)
                                  </option>
                                  <option value="golden-record" className={getOptionSecurityClass('golden-record', 'recordPrimacyManagement', form.dataClassification)}>
                                    Golden Record Management
                                  </option>
                                  <option value="consensus-based" className={getOptionSecurityClass('consensus-based', 'recordPrimacyManagement', form.dataClassification)}>
                                    Consensus-Based Primacy
                                  </option>
                                  <option value="temporal-primacy" className={getOptionSecurityClass('temporal-primacy', 'recordPrimacyManagement', form.dataClassification)}>
                                    Temporal Primacy Rules
                                  </option>
                                  <option value="multi-domain-mdm" className={getOptionSecurityClass('multi-domain-mdm', 'recordPrimacyManagement', form.dataClassification)}>
                                    Multi-Domain MDM
                                  </option>
                                </select>
                                <small className="dc-field-hint">
                                  Manage authoritative sources and master data (golden records). MDM ensures single source of truth for critical entities (customers, products, suppliers). Reduce data duplication and inconsistencies. Refs: DAMA-DMBOK (Master Data Management), ISO/IEC 8000 (Data Quality), ISO/IEC 25012.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Basic source system priority acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'Master data management (MDM) recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'Golden record management with consensus recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Multi-domain MDM with temporal primacy required for restricted data'}
                                  </small>
                                )}  
                                <FieldWarning fieldName="recordPrimacyManagement" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataQualityControls') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select quality approach...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'dataQualityControls', form.dataClassification)}>
                                    No Quality Controls
                                  </option>
                                  <option value="basic-validation" className={getOptionSecurityClass('basic-validation', 'dataQualityControls', form.dataClassification)}>
                                    Basic Data Validation
                                  </option>
                                  <option value="rule-based-checks" className={getOptionSecurityClass('rule-based-checks', 'dataQualityControls', form.dataClassification)}>
                                    Rule-Based Quality Checks
                                  </option>
                                  <option value="statistical-profiling" className={getOptionSecurityClass('statistical-profiling', 'dataQualityControls', form.dataClassification)}>
                                    Statistical Data Profiling
                                  </option>
                                  <option value="ml-quality-detection" className={getOptionSecurityClass('ml-quality-detection', 'dataQualityControls', form.dataClassification)}>
                                    ML-Based Quality Detection
                                  </option>
                                  <option value="real-time-monitoring" className={getOptionSecurityClass('real-time-monitoring', 'dataQualityControls', form.dataClassification)}>
                                    Real-time Quality Monitoring
                                  </option>
                                  <option value="continuous-improvement" className={getOptionSecurityClass('continuous-improvement', 'dataQualityControls', form.dataClassification)}>
                                    Continuous Quality Improvement
                                  </option>
                                </select>
                                <small className="dc-field-hint">
                                  Ensure data accuracy, completeness, consistency, timeliness, validity, and uniqueness. Data quality dimensions drive trust and decision-making. Refs: ISO/IEC 25012 (Data Quality Model), DAMA-DMBOK (Data Quality), ISO 8000 (Data Quality Standards), DCAM.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Basic data validation acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'Rule-based quality checks recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'Statistical profiling and ML-based detection recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Real-time monitoring with continuous improvement required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataQualityControls" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('metadataManagement') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select metadata approach...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'metadataManagement', form.dataClassification)}>
                                    No Metadata Management
                                  </option>
                                  <option value="basic-documentation" className={getOptionSecurityClass('basic-documentation', 'metadataManagement', form.dataClassification)}>
                                    Basic Documentation
                                  </option>
                                  <option value="data-dictionary" className={getOptionSecurityClass('data-dictionary', 'metadataManagement', form.dataClassification)}>
                                    Data Dictionary Management
                                  </option>
                                  <option value="catalog-driven" className={getOptionSecurityClass('catalog-driven', 'metadataManagement', form.dataClassification)}>
                                    Data Catalog Integration
                                  </option>
                                  <option value="semantic-layer" className={getOptionSecurityClass('semantic-layer', 'metadataManagement', form.dataClassification)}>
                                    Semantic Layer Management
                                  </option>
                                  <option value="automated-discovery" className={getOptionSecurityClass('automated-discovery', 'metadataManagement', form.dataClassification)}>
                                    Automated Metadata Discovery
                                  </option>
                                  <option value="enterprise-metadata" className={getOptionSecurityClass('enterprise-metadata', 'metadataManagement', form.dataClassification)}>
                                    Enterprise Metadata Repository
                                  </option>
                                </select>
                                <small className="dc-field-hint">
                                  Manage data about data (technical, business, operational metadata). Metadata enables discovery, lineage, and understanding. Refs: ISO/IEC 11179 (Metadata Registries), DAMA-DMBOK (Metadata Management), Dublin Core Metadata Initiative, ISO 19115 (Geographic metadata).
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Basic documentation acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'Data dictionary or catalog integration recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'Semantic layer with automated discovery recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Enterprise metadata repository required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="metadataManagement" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataStewardshipProgram') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select stewardship model...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'dataStewardshipProgram', form.dataClassification)}>
                                    No Formal Stewardship
                                  </option>
                                  <option value="ad-hoc-ownership" className={getOptionSecurityClass('ad-hoc-ownership', 'dataStewardshipProgram', form.dataClassification)}>
                                    Ad-hoc Data Ownership
                                  </option>
                                  <option value="business-stewards" className={getOptionSecurityClass('business-stewards', 'dataStewardshipProgram', form.dataClassification)}>
                                    Business Data Stewards
                                  </option>
                                  <option value="domain-stewards" className={getOptionSecurityClass('domain-stewards', 'dataStewardshipProgram', form.dataClassification)}>
                                    Domain-Based Stewards
                                  </option>
                                  <option value="technical-stewards" className={getOptionSecurityClass('technical-stewards', 'dataStewardshipProgram', form.dataClassification)}>
                                    Technical Data Stewards
                                  </option>
                                  <option value="federated-stewardship" className={getOptionSecurityClass('federated-stewardship', 'dataStewardshipProgram', form.dataClassification)}>
                                    Federated Stewardship Model
                                  </option>
                                  <option value="centre-of-excellence" className={getOptionSecurityClass('centre-of-excellence', 'dataStewardshipProgram', form.dataClassification)}>
                                    Data Stewardship Centre of Excellence
                                  </option>
                                </select>
                                <small className="dc-field-hint">
                                  Define roles and responsibilities for data ownership and management. Stewards ensure data quality, compliance, and proper use. Balance business and technical stewardship. Refs: DAMA-DMBOK (Data Stewardship), DCAM (Data Stewardship Capability), ISO/IEC 38500 (Governance).
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Ad-hoc ownership acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'Domain-based or business stewards recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'Federated stewardship model with support from business and technical stewards recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Centre of excellence stewardship required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataStewardshipProgram" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataGovernanceFramework') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select governance framework...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'dataGovernanceFramework', form.dataClassification)}>
                                    No Formal Governance
                                  </option>
                                  <option value="basic-policies" className={getOptionSecurityClass('basic-policies', 'dataGovernanceFramework', form.dataClassification)}>
                                    Basic Data Policies
                                  </option>
                                  <option value="dmbok-framework" className={getOptionSecurityClass('dmbok-framework', 'dataGovernanceFramework', form.dataClassification)}>
                                    DMBOK Framework
                                  </option>
                                  <option value="dama-framework" className={getOptionSecurityClass('dama-framework', 'dataGovernanceFramework', form.dataClassification)}>
                                    DAMA Framework
                                  </option>
                                  <option value="cobit-data" className={getOptionSecurityClass('cobit-data', 'dataGovernanceFramework', form.dataClassification)}>
                                    COBIT for Data Governance
                                  </option>
                                  <option value="custom-framework" className={getOptionSecurityClass('custom-framework', 'dataGovernanceFramework', form.dataClassification)}>
                                    Custom Governance Framework
                                  </option>
                                  <option value="adaptive-governance" className={getOptionSecurityClass('adaptive-governance', 'dataGovernanceFramework', form.dataClassification)}>
                                    Adaptive Data Governance
                                  </option>
                                </select>
                                <small className="dc-field-hint">
                                  Overall approach to data governance policies, standards, and enforcement. Framework defines decision rights, accountability, and processes. Refs: DAMA-DMBOK (Data Governance), COBIT 2019, ISO/IEC 38500 (IT Governance), DCAM (Data Management Capability Assessment Model).
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Basic data policies acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'DMBOK or DAMA framework recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'COBIT or custom governance framework recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Adaptive data governance framework required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataGovernanceFramework" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataFlowDocumentation') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select flow documentation...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'dataFlowDocumentation', form.dataClassification)}>
                                    No Flow Documentation
                                  </option>
                                  <option value="manual-documentation" className={getOptionSecurityClass('manual-documentation', 'dataFlowDocumentation', form.dataClassification)}>
                                    Manual Documentation
                                  </option>
                                  <option value="high-level-diagrams" className={getOptionSecurityClass('high-level-diagrams', 'dataFlowDocumentation', form.dataClassification)}>
                                    High-Level Flow Diagrams
                                  </option>
                                  <option value="detailed-mapping" className={getOptionSecurityClass('detailed-mapping', 'dataFlowDocumentation', form.dataClassification)}>
                                    Detailed Data Flow Mapping
                                  </option>
                                  <option value="system-integration" className={getOptionSecurityClass('system-integration', 'dataFlowDocumentation', form.dataClassification)}>
                                    System Integration Documentation
                                  </option>
                                  <option value="api-flow-tracking" className={getOptionSecurityClass('api-flow-tracking', 'dataFlowDocumentation', form.dataClassification)}>
                                    API Flow Tracking
                                  </option>
                                  <option value="automated-lineage" className={getOptionSecurityClass('automated-lineage', 'dataFlowDocumentation', form.dataClassification)}>
                                    Automated Data Lineage
                                  </option>
                                  <option value="network-flow-analysis" className={getOptionSecurityClass('network-flow-analysis', 'dataFlowDocumentation', form.dataClassification)}>
                                    Network Flow Analysis
                                  </option>
                                  <option value="automated-discovery" className={getOptionSecurityClass('automated-discovery', 'dataFlowDocumentation', form.dataClassification)}>
                                    Automated Flow Discovery
                                  </option>
                                  <option value="real-time-monitoring" className={getOptionSecurityClass('real-time-monitoring', 'dataFlowDocumentation', form.dataClassification)}>
                                    Real-time Flow Monitoring
                                  </option>
                                  <option value="real-time-mapping" className={getOptionSecurityClass('real-time-mapping', 'dataFlowDocumentation', form.dataClassification)}>
                                    Real-Time Data Mapping
                                  </option>
                                  <option value="comprehensive-catalog" className={getOptionSecurityClass('comprehensive-catalog', 'dataFlowDocumentation', form.dataClassification)}>
                                    Comprehensive Flow Catalog
                                  </option>
                                </select>
                                <small className="dc-field-hint">
                                  Document and map data movement through systems, APIs, and networks. Critical for GDPR Article 30 (Records of Processing), Privacy Act APP 1, security assessments, and impact analysis. Refs: DAMA-DMBOK (Data Architecture), ISO/IEC 27001 A.8.1, NIST SP 800-53 CM-8 (Information System Component Inventory).
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'High-level flow diagrams acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'Detailed data flow mapping recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'Automated lineage with API flow tracking recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Comprehensive flow catalog with real-time monitoring required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataFlowDocumentation" />
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
                                  onChange={handleInputChange}
                                  className={getFieldWarning('reportingAnalyticsGovernance') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select reporting governance...</option>
                                  <option value="none" className={getOptionSecurityClass('none', 'reportingAnalyticsGovernance', form.dataClassification)}>
                                    No Reporting Governance
                                  </option>
                                  <option value="basic-controls" className={getOptionSecurityClass('basic-controls', 'reportingAnalyticsGovernance', form.dataClassification)}>
                                    Basic Reporting Controls
                                  </option>
                                  <option value="standardised-metrics" className={getOptionSecurityClass('standardised-metrics', 'reportingAnalyticsGovernance', form.dataClassification)}>
                                    Standardised Metrics & KPIs
                                  </option>
                                  <option value="self-service-governed" className={getOptionSecurityClass('self-service-governed', 'reportingAnalyticsGovernance', form.dataClassification)}>
                                    Governed Self-Service Analytics
                                  </option>
                                  <option value="data-mart-governance" className={getOptionSecurityClass('data-mart-governance', 'reportingAnalyticsGovernance', form.dataClassification)}>
                                    Data Mart Governance
                                  </option>
                                  <option value="certified-reports" className={getOptionSecurityClass('certified-reports', 'reportingAnalyticsGovernance', form.dataClassification)}>
                                    Certified Report Repository
                                  </option>
                                  <option value="enterprise-reporting" className={getOptionSecurityClass('enterprise-reporting', 'reportingAnalyticsGovernance', form.dataClassification)}>
                                    Enterprise Reporting Platform
                                  </option>
                                </select>
                                <small className="dc-field-hint">
                                  Controls for data reporting, analytics, and business intelligence. Ensure consistent definitions, certified reports, and governed self-service. Balance agility with accuracy. Refs: DAMA-DMBOK (Business Intelligence & Analytics), ISO/IEC 38500, DCAM (Analytics Capability).
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Basic reporting controls acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'Standardised metrics and certified reports recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'Governed self-service with data mart governance recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Enterprise reporting platform required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="reportingAnalyticsGovernance" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Ownership & Accountability Model:</label>
                              </td>
                              <td>
                                <select
                                  id="dataOwnershipAccountability"
                                  name="dataOwnershipAccountability"
                                  value={form.dataOwnershipAccountability}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataOwnershipAccountability') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select ownership model...</option>
                                  <option value="no-defined-ownership" className={getOptionSecurityClass('no-defined-ownership', 'dataOwnershipAccountability', form.dataClassification)}>No Defined Ownership</option>
                                  <option value="it-owned" className={getOptionSecurityClass('it-owned', 'dataOwnershipAccountability', form.dataClassification)}>IT-Owned Data</option>
                                  <option value="shared-ownership" className={getOptionSecurityClass('shared-ownership', 'dataOwnershipAccountability', form.dataClassification)}>Shared Ownership (IT + Business)</option>
                                  <option value="business-owned" className={getOptionSecurityClass('business-owned', 'dataOwnershipAccountability', form.dataClassification)}>Business-Owned Data</option>
                                  <option value="domain-driven" className={getOptionSecurityClass('domain-driven', 'dataOwnershipAccountability', form.dataClassification)}>Domain-Driven Ownership (Data Mesh)</option>
                                  <option value="executive-accountability" className={getOptionSecurityClass('executive-accountability', 'dataOwnershipAccountability', form.dataClassification)}>Executive Accountability (CDO/CISO)</option>
                                  <option value="data-trustee" className={getOptionSecurityClass('data-trustee', 'dataOwnershipAccountability', form.dataClassification)}>Data Trustee Model</option>
                                </select>
                                <small className="dc-field-hint">
                                  Define clear ownership and accountability for data assets. Ownership assigns responsibility for quality, security, compliance, and lifecycle. Data Mesh promotes domain ownership. Refs: DAMA-DMBOK (Data Stewardship & Governance), ISO/IEC 38500, APRA CPS 234 Section 29 (accountability), Privacy Act APP 1.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'IT-owned or business-owned acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'Shared ownership or domain-driven recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'Executive accountability (CDO/CISO) recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Data trustee model with executive accountability required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataOwnershipAccountability" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Standards & Conventions:</label>
                              </td>
                              <td>
                                <select
                                  id="dataStandardsConventions"
                                  name="dataStandardsConventions"
                                  value={form.dataStandardsConventions}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataStandardsConventions') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select standards maturity...</option>
                                  <option value="no-standards" className={getOptionSecurityClass('no-standards', 'dataStandardsConventions', form.dataClassification)}>No Standards</option>
                                  <option value="ad-hoc-naming" className={getOptionSecurityClass('ad-hoc-naming', 'dataStandardsConventions', form.dataClassification)}>Ad-hoc Naming Conventions</option>
                                  <option value="basic-conventions" className={getOptionSecurityClass('basic-conventions', 'dataStandardsConventions', form.dataClassification)}>Basic Naming & Format Conventions</option>
                                  <option value="industry-standards" className={getOptionSecurityClass('industry-standards', 'dataStandardsConventions', form.dataClassification)}>Industry Standards (ISO/FHIR/HL7/ACORD)</option>
                                  <option value="enterprise-standards" className={getOptionSecurityClass('enterprise-standards', 'dataStandardsConventions', form.dataClassification)}>Enterprise Data Standards</option>
                                  <option value="data-taxonomies" className={getOptionSecurityClass('data-taxonomies', 'dataStandardsConventions', form.dataClassification)}>Data Taxonomies & Classification</option>
                                  <option value="semantic-standards" className={getOptionSecurityClass('semantic-standards', 'dataStandardsConventions', form.dataClassification)}>Semantic Standards & Ontologies</option>
                                  <option value="automated-enforcement" className={getOptionSecurityClass('automated-enforcement', 'dataStandardsConventions', form.dataClassification)}>Automated Standards Enforcement</option>
                                </select>
                                <small className="dc-field-hint">
                                  Ensure consistent data definitions, formats, naming, and structures across the organisation. Standards enable interoperability, integration, and data sharing. Refs: ISO/IEC 11179 (Metadata Registries), ISO 8601 (Date/Time), FHIR (Healthcare), ACORD (Insurance), DAMA-DMBOK (Data Architecture).
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Basic naming and format conventions acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'Industry standards or enterprise standards recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'Semantic standards and ontologies recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Automated standards enforcement required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataStandardsConventions" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Glossary & Business Terminology Management:</label>
                              </td>
                              <td>
                                <select
                                  id="dataGlossaryBusinessTerms"
                                  name="dataGlossaryBusinessTerms"
                                  value={form.dataGlossaryBusinessTerms}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataGlossaryBusinessTerms') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select glossary maturity...</option>
                                  <option value="no-glossary" className={getOptionSecurityClass('no-glossary', 'dataGlossaryBusinessTerms', form.dataClassification)}>No Glossary</option>
                                  <option value="informal-documentation" className={getOptionSecurityClass('informal-documentation', 'dataGlossaryBusinessTerms', form.dataClassification)}>Informal Documentation</option>
                                  <option value="basic-glossary" className={getOptionSecurityClass('basic-glossary', 'dataGlossaryBusinessTerms', form.dataClassification)}>Basic Business Glossary</option>
                                  <option value="searchable-glossary" className={getOptionSecurityClass('searchable-glossary', 'dataGlossaryBusinessTerms', form.dataClassification)}>Searchable Business Glossary</option>
                                  <option value="multilingual-glossary" className={getOptionSecurityClass('multilingual-glossary', 'dataGlossaryBusinessTerms', form.dataClassification)}>Multilingual Glossary</option>
                                  <option value="ai-powered-glossary" className={getOptionSecurityClass('ai-powered-glossary', 'dataGlossaryBusinessTerms', form.dataClassification)}>AI-Powered Glossary (Auto-Suggestions)</option>
                                  <option value="living-versioned-glossary" className={getOptionSecurityClass('living-versioned-glossary', 'dataGlossaryBusinessTerms', form.dataClassification)}>Living Glossary with Versioning</option>
                                </select>
                                <small className="dc-field-hint">
                                  Maintain common understanding of business terms and data definitions. Glossary bridges business and technical language, reduces ambiguity, and improves data literacy. Refs: DAMA-DMBOK (Business Glossary), ISO/IEC 11179, DCAM (Metadata Capability), Data Catalog best practices.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Basic business glossary acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'Searchable glossary recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'AI-powered glossary with multilingual support recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Living versioned glossary required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataGlossaryBusinessTerms" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Governance Council / Operating Model:</label>
                              </td>
                              <td>
                                <select
                                  id="dataGovernanceCouncil"
                                  name="dataGovernanceCouncil"
                                  value={form.dataGovernanceCouncil}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataGovernanceCouncil') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select governance operating model...</option>
                                  <option value="no-governance-body" className={getOptionSecurityClass('no-governance-body', 'dataGovernanceCouncil', form.dataClassification)}>No Governance Body</option>
                                  <option value="ad-hoc-meetings" className={getOptionSecurityClass('ad-hoc-meetings', 'dataGovernanceCouncil', form.dataClassification)}>Ad-hoc Meetings</option>
                                  <option value="data-governance-council" className={getOptionSecurityClass('data-governance-council', 'dataGovernanceCouncil', form.dataClassification)}>Data Governance Council</option>
                                  <option value="cross-functional-committees" className={getOptionSecurityClass('cross-functional-committees', 'dataGovernanceCouncil', form.dataClassification)}>Cross-Functional Committees</option>
                                  <option value="federated-governance" className={getOptionSecurityClass('federated-governance', 'dataGovernanceCouncil', form.dataClassification)}>Federated Governance Model</option>
                                  <option value="executive-steering" className={getOptionSecurityClass('executive-steering', 'dataGovernanceCouncil', form.dataClassification)}>Executive Steering Committee</option>
                                  <option value="continuous-governance" className={getOptionSecurityClass('continuous-governance', 'dataGovernanceCouncil', form.dataClassification)}>Continuous Governance Operating Model</option>
                                </select>
                                <small className="dc-field-hint">
                                  Define decision-making authority, escalation paths, and governance operating model. Council ensures cross-functional alignment, resolves conflicts, and drives data strategy. Refs: DAMA-DMBOK (Governance Operating Model), COBIT 2019, ISO/IEC 38500, DCAM.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Ad-hoc meetings acceptable for public data governance'}
                                    {form.dataClassification === 'internal' && 'Data governance council or cross-functional committees recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'Federated governance model with executive steering recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Continuous governance operating model with executive oversight required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataGovernanceCouncil" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Issue & Exception Management:</label>
                              </td>
                              <td>
                                <select
                                  id="dataIssueExceptionManagement"
                                  name="dataIssueExceptionManagement"
                                  value={form.dataIssueExceptionManagement}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataIssueExceptionManagement') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select issue management maturity...</option>
                                  <option value="no-process" className={getOptionSecurityClass('no-process', 'dataIssueExceptionManagement', form.dataClassification)}>No Formal Process</option>
                                  <option value="email-escalations" className={getOptionSecurityClass('email-escalations', 'dataIssueExceptionManagement', form.dataClassification)}>Email-Based Escalations</option>
                                  <option value="ticketing-system" className={getOptionSecurityClass('ticketing-system', 'dataIssueExceptionManagement', form.dataClassification)}>Ticketing System</option>
                                  <option value="formal-resolution" className={getOptionSecurityClass('formal-resolution', 'dataIssueExceptionManagement', form.dataClassification)}>Formal Issue Resolution Process</option>
                                  <option value="automated-detection" className={getOptionSecurityClass('automated-detection', 'dataIssueExceptionManagement', form.dataClassification)}>Automated Issue Detection</option>
                                  <option value="root-cause-analysis" className={getOptionSecurityClass('root-cause-analysis', 'dataIssueExceptionManagement', form.dataClassification)}>Root Cause Analysis & Remediation</option>
                                  <option value="continuous-improvement" className={getOptionSecurityClass('continuous-improvement', 'dataIssueExceptionManagement', form.dataClassification)}>Continuous Improvement Loop</option>
                                </select>
                                <small className="dc-field-hint">
                                  Track and resolve data quality issues, policy exceptions, and governance challenges. Formal process ensures accountability, visibility, and continuous improvement. Refs: ISO/IEC 25012 (Data Quality Management), DAMA-DMBOK (Data Quality), ITIL (Incident/Problem Management), ISO/IEC 20000.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Email-based escalations acceptable for public data issues'}
                                    {form.dataClassification === 'internal' && 'Ticketing system or formal resolution process recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'Automated detection with root cause analysis recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Continuous improvement loop with automated detection required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataIssueExceptionManagement" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Value & ROI Measurement:</label>
                              </td>
                              <td>
                                <select
                                  id="dataValueRoiMeasurement"
                                  name="dataValueRoiMeasurement"
                                  value={form.dataValueRoiMeasurement}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataValueRoiMeasurement') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select value measurement maturity...</option>
                                  <option value="no-measurement" className={getOptionSecurityClass('no-measurement', 'dataValueRoiMeasurement', form.dataClassification)}>No Measurement</option>
                                  <option value="basic-cost-tracking" className={getOptionSecurityClass('basic-cost-tracking', 'dataValueRoiMeasurement', form.dataClassification)}>Basic Cost Tracking</option>
                                  <option value="cost-benefit-analysis" className={getOptionSecurityClass('cost-benefit-analysis', 'dataValueRoiMeasurement', form.dataClassification)}>Cost-Benefit Analysis</option>
                                  <option value="data-asset-valuation" className={getOptionSecurityClass('data-asset-valuation', 'dataValueRoiMeasurement', form.dataClassification)}>Data Asset Valuation</option>
                                  <option value="roi-dashboards" className={getOptionSecurityClass('roi-dashboards', 'dataValueRoiMeasurement', form.dataClassification)}>ROI Dashboards & KPIs</option>
                                  <option value="economic-value-added" className={getOptionSecurityClass('economic-value-added', 'dataValueRoiMeasurement', form.dataClassification)}>Economic Value Added (EVA)</option>
                                  <option value="data-monetisation" className={getOptionSecurityClass('data-monetisation', 'dataValueRoiMeasurement', form.dataClassification)}>Data Monetisation Tracking</option>
                                </select>
                                <small className="dc-field-hint">
                                  Measure and communicate business value and ROI of data assets and initiatives. Quantify data quality costs, opportunity costs, and revenue impact. Justify investments. Refs: DAMA-DMBOK (Data Value), ISO/IEC 25012 (Data Quality Economics), Gartner Information Economics, COBIT Value Optimisation.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Basic cost tracking acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'Cost-benefit analysis or data asset valuation recommended for internal data'}
                                    {form.dataClassification === 'confidential' && 'ROI dashboards with economic value added recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Data monetisation tracking and comprehensive ROI measurement required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataValueRoiMeasurement" />
                              </td>
                            </tr>
                            <tr>
                              <td className="dc-field-cell-label">
                                <label className="dc-form-label">Data Ethics & Responsible Use Policy:</label>
                              </td>
                              <td>
                                <select
                                  id="dataEthicsResponsibleUse"
                                  name="dataEthicsResponsibleUse"
                                  value={form.dataEthicsResponsibleUse}
                                  onChange={handleInputChange}
                                  className={getFieldWarning('dataEthicsResponsibleUse') ? 'dc-field-warning' : 'dc-select'}
                                >
                                  <option value="">Select ethics framework maturity...</option>
                                  <option value="no-policy" className={getOptionSecurityClass('no-policy', 'dataEthicsResponsibleUse', form.dataClassification)}>No Ethics Policy</option>
                                  <option value="basic-privacy-policy" className={getOptionSecurityClass('basic-privacy-policy', 'dataEthicsResponsibleUse', form.dataClassification)}>Basic Privacy Policy</option>
                                  <option value="ethics-guidelines" className={getOptionSecurityClass('ethics-guidelines', 'dataEthicsResponsibleUse', form.dataClassification)}>Ethics Guidelines</option>
                                  <option value="responsible-ai-framework" className={getOptionSecurityClass('responsible-ai-framework', 'dataEthicsResponsibleUse', form.dataClassification)}>Responsible AI/Data Use Framework</option>
                                  <option value="ethics-review-board" className={getOptionSecurityClass('ethics-review-board', 'dataEthicsResponsibleUse', form.dataClassification)}>Ethics Review Board</option>
                                  <option value="algorithmic-accountability" className={getOptionSecurityClass('algorithmic-accountability', 'dataEthicsResponsibleUse', form.dataClassification)}>Algorithmic Accountability Framework</option>
                                  <option value="continuous-ethics-monitoring" className={getOptionSecurityClass('continuous-ethics-monitoring', 'dataEthicsResponsibleUse', form.dataClassification)}>Continuous Ethics Monitoring</option>
                                </select>
                                <small className="dc-field-hint">
                                  Define ethical principles for data use, AI/ML, and algorithmic decision-making. Address fairness, transparency, accountability, privacy, and human rights. Refs: Australian AI Ethics Principles (8 principles), GDPR Recital 71 (Automated Decision-Making), ISO/IEC 42001 (AI Management), NIST AI RMF, IEEE Ethically Aligned Design.
                                </small>
                                {form.dataClassification && (
                                  <small className="dc-field-hint">
                                    <br/><strong>Recommendation for {form.dataClassification.toUpperCase()} data classification:</strong><br/>
                                    {form.dataClassification === 'public' && 'Basic privacy policy acceptable for public data'}
                                    {form.dataClassification === 'internal' && 'Ethics guidelines recommended for internal data use'}
                                    {form.dataClassification === 'confidential' && 'Responsible AI framework with ethics review board recommended for confidential data'}
                                    {form.dataClassification === 'restricted' && 'Continuous ethics monitoring with algorithmic accountability required for restricted data'}
                                  </small>
                                )}
                                <FieldWarning fieldName="dataEthicsResponsibleUse" />
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
                                  onChange={handleChange}
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
                                  onChange={handleChange}
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
            )}

            {viewMode === 'extended' && (
              <BackToTopButton />
            )}

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

            <p></p>
            <div className="dc-button-container">
              <div className="dc-button-group">
                <button
                  type="submit"
                  className="dc-btn dc-btn-secondary"
                >
                  {editIndex !== null ? "Update Entry" : "Submit Data Classification Details"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="dc-btn dc-btn-outline"
                >
                  Cancel
                </button>
              </div>
            </div>
        </details>
      </form>
    );
};

export default DCInputForm;

