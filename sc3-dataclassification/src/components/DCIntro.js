import React, { useState, useEffect } from 'react';
import "./DC.css";

const DCIntro = () => {     

    // Function to scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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
            onClick={scrollToTop}
            className="dc-back-to-top-button dc-back-to-top-floating"
            title="Back to top of page"
            aria-label="Back to top"
        >
            ↑
        </button>
        );
    };

    return (
        <>
            <details className="dc-intro-details">
                <summary className="dc-intro-summary">
                    📚 Data Classification Guidance and Preparation
                </summary>
                <p>
                <i>Data Classification</i> helps identify and evaluate the sensitivity, value, and importance of data within an organisation and the risk associated with the data. 
                This process is crucial for ensuring that data is handled appropriately, protecting sensitive information, and complying with legal and regulatory obligations. Data classification processes help safeguard the <b>Confidentiality</b>, <b>Integrity</b>, and <b>Availability</b> of data.
                </p>
                <div>
                    <p>Also see:</p>
                    <ul>
                        <li><em><a href="https://www.iso.org/standard/27001.html">ISO 27001</a></em> - Information Security Management</li>
                        <ul>
                            <li><em>ISO 27001:2022 Annex A</em> - Controls for Information Security Management</li>
                        </ul>
                        <li><em><a href="https://www.iso.org/standard/75652.html">ISO 27002</a></em> - Code of Practice for Information Security Controls</li>
                        <li><em><a href="https://www.iso.org/standard/56639.html">ISO 38505-1</a></em> - Data Governance Part 1: Framework for Data Governance</li>
                        <li><em><a href="https://www.iso.org/standard/70911.html">ISO 38505-2</a></em> - Data Governance Part 2: Guidelines for Data Management</li>
                        <li><em><a href="https://www.iso.org/standard/56643.html">ISO 38505-3</a></em> - Data Governance Part 3: Guidelines for Data Classification</li>
                    </ul>
                    <p>Other relevant standards and regulations include:</p>
                    <ul>
                        <li><em><a href="https://www.oaic.gov.au/privacy/australian-privacy-principles">Australian Privacy Principles</a></em> - Guidelines for the Collection, Use, and Disclosure of Personal Information</li>
                        <li><em><a href="https://gdpr-info.eu/">GDPR</a></em> - EU General Data Protection Regulation</li>
                        <li><em><a href="https://www.hhs.gov/hipaa/index.html">HIPAA</a></em> - US Health Insurance Portability and Accountability Act</li>
                        <li><em><a href="https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final">NIST SP 800-53</a></em> - Security and Privacy Controls for Information Systems and Organisations</li>
                        <li><em><a href="https://www.pcisecuritystandards.org/">PCI DSS</a></em> - Payment Card Industry Data Security Standard</li>
                    </ul>
                    <p>Addressing data security can be a daunting task. ISO 27001 Annex A alone has 93 security control measures specified for securing information assets. 
                        Data Classification falls within the broader scope of Information Security Management System (ISMS) and risk management. 
                        Securing digital data assets is facilitated by Information and Communication Technology (ICT) controls.</p>
                    <p>The various frameworks such as ISO 27001 provide useful checklists for implementing data classification and applicable controls. 
                        However, organisations should identify and apply the most relevant controls from these frameworks to match their specific needs rather than attempt to implement all controls blindly.
                        Information security is a capability that matures over time.</p>
                    <p>The actions for implementing a data classification process can be summarised in five steps:</p>
                    <ol>
                        <li><strong>🔍 Identification:</strong> Identify what data you have. An inventory of all data assets should be created, including who owns the data and where and how it is stored.</li>
                            <ul>
                                <li>It is also informative to document the data's purpose, the processes that are dependent on the data, and any applicable legal or regulatory requirements.</li>
                                <li><strong>Map system and process dependencies:</strong> Identify all systems, applications, business processes, and workflows that depend on each data asset. This helps assess business impact and plan for continuity.</li>
                                <li>Data can be classified by type, such as <strong>Personal Identifiable Information (PII)</strong>, <strong>financial data</strong>, <strong>intellectual property</strong>, <strong>healthcare/medical data</strong>, <strong>customer data</strong>, <strong>employee data</strong>, <strong>operational data</strong>, <strong>technical data</strong>, <strong>strategic/business data</strong>, <strong>regulatory/compliance data</strong>, <strong>research & development</strong>, <strong>legal documents</strong>, or <strong>marketing data</strong>, which may inform its data sensitivity classification.</li>
                                <li>Understanding the data type helps determine appropriate security controls and compliance requirements (e.g., GDPR for PII, PCI DSS for payment data, HIPAA for healthcare data).</li>
                            </ul>
                        <li><strong>📊 Classification Scheme:</strong> Create a data classification scheme that defines the categories and levels of sensitivity for your data.</li>
                        <ul>
                            <li>Common categories include <b>public</b>, <b>internal</b>, <b>confidential</b>, and <b>restricted</b>, but more complex organisations may require more granular classifications.</li>
                            <li>Each category should have clear definitions and criteria for classification.</li>
                            <li>Consider using a tiered approach to classification, where data is assigned a level of sensitivity based on its potential impact if compromised.</li>
                            <li>The classifications should be aligned with the organisation's overall risk management framework.</li>
                            <li>Implement a process for reviewing and updating classifications as needed.</li>
                        </ul>
                        <li><strong>🏷️ Labelling:</strong> Label data according to its data classification.</li>
                        <ul>
                            <li>The asset owner is responsible for labelling the data according to its classification.</li>
                            <li>Use labels aligned with the classification scheme to indicate the sensitivity level of the data.</li>
                            <li>Labels can be physical (e.g., on paper documents) or digital (e.g., metadata, file names).</li>
                            <li>Ensure that labels are visible, easily understood, and consistently applied by all users who handle the data.</li>
                            <li>Provide training and guidance to employees on the importance of data classification and proper labelling practices.</li>
                            <li>Establish a process for reporting and addressing labelling issues or inconsistencies.</li>
                            <li>Consider using automated tools to assist with labelling, especially for large volumes of data.</li>
                            <li>Ensure that labels are updated when data is moved, copied, or modified.</li>
                                <ul>
                                    <li>Implement version control for labels to track changes over time.</li>
                                    <li>Establish a process for re-evaluating data classifications when data is altered.</li>
                                </ul>
                            <li>Capture the data classification decisions and rationale for future reference.</li>
                            <li>Capture the data classification in business requirements, processes, and procedures.</li>
                        </ul>
                        <li><strong>🛡️ Handling:</strong> Establish procedures for handling data based on its classification.</li>
                        <ul>
                            <li>ISO 27001 has four categories of controls: Organisational, People, Physical, and Technological. These can be useful for structuring a data handling framework.</li>
                            <ul>
                                <li><strong>Organisational</strong> controls include policies, procedures, and governance structures to manage data classification.</li>
                                <li><strong>People</strong> controls involve training, awareness, and roles and responsibilities for data handling.</li>
                                <li><strong>Physical</strong> controls include secure storage, access controls, and environmental protections for data.</li>
                                <li><strong>Technological</strong> controls involve encryption, access controls, and monitoring systems to protect data.</li>
                            </ul>
                            <li>Define roles and responsibilities for data handling based on classification levels.</li>
                            <li>Classify data on creation</li>
                            <li>Implement access controls to restrict data access based on classification - use the <strong>principle of least privilege</strong> and the <strong>separation of duties</strong> principle</li>
                            <ul>
                                <li>Use role-based access controls (RBAC) to enforce data access policies.</li>
                                <li>Regularly review and update access permissions to ensure they align with current classification levels.</li>
                                <li>Implement multi-factor authentication (MFA) for accessing sensitive data.</li>
                                <li>Monitor access to sensitive data and log any unauthorised access attempts.</li>
                                <li>Establish a process for reviewing and revoking access to sensitive data when no longer needed.</li>
                                <li>Implement a process for reporting and addressing security incidents related to sensitive data.</li>
                                <li>Ensure that staff have sufficient access to the data required to perform their job functions based on their roles and responsibilities.</li>
                            </ul>
                            <li>Develop procedures for data storage, transmission, and disposal based on classification.</li>
                            <li>Ensure that data is encrypted or protected according to its classification level.</li>
                            <li><strong>Database-specific protection:</strong> Implement appropriate database encryption (TDE, column-level, row-level security), data obfuscation (tokenization, masking), and ensure production data protection in non-production environments through data masking, synthetic data generation, or tokenization.</li>
                            <li>Integrate data classification into the system development lifecycle (SDLC) to ensure it is considered throughout the development process.</li>
                            <li>Establish procedures for securely sharing and transferring data.</li>
                            <li>Implement data loss prevention (DLP) measures to protect sensitive data.</li>
                            <li>Conduct regular security training for employees on data handling best practices.</li>
                            <li>Ensure access audits are conducted regularly to verify compliance with data handling procedures.</li>
                        </ul>
                        <li><strong>✅ Compliance:</strong> Ensure compliance with relevant laws and regulations.</li>
                        <ul>
                            <li>Stay informed about applicable data protection laws and regulations (e.g., APP, Essential Eight, GDPR, PCI DSS, etc).</li>
                            <li>Conduct regular audits to assess compliance with data classification policies and procedures.</li>
                            <li>Implement a process for reporting and addressing compliance violations.</li>
                            <li><strong>Document assessment accountability:</strong> Record who conducted each data classification assessment and when it was performed to ensure responsibility and enable follow-up questions during audits or reviews.</li>
                            <li><strong>Track assessment currency:</strong> Maintain records of assessment dates to identify when classifications may need updating and to demonstrate due diligence in compliance reviews.</li>
                        </ul>
                    </ol>
                    
                    <h4>📋 Data Classification Matrix</h4>
                    <p>The following table provides guidance on classifying different types of assets based on their sensitivity and potential impact if compromised. 
                    The risk impact levels correspond to organisational risk classifications: <span className="dc-risk-low">Low</span>, <span className="dc-risk-medium">Medium</span>, <span className="dc-risk-high">High</span>, and <span className="dc-risk-critical">Critical</span>.</p>
                    
                    <div className="dc-classification-table-wrapper">
                        {/* Outer wrapper for horizontal scroll so that scroll bar does not hide the last row - works for Chrome and Edge, not for Firefox */}
                        <div className="dc-classification-table-scroll">
                            <table className="dc-classification-matrix">
                                <thead>
                                    <tr>
                                        <th rowSpan="2">Asset Type</th>
                                        <th colSpan="2" className="dc-classification-header-public">🌐 Public</th>
                                        <th colSpan="2" className="dc-classification-header-internal">🏢 Internal</th>
                                        <th colSpan="2" className="dc-classification-header-confidential">🔒 Confidential</th>
                                        <th colSpan="2" className="dc-classification-header-restricted">🚫 Restricted</th>
                                    </tr>
                                    <tr>
                                        <th className="dc-classification-header-public">Examples</th>
                                        <th className="dc-classification-header-public">Risk Impact</th>
                                        <th className="dc-classification-header-internal">Examples</th>
                                        <th className="dc-classification-header-internal">Risk Impact</th>
                                        <th className="dc-classification-header-confidential">Examples</th>
                                        <th className="dc-classification-header-confidential">Risk Impact</th>
                                        <th className="dc-classification-header-restricted">Examples</th>
                                        <th className="dc-classification-header-restricted">Risk Impact</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>📄 Printed Media</strong></td>
                                        <td>Marketing materials, public reports, job postings</td>
                                        <td><span className="dc-risk-low">Low</span><br/>No business impact</td>
                                        <td>Internal memos, meeting minutes, organisational charts</td>
                                        <td><span className="dc-risk-medium">Medium</span><br/>Minor operational disruption</td>
                                        <td>Contract drafts, financial reports, HR policies</td>
                                        <td><span className="dc-risk-high">High</span><br/>Competitive disadvantage, legal issues</td>
                                        <td>Classified documents, legal proceedings, trade secrets</td>
                                        <td><span className="dc-risk-critical">Critical</span><br/>Severe legal exposure, business failure</td>
                                    </tr>
                                    <tr>
                                        <td><strong>💾 Digital Files</strong></td>
                                        <td>Website content, press releases, product brochures</td>
                                        <td><span className="dc-risk-low">Low</span><br/>No business impact</td>
                                        <td>Project documentation, internal presentations, procedures</td>
                                        <td><span className="dc-risk-medium">Medium</span><br/>Process inefficiency, minor delays</td>
                                        <td>Customer databases, financial data, strategic plans</td>
                                        <td><span className="dc-risk-high">High</span><br/>Customer loss, regulatory fines</td>
                                        <td>Encryption keys, source code, merger documents</td>
                                        <td><span className="dc-risk-critical">Critical</span><br/>System compromise, market manipulation</td>
                                    </tr>
                                    <tr>
                                        <td><strong>🗄️ Database Data</strong></td>
                                        <td>Product catalogues, public reference data</td>
                                        <td><span className="dc-risk-low">Low</span><br/>No business impact</td>
                                        <td>Employee directories, inventory data, operational metrics</td>
                                        <td><span className="dc-risk-medium">Medium</span><br/>Privacy concerns, operational issues</td>
                                        <td>Customer records, payment information, performance data</td>
                                        <td><span className="dc-risk-high">High</span><br/>GDPR violations, customer lawsuits</td>
                                        <td>Authentication data, personal health records, trade secrets</td>
                                        <td><span className="dc-risk-critical">Critical</span><br/>Identity theft, massive legal liability</td>
                                    </tr>
                                    <tr>
                                        <td><strong>📧 Emails</strong></td>
                                        <td>Marketing campaigns, public announcements</td>
                                        <td><span className="dc-risk-low">Low</span><br/>No business impact</td>
                                        <td>Team communications, project updates, routine correspondence</td>
                                        <td><span className="dc-risk-medium">Medium</span><br/>Internal confusion, minor reputation impact</td>
                                        <td>Contract negotiations, financial discussions, HR matters</td>
                                        <td><span className="dc-risk-high">High</span><br/>Deal failures, employment disputes</td>
                                        <td>Legal communications, merger discussions, incident reports</td>
                                        <td><span className="dc-risk-critical">Critical</span><br/>Market manipulation, regulatory sanctions</td>
                                    </tr>
                                    <tr>
                                        <td><strong>☁️ Cloud Storage</strong></td>
                                        <td>Public repositories, shared resources, documentation</td>
                                        <td><span className="dc-risk-low">Low</span><br/>No business impact</td>
                                        <td>Team drives, project files, internal wikis</td>
                                        <td><span className="dc-risk-medium">Medium</span><br/>Work disruption, knowledge loss</td>
                                        <td>Customer data, financial records, proprietary documents</td>
                                        <td><span className="dc-risk-high">High</span><br/>Data breach notifications, compliance violations</td>
                                        <td>Backup encryption keys, compliance data, legal files</td>
                                        <td><span className="dc-risk-critical">Critical</span><br/>Complete system exposure, business extinction</td>
                                    </tr>
                                    <tr>
                                        <td><strong>📱 Mobile Devices</strong></td>
                                        <td>Public apps, marketing content, general information</td>
                                        <td><span className="dc-risk-low">Low</span><br/>No business impact</td>
                                        <td>Corporate apps, internal communications, work files</td>
                                        <td><span className="dc-risk-medium">Medium</span><br/>Productivity loss, minor security incidents</td>
                                        <td>Customer access apps, financial data, VPN access</td>
                                        <td><span className="dc-risk-high">High</span><br/>Network intrusion, financial fraud</td>
                                        <td>Administrative access, encryption certificates, secure tokens</td>
                                        <td><span className="dc-risk-critical">Critical</span><br/>Complete infrastructure compromise</td>
                                    </tr>
                                    <tr>
                                        <td><strong>🖥️ Systems/Applications</strong></td>
                                        <td>Public websites, marketing platforms, general tools</td>
                                        <td><span className="dc-risk-low">Low</span><br/>Minor service disruption</td>
                                        <td>Internal portals, collaboration tools, project management</td>
                                        <td><span className="dc-risk-medium">Medium</span><br/>Business process interruption</td>
                                        <td>CRM systems, financial applications, HR systems</td>
                                        <td><span className="dc-risk-high">High</span><br/>Business operations failure, compliance violations</td>
                                        <td>Security systems, backup infrastructure, admin consoles</td>
                                        <td><span className="dc-risk-critical">Critical</span><br/>Complete security failure, systemic collapse</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p></p>
                        </div>
                    </div>
                    
                    <h4>🛡️ Asset-Specific Security Controls Matrix</h4>
                    <p>The following table provides guidance on typical security controls applicable for each asset type based on their data classification and corresponding risk level:</p>
                    
                    <div className="dc-classification-table-wrapper">
                        {/* Outer wrapper for horizontal scroll so that scroll bar does not hide the last row - works for Chrome and Edge, not for Firefox */}
                        <div className="dc-classification-table-scroll">
                            <table className="dc-classification-matrix">
                                <thead>
                                    <tr>
                                        <th rowSpan="2">Asset Type</th>
                                        <th colSpan="2" className="dc-classification-header-public">🌐 Public (Low Risk)</th>
                                        <th colSpan="2" className="dc-classification-header-internal">🏢 Internal (Medium Risk)</th>
                                        <th colSpan="2" className="dc-classification-header-confidential">🔒 Confidential (High Risk)</th>
                                        <th colSpan="2" className="dc-classification-header-restricted">🚫 Restricted (Critical Risk)</th>
                                    </tr>
                                    <tr>
                                        <th className="dc-classification-header-public">Basic Controls</th>
                                        <th className="dc-classification-header-public">Monitoring</th>
                                        <th className="dc-classification-header-internal">Enhanced Controls</th>
                                        <th className="dc-classification-header-internal">Access Management</th>
                                        <th className="dc-classification-header-confidential">Strong Protection</th>
                                        <th className="dc-classification-header-confidential">Audit & Compliance</th>
                                        <th className="dc-classification-header-restricted">Maximum Security</th>
                                        <th className="dc-classification-header-restricted">Incident Response</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>📄 Printed Media</strong></td>
                                        <td>• Standard filing<br/>• General disposal<br/>• Basic labelling</td>
                                        <td>• Routine checks<br/>• General awareness</td>
                                        <td>• Controlled access areas<br/>• Clear desk policy<br/>• Proper disposal bins</td>
                                        <td>• Access logs<br/>• Regular audits<br/>• Staff training</td>
                                        <td>• Locked storage<br/>• Authorised access only<br/>• Shredding required</td>
                                        <td>• Document tracking<br/>• Copy restrictions<br/>• Retention policies</td>
                                        <td>• Secure vault storage<br/>• Biometric access<br/>• Witnessed destruction</td>
                                        <td>• Immediate containment<br/>• Forensic analysis<br/>• Executive notification</td>
                                    </tr>
                                    <tr>
                                        <td><strong>💾 Digital Files</strong></td>
                                        <td>• Standard backups<br/>• Basic permissions<br/>• Antivirus protection</td>
                                        <td>• System logs<br/>• Regular scans</td>
                                        <td>• User authentication<br/>• Regular backups<br/>• File versioning</td>
                                        <td>• RBAC implementation<br/>• Access monitoring<br/>• Change tracking</td>
                                        <td>• Encryption at rest<br/>• MFA required<br/>• DLP systems</td>
                                        <td>• Detailed audit logs<br/>• Regular compliance checks<br/>• Access reviews</td>
                                        <td>• AES-256 encryption<br/>• Air-gapped storage<br/>• HSM protection</td>
                                        <td>• Real-time alerts<br/>• Automated response<br/>• Forensic imaging</td>
                                    </tr>
                                    <tr>
                                        <td><strong>🗄️ Database Data</strong></td>
                                        <td>• Standard authentication<br/>• Basic backups<br/>• Connection security</td>
                                        <td>• Query logging<br/>• Performance monitoring</td>
                                        <td>• Database firewalls<br/>• Regular patching<br/>• Backup encryption</td>
                                        <td>• User privilege reviews<br/>• Connection limits<br/>• Activity monitoring</td>
                                        <td>• Column-level encryption<br/>• Database masking<br/>• Privileged access mgmt</td>
                                        <td>• SQL injection protection<br/>• Real-time monitoring<br/>• Data classification tags</td>
                                        <td>• Always encrypted<br/>• Zero-trust access<br/>• Immutable backups</td>
                                        <td>• Automated lockdown<br/>• Incident forensics<br/>• Breach notification</td>
                                    </tr>
                                    <tr>
                                        <td><strong>📧 Emails</strong></td>
                                        <td>• Basic spam filtering<br/>• Standard archiving<br/>• Attachment scanning</td>
                                        <td>• Mail flow monitoring<br/>• Delivery reports</td>
                                        <td>• Advanced threat protection<br/>• Encryption for external<br/>• Retention policies</td>
                                        <td>• Email classification<br/>• Access controls<br/>• Archive security</td>
                                        <td>• End-to-end encryption<br/>• S/MIME certificates<br/>• DLP policies</td>
                                        <td>• Content inspection<br/>• Legal hold capabilities<br/>• Compliance reporting</td>
                                        <td>• Secure email gateways<br/>• Message-level encryption<br/>• Air-gapped archives</td>
                                        <td>• Email recall systems<br/>• Forensic analysis<br/>• Chain of custody</td>
                                    </tr>
                                    <tr>
                                        <td><strong>☁️ Cloud Storage</strong></td>
                                        <td>• Provider security<br/>• Basic access controls<br/>• Standard encryption</td>
                                        <td>• Usage monitoring<br/>• Access logging</td>
                                        <td>• SSO integration<br/>• Sharing controls<br/>• Geographic restrictions</td>
                                        <td>• Identity governance<br/>• Regular access reviews<br/>• Activity alerts</td>
                                        <td>• Customer-managed keys<br/>• CASB deployment<br/>• Zero-trust access</td>
                                        <td>• Cloud security posture mgmt<br/>• Compliance dashboards<br/>• Data residency controls</td>
                                        <td>• Bring-your-own-encryption<br/>• Private cloud deployment<br/>• Dedicated tenancy</td>
                                        <td>• Cloud incident response<br/>• Data loss prevention<br/>• Regulatory notification</td>
                                    </tr>
                                    <tr>
                                        <td><strong>📱 Mobile Devices</strong></td>
                                        <td>• Device passwords<br/>• Basic encryption<br/>• App store restrictions</td>
                                        <td>• Usage reporting<br/>• Basic compliance</td>
                                        <td>• MDM enrolment<br/>• App whitelisting<br/>• Remote wipe capability</td>
                                        <td>• Certificate-based auth<br/>• Container separation<br/>• Jailbreak detection</td>
                                        <td>• Advanced threat defence<br/>• VPN-only access<br/>• Behavioural analytics</td>
                                        <td>• Mobile forensics ready<br/>• Compliance reporting<br/>• Geofencing controls</td>
                                        <td>• Hardware security modules<br/>• Secure boot processes<br/>• Dedicated secure devices</td>
                                        <td>• Emergency wipe protocols<br/>• Device quarantine<br/>• Incident containment</td>
                                    </tr>
                                    <tr>
                                        <td><strong>🖥️ Systems/Applications</strong></td>
                                        <td>• Basic authentication<br/>• Standard patching<br/>• Firewall protection</td>
                                        <td>• System monitoring<br/>• Log management</td>
                                        <td>• Vulnerability scanning<br/>• Access management<br/>• Security updates</td>
                                        <td>• Privileged access mgmt<br/>• Change management<br/>• Security baselines</td>
                                        <td>• Application security testing<br/>• Runtime protection<br/>• Code signing</td>
                                        <td>• Continuous monitoring<br/>• Threat intelligence<br/>• Compliance automation</td>
                                        <td>• Zero-trust architecture<br/>• Micro-segmentation<br/>• Hardware security</td>
                                        <td>• Automated incident response<br/>• System isolation<br/>• Forensic capabilities</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p></p>
                        </div>
                    </div>
                    
                    <h4>🎯 Risk Classification Framework</h4>
                    <p>The risk impact levels in the matrix above aligns with standard organisational risk classifications:</p>
                    
                    <div className="dc-classification-table-wrapper">
                        {/* Outer wrapper for horizontal scroll so that scroll bar does not hide the last row - works for Chrome and Edge, not for Firefox */}
                        <div className="dc-classification-framework-table-scroll">
                            <table className="dc-risk-framework">
                                <thead>
                                    <tr>
                                        <th>Risk Level</th>
                                        <th>Impact Description</th>
                                        <th>Response Time</th>
                                        <th>Management Escalation</th>
                                        <th>Typical Controls</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong><span className="dc-risk-low">Low Risk</span></strong></td>
                                        <td>Minimal or no impact on operations, reputation, or compliance</td>
                                        <td>Standard response (days/weeks)</td>
                                        <td>Operational level</td>
                                        <td>Basic access controls, standard backups</td>
                                    </tr>
                                    <tr>
                                        <td><strong><span className="dc-risk-medium">Medium Risk</span></strong></td>
                                        <td>Minor operational disruption, limited financial impact</td>
                                        <td>Priority response (hours/days)</td>
                                        <td>Middle management</td>
                                        <td>Enhanced monitoring, regular access reviews</td>
                                    </tr>
                                    <tr>
                                        <td><strong><span className="dc-risk-high">High Risk</span></strong></td>
                                        <td>Significant business impact, regulatory issues, competitive disadvantage</td>
                                        <td>Urgent response (minutes/hours)</td>
                                        <td>Senior management</td>
                                        <td>Encryption, MFA, detailed logging, DLP</td>
                                    </tr>
                                    <tr>
                                        <td><strong><span className="dc-risk-critical">Critical Risk</span></strong></td>
                                        <td>Severe business disruption, legal liability, potential business failure</td>
                                        <td>Immediate response (minutes)</td>
                                        <td>Executive/Board level</td>
                                        <td>Air-gapped systems, HSMs, continuous monitoring</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p></p>
                        </div>
                    </div>
                    
                    
                    
                    <p><strong>Classification Criteria:</strong></p>
                    <ul>
                        <li><strong>🌐 Public:</strong> Information intended for public consumption with no risk if disclosed (<span className="dc-risk-low">Low Risk</span>)</li>
                        <li><strong>🏢 Internal:</strong> Information for internal use that could cause minor impact if disclosed (<span className="dc-risk-medium">Medium Risk</span>)</li>
                        <li><strong>🔒 Confidential:</strong> Sensitive information that could cause significant harm if disclosed (<span className="dc-risk-high">High Risk</span>)</li>
                        <li><strong>🚫 Restricted:</strong> Highly sensitive information that could cause severe damage if disclosed (<span className="dc-risk-critical">Critical Risk</span>)</li>
                    </ul>
                    
                    <div>
                    </div>
                </div>
                <p><b>Disclaimer:</b> The information provided here is for general informational purposes only and will require adaptation for specific businesses and business size and maturity capabilities and is not intended as legal advice. 
            Please consult with a qualified legal professional for specific legal advice tailored to your situation.</p>
            <p>Use this framework as a starting point for your own data classification efforts. It is not exhaustive and may fall short for some organisations and also may be overkill for others. 
                It is aimed at providing guidance on related controls to consider and needs to be customised to fit your organisation's unique needs, technology landscape, and requirements. 
                In some cases being able to select multiple controls for a particular technology focus area may map closer to real world implementations but this form only allows the selection of a single control. 
                Consider what a Data Classification assessment tool should cover in terms of depth and breadth and time undertaken to perform the assessment vs what should be covered by a design.</p>
            <hr />
        </details>
        <BackToTopButton />
    </>
  );
};

export default DCIntro;
