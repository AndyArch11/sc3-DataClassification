import React from 'react';
import { exportDCToExcel } from './ExcelExport';
import "./DC.css";

const DCTable = ({ 
    entries = [], 
    dcOpen,
    setDCOpen,
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
                                    <strong>Total Entries:</strong> {entries.length}
                                </p>
                                <p>
                                    <strong>By Sensitivity:</strong>{' '}
                                    Public: {entries.filter(e => e.dataSensitivity?.toLowerCase().trim() === 'public').length} | 
                                    Internal: {entries.filter(e => e.dataSensitivity?.toLowerCase().trim() === 'internal').length} | 
                                    Confidential: {entries.filter(e => e.dataSensitivity?.toLowerCase().trim() === 'confidential').length} | 
                                    Restricted: {entries.filter(e => e.dataSensitivity?.toLowerCase().trim() === 'restricted').length}
                                </p>
                                <p>
                                    <strong>By Criticality:</strong>{' '}
                                    Public: {entries.filter(e => e.dataCriticality?.toLowerCase().trim() === 'public').length} | 
                                    Internal: {entries.filter(e => e.dataCriticality?.toLowerCase().trim() === 'internal').length} | 
                                    Confidential: {entries.filter(e => e.dataCriticality?.toLowerCase().trim() === 'confidential').length} | 
                                    Restricted: {entries.filter(e => e.dataCriticality?.toLowerCase().trim() === 'restricted').length}
                                </p>
                                <p>
                                    <strong>Final Classification:</strong>{' '}
                                    Public: {entries.filter(e => e.dataClassification?.toLowerCase().trim() === 'public').length} | 
                                    Internal: {entries.filter(e => e.dataClassification?.toLowerCase().trim() === 'internal').length} | 
                                    Confidential: {entries.filter(e => e.dataClassification?.toLowerCase().trim() === 'confidential').length} | 
                                    Restricted: {entries.filter(e => e.dataClassification?.toLowerCase().trim() === 'restricted').length}
                                </p>
                            </div>
                        )}

                        {/* No Data Classifications Message */}
                        {entries.length === 0 && (
                        <div className="dc-table-empty">
                            <h4>Current Data Classification - No Classifications Identified</h4>
                            <p>
                            No data classifications have been added to the current assessment yet. Use
                            the &quot;DC Fields&quot; section above to:
                            </p>
                            <ul>
                                <li>Fill in data classification details (asset name, asset type, data type, data classification, assessment conducted by who and when, etc.)</li>
                                <li>Assess Data Classification</li>
                                <li>Assess controls to secure data based on classification</li>
                                <li>Click &quot;Submit Data Classification Details&quot; to add to this table</li>
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
                                        <th colSpan={13} className="dc-th-group-dc-details">
                                            🎯 Data Classification Details
                                        </th>
                                        <th colSpan={8} className="dc-th-group-dc-security-controls">
                                            🔒 Security Controls
                                        </th>
                                        <th colSpan={4} className="dc-th-group-dc-access-control">
                                            🔐 Access Control
                                        </th>
                                        <th colSpan={16} className="dc-th-group-dc-advanced-security-controls">
                                            🛡️ Advanced Security Controls
                                        </th>
                                        <th colSpan={22} className="dc-th-group-dc-application-security-controls">
                                            🛡️ Application Security Controls
                                        </th>
                                        <th colSpan={8} className="dc-th-group-dc-remote-access-infrastructure">
                                            🖥️ Remote Access Infrastructure
                                        </th>
                                        <th colSpan={10} className="dc-th-group-dc-monitoring-compliance">
                                            📊 Monitoring and Compliance
                                        </th>
                                        <th colSpan={12} className="dc-th-group-dc-data-lifecycle-management">
                                            🔄 Data Lifecycle Management
                                        </th>
                                        <th colSpan={12} className="dc-th-group-dc-compliance-governance">
                                            ⚖️ Compliance and Governance
                                        </th>
                                            <th colSpan={22} className="dc-th-group-dc-privacy-engineering">
                                            🔒 Privacy Engineering and Rights Management
                                        </th>
                                        <th colSpan={13} className="dc-th-group-dc-zero-trust-cloud">
                                            ☁️ Zero Trust & Cloud-Native Data Security
                                        </th>
                                        <th colSpan={13} className="dc-th-group-dc-ai-ml">
                                            🤖 AI/ML Data Security & Responsible AI
                                        </th>
                                        <th colSpan={13} className="dc-th-group-dc-supply-chain">
                                            ⛓️ Supply Chain Data Security & Third-Party Risk
                                        </th>
                                        <th colSpan={9} className="dc-th-group-dc-advanced-quantum">
                                            ⚡ Advanced Threat Protection & Quantum-Ready Security
                                        </th>
                                        <th colSpan={11} className="dc-th-group-dc-data-democratisation">
                                            ⚖️ Data Democratisation vs Controlled Access
                                        </th>
                                        <th colSpan={11} className="dc-th-group-dc-modern-data-security">
                                            🤖 Modern Data Security & Automation
                                        </th>
                                        <th colSpan={15} className="dc-th-group-dc-data-governance">
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
                                        <th className="dc-th-details">Data Sensitivity</th>
                                        <th className="dc-th-details">Data Criticality</th>
                                        <th className="dc-th-details">Data Classification (Derived)</th>
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
                                        <th className="dc-th-security-controls">Key Management Processes</th>
                                        <th className="dc-th-security-controls">Secrets Management</th>

                                        <th className="dc-th-access-control">Authentication</th>
                                        <th className="dc-th-access-control">Authorisation</th>
                                        <th className="dc-th-access-control">Identity Management</th>
                                        <th className="dc-th-access-control">Specific Access Controls</th>

                                        <th className="dc-th-advanced-security-controls">WAF Controls</th>
                                        <th className="dc-th-advanced-security-controls">API Security Gateway</th>
                                        <th className="dc-th-advanced-security-controls">DLP Controls</th>
                                        <th className="dc-th-advanced-security-controls">Privileged Session Management</th>
                                        <th className="dc-th-advanced-security-controls">Threat Intelligence Integration</th>
                                        <th className="dc-th-advanced-security-controls">Threat Modeling</th>
                                        <th className="dc-th-advanced-security-controls">SOAR</th>
                                        <th className="dc-th-advanced-security-controls">SIEM</th>
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
                                        <th className="dc-th-application-security-controls">Application Testing</th>
                                        <th className="dc-th-application-security-controls">Application Security Testing</th>
                                        <th className="dc-th-application-security-controls">CI/CD Pipeline Security</th>
                                        <th className="dc-th-application-security-controls">Application Logging & Telemetry</th>
                                        <th className="dc-th-application-security-controls">Secure Headers & Transport</th>
                                        <th className="dc-th-application-security-controls">Session Management Hardening</th>
                                        <th className="dc-th-application-security-controls">Certificate Lifecycle</th>
                                        <th className="dc-th-application-security-controls">Application Control</th>
                                        <th className="dc-th-application-security-controls">Patch Management</th>
                                        <th className="dc-th-application-security-controls">Code Integrity</th>
                                        <th className="dc-th-application-security-controls">SCA (Software Composition Analysis)</th>
                                        <th className="dc-th-application-security-controls">OSS Licence Compliance</th>
                                        <th className="dc-th-application-security-controls">Secrets Scanning (Code Repos)</th>
                                        <th className="dc-th-application-security-controls">CI/CD Security</th>
                                        <th className="dc-th-application-security-controls">OS Hardening</th>
                                        <th className="dc-th-application-security-controls">OS Encryption</th>
                                        <th className="dc-th-application-security-controls">MDM Controls</th>
                                        <th className="dc-th-application-security-controls">MAM Controls</th>
                                        <th className="dc-th-application-security-controls">BYOD Policy</th>
                                        <th className="dc-th-application-security-controls">Mobile Data Protection</th>

                                        <th className="dc-th-remote-access-infrastructure">VDI Solution</th>
                                        <th className="dc-th-remote-access-infrastructure">VPN Access Controls</th>
                                        <th className="dc-th-remote-access-infrastructure">ZTNA Access</th>
                                        <th className="dc-th-remote-access-infrastructure">Jump Hosts</th>
                                        <th className="dc-th-remote-access-infrastructure">Remote Access Policy</th>
                                        <th className="dc-th-remote-access-infrastructure">Session Isolation</th>
                                        <th className="dc-th-remote-access-infrastructure">Remote Access Monitoring</th>
                                        <th className="dc-th-remote-access-infrastructure">Privileged Access Management</th>

                                        <th className="dc-th-monitoring-compliance">Threat Monitoring</th>
                                        <th className="dc-th-monitoring-compliance">Availability Monitoring</th>
                                        <th className="dc-th-monitoring-compliance">Audit Logging</th>
                                        <th className="dc-th-monitoring-compliance">Penetration Testing</th>
                                        <th className="dc-th-monitoring-compliance">SOC Capability</th>
                                        <th className="dc-th-monitoring-compliance">Compliance Automation</th>
                                        <th className="dc-th-monitoring-compliance">Security Metrics</th>
                                        <th className="dc-th-monitoring-compliance">Audit Trail Retention</th>
                                        <th className="dc-th-monitoring-compliance">Change Management Integration</th>
                                        <th className="dc-th-monitoring-compliance">Security Testing Frequency</th>

                                        <th className="dc-th-data-lifecycle-management">Data Migration Strategy</th>
                                        <th className="dc-th-data-lifecycle-management">Data Downgrade Controls</th>
                                        <th className="dc-th-data-lifecycle-management">Data Versioning Strategy</th>
                                        <th className="dc-th-data-lifecycle-management">Data Redundancy Level</th>
                                        <th className="dc-th-data-lifecycle-management">HA/DR Testing Frequency</th>
                                        <th className="dc-th-data-lifecycle-management">Backup Strategy</th>
                                        <th className="dc-th-data-lifecycle-management">Backup Testing Frequency</th>
                                        <th className="dc-th-data-lifecycle-management">Backup Retention Period</th>
                                        <th className="dc-th-data-lifecycle-management">Data Retention Policy</th>
                                        <th className="dc-th-data-lifecycle-management">Archive Policy</th>
                                        <th className="dc-th-data-lifecycle-management">EOL Process</th>
                                        <th className="dc-th-data-lifecycle-management">Data Disposal Method</th>

                                        <th className="dc-th-compliance-governance">Compliance Requirements</th>
                                        <th className="dc-th-compliance-governance">Business Impact Level</th>
                                        <th className="dc-th-compliance-governance">Availability SLO</th>
                                        <th className="dc-th-compliance-governance">RTO</th>
                                        <th className="dc-th-compliance-governance">RPO</th>
                                        <th className="dc-th-compliance-governance">Incident Response</th>
                                        <th className="dc-th-compliance-governance">Architecture Governance</th>
                                        <th className="dc-th-compliance-governance">Third-Party Risk Management</th>
                                        <th className="dc-th-compliance-governance">DPA Status</th>
                                        <th className="dc-th-compliance-governance">Regulatory Reporting</th>
                                        <th className="dc-th-compliance-governance">Audit Frequency</th>
                                        <th className="dc-th-compliance-governance">Data Residency</th>

                                        <th className="dc-th-privacy-engineering">Privacy By Design</th>
                                        <th className="dc-th-privacy-engineering">Automated Privacy Controls & PETs</th>
                                        <th className="dc-th-privacy-engineering">Data Minimisation</th>
                                        <th className="dc-th-privacy-engineering">App Data Collection Limitations</th>
                                        <th className="dc-th-privacy-engineering">App Solicited Unsolicited</th>
                                        <th className="dc-th-privacy-engineering">App Collection Notice</th>
                                        <th className="dc-th-privacy-engineering">App Notification Requirements</th>
                                        <th className="dc-th-privacy-engineering">App Third Party Collection</th>                                   
                                        <th className="dc-th-privacy-engineering">Cross-Border Data Transfer Compliance</th>
                                        <th className="dc-th-privacy-engineering">Consent Management</th>
                                        <th className="dc-th-privacy-engineering">Consent Withdrawal Mechanism</th>
                                        <th className="dc-th-privacy-engineering">App Customer Access</th>
                                        <th className="dc-th-privacy-engineering">App Data Correction</th>
                                        <th className="dc-th-privacy-engineering">App Data Retention Disposal</th>
                                        <th className="dc-th-privacy-engineering">Right To Erasure</th>
                                        <th className="dc-th-privacy-engineering">Privacy Training & Awareness</th> 
                                        <th className="dc-th-privacy-engineering">Copyright & Fair Use Compliance</th>
                                        <th className="dc-th-privacy-engineering">Indigenous Data Sovereignty</th>
                                        <th className="dc-th-privacy-engineering">Accessibility Compliance</th>
                                        <th className="dc-th-privacy-engineering">Assistive Technology Support</th>
                                        <th className="dc-th-privacy-engineering">Inclusive Data Access Design</th>
                                        <th className="dc-th-privacy-engineering">Workplace Accessibility Accommodation</th>

                                        <th className="dc-th-zero-trust-cloud">Data Microsegmentation</th>
                                        <th className="dc-th-zero-trust-cloud">Container Data Protection</th>
                                        <th className="dc-th-zero-trust-cloud">Multi Cloud Data Governance</th>
                                        <th className="dc-th-zero-trust-cloud">IAC Security Scanning</th>
                                        <th className="dc-th-zero-trust-cloud">Continuous Verification</th>
                                        <th className="dc-th-zero-trust-cloud">Just-in-Time Data Access</th>
                                        <th className="dc-th-zero-trust-cloud">Risk-Based Authentication</th>
                                        <th className="dc-th-zero-trust-cloud">Device Trust Verification</th>
                                        <th className="dc-th-zero-trust-cloud">Serverless Data Security</th>
                                        <th className="dc-th-zero-trust-cloud">Cloud DSPM for Data Assets</th>
                                        <th className="dc-th-zero-trust-cloud">Cloud Egress & Private Connectivity</th>
                                        <th className="dc-th-zero-trust-cloud">Cloud Ingress & Public Exposure</th>
                                        <th className="dc-th-zero-trust-cloud">Workload Identity Federation</th>

                                        <th className="dc-th-ai-ml">Training Data Protection</th>
                                        <th className="dc-th-ai-ml">AI Governance</th>
                                        <th className="dc-th-ai-ml">AI Model Explainability</th>
                                        <th className="dc-th-ai-ml">Algorithmic Bias Detection</th>
                                        <th className="dc-th-ai-ml">AI Model Cards</th>
                                        <th className="dc-th-ai-ml">Human-in-the-Loop AI</th>
                                        <th className="dc-th-ai-ml">Model Output Monitoring</th>
                                        <th className="dc-th-ai-ml">AI Safety & Adversarial</th>
                                        <th className="dc-th-ai-ml">AI Data Lineage</th>
                                        <th className="dc-th-ai-ml">Model Versioning & Rollback</th>
                                        <th className="dc-th-ai-ml">AI Model Drift Detection</th>
                                        <th className="dc-th-ai-ml">Third-Party AI Risk</th>
                                        <th className="dc-th-ai-ml">AI Supply Chain Transparency</th>

                                        <th className="dc-th-supply-chain">Third Party Data Processing</th>
                                        <th className="dc-th-supply-chain">Supply Chain Data Mapping</th>
                                        <th className="dc-th-supply-chain">Build Provenance & Signing</th>
                                        <th className="dc-th-supply-chain">Secure Development Practices (SSDF)</th>
                                        <th className="dc-th-supply-chain">VDP & Patch SLAs</th>
                                        <th className="dc-th-supply-chain">Supplier Security Assurance</th>
                                        <th className="dc-th-supply-chain">Dependency Policy Enforcement</th>
                                        <th className="dc-th-supply-chain">Runtime Supply Chain Controls</th>
                                        <th className="dc-th-supply-chain">Fourth-Party Flowdown & Oversight</th>
                                        <th className="dc-th-supply-chain">Data Residency & Sovereignty</th>
                                        <th className="dc-th-supply-chain">Third-Party Access Architecture</th>
                                        <th className="dc-th-supply-chain">Incident/Breach Notification</th>
                                        <th className="dc-th-supply-chain">Vendor Stability & Market Position</th>

                                        <th className="dc-th-advanced-quantum">Insider Threat Detection</th>
                                        <th className="dc-th-advanced-quantum">UEBA Data Operations</th>
                                        <th className="dc-th-advanced-quantum">Post Quantum Cryptography</th>
                                        <th className="dc-th-advanced-quantum">Crypto Agility</th>
                                        <th className="dc-th-advanced-quantum">Threat Intelligence Integration</th>
                                        <th className="dc-th-advanced-quantum">Ransomware Defense</th>
                                        <th className="dc-th-advanced-quantum">Deception Technologies</th>
                                        <th className="dc-th-advanced-quantum">Homomorphic Computing</th>
                                        <th className="dc-th-advanced-quantum">Key Lifecycle</th>

                                        <th className="dc-th-data-democratisation">Data Access Governance</th>
                                        <th className="dc-th-data-democratisation">Self Service Data Access</th>
                                        <th className="dc-th-data-democratisation">Data Access Balancing</th>
                                        <th className="dc-th-data-democratisation">Data Literacy Programs</th>
                                        <th className="dc-th-data-democratisation">Controlled Data Sharing</th>
                                        <th className="dc-th-data-democratisation">Data Catalog & Discovery</th>
                                        <th className="dc-th-data-democratisation">Dynamic Masking</th>
                                        <th className="dc-th-data-democratisation">Access Request Workflow</th>
                                        <th className="dc-th-data-democratisation">Usage Analytics</th>
                                        <th className="dc-th-data-democratisation">Entitlement Model</th>
                                        <th className="dc-th-data-democratisation">Access Recertification</th>

                                        <th className="dc-th-modern-data-security">Data Discovery Automation</th>
                                        <th className="dc-th-modern-data-security">Sensitive Data Scanning</th>
                                        <th className="dc-th-modern-data-security">Content Based Classification</th>
                                        <th className="dc-th-modern-data-security">DSPM</th>
                                        <th className="dc-th-modern-data-security">DLP Automation</th>
                                        <th className="dc-th-modern-data-security">Data Labeling & Tagging</th>
                                        <th className="dc-th-modern-data-security">Policy Enforcement Automation</th>
                                        <th className="dc-th-modern-data-security">SOAR for Data</th>
                                        <th className="dc-th-modern-data-security">Automated Compliance Reporting</th>
                                        <th className="dc-th-modern-data-security">Automated Data Lifecycle</th>
                                        <th className="dc-th-modern-data-security">API Security & Monitoring</th>

                                        <th className="dc-th-data-governance">Data Lineage Tracking</th>
                                        <th className="dc-th-data-governance">Record Primacy Management</th>
                                        <th className="dc-th-data-governance">Data Quality Controls</th>
                                        <th className="dc-th-data-governance">Metadata Management</th>
                                        <th className="dc-th-data-governance">Data Stewardship Program</th>
                                        <th className="dc-th-data-governance">Data Governance Framework</th>
                                        <th className="dc-th-data-governance">Data Flow Documentation</th>
                                        <th className="dc-th-data-governance">Reporting Analytics Governance</th>
                                        <th className="dc-th-data-governance">Data Ownership & Accountability</th>
                                        <th className="dc-th-data-governance">Data Standards & Conventions</th>
                                        <th className="dc-th-data-governance">Business Glossary</th>
                                        <th className="dc-th-data-governance">Governance Council</th>
                                        <th className="dc-th-data-governance">Issue & Exception Mgmt</th>
                                        <th className="dc-th-data-governance">Data Value & ROI</th>
                                        <th className="dc-th-data-governance">Data Ethics</th>                                        
                                        
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
                                                <span className={`dc-classification-badge dc-${entry.dataSensitivity?.toLowerCase()}`}>
                                                    {entry.dataSensitivity}
                                                </span>
                                            </td>
                                            <td className="dc-td-details">
                                                <span className={`dc-classification-badge dc-${entry.dataCriticality?.toLowerCase()}`}>
                                                    {entry.dataCriticality}
                                                </span>
                                            </td>
                                            <td className="dc-td-details">
                                                <span className={`dc-classification-badge dc-${entry.dataClassification?.toLowerCase()}`}>
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
                                            <td className="dc-td-security-controls">{Array.isArray(entry.databaseEncryption) ? entry.databaseEncryption.join(', ') : (entry.databaseEncryption || '')}</td>
                                            <td className="dc-td-security-controls">{entry.encryptionCipher}</td>
                                            <td className="dc-td-security-controls">{entry.hashAlgorithm}</td>
                                            <td className="dc-td-security-controls">{entry.keyManagement}</td>
                                            <td className="dc-td-security-controls">{Array.isArray(entry.keyManagementProcesses) ? entry.keyManagementProcesses.join(', ') : (entry.keyManagementProcesses || '')}</td>
                                            <td className="dc-td-security-controls">{Array.isArray(entry.secretsManagement) ? entry.secretsManagement.join(', ') : (entry.secretsManagement || '')}</td>

                                            <td className="dc-td-access-control">{Array.isArray(entry.authentication) ? entry.authentication.join(', ') : (entry.authentication || '')}</td>
                                            <td className="dc-td-access-control">{Array.isArray(entry.authorisation) ? entry.authorisation.join(', ') : (entry.authorisation || '')}</td>
                                            <td className="dc-td-access-control">{Array.isArray(entry.identityManagement) ? entry.identityManagement.join(', ') : (entry.identityManagement || '')}</td>
                                            <td className="dc-td-access-control">{entry.specificAccessControls}</td>
                                            
                                            <td className="dc-td-advanced-security-controls">{Array.isArray(entry.wafControls) ? entry.wafControls.join(', ') : (entry.wafControls || '')}</td>
                                            <td className="dc-td-advanced-security-controls">{Array.isArray(entry.apiSecurityGateway) ? entry.apiSecurityGateway.join(', ') : (entry.apiSecurityGateway || '')}</td>
                                            <td className="dc-td-advanced-security-controls">{Array.isArray(entry.dlpControls) ? entry.dlpControls.join(', ') : (entry.dlpControls || '')}</td>
                                            <td className="dc-td-advanced-security-controls">{entry.privilegedSessionManagement}</td>
                                            <td className="dc-td-advanced-security-controls">{entry.threatIntelligenceIntegration}</td>
                                            <td className="dc-td-advanced-security-controls">{Array.isArray(entry.threatModeling) ? entry.threatModeling.join(', ') : (entry.threatModeling || '')}</td>
                                            <td className="dc-td-advanced-security-controls">{entry.soar}</td>
                                            <td className="dc-td-advanced-security-controls">{entry.siem}</td>
                                            <td className="dc-td-advanced-security-controls">{entry.casbControls}</td>
                                            <td className="dc-td-advanced-security-controls">{entry.sseControls}</td>
                                            <td className="dc-td-advanced-security-controls">{Array.isArray(entry.cloudNetworkSecurity) ? entry.cloudNetworkSecurity.join(', ') : (entry.cloudNetworkSecurity || '')}</td>
                                            <td className="dc-td-advanced-security-controls">{entry.sdwanControls}</td>
                                            <td className="dc-td-advanced-security-controls">{entry.saseArchitecture}</td>
                                            <td className="dc-td-advanced-security-controls">{entry.zeroTrustMaturity}</td>
                                            <td className="dc-td-advanced-security-controls">{Array.isArray(entry.networkSecurity) ? entry.networkSecurity.join(', ') : (entry.networkSecurity || '')}</td>
                                            <td className="dc-td-advanced-security-controls">{entry.protocolGapCoverage}</td>
                                            
                                            <td className="dc-td-application-security-controls">{entry.antivirusControls}</td>
                                            <td className="dc-td-application-security-controls">{entry.vulnerabilityScanning}</td>
                                            <td className="dc-td-application-security-controls">{Array.isArray(entry.applicationTesting) ? entry.applicationTesting.join(', ') : (entry.applicationTesting || '')}</td>
                                            <td className="dc-td-application-security-controls">{Array.isArray(entry.applicationSecurityTesting) ? entry.applicationSecurityTesting.join(', ') : (entry.applicationSecurityTesting || '')}</td>
                                            <td className="dc-td-application-security-controls">{Array.isArray(entry.ciCdPipelineSecurity) ? entry.ciCdPipelineSecurity.join(', ') : (entry.ciCdPipelineSecurity || '')}</td>
                                            <td className="dc-td-application-security-controls">{entry.applicationLogging}</td>
                                            <td className="dc-td-application-security-controls">{Array.isArray(entry.secureHeadersTransport) ? entry.secureHeadersTransport.join(', ') : (entry.secureHeadersTransport || '')}</td>
                                            <td className="dc-td-application-security-controls">{entry.sessionManagementHardening}</td>
                                            <td className="dc-td-application-security-controls">{entry.certificateLifecycle}</td>
                                            <td className="dc-td-application-security-controls">{entry.applicationControl}</td>
                                            <td className="dc-td-application-security-controls">{Array.isArray(entry.patchManagement) ? entry.patchManagement.join(', ') : (entry.patchManagement || '')}</td>
                                            <td className="dc-td-application-security-controls">{Array.isArray(entry.codeIntegrity) ? entry.codeIntegrity.join(', ') : (entry.codeIntegrity || '')}</td>
                                            <td className="dc-td-application-security-controls">{Array.isArray(entry.sca) ? entry.sca.join(', ') : (entry.sca || '')}</td>
                                            <td className="dc-td-application-security-controls">{Array.isArray(entry.ossLicenceCompliance) ? entry.ossLicenceCompliance.join(', ') : (entry.ossLicenceCompliance || '')}</td>
                                            <td className="dc-td-application-security-controls">{Array.isArray(entry.secretsScanningRepos) ? entry.secretsScanningRepos.join(', ') : (entry.secretsScanningRepos || '')}</td>
                                            <td className="dc-td-application-security-controls">{Array.isArray(entry.ciCdPipelineSecurity) ? entry.ciCdPipelineSecurity.join(', ') : (entry.ciCdPipelineSecurity || '')}</td>
                                            <td className="dc-td-application-security-controls">{Array.isArray(entry.osHardening) ? entry.osHardening.join(', ') : (entry.osHardening || '')}</td>
                                            <td className="dc-td-application-security-controls">{Array.isArray(entry.osEncryption) ? entry.osEncryption.join(', ') : (entry.osEncryption || '')}</td>
                                            <td className="dc-td-application-security-controls">{entry.mdmControls}</td>
                                            <td className="dc-td-application-security-controls">{entry.mamControls}</td>
                                            <td className="dc-td-application-security-controls">{entry.byodPolicy}</td>
                                            <td className="dc-td-application-security-controls">{Array.isArray(entry.mobileDataProtection) ? entry.mobileDataProtection.join(', ') : (entry.mobileDataProtection || '')}</td>
                                            
                                            <td className="dc-td-remote-access-infrastructure">{Array.isArray(entry.vdiSolution) ? entry.vdiSolution.join(', ') : (entry.vdiSolution || '')}</td>
                                            <td className="dc-td-remote-access-infrastructure">{Array.isArray(entry.vpnAccessControls) ? entry.vpnAccessControls.join(', ') : (entry.vpnAccessControls || '')}</td>
                                            <td className="dc-td-remote-access-infrastructure">{Array.isArray(entry.ztnaAccess) ? entry.ztnaAccess.join(', ') : (entry.ztnaAccess || '')}</td>
                                            <td className="dc-td-remote-access-infrastructure">{entry.jumpHosts}</td>
                                            <td className="dc-td-remote-access-infrastructure">{Array.isArray(entry.remoteAccessPolicy) ? entry.remoteAccessPolicy.join(', ') : (entry.remoteAccessPolicy || '')}</td>
                                            <td className="dc-td-remote-access-infrastructure">{entry.sessionIsolation}</td>
                                            <td className="dc-td-remote-access-infrastructure">{entry.remoteAccessMonitoring}</td>
                                            <td className="dc-td-remote-access-infrastructure">{entry.privilegedAccessManagement}</td>
                                            
                                            <td className="dc-td-monitoring-compliance">{entry.threatMonitoring}</td>
                                            <td className="dc-td-monitoring-compliance">{Array.isArray(entry.availabilityMonitoring) ? entry.availabilityMonitoring.join(', ') : (entry.availabilityMonitoring || '')}</td>
                                            <td className="dc-td-monitoring-compliance">{entry.auditLogging}</td>
                                            <td className="dc-td-monitoring-compliance">{entry.penetrationTesting}</td>
                                            <td className="dc-td-monitoring-compliance">{entry.socCapability}</td>
                                            <td className="dc-td-monitoring-compliance">{entry.complianceAutomation}</td>
                                            <td className="dc-td-monitoring-compliance">{Array.isArray(entry.securityMetrics) ? entry.securityMetrics.join(', ') : (entry.securityMetrics || '')}</td>
                                            <td className="dc-td-monitoring-compliance">{entry.auditTrailRetention}</td>
                                            <td className="dc-td-monitoring-compliance">{entry.changeManagementIntegration}</td>
                                            <td className="dc-td-monitoring-compliance">{entry.securityTestingFrequency}</td>
                                            
                                            <td className="dc-td-data-lifecycle-management">{entry.dataMigrationStrategy}</td>
                                            <td className="dc-td-data-lifecycle-management">{entry.dataDowngradeControls}</td>
                                            <td className="dc-td-data-lifecycle-management">{entry.dataVersioningStrategy}</td>
                                            <td className="dc-td-data-lifecycle-management">{entry.dataRedundancyLevel}</td>
                                            <td className="dc-td-data-lifecycle-management">{entry.haDrTestingFrequency}</td>
                                            <td className="dc-td-data-lifecycle-management">{entry.backupStrategy}</td>
                                            <td className="dc-td-data-lifecycle-management">{entry.backupTestingFrequency}</td>
                                            <td className="dc-td-data-lifecycle-management">{entry.backupRetentionPeriod}</td>
                                            <td className="dc-td-data-lifecycle-management">{entry.dataRetentionPolicy}</td>
                                            <td className="dc-td-data-lifecycle-management">{entry.archivePolicy}</td>
                                            <td className="dc-td-data-lifecycle-management">{entry.dataEolProcess}</td>
                                            <td className="dc-td-data-lifecycle-management">{entry.dataDisposalMethod}</td>
                                            
                                            <td className="dc-td-compliance-governance">{entry.complianceRequirements}</td>
                                            <td className="dc-td-compliance-governance">{entry.businessImpactLevel}</td>
                                            <td className="dc-td-compliance-governance">{entry.availabilitySLO}</td>
                                            <td className="dc-td-compliance-governance">{entry.rto}</td>
                                            <td className="dc-td-compliance-governance">{entry.rpo}</td>
                                            <td className="dc-td-compliance-governance">{entry.incidentResponse}</td>
                                            <td className="dc-td-compliance-governance">{entry.architectureGovernance}</td>
                                            <td className="dc-td-compliance-governance">{Array.isArray(entry.thirdPartyRiskManagement) ? entry.thirdPartyRiskManagement.join(', ') : (entry.thirdPartyRiskManagement || '')}</td>
                                            <td className="dc-td-compliance-governance">{entry.dpaStatus}</td>
                                            <td className="dc-td-compliance-governance">{entry.regulatoryReporting}</td>
                                            <td className="dc-td-compliance-governance">{entry.auditFrequency}</td>
                                            <td className="dc-td-compliance-governance">{entry.dataResidency}</td>
                                            
                                            <td className="dc-td-privacy-engineering">{entry.privacyByDesign}</td>
                                            <td className="dc-td-privacy-engineering">{entry.automatedPrivacyControlsPets}</td>
                                            <td className="dc-td-privacy-engineering">{entry.dataMinimisation}</td>
                                            <td className="dc-td-privacy-engineering">{entry.appDataCollectionLimitations}</td>
                                            <td className="dc-td-privacy-engineering">{entry.appSolicitedUnsolicited}</td>
                                            <td className="dc-td-privacy-engineering">{entry.appCollectionNotice}</td>
                                            <td className="dc-td-privacy-engineering">{entry.appNotificationRequirements}</td>
                                            <td className="dc-td-privacy-engineering">{entry.appThirdPartyCollection}</td>                                     
                                            <td className="dc-td-privacy-engineering">{entry.crossBorderDataTransferCompliance}</td>
                                            <td className="dc-td-privacy-engineering">{entry.consentManagement}</td>
                                            <td className="dc-td-privacy-engineering">{entry.consentWithdrawalMechanism}</td>
                                            <td className="dc-td-privacy-engineering">{entry.appCustomerAccess}</td>
                                            <td className="dc-td-privacy-engineering">{entry.appDataCorrection}</td>
                                            <td className="dc-td-privacy-engineering">{entry.appDataRetentionDisposal}</td>
                                            <td className="dc-td-privacy-engineering">{entry.rightToErasure}</td>
                                            <td className="dc-td-privacy-engineering">{entry.privacyTrainingAwareness}</td>
                                            <td className="dc-td-privacy-engineering">{Array.isArray(entry.copyrightFairUseCompliance) ? entry.copyrightFairUseCompliance.join(', ') : (entry.copyrightFairUseCompliance || '')}</td>
                                            <td className="dc-td-privacy-engineering">{Array.isArray(entry.indigenousDataSovereignty) ? entry.indigenousDataSovereignty.join(', ') : (entry.indigenousDataSovereignty || '')}</td>
                                            <td className="dc-td-privacy-engineering">{entry.accessibilityCompliance}</td>
                                            <td className="dc-td-privacy-engineering">{Array.isArray(entry.assistiveTechnologySupport) ? entry.assistiveTechnologySupport.join(', ') : (entry.assistiveTechnologySupport || '')}</td>
                                            <td className="dc-td-privacy-engineering">{Array.isArray(entry.inclusiveDataAccessDesign) ? entry.inclusiveDataAccessDesign.join(', ') : (entry.inclusiveDataAccessDesign || '')}</td>
                                            <td className="dc-td-privacy-engineering">{Array.isArray(entry.workplaceAccessibilityAccommodation) ? entry.workplaceAccessibilityAccommodation.join(', ') : (entry.workplaceAccessibilityAccommodation || '')}</td>

                                            <td className="dc-td-zero-trust-cloud">{entry.dataMicrosegmentation}</td>
                                            <td className="dc-td-zero-trust-cloud">{Array.isArray(entry.containerDataProtection) ? entry.containerDataProtection.join(', ') : (entry.containerDataProtection || '')}</td>
                                            <td className="dc-td-zero-trust-cloud">{entry.multiCloudDataGovernance}</td>
                                            <td className="dc-td-zero-trust-cloud">{entry.iacSecurityScanning}</td>
                                            <td className="dc-td-zero-trust-cloud">{entry.continuousVerification}</td>
                                            <td className="dc-td-zero-trust-cloud">{entry.justInTimeDataAccess}</td>
                                            <td className="dc-td-zero-trust-cloud">{entry.riskBasedAuthentication}</td>
                                            <td className="dc-td-zero-trust-cloud">{entry.deviceTrustVerification}</td>
                                            <td className="dc-td-zero-trust-cloud">{entry.serverlessDataSecurity}</td>
                                            <td className="dc-td-zero-trust-cloud">{entry.cspmDataAssets}</td>
                                            <td className="dc-td-zero-trust-cloud">{entry.cloudEgressControls}</td>
                                            <td className="dc-td-zero-trust-cloud">{entry.cloudIngressControls}</td>
                                            <td className="dc-td-zero-trust-cloud">{entry.workloadIdentityFederation}</td>

                                            <td className="dc-td-ai-ml">{entry.trainingDataProtection}</td>
                                            <td className="dc-td-ai-ml">{entry.aiGovernance}</td>
                                            <td className="dc-td-ai-ml">{entry.aiModelExplainability}</td>
                                            <td className="dc-td-ai-ml">{entry.algorithmicBiasDetection}</td>
                                            <td className="dc-td-ai-ml">{entry.aiModelCards}</td>
                                            <td className="dc-td-ai-ml">{entry.humanInLoopAi}</td>
                                            <td className="dc-td-ai-ml">{entry.modelDataLeakagePrevention}</td>
                                            <td className="dc-td-ai-ml">{entry.aiSafetyAdversarial}</td>
                                            <td className="dc-td-ai-ml">{entry.aiDataLineage}</td>
                                            <td className="dc-td-ai-ml">{entry.modelVersioningRollback}</td>
                                            <td className="dc-td-ai-ml">{entry.aiModelDrift}</td>
                                            <td className="dc-td-ai-ml">{entry.thirdPartyAiRisk}</td>
                                            <td className="dc-td-ai-ml">{entry.aiSupplyChainTransparency}</td>

                                            <td className="dc-td-supply-chain">{entry.thirdPartyDataProcessing}</td>
                                            <td className="dc-td-supply-chain">{entry.supplyChainDataMapping}</td>
                                            <td className="dc-td-supply-chain">{entry.buildProvenanceSigning}</td>
                                            <td className="dc-td-supply-chain">{entry.secureDevPracticesSsdf}</td>
                                            <td className="dc-td-supply-chain">{entry.vulnerabilityDisclosureSla}</td>
                                            <td className="dc-td-supply-chain">{Array.isArray(entry.supplierSecurityAssurance) ? entry.supplierSecurityAssurance.join(', ') : (entry.supplierSecurityAssurance || '')}</td>
                                            <td className="dc-td-supply-chain">{entry.dependencyPolicyEnforcement}</td>
                                            <td className="dc-td-supply-chain">{entry.runtimeSupplyChainControls}</td>
                                            <td className="dc-td-supply-chain">{entry.fourthPartyFlowdown}</td>
                                            <td className="dc-td-supply-chain">{entry.dataResidencyRequirements}</td>
                                            <td className="dc-td-supply-chain">{entry.thirdPartyAccessArchitecture}</td>
                                            <td className="dc-td-supply-chain">{entry.incidentBreachNotification}</td>
                                            <td className="dc-td-supply-chain">{entry.vendorStabilityMarketPosition}</td>

                                            <td className="dc-td-advanced-quantum">{entry.insiderThreatDetection}</td>
                                            <td className="dc-td-advanced-quantum">{entry.uebaDataOperations}</td>
                                            <td className="dc-td-advanced-quantum">{entry.postQuantumCryptography}</td>
                                            <td className="dc-td-advanced-quantum">{entry.cryptoAgility}</td>
                                            <td className="dc-td-advanced-quantum">{entry.threatIntelligenceIntegration}</td>
                                            <td className="dc-td-advanced-quantum">{Array.isArray(entry.ransomwareDataExtortionDefense) ? entry.ransomwareDataExtortionDefense.join(', ') : (entry.ransomwareDataExtortionDefense || '')}</td>
                                            <td className="dc-td-advanced-quantum">{entry.deceptionTechnologiesData}</td>
                                            <td className="dc-td-advanced-quantum">{entry.homomorphicConfidentialComputing}</td>
                                            <td className="dc-td-advanced-quantum">{Array.isArray(entry.cryptographicKeyLifecycle) ? entry.cryptographicKeyLifecycle.join(', ') : (entry.cryptographicKeyLifecycle || '')}</td>
                                            
                                            <td className="dc-td-data-democratisation">{entry.dataAccessGovernance}</td>
                                            <td className="dc-td-data-democratisation">{entry.selfServiceDataAccess}</td>
                                            <td className="dc-td-data-democratisation">{entry.dataAccessBalancing}</td>
                                            <td className="dc-td-data-democratisation">{entry.dataLiteracyPrograms}</td>
                                            <td className="dc-td-data-democratisation">{entry.controlledDataSharing}</td>
                                            <td className="dc-td-data-democratisation">{entry.dataCatalogDiscovery}</td>
                                            <td className="dc-td-data-democratisation">{entry.dynamicDataMaskingSelfService}</td>
                                            <td className="dc-td-data-democratisation">{entry.dataAccessRequestWorkflow}</td>
                                            <td className="dc-td-data-democratisation">{entry.dataUsageAnalytics}</td>
                                            <td className="dc-td-data-democratisation">{entry.dataEntitlementModel}</td>
                                            <td className="dc-td-data-democratisation">{entry.dataAccessRecertification}</td>
                                            
                                            <td className="dc-td-modern-data-security">{entry.dataDiscoveryAutomation}</td>
                                            <td className="dc-td-modern-data-security">{entry.sensitiveDataScanning}</td>
                                            <td className="dc-td-modern-data-security">{entry.contentBasedClassification}</td>
                                            <td className="dc-td-modern-data-security">{entry.dataSecurityPostureManagement}</td>
                                            <td className="dc-td-modern-data-security">{entry.dlpAutomation}</td>
                                            <td className="dc-td-modern-data-security">{entry.dataLabelingTaggingAutomation}</td>
                                            <td className="dc-td-modern-data-security">{entry.dataPolicyEnforcementAutomation}</td>
                                            <td className="dc-td-modern-data-security">{entry.soarDataIncidents}</td>
                                            <td className="dc-td-modern-data-security">{entry.automatedComplianceReporting}</td>
                                            <td className="dc-td-modern-data-security">{entry.automatedDataLifecycle}</td>
                                            <td className="dc-td-modern-data-security">{entry.apiSecurityDataFlowMonitoring}</td>
                                            
                                            <td className="dc-td-data-governance">{entry.dataLineageTracking}</td>
                                            <td className="dc-td-data-governance">{entry.recordPrimacyManagement}</td>
                                            <td className="dc-td-data-governance">{entry.dataQualityControls}</td>
                                            <td className="dc-td-data-governance">{entry.metadataManagement}</td>
                                            <td className="dc-td-data-governance">{entry.dataStewardshipProgram}</td>
                                            <td className="dc-td-data-governance">{entry.dataGovernanceFramework}</td>
                                            <td className="dc-td-data-governance">{entry.dataFlowDocumentation}</td>
                                            <td className="dc-td-data-governance">{entry.reportingAnalyticsGovernance}</td>
                                            <td className="dc-td-data-governance">{entry.dataOwnershipAccountability}</td>
                                            <td className="dc-td-data-governance">{entry.dataStandardsConventions}</td>
                                            <td className="dc-td-data-governance">{entry.dataGlossaryBusinessTerms}</td>
                                            <td className="dc-td-data-governance">{entry.dataGovernanceCouncil}</td>
                                            <td className="dc-td-data-governance">{entry.dataIssueExceptionManagement}</td>
                                            <td className="dc-td-data-governance">{entry.dataValueRoiMeasurement}</td>
                                            <td className="dc-td-data-governance">{entry.dataEthicsResponsibleUse}</td>                                            
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
