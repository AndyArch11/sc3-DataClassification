import React from 'react';
import { exportDCToExcel } from './ExcelExport';
import "./DC.css";

const DCTable = ({ 
    entries = [], 
    dcOpen,
    setDCOpen,
    onEdit, 
    onDelete,
    handleNewDataClassification,
    handleMoveDC,
    handleDeleteDC,
    handleStartNew,
    dcFieldsOpen,    
    editIndex,
    setDraggedProcessIndex,
    draggedProcessIndex,
    setDropTargetIndex,
    dropTargetIndex,
    handleMoveProcess,
    hoveredRowIndex,
    setHoveredRowIndex,
    handleRowClick
}) => {
    

    if (entries.length === 0) {
        return null;
    }

    if (entries.length === 0) {
        return (
            <div className="dc-table-container">
                <h3>🗃️ Data Classification Assessments</h3>
                <div className="dc-table-empty">
                    <p>No data classification entries yet.</p>
                    <p>Submit the form above to see your entries here.</p>
                </div>
            </div>
        );
    }

    const handleExport = () => {
        exportDCToExcel(entries);
    };    

    const handleDragStart = (e, index) => {
        setDraggedProcessIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDropTargetIndex(index);
    };

    const handleDragLeave = () => {
        setDropTargetIndex(null);
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        if (draggedProcessIndex !== null && draggedProcessIndex !== dropIndex) {
        handleMoveProcess(draggedProcessIndex, dropIndex);
        }
        setDraggedProcessIndex(null);
        setDropTargetIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedProcessIndex(null);
        setDropTargetIndex(null);
    };

    return (
        <div className="dc-table-outer-container">
            <div className="dc-table-inner">

                <details open={dcOpen} className="dc-table-section">
                    <summary
                        className="dc-table-summary"
                        onClick={(e) => {
                            e.preventDefault();
                            setDCOpen(!dcOpen);
                        }}
                    >
                        🗃️ Data Classification Assessments
                        <span className="dc-table-count">{entries.length} Data Classification{entries.length !== 1 ? 's' : ''} assessed</span>
                    </summary>
                    <div className="dc-table-content">
                        {/* Data Classification Statistics */}
                        {entries.length > 0 && (
                            <div className="dc-table-statistics">
                                <p>
                                    <strong>Total Entries:</strong> {entries.length} | 
                                    <strong> Public:</strong> {entries.filter(e => e.dataClassification?.toLowerCase().trim() === 'public').length} | 
                                    <strong> Internal:</strong> {entries.filter(e => e.dataClassification?.toLowerCase().trim() === 'internal').length} | 
                                    <strong> Confidential:</strong> {entries.filter(e => e.dataClassification?.toLowerCase().trim() === 'confidential').length} | 
                                    <strong> Restricted:</strong> {entries.filter(e => e.dataClassification?.toLowerCase().trim() === 'restricted').length}
                                </p>
                            </div>
                        )}

                        {/* No Data Classifications Message */}
                        {entries.length === 0 && (
                        <div className="dc-table-empty">
                            <h4>Current Data Classification - No Classifications Identified</h4>
                            <p>
                            No data classifications have been added to the current assessment yet. Use
                            the "DC Fields" section above to:
                            </p>
                            <ul>
                                <li>Fill in data classification details (asset name, asset type, data type, data classification, assessment conducted by who and when, etc.)</li>
                                <li>Assess Data Classification</li>
                                <li>Assess controls to secure data based on classification</li>
                                <li>Click "Submit Data Classification Details" to add to this table</li>
                            </ul>
                            <button onClick={handleNewDataClassification} className="dc-btn primary">
                            + Add First Data Classification Assessment
                            </button>
                        </div>
                        )}
                    </div>
                </details>

                {entries.length > 0 && (
                    <div className="dc-table-container">                        
                        <div className="dc-table-scroll">
                            <table className="dc-table">
                                <thead>
                                    <tr>
                                        <th colSpan={11} className="dc-th-group-dc-details">
                                            🎯 Data Classification Details
                                        </th>
                                        <th colSpan={6} className="dc-th-group-dc-security-controls">
                                            🔒 Security Controls
                                        </th>
                                        <th colSpan={4} className="dc-th-group-dc-access-control">
                                            🔐 Access Control
                                        </th>
                                        <th colSpan={10} className="dc-th-group-dc-advanced-security-controls">
                                            🛡️ Advanced Security Controls
                                        </th>
                                        <th colSpan={12} className="dc-th-group-dc-application-security-controls">
                                            🛡️ Application Security Controls
                                        </th>
                                        <th colSpan={6} className="dc-th-group-dc-remote-access-infrastructure">
                                            🖥️ Remote Access Infrastructure
                                        </th>
                                        <th colSpan={3} className="dc-th-group-dc-monitoring-compliance">
                                            📊 Monitoring and Compliance
                                        </th>
                                        <th colSpan={5} className="dc-th-group-dc-data-lifecycle-management">
                                            🔄 Data Lifecycle Management
                                        </th>
                                        <th colSpan={6} className="dc-th-group-dc-compliance-governance">
                                            ⚖️ Compliance and Governance
                                        </th>
                                        <th colSpan={16} className="dc-th-group-dc-privacy-engineering">
                                            🔒 Privacy Engineering and Rights Management
                                        </th>
                                        <th colSpan={4} className="dc-th-group-dc-zero-trust-cloud">
                                            ☁️ Zero Trust & Cloud-Native Data Security
                                        </th>
                                        <th colSpan={4} className="dc-th-group-dc-ai-supply-chain">
                                            🤖 AI/ML & Supply Chain Data Security
                                        </th>
                                        <th colSpan={4} className="dc-th-group-dc-advanced-quantum">
                                            ⚡ Advanced Threat Protection & Quantum-Ready Security
                                        </th>
                                        <th colSpan={5} className="dc-th-group-dc-data-democratisation">
                                            ⚖️ Data Democratisation vs Controlled Access
                                        </th>
                                        <th colSpan={3} className="dc-th-group-dc-modern-data-security">
                                            🤖 Modern Data Security & Automation
                                        </th>
                                        <th colSpan={8} className="dc-th-group-dc-data-governance">
                                            🏛️ Data Governance & Management
                                        </th>
                                        <th colSpan={2} className="dc-th-group-dc-implementation-notes">
                                            📝 Implementation Notes
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="dc-th-details">Asset Name</th>
                                        <th className="dc-th-details">Asset Type</th>
                                        <th className="dc-th-details">Data Type</th>
                                        <th className="dc-th-details">Data Classification</th>
                                        <th className="dc-th-details">Description</th>
                                        <th className="dc-th-details">Dependencies</th>
                                        <th className="dc-th-details">Data Owner</th>
                                        <th className="dc-th-details">Technical Owner</th>
                                        <th className="dc-th-details">Assessor Name</th>
                                        <th className="dc-th-details">Assessment Date</th>
                                        <th className="dc-th-details">Review Date</th>

                                        <th className="dc-th-security-controls">At Rest Encryption</th>
                                        <th className="dc-th-security-controls">In Transit Encryption</th>
                                        <th className="dc-th-security-controls">Database Encryption</th>
                                        <th className="dc-th-security-controls">Encryption Cipher</th>
                                        <th className="dc-th-security-controls">Hash Algorithm</th>
                                        <th className="dc-th-security-controls">Key Management</th>

                                        <th className="dc-th-access-control">Authentication</th>
                                        <th className="dc-th-access-control">Authorisation</th>
                                        <th className="dc-th-access-control">Identity Management</th>
                                        <th className="dc-th-access-control">Specific Access Controls</th>

                                        <th className="dc-th-advanced-security-controls">WAF Controls</th>
                                        <th className="dc-th-advanced-security-controls">DLP Controls</th>
                                        <th className="dc-th-advanced-security-controls">CASB Controls</th>
                                        <th className="dc-th-advanced-security-controls">SSE Controls</th>
                                        <th className="dc-th-advanced-security-controls">Cloud Network Security</th>
                                        <th className="dc-th-advanced-security-controls">SD-WAN Controls</th>
                                        <th className="dc-th-advanced-security-controls">SASE Architecture</th>
                                        <th className="dc-th-advanced-security-controls">Zero Trust Maturity</th>
                                        <th className="dc-th-advanced-security-controls">Network Security</th>
                                        <th className="dc-th-advanced-security-controls">Protocol Gap Coverage</th>

                                        <th className="dc-th-application-security-controls">Antivirus Controls</th>                                        
                                        <th className="dc-th-application-security-controls">Vulnerability Scanning</th>
                                        <th className="dc-th-application-security-controls">Certificate Lifecycle</th>
                                        <th className="dc-th-application-security-controls">Application Control</th>
                                        <th className="dc-th-application-security-controls">Patch Management</th>
                                        <th className="dc-th-application-security-controls">Code Integrity</th>
                                        <th className="dc-th-application-security-controls">OS Hardening</th>
                                        <th className="dc-th-application-security-controls">OS Encryption</th>
                                        <th className="dc-th-application-security-controls">MDM Controls</th>
                                        <th className="dc-th-application-security-controls">MAM Controls</th>
                                        <th className="dc-th-application-security-controls">BYOD Policy</th>
                                        <th className="dc-th-application-security-controls">Mobile Data Protection</th>

                                        <th className="dc-th-remote-access-infrastructure">VDI Solution</th>
                                        <th className="dc-th-remote-access-infrastructure">Jump Hosts</th>
                                        <th className="dc-th-remote-access-infrastructure">Remote Access Policy</th>
                                        <th className="dc-th-remote-access-infrastructure">Session Isolation</th>
                                        <th className="dc-th-remote-access-infrastructure">Remote Access Monitoring</th>
                                        <th className="dc-th-remote-access-infrastructure">Privileged Access Management</th>

                                        <th className="dc-th-monitoring-compliance">Threat Monitoring</th>
                                        <th className="dc-th-monitoring-compliance">Availability Monitoring</th>
                                        <th className="dc-th-monitoring-compliance">Audit Logging</th>

                                        <th className="dc-th-data-lifecycle-management">Backup Strategy</th>
                                        <th className="dc-th-data-lifecycle-management">Data Retention Policy</th>
                                        <th className="dc-th-data-lifecycle-management">Backup Retention Period</th>
                                        <th className="dc-th-data-lifecycle-management">Archive Policy</th>
                                        <th className="dc-th-data-lifecycle-management">Data Disposal Method</th>

                                        <th className="dc-th-compliance-governance">Compliance Requirements</th>
                                        <th className="dc-th-compliance-governance">Business Impact Level</th>
                                        <th className="dc-th-compliance-governance">Availability SLO</th>
                                        <th className="dc-th-compliance-governance">RTO</th>
                                        <th className="dc-th-compliance-governance">RPO</th>
                                        <th className="dc-th-compliance-governance">Incident Response</th>

                                        <th className="dc-th-privacy-engineering">Privacy By Design</th>
                                        <th className="dc-th-privacy-engineering">Data Minimisation</th>
                                        <th className="dc-th-privacy-engineering">App Data Collection Limitations</th>
                                        <th className="dc-th-privacy-engineering">App Solicited Unsolicited</th>
                                        <th className="dc-th-privacy-engineering">App Collection Notice</th>
                                        <th className="dc-th-privacy-engineering">App Third Party Collection</th>
                                        <th className="dc-th-privacy-engineering">Consent Management</th>
                                        <th className="dc-th-privacy-engineering">App Customer Access</th>
                                        <th className="dc-th-privacy-engineering">App Data Correction</th>
                                        <th className="dc-th-privacy-engineering">App Data Retention Disposal</th>
                                        <th className="dc-th-privacy-engineering">Right To Erasure</th>
                                        <th className="dc-th-privacy-engineering">App Notification Requirements</th>
                                        <th className="dc-th-privacy-engineering">Accessibility Compliance</th>
                                        <th className="dc-th-privacy-engineering">Assistive Technology Support</th>
                                        <th className="dc-th-privacy-engineering">Inclusive Data Access Design</th>
                                        <th className="dc-th-privacy-engineering">Workplace Accessibility Accommodation</th>

                                        <th className="dc-th-zero-trust-cloud">Data Microsegmentation</th>
                                        <th className="dc-th-zero-trust-cloud">Container Data Protection</th>
                                        <th className="dc-th-zero-trust-cloud">Multi Cloud Data Governance</th>
                                        <th className="dc-th-zero-trust-cloud">IAC Security Scanning</th>

                                        <th className="dc-th-ai-supply-chain">Training Data Protection</th>
                                        <th className="dc-th-ai-supply-chain">AI Governance</th>
                                        <th className="dc-th-ai-supply-chain">Third Party Data Processing</th>
                                        <th className="dc-th-ai-supply-chain">Supply Chain Data Mapping</th>

                                        <th className="dc-th-advanced-quantum">Insider Threat Detection</th>
                                        <th className="dc-th-advanced-quantum">UEBA Data Operations</th>
                                        <th className="dc-th-advanced-quantum">Post Quantum Cryptography</th>
                                        <th className="dc-th-advanced-quantum">Crypto Agility</th>

                                        <th className="dc-th-data-democratisation">Data Access Governance</th>
                                        <th className="dc-th-data-democratisation">Self Service Data Access</th>
                                        <th className="dc-th-data-democratisation">Data Access Balancing</th>
                                        <th className="dc-th-data-democratisation">Data Literacy Programs</th>
                                        <th className="dc-th-data-democratisation">Controlled Data Sharing</th>

                                        <th className="dc-th-modern-data-security">Data Discovery Automation</th>
                                        <th className="dc-th-modern-data-security">Sensitive Data Scanning</th>
                                        <th className="dc-th-modern-data-security">Content Based Classification</th>

                                        <th className="dc-th-data-governance">Data Lineage Tracking</th>
                                        <th className="dc-th-data-governance">Record Primacy Management</th>
                                        <th className="dc-th-data-governance">Data Quality Controls</th>
                                        <th className="dc-th-data-governance">Metadata Management</th>
                                        <th className="dc-th-data-governance">Data Stewardship Program</th>
                                        <th className="dc-th-data-governance">Data Governance Framework</th>
                                        <th className="dc-th-data-governance">Data Flow Documentation</th>
                                        <th className="dc-th-data-governance">Reporting Analytics Governance</th>                                        
                                        
                                        <th className="dc-th-implementation-notes">Implementation Notes</th>
                                        <th className="dc-th-implementation-notes">Business Justification</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entries.map((entry, index) => (
                                        <tr key={entry.id || index} 
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, index)}
                                            onDragOver={(e) => handleDragOver(e, index)}
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) => handleDrop(e, index)}
                                            onDragEnd={handleDragEnd}
                                            onClick={() => handleRowClick(index)}
                                            onMouseEnter={() => setHoveredRowIndex(index)}
                                            onMouseLeave={() => setHoveredRowIndex(null)}
                                            title={editIndex === index ? 
                                                `Currently editing: ${entry.assetName} - ${entry.dataClassification} (click to save changes)` : 
                                                `${entry.assetName} - ${entry.dataClassification} (click to edit this entry)`}
                                            className={`dc-classification-${entry.dataClassification?.toLowerCase()}
                                                        dc-table-row 
                                                        ${dropTargetIndex === index ? 'dc-table-row-drop-target' : ''} 
                                                        ${editIndex === index ? 'dc-table-row-editing' : ''} 
                                                        ${hoveredRowIndex === index ? 'dc-table-row-hover' : ''}`}>
                                            <td className="dc-td-details"><strong>{entry.assetName}</strong></td>
                                            <td className="dc-td-details">{entry.assetType}</td>
                                            <td className="dc-td-details">{entry.dataType}</td>
                                            <td className="dc-td-details">
                                                <span className={`dc-td-details dc-classification-badge dc-${entry.dataClassification?.toLowerCase()}`}>
                                                    {entry.dataClassification}
                                                </span>
                                            </td>
                                            <td className="dc-td-details">{entry.description}</td>
                                            <td className="dc-td-details">{entry.dependencies}</td>
                                            <td className="dc-td-details">{entry.dataOwner}</td>
                                            <td className="dc-td-details">{entry.technicalOwner}</td>
                                            <td className="dc-td-details">{entry.assessorName}</td>
                                            <td className="dc-td-details">{entry.assessmentDate}</td>
                                            <td className="dc-td-details">{entry.reviewDate}</td>

                                            <td className="dc-td-security-controls">{entry.atRestEncryption}</td>
                                            <td className="dc-td-security-controls">{entry.inTransitEncryption}</td>
                                            <td className="dc-td-security-controls">{entry.databaseEncryption}</td>
                                            <td className="dc-td-security-controls">{entry.encryptionCipher}</td>
                                            <td className="dc-td-security-controls">{entry.hashAlgorithm}</td>
                                            <td className="dc-td-security-controls">{entry.keyManagement}</td>

                                            <td className="dc-td-access-control">{entry.authentication}</td>
                                            <td className="dc-td-access-control">{entry.authorisation}</td>
                                            <td className="dc-td-access-control">{entry.identityManagement}</td>
                                            <td className="dc-td-access-control">{entry.specificAccessControls}</td>
                                            
                                            <td className="dc-td-advanced-security-controls">{entry.wafControls}</td>
                                            <td className="dc-td-advanced-security-controls">{entry.dlpControls}</td>
                                            <td className="dc-td-advanced-security-controls">{entry.casbControls}</td>
                                            <td className="dc-td-advanced-security-controls">{entry.sseControls}</td>
                                            <td className="dc-td-advanced-security-controls">{entry.cloudNetworkSecurity}</td>
                                            <td className="dc-td-advanced-security-controls">{entry.sdwanControls}</td>
                                            <td className="dc-td-advanced-security-controls">{entry.saseArchitecture}</td>
                                            <td className="dc-td-advanced-security-controls">{entry.zeroTrustMaturity}</td>
                                            <td className="dc-td-advanced-security-controls">{entry.networkSecurity}</td>
                                            <td className="dc-td-advanced-security-controls">{entry.protocolGapCoverage}</td>
                                            
                                            <td className="dc-td-application-security-controls">{entry.antivirusControls}</td>
                                            <td className="dc-td-application-security-controls">{entry.vulnerabilityScanning}</td>
                                            <td className="dc-td-application-security-controls">{entry.certificateLifecycle}</td>
                                            <td className="dc-td-application-security-controls">{entry.applicationControl}</td>
                                            <td className="dc-td-application-security-controls">{entry.patchManagement}</td>
                                            <td className="dc-td-application-security-controls">{entry.codeIntegrity}</td>
                                            <td className="dc-td-application-security-controls">{entry.osHardening}</td>
                                            <td className="dc-td-application-security-controls">{entry.osEncryption}</td>
                                            <td className="dc-td-application-security-controls">{entry.mdmControls}</td>
                                            <td className="dc-td-application-security-controls">{entry.mamControls}</td>
                                            <td className="dc-td-application-security-controls">{entry.byodPolicy}</td>
                                            <td className="dc-td-application-security-controls">{entry.mobileDataProtection}</td>
                                            
                                            <td className="dc-td-remote-access-infrastructure">{entry.vdiSolution}</td>
                                            <td className="dc-td-remote-access-infrastructure">{entry.jumpHosts}</td>
                                            <td className="dc-td-remote-access-infrastructure">{entry.remoteAccessPolicy}</td>
                                            <td className="dc-td-remote-access-infrastructure">{entry.sessionIsolation}</td>
                                            <td className="dc-td-remote-access-infrastructure">{entry.remoteAccessMonitoring}</td>
                                            <td className="dc-td-remote-access-infrastructure">{entry.privilegedAccessManagement}</td>
                                            
                                            <td className="dc-td-monitoring-compliance">{entry.threatMonitoring}</td>
                                            <td className="dc-td-monitoring-compliance">{entry.availabilityMonitoring}</td>
                                            <td className="dc-td-monitoring-compliance">{entry.auditLogging}</td>
                                            
                                            <td className="dc-td-data-lifecycle-management">{entry.backupStrategy}</td>
                                            <td className="dc-td-data-lifecycle-management">{entry.dataRetentionPolicy}</td>
                                            <td className="dc-td-data-lifecycle-management">{entry.backupRetentionPeriod}</td>
                                            <td className="dc-td-data-lifecycle-management">{entry.archivePolicy}</td>
                                            <td className="dc-td-data-lifecycle-management">{entry.dataDisposalMethod}</td>
                                            
                                            <td className="dc-td-compliance-governance">{entry.complianceRequirements}</td>
                                            <td className="dc-td-compliance-governance">{entry.businessImpactLevel}</td>
                                            <td className="dc-td-compliance-governance">{entry.availabilitySLO}</td>
                                            <td className="dc-td-compliance-governance">{entry.rto}</td>
                                            <td className="dc-td-compliance-governance">{entry.rpo}</td>
                                            <td className="dc-td-compliance-governance">{entry.incidentResponse}</td>
                                            
                                            <td className="dc-td-privacy-engineering">{entry.privacyByDesign}</td>
                                            <td className="dc-td-privacy-engineering">{entry.dataMinimisation}</td>
                                            <td className="dc-td-privacy-engineering">{entry.appDataCollectionLimitations}</td>
                                            <td className="dc-td-privacy-engineering">{entry.appSolicitedUnsolicited}</td>
                                            <td className="dc-td-privacy-engineering">{entry.appCollectionNotice}</td>
                                            <td className="dc-td-privacy-engineering">{entry.appThirdPartyCollection}</td>
                                            <td className="dc-td-privacy-engineering">{entry.consentManagement}</td>
                                            <td className="dc-td-privacy-engineering">{entry.appCustomerAccess}</td>
                                            <td className="dc-td-privacy-engineering">{entry.appDataCorrection}</td>
                                            <td className="dc-td-privacy-engineering">{entry.appDataRetentionDisposal}</td>
                                            <td className="dc-td-privacy-engineering">{entry.rightToErasure}</td>
                                            <td className="dc-td-privacy-engineering">{entry.appNotificationRequirements}</td>
                                            <td className="dc-td-privacy-engineering">{entry.accessibilityCompliance}</td>
                                            <td className="dc-td-privacy-engineering">{entry.assistiveTechnologySupport}</td>
                                            <td className="dc-td-privacy-engineering">{entry.inclusiveDataAccessDesign}</td>
                                            <td className="dc-td-privacy-engineering">{entry.workplaceAccessibilityAccommodation}</td>

                                            <td className="dc-td-zero-trust-cloud">{entry.dataMicrosegmentation}</td>
                                            <td className="dc-td-zero-trust-cloud">{entry.containerDataProtection}</td>
                                            <td className="dc-td-zero-trust-cloud">{entry.multiCloudDataGovernance}</td>
                                            <td className="dc-td-zero-trust-cloud">{entry.iacSecurityScanning}</td>

                                            <td className="dc-td-ai-supply-chain">{entry.trainingDataProtection}</td>
                                            <td className="dc-td-ai-supply-chain">{entry.aiGovernance}</td>
                                            <td className="dc-td-ai-supply-chain">{entry.thirdPartyDataProcessing}</td>
                                            <td className="dc-td-ai-supply-chain">{entry.supplyChainDataMapping}</td>

                                            <td className="dc-td-advanced-quantum">{entry.insiderThreatDetection}</td>
                                            <td className="dc-td-advanced-quantum">{entry.uebaDataOperations}</td>
                                            <td className="dc-td-advanced-quantum">{entry.postQuantumCryptography}</td>
                                            <td className="dc-td-advanced-quantum">{entry.cryptoAgility}</td>
                                            
                                            <td className="dc-td-data-democratisation">{entry.dataAccessGovernance}</td>
                                            <td className="dc-td-data-democratisation">{entry.selfServiceDataAccess}</td>
                                            <td className="dc-td-data-democratisation">{entry.dataAccessBalancing}</td>
                                            <td className="dc-td-data-democratisation">{entry.dataLiteracyPrograms}</td>
                                            <td className="dc-td-data-democratisation">{entry.controlledDataSharing}</td>
                                            
                                            <td className="dc-td-modern-data-security">{entry.dataDiscoveryAutomation}</td>
                                            <td className="dc-td-modern-data-security">{entry.sensitiveDataScanning}</td>
                                            <td className="dc-td-modern-data-security">{entry.contentBasedClassification}</td>
                                            
                                            <td className="dc-td-data-governance">{entry.dataLineageTracking}</td>
                                            <td className="dc-td-data-governance">{entry.recordPrimacyManagement}</td>
                                            <td className="dc-td-data-governance">{entry.dataQualityControls}</td>
                                            <td className="dc-td-data-governance">{entry.metadataManagement}</td>
                                            <td className="dc-td-data-governance">{entry.dataStewardshipProgram}</td>
                                            <td className="dc-td-data-governance">{entry.dataGovernanceFramework}</td>
                                            <td className="dc-td-data-governance">{entry.dataFlowDocumentation}</td>
                                            <td className="dc-td-data-governance">{entry.reportingAnalyticsGovernance}</td>
                                            
                                            <td className="dc-td-implementation-notes">{entry.implementationNotes}</td>
                                            <td className="dc-td-implementation-notes">{entry.businessJustification}</td>
                                            <td className="dc-action-cell">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleMoveDC(index, index - 1);
                                                    }}
                                                    disabled={index === 0}
                                                    className="dc-action-button"
                                                    title="Move Up"
                                                    >
                                                    ▲
                                                    </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleMoveDC(index, index + 1);
                                                    }}
                                                    disabled={index === entries.length - 1}
                                                    className="dc-action-button"
                                                    title="Move Down"
                                                    >
                                                    ▼
                                                    </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteDC(index);
                                                    }}                            
                                                    className="dc-action-button dc-action-button-remove"
                                                    title="Remove Risk"
                                                >
                                                    🗑
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p></p>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className='dc-table-button-container'>
                    <button
                        type="button"
                        onClick={dcFieldsOpen ? undefined : handleNewDataClassification}
                        disabled={dcFieldsOpen}
                        className={`dc-btn dc-btn-outline-secondary ${dcFieldsOpen ? 'disabled' : ''}`}
                    >
                        + Add New Data Classification
                    </button>
                    
                    <button
                        type="button"
                        onClick={handleStartNew}
                        className="dc-btn dc-btn-outline-primary"
                    >
                        🗑️ Start New
                    </button>

                    <button
                        type="button"
                        onClick={handleExport}
                        className="dc-btn dc-btn-accent"
                    >
                        📊 Export to Excel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DCTable;
