import React, { useState, useEffect } from 'react';
import "./DC.css";
import DCIntro from './DCIntro';
import DCInputForm from './DCInputForm';
import DCTable from './DCTable';
import DCReport from './DCReport';

const Version = "v0.1.5";

// Helper to get today's date in YYYY-MM-DD format
const getToday = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

// Helper to get date 12 months from today in YYYY-MM-DD format
const getTwelveMonthsFromToday = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1); // Add 1 year (12 months)
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

// Helper to compute data classification from sensitivity and criticality (high water mark)
const computeDataClassification = (sensitivity, criticality) => {
  if (!sensitivity || !criticality) {
    return '';
  }
  
  const levels = {
    'public': 1,
    'internal': 2,
    'confidential': 3,
    'restricted': 4
  };
  
  const maxLevel = Math.max(
    levels[sensitivity?.toLowerCase()] || 0,
    levels[criticality?.toLowerCase()] || 0
  );
  
  const levelToValue = {
    1: 'public',
    2: 'internal',
    3: 'confidential',
    4: 'restricted'
  };
  
  return levelToValue[maxLevel] || '';
};

// Initial form structure to match DCInputForm requirements
const initialForm = {
  assetName: "",
  assetType: "",
  dataType: "",
  dataSensitivity: "",     
  dataCriticality: "",     
  dataClassification: "",
  description: "",
  dependencies: "",
  dataOwner: "",
  technicalOwner: "",
  assessorName: "",
  assessmentDate: getToday(),
  reviewDate: getTwelveMonthsFromToday(),
  
  // Security Controls
  atRestEncryption: "",
  inTransitEncryption: "",
  databaseEncryption: [],
  encryptionCipher: "",
  hashAlgorithm: "",
  keyManagement: "",
  keyManagementProcesses: [],
  secretsManagement: [],

// Access Controls
  authentication: [],
  authorisation: [],
  identityManagement: [],
  accessControls: "",
  
  // Advanced Security Controls
  wafControls: [],
  apiSecurityGateway: [],
  dlpControls: [],
  privilegedSessionManagement: "",
  threatIntelligenceIntegration: "",
  threatModeling: [],
  soar: "",
  siem: "",
  casbControls: "",
  sseControls: "",
  cloudNetworkSecurity: [],
  sdwanControls: "",
  saseArchitecture: "",
  zeroTrustMaturity: "",
  networkSecurity: [],
  protocolGapCoverage: "",
  
  // Application Security
  antivirusControls: "",
  vulnerabilityScanning: "",
  applicationTesting: [],
  applicationSecurityTesting: [],
  certificateManagement: "",
  applicationControl: "",
  patchManagement: [],
  codeIntegrity: [],
  sca: [],
  ossLicenceCompliance: [],
  secretsScanningRepos: [],
  ciCdPipelineSecurity: [],
  applicationLogging: "",
  secureHeadersTransport: [],
  sessionManagementHardening: [],
  osHardening: [],
  osEncryption: [],
  
  // Mobile Security
  mdmControls: "",
  mamControls: "",
  byodPolicy: "",
  mobileDataProtection: [],
  
  // Remote Access
  vdiSolution: [],
  jumpHosts: "",
  remoteAccessPolicy: [],
  sessionIsolation: "",
  remoteAccessMonitoring: "",
  privilegedAccessManagement: "",
  vpnAccessControls: [],
  ztnaAccess: [],
  
  // Monitoring & Logging
  monitoring: "",
  threatMonitoring: "",
  availabilityMonitoring: [],
  auditLogging: "",
  penetrationTesting: "",
  socCapability: "",
  complianceAutomation: "",
  securityMetrics: [],
  auditTrailRetention: "",
  changeManagementIntegration: "",
  securityTestingFrequency: "",

  // Data Lifecycle
  backupStrategy: "",
  dataRetentionPeriod: "",
  backupRetentionPeriod: "",
  archivePolicy: "",
  disposalMethod: "",
  dataVersioningStrategy: "",
  dataRedundancyLevel: "",
  haDrTestingFrequency: "",
  backupTestingFrequency: "",
  dataMigrationStrategy: "",
  dataEolProcess: "",
  dataDowngradeControls: "",
    
  // Compliance
  complianceRequirements: "",

  // Business Impact Assessment
  businessImpactLevel: "",
  availabilitySLO: "",
  rto: "",
  rpo: "",
  incidentResponse: "",
  architectureGovernance: "",
  thirdPartyRiskManagement: [],
  dpaStatus: "",
  regulatoryReporting: "",
  auditFrequency: "",
  dataResidency: "",
    
  // Additional Modern Security Controls
  dataDiscoveryAutomation: "",
  contentBasedClassification: "",
  dataFlowMapping: "",
  sensitiveDataScanning: "",
  dataSecurityPostureManagement: "",
  dlpAutomation: "",
  dataLabelingTaggingAutomation: "",
  dataPolicyEnforcementAutomation: "",
  soarDataIncidents: "",
  automatedComplianceReporting: "",
  automatedDataLifecycle: "",
  apiSecurityDataFlowMonitoring: "",
  
  // Privacy Engineering
  privacyByDesign: "",
  dataMinimisation: "",
  purposeLimitation: "",
  consentManagement: "",
  rightToErasure: "",
  dataPortability: "",
  
  // APP Data Collection Controls
  appDataCollectionLimitations: "",
  appSolicitedUnsolicited: "",
  appCollectionNotice: "",
  appThirdPartyCollection: "",
  
  // Australian Privacy Principles (APP) Specific
  appCustomerAccess: "",
  appDataCorrection: "",
  appDataRetentionDisposal: "",
  appNotificationRequirements: "",
  
  // Australian Accessibility Compliance (DDA)
  accessibilityCompliance: "",
  assistiveTechnologySupport: [],
  inclusiveDataAccessDesign: [],
  workplaceAccessibilityAccommodation: [],
  
  // Privacy Rights & Consent Management
  consentWithdrawalMechanism: "",
  privacyTrainingAwareness: "",
  automatedPrivacyControlsPets: "",
  crossBorderDataTransferCompliance: "",
  
  // Intellectual Property & Data Sovereignty
  copyrightFairUseCompliance: [],
  indigenousDataSovereignty: [],
  
  // Zero Trust Data Security
  dataMicrosegmentation: "",
  continuousVerification: "",
  justInTimeDataAccess: "",
  riskBasedAuthentication: "",
  deviceTrustVerification: "",
  
  // Cloud-Native Security
  containerDataProtection: [],
  serverlessDataSecurity: "",
  multiCloudDataGovernance: "",
  cspmDataAssets: "",
  iacSecurityScanning: "",
  cloudEgressControls: "",
  cloudIngressControls: "",
  workloadIdentityFederation: "",
  
  // AI/ML Data Protection
  trainingDataProtection: "",
  modelDataLeakagePrevention: "",
  aiGovernance: "",
  algorithmicBiasDetection: "",
  aiModelExplainability: "",
  aiModelCards: "",
  humanInLoopAi: "",
  aiSafetyAdversarial: "",
  aiDataLineage: "",
  modelVersioningRollback: "",
  aiModelDrift: "",
  thirdPartyAiRisk: "",
  aiSupplyChainTransparency: "",
  
  // Supply Chain Security
  thirdPartyDataProcessing: "",
  vendorDataSecurity: "",
  supplyChainDataMapping: "",
  sbomDataProcessing: "",
  dataResidencyRequirements: "",
  buildProvenanceSigning: "",
  secureDevPracticesSsdf: "",
  vulnerabilityDisclosureSla: "",
  supplierSecurityAssurance: [],
  dependencyPolicyEnforcement: "",
  runtimeSupplyChainControls: "",
  fourthPartyFlowdown: "",
  thirdPartyAccessArchitecture: "",
  incidentBreachNotification: "",
  vendorStabilityMarketPosition: "",
  
  // Advanced Threat Protection
  insiderThreatDetection: "",
  uebaDataOperations: "",
  deceptionTechnologies: "",
  aptDetectionDataExfiltration: "",
  dataCentricSecurityOrchestration: "",
  ransomwareDataExtortionDefense: [],
  deceptionTechnologiesData: "",
  homomorphicConfidentialComputing: "",
  cryptographicKeyLifecycle: [],
  
  // Quantum-Ready Security
  postQuantumCryptography: "",
  quantumKeyDistribution: "",
  cryptoAgility: "",
  quantumSafeTransition: "",
  
  // Data Ethics & Governance
  ethicalDataUse: "",
  dataStewardship: "",
  crossBorderDataTransfer: "",
  dataSovereignty: "",
  algorithmicAccountability: "",
  
  // Operational Technology Security
  icsDataProtection: "",
  scadaDataSecurity: "",
  iotDeviceDataProtection: "",
  edgeComputingDataSecurity: "",
  operationalNetworkSegmentation: "",
  
  // Data Democratisation vs Control
  dataAccessGovernance: "",
  selfServiceDataAccess: "",
  dataAccessBalancing: "",
  dataLiteracyPrograms: "",
  controlledDataSharing: "",
  dataCatalogDiscovery: "",
  dynamicDataMaskingSelfService: "",
  dataAccessRequestWorkflow: "",
  dataUsageAnalytics: "",
  dataEntitlementModel: "",
  dataAccessRecertification: "",

  // Data Governance & Management
  dataLineageTracking: "",
  recordPrimacyManagement: "",
  dataQualityControls: "",
  metadataManagement: "",
  dataStewardshipProgram: "",
  dataGovernanceFramework: "",
  dataFlowDocumentation: "",
  reportingAnalyticsGovernance: "",
  dataOwnershipAccountability: "",
  dataStandardsConventions: "",
  dataGlossaryBusinessTerms: "",
  dataGovernanceCouncil: "",
  dataIssueExceptionManagement: "",
  dataValueRoiMeasurement: "",
  dataEthicsResponsibleUse: "",

  // Implementation Notes
  implementationNotes: "",  
  businessJustification: ""
};

const DCForm = () => {  
  const [form, setForm] = useState(initialForm);
  const [entries, setEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [fieldsOpen, setFieldsOpen] = useState(false);
  const [dcOpen, setDcOpen] = useState(false);
  const [selectedDCIndex, setSelectedDCIndex] = useState(null);
  const [, setIsEditingDC] = useState(false);
  const [dcFieldsOpen, setDCFieldsOpen] = useState(false);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [, setSubmitted] = useState(false);

  // Drag and drop state for reordering risks
  const [draggedEntryIndex, setDraggedEntryIndex] = useState(null);
  const [dropTargetIndex, setDropTargetIndex] = useState(null);

  // Compute derived dataClassification whenever sensitivity or criticality changes
  useEffect(() => {
    if (form.dataSensitivity || form.dataCriticality) {
      const computed = computeDataClassification(form.dataSensitivity, form.dataCriticality);
      if (computed && computed !== form.dataClassification) {
        setForm(prev => ({
          ...prev,
          dataClassification: computed
        }));
      }
    } else {
      // Clear classification if both inputs are empty
      if (form.dataClassification) {
        setForm(prev => ({
          ...prev,
          dataClassification: ''
        }));
      }
    }
  }, [form.dataSensitivity, form.dataCriticality, form.dataClassification]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editIndex !== null) {
      // Update existing entry
      const updatedEntries = [...entries];
      updatedEntries[editIndex] = { ...form, id: Date.now() };
      setEntries(updatedEntries);
      setEditIndex(null);
    } else {
      // Add new entry
      const newEntry = { ...form, id: Date.now() };
      setEntries([...entries, newEntry]);
    }
    
    // Reset form and close fields
    setForm(initialForm);
    setFieldsOpen(false);
    setDCFieldsOpen(false);
  };

  // Handle form cancellation
  const handleCancel = () => {
    setForm(initialForm);
    setEditIndex(null);
    setFieldsOpen(false);
    setDCFieldsOpen(false);
  };

  // Handle editing an existing entry
  const handleEdit = (index) => {
    const entry = entries[index];
    // Backward-compatibility shim: normalise fields that are now multi-select
    const normalised = { ...entry };
    if (normalised.osHardening && !Array.isArray(normalised.osHardening)) {
      normalised.osHardening = [normalised.osHardening];
    }
    if (normalised.vdiSolution && !Array.isArray(normalised.vdiSolution)) {
      normalised.vdiSolution = [normalised.vdiSolution];
    }
    if (normalised.remoteAccessPolicy && !Array.isArray(normalised.remoteAccessPolicy)) {
      normalised.remoteAccessPolicy = [normalised.remoteAccessPolicy];
    }

    // Backward compatibility for existing entries without sensitivity/criticality
    if (!normalised.dataSensitivity && !normalised.dataCriticality && normalised.dataClassification) {
      normalised.dataSensitivity = normalised.dataClassification;
      normalised.dataCriticality = normalised.dataClassification;
    }

    setForm(normalised);
    setEditIndex(index);
    setFieldsOpen(true);
  };

  const handleRowClick = (index) => {
    // If clicking on the row that's already being edited, save the changes
    if (editIndex === index) {
      const updatedEntries = entries.map((entry, entryIdx) =>
        entryIdx === editIndex ? form : entry
      );
      setEntries(updatedEntries);
      setEditIndex(null);
      setSubmitted(true);
      setFieldsOpen(false); // Collapse form fields after save
    } else {
      // If clicking on a different row, load it for editing
      setForm(entries[index]);
      setEditIndex(index);
      setSubmitted(false);
      setFieldsOpen(true); // Expand the BIA Form Fields when a row is clicked
    }
  };

  const handleNewDataClassification = () => {
    // Clear all state first
    setForm(initialForm);
    setEditIndex(null);
    setSelectedDCIndex(null);
    setIsEditingDC(false);
    setDCFieldsOpen(true);
    // Force the form to open
    setFieldsOpen(true);
  };

  const handleMoveDC = (fromIndex, toIndex) => {
    if (fromIndex === toIndex || toIndex < 0 || toIndex >= entries.length) {
      return;
    }

    const updatedDCEntries = [...entries];
    const dcEntryToMove = updatedDCEntries[fromIndex];
    updatedDCEntries.splice(fromIndex, 1);
    updatedDCEntries.splice(toIndex, 0, dcEntryToMove);

    setEntries(updatedDCEntries);

    // Update selected DC index if needed
    if (selectedDCIndex === fromIndex) {
      setSelectedDCIndex(toIndex);
    } else if (selectedDCIndex !== null) {
      if (fromIndex < selectedDCIndex && toIndex >= selectedDCIndex) {
        setSelectedDCIndex(selectedDCIndex - 1);
      } else if (fromIndex > selectedDCIndex && toIndex <= selectedDCIndex) {
        setSelectedDCIndex(selectedDCIndex + 1);
      }
    }
  };

  const handleDeleteDC = (index) => {
    if (window.confirm("Are you sure you want to delete this data classification?")) {
      const updatedDCEntries = entries.filter((_, i) => i !== index);
      setEntries(updatedDCEntries);
      if (selectedDCIndex === index) {
        clearDCFields();
        setSelectedDCIndex(null);
        setIsEditingDC(false);
      } else if (selectedDCIndex > index) {
        setSelectedDCIndex(selectedDCIndex - 1);
      }
    }
  };

  // Handle deleting an entry
  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  // Helper functions for risk management
  const clearDCFields = () => {
    setForm(initialForm);
  };

  const handleStartNew = () => {
    if (window.confirm("Are you sure you want to remove all data classifications? This action cannot be undone.")) {
      setEntries([]);
      clearDCFields();
      setSelectedDCIndex(null);
      setIsEditingDC(false);
      setDCFieldsOpen(true);
      setDcOpen(false);
    }
  };





  return (
      <div className="dc-main-container">
          <h2 className="dc-main-heading">
              Data Classification Form
          </h2>

          <DCIntro />
          <DCInputForm 
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            editIndex={editIndex}
            fieldsOpen={fieldsOpen || entries.length === 0}
            setFieldsOpen={setFieldsOpen}
          />
          
          <DCTable 
            entries={entries}
            onEdit={handleEdit}
            onDelete={handleDelete}
            dcOpen={dcOpen}
            setDCOpen={setDcOpen}
            handleNewDataClassification={handleNewDataClassification}
            handleMoveDC={handleMoveDC}
            handleDeleteDC={handleDeleteDC}
            handleStartNew={handleStartNew}
            dcFieldsOpen={dcFieldsOpen}
            editIndex={editIndex}
            setDraggedProcessIndex={setDraggedEntryIndex}
            draggedProcessIndex={draggedEntryIndex}
            setDropTargetIndex={setDropTargetIndex}
            dropTargetIndex={dropTargetIndex}
            handleMoveProcess={handleMoveDC}
            hoveredRowIndex={hoveredRowIndex}
            setHoveredRowIndex={setHoveredRowIndex}
            handleRowClick={handleRowClick}
          />

          <DCReport form={form} entries={entries} />

      </div>
  );
};


export default function WrappedDCForm() {
  return (
    <>
      <DCForm />
      <div className="dc-version">
        SC3 DC Form {Version}
      </div>
    </>
  );
}