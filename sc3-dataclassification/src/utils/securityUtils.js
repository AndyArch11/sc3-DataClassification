import { validateSelection } from './validationUtils';

/**
 * Security utility functions for data classification
 * Contains logic for determining restricted controls and option security classes
 */

/**
 * bitwise:
 * public = 1
 * internal = 2
 * confidential = 4
 * restricted = 8
 * restricted_caution = 16 (overshoot mapping)
 *
 * For each control, maps an option value to the bitmask of classifications for which
 * that option is NOT acceptable (i.e. restricted). This is the single source of truth
 * for both flagging restricted selections and deriving minimum required options.
 * 
 * TODO: Consider additional mapping logic where selecting one option is exclusionary to others
 * Eg Copyright & Fair Use Compliance includes "No Copyright Material Used". Selecting this 
 * option should restrict the selection of other conflicting options.
 */
export const controlRestrictionMasks = {
        // Security Controls
        'atRestEncryption': {
            'none': 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'standard': 4 + 8 + 16,
            'strong': 8 + 16,
            'maximum': 16
        },
        'inTransitEncryption': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 1 + 2 + 4 + 8 + 16,
            'standard': 4 + 8 + 16,
            'strong': 8 + 16,
            'maximum': 16
        },
        'databaseEncryption': {
            'none': 1 + 2 + 4 + 8 + 16,
            'tde-basic':8 + 16,
            'tde-advanced': 16,
            'column-encryption': 16,
            'row-level-security': 16,
            'field-level-encryption': 16,
            'tokenisation': 16,
            'data-masking': 16,
            'synthetic-data': 16,
            'database-firewall': 16,
            'always-encrypted': 16,
            'envelope-encryption': 16,
            'backup-encryption': 16,
            'query-level-encryption': 16,
            'dynamic-masking': 16,
            'comprehensive': 16
        },
        'encryptionCipher': {
            'Blowfish': 1 + 2 + 4 + 8 + 16,
            '3DES': 1 + 2 + 4 + 8 + 16,
            'DES': 1 + 2 + 4 + 8 + 16,
            'RC4': 1 + 2 + 4 + 8 + 16,
            // internal
            'AES-128': 4 + 8 + 16,
            'AES-128-GCM': 4 + 8 + 16,
            'RSA-2048': 4 + 8 + 16,
            // confidential
            'AES-256': 8 + 16,
            'ChaCha20-Poly1305': 8 + 16,
            'ECC-P-256': 8 + 16,
            'Ed25519': 8 + 16,
            'X25519': 8 + 16,
            'Twofish': 8 + 16,
            'Camellia': 8 + 16,
            'Serpent': 8 + 16,
            // restricted
            'AES-256-GCM': 16,
            'ECC-P-384': 8 + 16,
            'RSA-4096': 16
        },
        'hashAlgorithm': {
            'MD5': 1 + 2 + 4 + 8 + 16,
            'MD4': 1 + 2 + 4 + 8 + 16,
            'SHA-1': 1 + 2 + 4 + 8 + 16,
            'SHA-224': 4 + 8 + 16,
            'BLAKE2b': 16,
            'BLAKE2s': 4 + 8 + 16,
            'RIPEMD-160': 4 + 8 + 16,
            'SHA-256': 16,
            'SHA-3-256': 16,
            'SHA-3-512': 16,
            'SHA-384': 16,
            'SHA-512': 16,
            'Whirlpool': 4 + 8 + 16,
            'BLAKE3':  4 + 8 + 16
        },
        'keyManagement': {
            'none': 1 + 2 + 4 + 8 + 16,
            'provider': 4 + 8 + 16,
            'customer': 8 + 16,
            'byok': 16,
            'hsm': 16
        },
        'keyManagementProcesses': {
            'none': 1 + 2 + 4 + 8 + 16,
            'manual-rotation': 4 + 8 + 16,
            'access-controls': 16,
            'audit-logs': 16,
            'automated-rotation': 16,
            'split-knowledge': 16,
            'hsm-storage': 16
        },
        'secretsManagement': {
            'none': 1 + 2 + 4 + 8 + 16,
            'env-vars': 1 + 2 + 4 + 8 + 16,
            'encrypted-config': 2 + 4 + 8 + 16,
            'secrets-service': 8 + 16,
            'dynamic-secrets': 16,
            'hsm-backed': 16
        },
        // Access Controls
        'authentication': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'api-key': 4 + 8 + 16,
            'certificate': 8 + 16,
            'sso': 16,
            'mfa': 16,
            'hardware-token': 16,
            'smart-card': 16,
            'biometric': 16,
            'fido2': 16

        },
        'authorisation': {
            'basic': 2 + 4 + 8 + 16,
            'rbac': 8 + 16,
            'abac': 8 + 16,
            'pam': 16,
            'time-based': 16,
            'geolocation-based': 16,
            'zero-trust': 16,
            'pbac': 16,
            'dac': 16,
            'mac': 16,
            'context-aware': 16
            
        },
        'identityManagement': {
            'third-party-non-federated': 2 + 4 + 8 + 16,
            'application-managed-shared': 1 + 2 + 4 + 8 + 16,
            'application-managed-individual': 4 + 8 + 16,
            'social-login': 2 + 4 + 8 + 16,
            'decentralised': 2 + 4 + 8 + 16,
            'federated': 4 + 8 + 16,
            'scim': 4 + 8 + 16,
            'hybrid-approach': 4 + 8 + 16,
            'database-managed-shared': 2 + 4 + 8 + 16,
            'database-managed-individual': 4 + 8 + 16,
            'centrally-managed-delegated': 4 + 8 + 16,
            'centrally-managed-service': 8 + 16,
            'centrally-managed-individual': 16,
            'delegated': 16,
            'service-to-service': 4 + 8 + 16,
            'just-in-time': 16,
            'break-glass': 16,
            'iga': 16
        },
        // Advanced Security Controls
        'wafControls': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'standard': 16,
            'advanced': 16,
            'enterprise': 16,
            'distributed': 16,
            'api-protection': 16,
            'bot-management': 16,
            'ddos-mitigation': 16,
            'rate-limiting': 16
        },
        'apiSecurityGateway': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'standard': 16,
            'owasp-api': 16,
            'graphql': 16,
            'api-specs': 16,
            'runtime-protection': 16
        },
        'dlpControls': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'advanced': 16,
            'network': 16,
            'comprehensive': 16,
            'ocr': 16,
            'ueba': 16,
            'enterprise': 16
        },
        'privilegedSessionManagement': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic-logging': 2 + 4 + 8 + 16,
            'full-recording': 16,
            'real-time-monitoring': 16,
            'ai-analytics': 16
        },
        'threatIntelligenceIntegration': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic-feeds': 2 + 4 + 8 + 16,
            'enhanced-feeds': 4 + 8 + 16,
            'siem-integration': 16,
            'tip-platform': 16,
            'automated-enrichment': 16
        },
        'soar': {
            'none': 1 + 2 + 4 + 8 + 16,
            'manual-processes': 1 + 2 + 4 + 8 + 16,
            'basic-playbooks': 2 + 4 + 8 + 16,
            'siem-orchestration': 16,
            'automated-response': 16,
            'full-platform': 16
        },
        'siem': {
            'none': 1 + 2 + 4 + 8 + 16,
            'log-aggregation': 1 + 2 + 4 + 8 + 16,
            'basic-correlation': 2 + 4 + 8 + 16,
            'advanced-detections': 16,
            'ti-integrated': 16,
            'soar-integrated': 16,
            'cloud-native':  16,
            'mdr-xdr': 16
        },
        'threatModeling': {
            'none': 1 + 2 + 4 + 8 + 16,
            'ad-hoc': 2 + 4 + 8 + 16,
            'periodic-review': 16,
            'dev-integrated': 16,
            'automated': 16,
            'continuous': 16
        },
        'casbControls': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'standard': 4 + 8 + 16,
            'advanced': 8 + 16,
            'comprehensive': 16
        },
        'sseControls': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'standard': 4 + 8 + 16,
            'advanced': 8 + 16,
            'comprehensive': 16,
            'sase': 16
        },
        'cloudNetworkSecurity': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'standard': 16,
            'advanced': 16,
            'comprehensive': 16,
            'comprehensive+': 16,
            'zero-trust': 16
        },
        'sdwanControls': {
            'traditional-wan': 2 + 4 + 8 + 16,
            'mpls': 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'vpn': 4 + 8 + 16,
            'standard': 4 + 8 + 16,
            'advanced': 8 + 16,
            'secure': 16,
            'sase-integrated': 16
        },
        'saseArchitecture': {
            'none': 2 + 4 + 8 + 16,
            'partial': 2 + 4 + 8 + 16,
            'hybrid': 4 + 8 + 16,
            'cloud-native': 8 + 16,
            'full-sase': 16,
            'zero-trust-sase': 16
        },
        'zeroTrustMaturity': {
            'traditional': 2 + 4 + 8 + 16,
            'initial': 2 + 4 + 8 + 16,
            'developing': 4 + 8 + 16,
            'defined': 8 + 16,
            'managed': 16,
            'optimised': 16
        },
        'networkSecurity': {
            'basic': 2 + 4 + 8 + 16,
            'standard': 16,
            'advanced': 16,
            'nac': 16,
            'ngfw': 16,
            'dns-security': 16,
            'email-gateway': 16,
            'sdp': 16,
            'zero-trust': 16,
            'micro-segmentation': 16
        },
        'protocolGapCoverage': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'advanced': 16,
            'comprehensive': 16,
            'endpoint': 16
        },
        // Application Security Controls
        'antivirusControls': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'standard': 4 + 8 + 16,
            'advanced': 8 + 16,
            'enterprise': 16,
            'next-gen': 16
        },
        'vulnerabilityScanning': {
            'none': 1 + 2 + 4 + 8 + 16,
            'manual': 2 + 4 + 8 + 16,
            'scheduled': 4 + 8 + 16,
            'continuous': 8 + 16,
            'comprehensive': 16,
            'devsecops': 16
        },
        'applicationTesting': {
            'unit-testing': 16,
            'tdd': 16,
            'integration-testing': 16,
            'e2e-testing': 16,
            'performance-testing': 16,
            'load-testing': 16,
            'stress-testing': 16,
            'soak-testing': 16,
            'scaling-testing': 16,
            'chaos-testing': 16,
            'regression-testing': 16,
            'smoke-testing': 16,
            'api-testing': 16,
            'mutation-testing': 16,
            'contract-testing': 16,
            'property-testing': 16,
            'bdd': 16,
            'ui-testing': 16,
            'ux-testing': 16,
            'usability-testing': 16,
            'accessibility-testing': 16,
            'functional-testing': 16,
            'acceptance-testing': 16
        },
        'applicationSecurityTesting': {
            'dast': 16,
            'sast': 16,
            'iast': 16,
            'fuzzing': 16,
            'authz-tests': 16,
            'business-logic': 16,
            'rate-limit-tests': 16,
            'contract-testing': 16,
            'schema-validation': 16,
            'manual-pen-test': 16,
            'red-team': 16,
            'purple-team': 16,
            'config-hardening-review': 16,
            'threat-model-validation': 16,
            'runtime-profiling': 16,
            'rast': 16,
            'ci-integration': 16
        },
        'applicationLogging': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'structured': 4 + 8 + 16,
            'telemetry': 8 + 16,
            'centralised': 8 + 16,
            'correlation': 16,
            'observability': 16,
            'forensic': 16
        },
        'secureHeadersTransport': {
            'hsts': 16,
            'x-frame': 16,
            'xxs-protection': 16,
            'csp': 16,
            'x-content-type-options': 16,
            'secure-cookies': 16,
            'access-control': 16,
            'cors': 16,
            'referrer-policy': 16,
            'same-origin-policy': 16,
            'cross-origin-opener': 16,
            'cross-origin-embedder': 16,
            'cross-origin-resource': 16,
            'permissions-policy': 16,
            'floc-blocking': 16,
            'server-header': 16,
            'x-robots': 16,
            'tls-min': 16,
            'tls-cipher-config': 16,
            'mtls': 16,
            'ocsp-stapling': 16,
            'redirect-https': 16
        },
        'sessionManagementHardening': {
            'none': 1 + 2 + 4 + 8 + 16,
            'short-timeouts': 2 + 4 + 8 + 16,
            'rotation': 4 + 8 + 16,
            'secure-cookie': 4 + 8 + 16,
            'reauth': 8 + 16,
            'session-binding': 8 + 16,
            'single-signout': 16,
            'idle-timeout': 16,
            'adaptive-session': 16
        },
        'certificateLifecycle': {
            'none': 1 + 2 + 4 + 8 + 16,
            'manual': 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'automated': 4 + 8 + 16,
            'enterprise': 8 + 16,
            'cloud-managed': 8 + 16,
            'zero-touch': 16
        },
        'applicationControl': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'signature': 4 + 8 + 16,
            'behavioural': 8 + 16,
            'zero-trust': 16,
            'container': 16,
            'rasp': 16
        },
        'patchManagement': {
            'none': 1 + 2 + 4 + 8 + 16,
            'manual': 2 + 4 + 8 + 16,
            'scheduled': 2 + 4 + 8 + 16,
            'automated': 4 + 8 + 16,
            'risk-based': 8 + 16,
            'zero-downtime': 16,
            'immutable': 16,
            'zero-day': 16
        },
        'codeIntegrity': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'sbom': 8 + 16,
            'trusted': 8 + 16,
            'supply-chain': 16,
            'attestation': 16,
            'high-assurance': 16
        },
        'sca': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic-dependency-scanning': 2 + 4 + 8 + 16,
            'sbom-analysis': 2 + 4 + 8 + 16,
            'dependency-scanning': 4 + 8 + 16,
            'ci-cd-integration': 8 + 16,
            'cicd-integration': 8 + 16,
            'cve-vuln': 8,
            'container-scanning': 16,
            'licence-compliance': 16,
            'legal-review': 16
        },
        'ossLicenceCompliance': {
            'none': 1 + 2 + 4 + 8 + 16,
            'licence-scanning': 2 + 4 + 8 + 16,
            'spdx-report': 16,
            'cicd-integration': 16,
            'automated-enforcement': 16,
            'legal-review': 16
        },
        'secretsScanningRepos': {
            'none': 1 + 2 + 4 + 8 + 16,
            'manual-review': 2 + 4 + 8 + 16,
            'pre-commit': 16,
            'ci-scanning': 16,
            'scheduled-repo-scan': 16,
            'server-side-hooks': 16,
            'secrets-management-integration': 16,
            'infra-secrets-scan': 16
        },
        'ciCdPipelineSecurity': {
            'none': 1 + 2 + 4 + 8 + 16,
            'approval-gates': 2 + 4 + 8 + 16,
            'least-privilege-runners': 8 + 16,
            'pipeline-scanning': 16,
            'secrets-protection': 16,
            'dast-sast': 16,
            'signed-artifacts': 16,
            'isolated-runners': 16,
            'supply-chain-gate': 16,
            'dependency-caching-policy': 16
        },
        'osHardening': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'cis': 4 + 8 + 16,
            'cis-l1-server': 4 + 8 + 16,
            'cis-l2-server': 8 + 16,
            'cis-l1-workstation': 4 + 8 + 16,
            'cis-l2-workstation': 8 + 16,
            'stig': 4 + 8 + 16,
            'stig-moderate': 8 + 16,
            'stig-high': 16,
            'scap-openscap': 16,
            'fips-mode': 16,
            'selinux-enforcing': 16,
            'apparmor-enforcing': 16,
            'secure-boot-tpm': 16,
            'kernel-hardening-sysctl': 16,
            'ssh-hardening': 16,
            'logging-auditd-hardened': 16,
            'config-mgmt-baseline': 16,
            'golden-image-immutable': 16,
            'readonly-filesystem': 16,
            'immutable': 16
        },
        'osEncryption': {
            'none': 1 + 2 + 4 + 8 + 16,
            'vm-guest-basic': 2 + 4 + 8 + 16,
            'vm-guest-full': 16,
            'vm-guest-vtpm': 16,
            'vm-host': 16,
            'physical-host': 16,
            'cloud-vm': 2 + 4 + 8 + 16,
            'cloud-vm-vtpm': 16,
            'cloud-host': 16,
            'memory-encryption': 16,
            'layered-encryption': 16,
            'layered-vtpm':16,
            'comprehensive': 16
        },
        'mdmControls': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'standard': 4 + 8 + 16,
            'comprehensive': 8 + 16,
            'unified': 16,
            'zero-trust': 16
        },
        'mamControls': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'containerised': 4 + 8 + 16,
            'comprehensive': 8 + 16,
            'app-wrapping': 8 + 16,
            'unified': 16,
            'micro-vpn': 16
        },
        'byodPolicy': {
            'none': 1 + 2 + 4 + 8 + 16,
            'limited': 2 + 4 + 8 + 16,
            'standard': 4 + 8 + 16,
            'managed': 8 + 16,
            'container-based': 8 + 16,
            'zero-trust-byod': 16,
            'prohibited': 16
        },
        'mobileDataProtection': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'encryption': 4 + 8 + 16,
            'app-level': 8 + 16,
            'comprehensive': 16,
            'air-gapped': 16,
            'virtual-desktop': 16
        },
        // Remote Access Infrastructure
        'vdiSolution': {
            'none': 16,
            'basic': 2 + 4 + 8 + 16,
            'persistent': 4 + 8 + 16,
            'non-persistent': 4 + 8 + 16,
            'remote-apps': 4 + 8 + 16,
            'avd': 4 + 8 + 16,
            'windows-365': 4 + 8 + 16,
            'citrix': 4 + 8 + 16,
            'vmware-horizon': 4 + 8 + 16,
            'aws-workspaces': 4 + 8 + 16,
            'google-cloud': 4 + 8 + 16,
            'gpu-accelerated': 4 + 8 + 16,
            'nvidia-vgpu': 4 + 8 + 16,
            'fslogix-profiles': 4 + 8 + 16,
            'app-layering': 4 + 8 + 16,
            'writable-volumes': 4 + 8 + 16,
            'protocol-pcoip': 4 + 8 + 16,
            'protocol-blast': 4 + 8 + 16,
            'protocol-rdp-gateway': 4 + 8 + 16,
            'session-recording': 16,
            'device-redirection-control': 16,
            'copy-paste-restricted': 16,
            'file-transfer-restricted': 16,
            'rbi': 16,
            'ztna-integration': 8 + 16,
            'zero-trust-vdi': 16,
            'autoscaling': 4 + 8 + 16,
            'broker-ha': 4 + 8 + 16,
            'dr-failover': 4 + 8 + 16,
            'thin-client-managed': 4 + 8 + 16
        },
        'vpnAccessControls': {
            'tls-vpn': 2 + 4 + 8 + 16,
            'ipsec-vpn': 2 + 4 + 8 + 16,
            'wireguard': 4 + 8 + 16,
            'full-tunnel': 8 + 16,
            'split-tunnel': 4 + 8 + 16,
            'per-app-vpn': 8 + 16,
            'certificate-auth': 4 + 8 + 16,
            'mfa-required': 16,
            'posture-checks': 16,
            'no-legacy-proto': 16,
        },
        'ztnaAccess': {
            'clientless': 16,
            'per-app': 16,
            'idp-integration': 16,
            'identity-aware-proxy': 16,
            'continuous-verification': 16,
            'device-posture': 16,
            'context-policy': 16,
            'agent-based': 16,
            'micro-segmentation': 16
        },
        'jumpHosts': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'hardened': 4 + 8 + 16,
            'cloud-native': 4 + 8 + 16,
            'privileged': 8 + 16,
            'zero-trust': 16,
            'air-gapped': 16
        },
        'remoteAccessPolicy': {
            'unrestricted': 1 + 2 + 4 + 8 + 16,
            'vpn-required': 4 + 8 + 16,
            'managed-devices': 4 + 8 + 16,
            'vdi-only': 4 + 8 + 16,
            'jump-host-only': 8 + 16,
            'zero-trust': 16,
            'air-gapped-only': 16,
            'third-party-remote-tools-allowed': 4 + 8 + 16,
            'third-party-remote-tools-brokered-only': 8 + 16,
            'third-party-remote-tools-prohibited': 16,
            'public-ip-allowlist': 2 + 4 + 8 + 16,
            'network-allowlist': 4 + 8 + 16,
            'geo-allowlist': 4 + 8 + 16,
            'geo-blocking-high-risk': 16,
            'tor-proxy-vpn-blocking': 16,
            'jit-admin-required': 16,
            'pam-approval-required': 16,
            'time-bound-access': 16,
            'ticket-bound-access': 4 + 8 + 16,
            'ssh-none': 16,
            'ssh-anonymous': 2 + 4 + 8 + 16,
            'ssh-password': 4 + 8 + 16,
            'ssh-interactive': 8 + 16,
            'ssh-keys': 4 + 8 + 16,
            'ssh-certs': 8 + 16,
            'ssh-fido': 8 + 16,
            'ssh-brokered': 8 + 16,
            'session-recording-required': 16,
            'watermarking': 16,
            'screenshot-print-restrictions': 16,
            'clipboard-restrictions': 16
        },
        'sessionIsolation': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'process': 4 + 8 + 16,
            'container': 4 + 8 + 16,
            'vm': 8 + 16,
            'micro-vm': 16,
            'air-gapped': 16
        },
        'remoteAccessMonitoring': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'standard': 4 + 8 + 16,
            'comprehensive': 8 + 16,
            'real-time': 8 + 16,
            'behavioural': 16,
            'ai-powered': 16
        },
        'privilegedAccessManagement': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'standard': 4 + 8 + 16,
            'advanced': 8 + 16,
            'enterprise': 8 + 16,
            'zero-trust-pam': 16
        },
        // Monitoring and Compliance
        'threatMonitoring': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic-logging': 2 + 4 + 8 + 16,
            'siem-integration': 4 + 8 + 16,
            'threat-detection': 4 + 8 + 16,
            'behavioural-analytics': 8 + 16,
            'ai-threat-hunting': 16,
            'zero-trust-monitoring': 16,
            'deception-technology': 16,
            'threat-intelligence': 16
        },
        'availabilityMonitoring': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic-uptime': 2 + 4 + 8 + 16,
            'log-monitoring': 4 + 8 + 16,
            'observability-tools': 8 + 16,
            'infrastructure-monitoring': 16,
            'application-performance': 16,
            'synthetic-monitoring': 16,
            'real-user-monitoring': 16,
            'user-experience-monitoring': 16,
            'distributed-tracing': 16,
            'predictive-analytics': 16,
            'chaos-engineering': 16,
            'auto-remediation': 16,
            'comprehensive-observability': 16
        },
        'auditLogging': {
            'none': 1 + 2 + 4 + 8 + 16,
            'minimal': 2 + 4 + 8 + 16,
            'standard': 4 + 8 + 16,
            'detailed': 8 + 16,
            'comprehensive': 16,
            'forensic': 16,
            'immutable-logs': 16,
            'real-time-logging': 16,
            'ai-driven-analysis': 16
        },
        'penetrationTesting': {
            'none': 1 + 2 + 4 + 8 + 16,
            'internal': 2 + 4 + 8 + 16,
            'third-party': 4 + 8 + 16,
            'on-demand': 4 + 8 + 16,
            'scheduled': 8 + 16,
            'red-team': 16,
            'purple-team': 16,
            'bug-bounty': 16,
            'continuous': 16
        },
        'socCapability': {
            'none': 2 + 4 + 8 + 16,
            'basic-monitoring': 2 + 4 + 8 + 16,
            '8x5': 4 + 8 + 16,
            '24x7': 8 + 16,
            'managed-soc': 8 + 16,
            'hybrid-soc': 8 + 16,
            'ai-augmented': 16,
            'mssp-mdr-xdr': 16
        },
        'complianceAutomation': {
            'none': 1 + 2 + 4 + 8 + 16,
            'manual': 2 + 4 + 8 + 16,
            'scheduled-scans': 4 + 8 + 16,
            'continuous': 8 + 16,
            'policy-as-code': 16,
            'auto-remediation': 16,
            'compliance-dashboard': 16
        },
        'securityMetrics': {
            'mttd': 16,
            'mtta': 16,
            'investigation-time': 16,
            'mttr': 16,
            'incident-volume': 16,
            'false-positive-rate': 16,
            'vulnerability-count': 16,
            'patch-compliance': 16,
            'sla-adherence': 16,
            'risk-score': 16,
            'breach-likelihood': 16,
            'control-effectiveness': 16,
            'business-impact-metrics': 16,
            'remediation-cost': 16
        },
        'auditTrailRetention': {
            '30-days': 2 + 4 + 8 + 16,
            '90-days': 4 + 8 + 16,
            '180-days': 4 + 8 + 16,
            '1-year': 8 + 16,
            '2-years': 8 + 16,
            '3-years': 16,
            '5-years': 16,
            '7-years': 16,
            'indefinite': 16
        },
        'changeManagementIntegration': {
            'none': 2 + 4 + 8 + 16,
            'manual-approval': 2 + 4 + 8 + 16,
            'ticket-based': 16,
            'cab-review': 16,
            'automated-workflow': 16,
            'gitops': 16,
            'continuous-delivery': 16
        },
        'securityTestingFrequency': {
            'none': 1 + 2 + 4 + 8 + 16,
            'ad-hoc': 2 + 4 + 8 + 16,
            'annual': 2 + 4 + 8 + 16,
            'semi-annual': 4 + 8 + 16,
            'quarterly': 8 + 16,
            'monthly': 8 + 16,
            'continuous': 16,
            'pre-release-continuous': 16
        },
        // Data Lifecycle Management
        'dataMigrationStrategy': {
            'none': 1 + 2 + 4 + 8 + 16,
            'manual-migration': 2 + 4 + 8 + 16,
            'scripted-migration': 4 + 8 + 16,
            'etl-pipeline': 8 + 16,
            'change-data-capture': 8 + 16,
            'real-time-sync': 16,
            'zero-downtime': 16
        },
        'dataDowngradeControls': {
            'none': 1 + 2 + 4 + 8 + 16,
            'manual-approval': 2 + 4 + 8 + 16,
            'anonymisation': 4 + 8 + 16,
            'data-masking': 4 + 8 + 16,
            'tokenisation': 8 + 16,
            'synthetic-data': 8 + 16,
            'irreversible-anonymisation': 16,
            'differential-privacy': 16
        },
        'dataVersioningStrategy': {
            'none': 1 + 2 + 4 + 8 + 16,
            'snapshot-based': 2 + 4 + 8 + 16,
            'incremental': 4 + 8 + 16,
            'full-versioning': 8 + 16,
            'git-like': 8 + 16,
            'time-travel-queries': 16,
            'blockchain-immutable': 16
        },
        'dataRedundancyLevel': {
            'none': 1 + 2 + 4 + 8 + 16,
            'single-site-raid': 2 + 4 + 8 + 16,
            'multi-az': 4 + 8 + 16,
            'cross-region-passive': 8 + 16,
            'cross-region-active': 16,
            'multi-cloud': 16,
            'geo-distributed': 16
        },
        'haDrTestingFrequency': {
            'never': 1 + 2 + 4 + 8 + 16,
            'annual': 2 + 4 + 8 + 16,
            'semi-annual': 4 + 8 + 16,
            'quarterly': 8 + 16,
            'monthly': 16,
            'continuous': 16
        },
        'backupStrategy': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic': 2 + 4 + 8 + 16,
            'encrypted': 4 + 8 + 16,
            'geo-redundant': 8 + 16,
            'immutable': 16,
            'air-gapped': 16
        },
        'backupTestingFrequency': {
            'never': 1 + 2 + 4 + 8 + 16,
            'annual': 2 + 4 + 8 + 16,
            'semi-annual': 4 + 8 + 16,
            'quarterly': 8 + 16,
            'monthly': 16,
            'continuous': 16
        },
        'backupRetentionPeriod': {
            '7-days': 1 + 2 + 4 + 8 + 16,
            '30-days': 2 + 4 + 8 + 16,
            '90-days': 4 + 8 + 16,
            '6-months': 4 + 8 + 16,
            '1-year': 8 + 16,
            '2-years': 8 + 16,
            '3-years': 8 + 16,
            '5-years': 16,
            '7-years': 16
        },
        'dataRetentionPolicy': {
            '30-days': 1 + 2 + 4 + 8 + 16,
            '90-days': 2 + 4 + 8 + 16,
            '1-year': 4 + 8 + 16,
            '3-years': 8 + 16,
            '5-years': 8 + 16,
            '7-years': 16,
            '10-years': 16
        },
        'archivePolicy': {
            'none': 1 + 2 + 4 + 8 + 16,
            'short-term': 2 + 4 + 8 + 16,
            'cold-storage': 4 + 8 + 16,
            'glacier': 8 + 16,
            'tape-archive': 16,
            'legal-hold': 16,
            'regulatory': 16
        },
        'dataEolProcess': {
            'ad-hoc': 1 + 2 + 4 + 8 + 16,
            'formal-review': 4 + 8 + 16,
            'legal-review': 8 + 16,
            'automated-workflow': 8 + 16,
            'chain-of-custody': 16,
            'compliance-driven': 16
        },
        'dataDisposalMethod': {
            'none': 1 + 2 + 4 + 8 + 16,
            'manual': 2 + 4 + 8 + 16,
            'secure-wipe': 4 + 8 + 16,
            'cryptographic': 8 + 16,
            'degaussing': 8 + 16,
            'physical': 16,
            'witnessed': 16,
            'certified': 16
        },
        // Compliance & Governance        
        // Business Impact Assessment (rto/rpo/availabilitySLO/incidentResponse)
        'businessImpactLevel': {
            'low': 2 + 4 + 8 + 16,
            'medium': 4 + 8 + 16,
            'high': 8 + 16,
            'critical': 16,
            'catastrophic': 16
        },
        'availabilitySLO': {
            '95': 2 + 4 + 8 + 16,
            '99': 4 + 8 + 16,
            '99.5': 8 + 16,
            '99.9': 16,
            '99.95': 16,
            '99.99': 16,
            '99.999': 16
        },
        'rto': {
            '1-month': 1 + 2 + 4 + 8 + 16,
            '1-week':1 + 2 + 4 + 8 + 16,
            '5-days': 2 + 4 + 8 + 16,
            '72-hours': 2 + 4 + 8 + 16,
            '48-hours': 2 + 4 + 8 + 16,
            '24-hours': 4 + 8 + 16,
            '8-hours': 4 + 8 + 16,
            '4-hours': 8 + 16,
            '1-hour': 16,
            '30-minutes': 16,
            '15-minutes': 16,
            '5-minutes': 16,
            'immediate': 16
        },
        'rpo': {
            '1-month': 1 + 2 + 4 + 8 + 16,
            '1-week': 1 + 2 + 4 + 8 + 16,
            '5-days': 1 + 2 + 4 + 8 + 16,
            '72-hours': 1 + 2 + 4 + 8 + 16,
            '48-hours': 1 + 2 + 4 + 8 + 16,
            '24-hours': 2 + 4 + 8 + 16,
            '12-hours': 2 + 4 + 8 + 16,
            '8-hours': 2 + 4 + 8 + 16,
            '4-hours': 4 + 8 + 16,
            '1-hour': 4 + 8 + 16,
            '30-minutes': 8 + 16,
            '15-minutes': 16,
            '5-minutes': 16,
            'zero': 16
        },
        'incidentResponse': {
            'standard': 2 + 4 + 8 + 16,
            'priority': 4 + 8 + 16,
            'urgent': 8 + 16,
            'immediate': 16,
            'emergency': 16
        },
        'architectureGovernance': {
            'none': 1 + 2 + 4 + 8 + 16,
            'ad-hoc': 2 + 4 + 8 + 16,
            'arb-quarterly': 4 + 8 + 16,
            'arb-monthly': 4 + 8 + 16,
            'arb-regular': 8 + 16,
            'adr-maintained': 8 + 16,
            'roadmap-maintained': 8 + 16,
            'tech-radar': 8 + 16,
            'ea-framework': 16,
            'continuous-review': 16,
            'fitness-functions': 16
        },
        'thirdPartyRiskManagement': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic-questionnaire': 2 + 4 + 8 + 16,
            'annual-review': 4 + 8 + 16,
            'vendor-risk-scoring': 16,
            'on-site-audits': 16,
            'continuous-monitoring': 16,
            'sla-enforcement': 16,
            'supply-chain-security': 16,
            'escrow-accountability': 16,
            'insurance-verification': 16,
            'cyber-security-attestation': 16,
            'regulatory-compliance': 16,
            'privacy-impact-assessment': 16,
            'ethical-sourcing-review': 16,
            'modern-slavery-assessment': 16,
            'nth-tier-transparency': 16,
            'comprehensive-tprm': 16
        },
        'dpaStatus': {
            'not-applicable': 2 + 4 + 8 + 16,
            'app8-compliant': 4 + 8 + 16,
            'dpa-in-place': 8 + 16,
            'standard-contractual-clauses': 16,
            'binding-corporate-rules': 16,
            'adequacy-decision': 16
        },
        'regulatoryReporting': {
            'none': 1 + 2 + 4 + 8 + 16,
            'internal-only': 4 + 8 + 16,
            'ndb-scheme': 8 + 16,
            'gdpr-72-hours': 8 + 16,
            'mandatory-incident-reporting': 16,
            'real-time-regulatory': 16
        },
        'auditFrequency': {
            'never': 1 + 2 + 4 + 8 + 16,
            'ad-hoc': 2 + 4 + 8 + 16,
            'annual':  4 + 8 + 16,
            'semi-annual': 8 + 16,
            'quarterly': 16,
            'continuous': 16
        },
        'dataResidency': {
            'no-restrictions': 2 + 4 + 8 + 16,
            'preferred-australia': 4 + 8 + 16,
            'must-australia': 8 + 16,
            'must-jurisdiction': 8 + 16,
            'sovereign-cloud': 16,
            'must-on-premises': 16
        },
        // Privacy Engineering Controls
        'privacyByDesign': {
            'basic-privacy': 2 + 4 + 8 + 16,
            'privacy-assessment': 4 + 8 + 16,
            'privacy-by-design': 8 + 16,
            'privacy-engineering': 8 + 16,
            'differential-privacy': 16,
            'zero-knowledge': 16
        },
        'automatedPrivacyControlsPets': {
            'basic-anonymisation': 2 + 4 + 8 + 16,
            'tokenisation': 4 + 8 + 16,
            'differential-privacy': 8 + 16,
            'homomorphic-encryption': 8 + 16,
            'secure-mpc': 16,
            'comprehensive-pets': 16
        },
        'dataMinimisation': {
            'basic-reduction':  2 + 4 + 8 + 16,
            'purpose-based': 8 + 16,
            'automated-pruning': 8 + 16,
            'intelligent-sampling': 8 + 16,
            'synthetic-data': 16,
            'ephemeral-storage': 16,
            'privacy-preserving-analytics': 16,
            'federated-analytics': 16
        },
        'appDataCollectionLimitations': {
            'unrestricted-collection': 1 + 2 + 4 + 8 + 16,
            'purpose-limitation': 4 + 8 + 16,
            'necessity-test': 4 + 8 + 16,
            'proportionality-assessment': 8 + 16,
            'minimal-collection': 16,
            'strict-purpose-binding': 16
        },
        'appSolicitedUnsolicited': {
            'solicited-only': 2 + 4 + 8 + 16,
            'unsolicited-review': 4 + 8 + 16,
            'automatic-destruction': 8 + 16,
            'lawful-retention': 16,
            'segregated-handling': 16,
            'comprehensive-policy': 16
        },
        'appCollectionNotice': {
            'basic-notice': 2 + 4 + 8 + 16,
            'detailed-notice': 4 + 8 + 16,
            'layered-notice': 8 + 16,
            'just-in-time': 8 + 16,
            'interactive-notice': 8 + 16,
            'comprehensive-disclosure': 16
        },
        'appNotificationRequirements': {
            'basic-notifications': 2 + 4 + 8 + 16,
            'proactive-notifications': 4 + 8 + 16,
            'automated-notifications': 8 + 16,
            'personalised-notifications': 16,
            'multi-channel-notifications': 16,
            'intelligent-notifications': 16
        },  
        'appThirdPartyCollection': {
            'notification-only': 16,
            'consent-required': 16,
            'source-verification': 16,
            'purpose-alignment': 16,
            'comprehensive-tracking': 16,
            'no-third-party': 16
        },
        'crossBorderDataTransferCompliance': {
            'data-localisation': 16,
            'notification-only': 16,
            'australian-sccs': 16,
            'apec-cbpr': 16,
            'gdpr-adequacy': 16,
            'comprehensive-framework': 16,
            'no-cross-border': 16
        },
        'consentManagement': {
            'basic-consent': 2 + 4 + 8 + 16,
            'granular-consent': 16,
            'dynamic-consent': 16,
            'consent-preferences': 16,
            'consent-auditing': 16,
            'consent-automation': 16,
            'consent-revocation': 16,
            'consent-analytics': 16,
            'blockchain-consent': 16
        },
        'consentWithdrawalMechanism': {
            'manual-request': 2 + 4 + 8 + 16,
            'self-service-portal': 4 + 8 + 16,
            'one-click-withdrawal': 8 + 16,
            'automated-propagation': 8 + 16,
            'real-time-cessation': 16,
            'verified-withdrawal': 16
        },
        'appCustomerAccess': {
            'manual-requests': 2 + 4 + 8 + 16,
            'customer-portal': 4 + 8 + 16,
            'automated-access': 8 + 16,
            'structured-export': 8 + 16,
            'api-access': 8 + 16,
            'real-time-access': 16,
            'comprehensive-rights-platform': 16
        },
        'appDataCorrection': {
            'manual-correction': 2 + 4 + 8 + 16,
            'audit-trail-correction': 2 + 4 + 8 + 16,
            'customer-correction': 4 + 8 + 16,
            'workflow-correction': 8 + 16,
            'verified-correction': 8 + 16,
            'real-time-correction': 16,
            'automated-verification': 16
        },              
        'appDataRetentionDisposal': {
            'manual-review': 2 + 4 + 8 + 16,
            'business-purpose': 4 + 8 + 16,
            'automated-disposal': 4 + 8 + 16,
            'value-based-retention': 4 + 8 + 16,
            'intelligent-lifecycle': 8 + 16,
            'compliance-driven': 16,
            'automated-enforcement': 16
        },
        'rightToErasure': {
            'manual-deletion': 2 + 4 + 8 + 16,
            'automated-deletion': 4 + 8 + 16,
            'secure-erasure': 4 + 8 + 16,
            'cross-system-erasure': 8 + 16,
            'verified-erasure': 8 + 16,
            'immutable-erasure': 16,
            'erasure-auditing': 16
        },
        'privacyTrainingAwareness': {
            'basic-orientation': 2 + 4 + 8 + 16,
            'annual-training': 4 + 8 + 16,
            'role-based-training': 8 + 16,
            'continuous-learning': 16,
            'privacy-engineering': 16,
            'comprehensive-culture': 16
        },
        'copyrightFairUseCompliance': {
            'no-copyrighted-material': 16,
            'licensed-content': 16,
            'fair-dealing': 16,
            'content-verification': 16,
            'usage-tracking': 16,
            'rights-clearance': 16,
            'licence-compliance': 16,
            'attribution-management': 16,
            'comprehensive-ipr': 16
        },
        'indigenousDataSovereignty': {
            'not-applicable': 16,
            'basic-consultation': 16,
            'cultural-sensitivity-training': 16,
            'care-principles': 16,
            'indigenous-governance': 16,
            'community-ownership': 16,
            'comprehensive-ids': 16
        },
        // Accessibility (DDA)
        'accessibilityCompliance': {
            'basic-accessibility': 1 + 2 + 4 + 8 + 16,
            'wcag-a': 1 + 2 + 4 + 8 + 16,
            'wcag-aa': 2 + 4 + 8 + 16,
            'wcag-aaa': 16,
            'adaptive-interfaces': 16,
            'universal-design': 16
        },
        'assistiveTechnologySupport': {
            'screen-reader': 16,
            'keyboard-navigation': 16,
            'voice-control': 16,
            'eye-tracking': 16,
            'switch-control': 16,
            'comprehensive-assistive': 16
        },
        'inclusiveDataAccessDesign': {
            'standard-interface': 1 + 2 + 4 + 8 + 16,
            'high-contrast': 16,
            'scalable-text': 16,
            'responsive-design': 16,
            'alternative-formats': 16,
            'cognitive-accessibility': 16,
            'multi-sensory': 16
        },
        'workplaceAccessibilityAccommodation': {
            'standard-workstation': 1 + 2 + 4 + 8 + 16,
            'ergonomic-adjustments': 16,
            'assistive-hardware': 16,
            'flexible-interfaces': 16,
            'remote-accessibility': 16,
            'comprehensive-accommodation': 16
        },

        // Zero Trust Data Security
        'dataMicrosegmentation': {
            'network-segmentation': 2 + 4 + 8 + 16,
            'environment-segmentation': 4 + 8 + 16,
            'application-segmentation': 4 + 8 + 16,
            'data-layer-segmentation': 8 + 16,
            'user-segmentation': 8 + 16,
            'context-aware-segmentation': 16,
            'zero-trust-segmentation': 16,
            'dynamic-segmentation': 16,
            'intent-based-segmentation': 16
        },
        'containerDataProtection': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic-secrets': 2 + 4 + 8 + 16,
            'basic-scanning': 4 + 8 + 16,
            'encrypted-secrets': 4 + 8 + 16,
            'vault-integration': 8 + 16,
            'runtime-protection': 8 + 16,
            'network-policies': 8 + 16,
            'admission-controls': 16,
            'service-mesh-security': 16,
            'ebpf-runtime': 16
        },
        'multiCloudDataGovernance': {
            'single-cloud': 16,
            'multi-cloud-basic': 16,
            'cloud-agnostic': 16,
            'unified-governance': 16,
            'federated-governance': 16,
            'sovereign-cloud': 16,
            'cloud-first': 16,
            'cloud-right': 16,
            'hybrid-cloud': 16,
            'on-premises-only': 16
        },
        'iacSecurityScanning': {
            'manual-review': 2 + 4 + 8 + 16,
            'template-validation': 4 + 8 + 16,
            'basic-scanning': 4 + 8 + 16,
            'policy-as-code': 8 + 16,
            'automated-compliance': 8 + 16,
            'continuous-iac-scanning': 16,
            'shift-left-iac-security': 16,
            'runtime-iac-assurance': 16
        },
        'continuousVerification': {
            'periodic-reauth': 2 + 4 + 8 + 16,
            'per-request': 4 + 8 + 16,
            'continuous-eval': 8 + 16,
            'risk-rescoring': 8 + 16,
            'behavioural-monitoring': 8 + 16,
            'adaptive-verification': 16,
            'real-time-assessment': 16
        },
        'justInTimeDataAccess': {
            'manual-approval': 2 + 4 + 8 + 16,
            'brokered-access': 4 + 8 + 16,
            'automated-approval': 4 + 8 + 16,
            'ephemeral-creds': 8 + 16,
            'context-aware-access': 16,
            'real-time-provisioning': 16
        },
        'riskBasedAuthentication': {
            'static': 2 + 4 + 8 + 16,
            'geo-ip': 4 + 8 + 16,
            'device-posture': 8 + 16,
            'behaviour-analytics': 16,
            'continuous-risk': 16
        },
        'deviceTrustVerification': {
            'unknown-block': 2 + 4 + 8 + 16,
            'mdm-enrolled': 4 + 8 + 16,
            'posture-attested': 8 + 16,
            'continuous-edr': 16
        },
        'serverlessDataSecurity': {
            'basic-iam': 2 + 4 + 8 + 16,
            'least-privilege': 4 + 8 + 16,
            'secret-mgmt': 4 + 8 + 16,
            'runtime-policy': 8 + 16,
            'function-isolation': 8 + 16,
            'ephemeral-encryption': 16,
            'advanced-security': 16
        },
        'cspmDataAssets': {
            'none': 1 + 2 + 4 + 8 + 16,
            'discovery-only': 2 + 4 + 8 + 16,
            'classification': 4 + 8 + 16,
            'misconfig-detect': 8 + 16,
            'auto-remediation': 16
        },
        'cloudEgressControls': {
            'unrestricted': 2 + 4 + 8 + 16,
            'firewall-inspection': 2 + 4 + 8 + 16,
            'allow-list': 4 + 8 + 16,
            'org-wide-dlp': 8 + 16,
            'casb': 8 + 16,
            'private-connectivity': 16,
            'private-endpoints': 16
        },
        'cloudIngressControls': {
            'direct-public': 1 + 2 + 4 + 8 + 16,
            'reverse-proxy': 2 + 4 + 8 + 16,
            'cloud-waf': 4 + 8 + 16,
            'api-gateway': 4 + 8 + 16,
            'cdn-ddos': 8 + 16,
            'bot-protection': 8 + 16,
            'zero-trust-ingress': 8 + 16,
            'private-only': 16
        },
        'workloadIdentityFederation': {
            'long-lived-keys': 2 + 4 + 8 + 16,
            'short-lived-tokens': 4 + 8 + 16,
            'automated-rotation': 8 + 16,
            'oidc-federation': 8 + 16,
            'spiffe-spire': 8 + 16,
            'zero-trust-identities': 16
        },
        // AI/ML Data Protection
        'trainingDataProtection': {
            'basic-anonymisation': 2 + 4 + 8 + 16,
            'data-masking': 4 + 8 + 16,
            'synthetic-training': 4 + 8 + 16,
            'differential-privacy': 8 + 16,
            'federated-learning': 8 + 16,
            'secure-multiparty': 16,
            'homomorphic-encryption': 16
        },
        'aiGovernance': {
            'basic-oversight': 2 + 4 + 8 + 16,
            'ai-ethics-board': 4 + 8 + 16,
            'algorithmic-auditing': 8 + 16,
            'responsible-ai': 16,
            'ai-risk-management': 16,
            'ai-explainability': 16
        },
        'aiModelExplainability': {
            'black-box': 1 + 2 + 4 + 8 + 16,
            'basic-logging': 2 + 4 + 8 + 16,
            'feature-importance': 4 + 8 + 16,
            'local-explanations': 4 + 8 + 16,
            'global-explanations': 8 + 16,
            'lime-shap': 8 + 16,
            'counterfactuals': 8 + 16,
            'human-readable': 16,
            'model-agnostic': 16,
            'interpretable-models': 16,
            'full-audit-trail': 16
        },
        'algorithmicBiasDetection': {
            'none': 1 + 2 + 4 + 8 + 16,
            'pre-deployment': 2 + 4 + 8 + 16,
            'post-deployment': 4 + 8 + 16,
            'continuous-monitoring': 8 + 16,
            'human-in-the-loop': 8 + 16,
            'representative-data': 16,
            'algorithmic-auditing': 16,
            'fairness-metrics': 16,
            'bias-remediation': 16
        },
        'aiModelCards': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic-docs': 2 + 4 + 8 + 16,
            'version-history': 2 + 4 + 8 + 16,
            'model-cards': 4 + 8 + 16,
            'detailed-cards': 4 + 8 + 16,
            'data-sheets': 4 + 8 + 16,
            'training-procedures': 8 + 16,
            'evaluation-metrics': 8 + 16,
            'ethical-considerations': 8 + 16,
            'usage-guidelines': 16,
            'comprehensive-lineage': 16,
            'regulatory-compliance': 16,
            'audit-reports': 16,
            'public-transparency': 16
        },
        'humanInLoopAi': {
            'fully-automated': 1 + 2 + 4 + 8 + 16,
            'review-on-escalation': 2 + 4 + 8 + 16,
            'human-on-loop': 4 + 8 + 16,
            'human-in-loop': 8 + 16,
            'meaningful-control': 16
        },
        'modelDataLeakagePrevention': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic-filtering': 2 + 4 + 8 + 16,
            'pii-detection': 4 + 8 + 16 + 16,
            'access-controls': 4 + 8,
            'watermarking': 8 + 16,
            'usage-monitoring': 8 + 16,
            'automated-alerting': 16,
            'differential-privacy': 16,
            'model-inversion': 16,
            'comprehensive-prevention': 16
        },
        'aiSafetyAdversarial': {
            'none': 1 + 2 + 4 + 8 + 16,
            'input-validation': 2 + 4 + 8 + 16,
            'adversarial-testing': 4 + 8 + 16,
            'red-teaming': 8 + 16,
            'continuous-safety': 16
        },
        'aiDataLineage': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic-tracking': 2 + 4 + 8 + 16,
            'automated-lineage': 4 + 8 + 16,
            'cryptographic-provenance': 8 + 16,
            'immutable-audit': 16
        },
        'modelVersioningRollback': {
            'manual': 1 + 2 + 4 + 8 + 16,
            'version-tagging': 2 + 4 + 8 + 16,
            'automated-cicd': 4 + 8 + 16,
            'blue-green': 8 + 16,
            'canary-deployments': 8 + 16,
            'ab-testing': 8 + 16,
            'instant-rollback': 16
        },
        'aiModelDrift': {
            'none': 1 + 2 + 4 + 8 + 16,
            'manual-review': 2 + 4 + 8 + 16,
            'statistical-monitoring': 4 + 8 + 16,
            'automated-detection': 8 + 16,
            'auto-retraining': 16,
            'continuous-learning': 16
        },
        'thirdPartyAiRisk': {
            'vendor-assurance': 2 + 4 + 8 + 16,
            'model-cards-review': 4 + 8 + 16,
            'independent-testing': 8 + 16,
            'continuous-validation': 16,
            'no-third-party': 16
        },
        'aiSupplyChainTransparency': {
            'none': 1 + 2 + 4 + 8 + 16,
            'model-inventory': 2 + 4 + 8 + 16,
            'training-sources': 4 + 8 + 16,
            'full-ai-bom': 8 + 16,
            'supply-chain-verification': 16,
            'third-party-audits': 16
        },


        // Supply Chain Security
        'thirdPartyDataProcessing': {
            'basic-agreements': 2 + 4 + 8 + 16,
            'enhanced-dpa': 4 + 8 + 16,
            'vendor-assessment': 4 + 8 + 16,
            'continuous-monitoring': 8 + 16,
            'zero-trust-vendors': 16,
            'data-sovereignty': 16
        },
        'supplyChainDataMapping': {
            'basic-inventory': 2 + 4 + 8 + 16,
            'data-flow-mapping': 4 + 8 + 16,
            'risk-based-mapping': 8 + 16,
            'automated-discovery': 8 + 16,
            'continuous-mapping': 16,
            'blockchain-provenance': 16
        },
        'buildProvenanceSigning': {
            'ad-hoc-logs': 2 + 4 + 8 + 16,
            'slsa-l1-provenance': 4 + 8 + 16,
            'slsa-l2-hosted': 8 + 16,
            'slsa-l3-hardened': 16
        },
        'secureDevPracticesSsdf': {
            'none': 1 + 2 + 4 + 8 + 16,
            'policy-only': 2 + 4 + 8 + 16,
            'partial-ssdf': 4 + 8 + 16,
            'ssdf-baseline': 8 + 16,
            'ssdf-independent-assessment': 16
        },
        'vulnerabilityDisclosureSla': {
            'no-vdp': 1 + 2 + 4 + 8 + 16,
            'informal-vdp': 2 + 4 + 8 + 16,
            'coordinated-vdp': 4 + 8 + 16,
            'vdp-sla-30-14-7': 8 + 16,
            'vdp-sla-emergency': 16
        },
        'supplierSecurityAssurance': {
            'none': 1 + 2 + 4 + 8 + 16,
            'self-attestation': 2 + 4 + 8 + 16,
            'iso27001': 4 + 8 + 16,
            'soc2-irap': 4 + 8 + 16,
            'third-party-audit': 4 + 8 + 16,
            'on-site-audits': 8 + 16,
            'escrow-accountability': 8 + 16,
            'insurance-verification': 8 + 16,
            'privacy-impact-assessment': 8 + 16,
            'ethical-sourcing-review': 8 + 16,
            'modern-slavery': 8 + 16,
            'regulatory-compliance': 8 + 16,
            'infrastructure-security-assessment': 16,
            'data-protection-assessment': 16,
            'cybersecurity-maturity-assessment': 16,
            'vendor-risk-management': 16,
            'continuous-assurance': 16
        },
        'dependencyPolicyEnforcement': {
            'none': 1 + 2 + 4 + 8 + 16,
            'allowlist-registries': 2 + 4 + 8 + 16,
            'pinned-versions': 4 + 8 + 16,
            'verified-publishers': 8 + 16,
            'opa-signed-only': 16
        },
        'runtimeSupplyChainControls': {
            'none': 1 + 2 + 4 + 8 + 16,
            'pre-deploy-scan': 2 + 4 + 8 + 16,
            'signed-only-admission': 4 + 8 + 16,
            'runtime-ebpf-ids': 8 + 16,
            'continuous-posture-drift-prevention': 16
        },
        'fourthPartyFlowdown': {
            'none': 1 + 2 + 4 + 8 + 16,
            'flowdown-clauses': 2 + 4 + 8 + 16,
            'registry-4th-parties': 4 + 8 + 16,
            'risk-based-4th-assessment': 8 + 16,
            'continuous-monitoring-4th': 16
        },
        'dataResidencyRequirements': {
            'unrestricted': 2 + 4 + 8 + 16,
            'preferred-regions': 4 + 8 + 16,
            'restricted-regions': 4 + 8 + 16,
            'au-only': 8 + 16,
            'au-attestation': 16,
            'au-indigenous-sovereignty': 16
        },
        'thirdPartyAccessArchitecture': {
            'public-endpoints': 2 + 4 + 8 + 16,
            'vpn': 4 + 8 + 16,
            'private-peering': 4 + 8 + 16,
            'installed-agent': 4 + 8 + 16,
            'vdi': 8 + 16,
            'vpam': 8 + 16,
            'ztna-jit': 16,
            'ztna-device-posture-session-recording': 16
        },
        'incidentBreachNotification': {
            'none': 1 + 2 + 4 + 8 + 16,
            '72h': 2 + 4 + 8 + 16,
            '48h': 4 + 8,
            '24h': 8 + 16,
            'realtime-4h': 16
        },
        'vendorStabilityMarketPosition': {
            'not-assessed': 2 + 4 + 8 + 16,
            'startup-emerging': 4 + 8 + 16,
            'established-niche': 4 + 8 + 16,
            'regional-leader': 8 + 16,
            'gartner-challenger-visionary': 16,
            'gartner-leader-local': 16,
            'critical-infrastructure-vetted': 16
        },

        // Advanced Threat Protection
        'insiderThreatDetection': {
            'basic-logging': 2 + 4 + 8 + 16,
            'rule-based-monitoring': 4 + 8 + 16,
            'data-loss-prevention': 4 + 8 + 16,
            'user-activity-monitoring': 8 + 16,
            'behavioural-analytics': 8 + 16,
            'ml-anomaly': 16,
            'real-time-monitoring': 16,
            'psychological-indicators': 16,
            'comprehensive-program': 16
        },
        'uebaDataOperations': {
            'basic-monitoring': 2 + 4 + 8 + 16,
            'statistical-analysis': 4 + 8 + 16,
            'ml-behavioural': 8 + 16,
            'advanced-ueba': 16,
            'ai-driven-detection': 16,
            'integrated-response': 16
        },
        'postQuantumCryptography': {
            'current-algorithms': 2 + 4 + 8 + 16,
            'quantum-assessment': 4 + 8 + 16,
            'hybrid-algorithms': 4 + 8 + 16,
            'nist-approved': 8 + 16,
            'crypto-agility': 8 + 16,
            'quantum-safe': 16,
            'full-post-quantum': 16
        },
        'cryptoAgility': {
            'static-crypto': 2 + 4 + 8 + 16,
            'configurable-crypto': 4 + 8 + 16,
            'modular-crypto': 4 + 8,
            'api-driven': 8 + 16,
            'automated-migration': 16,
            'dynamic-crypto': 16
        },
        'threatIntelligenceSharing': {
            'none': 1 + 2 + 4 + 8 + 16,
            'internal-feeds': 2 + 4 + 8 + 16,
            'open-source-ti': 4 + 8 + 16,
            'commercial-ti': 4 + 8 + 16,
            'industry-isacs': 8 + 16,
            'automated-response': 16
        },
        'ransomwareDataExtortionDefense': {
            'basic-backup': 2 + 4 + 8 + 16,
            'data-watermarking': 16,
            'immutable-backups': 16,
            'behavioural-detection': 16,
            'incident-response-playbook': 16,
            'air-gapped-tested': 16,
            'offline-crypto-escrow': 16,
            'forensic-readiness': 16,
            'cyber-insurance': 16,
            'negotiation-support': 16,
            'legal-privacy-consultation': 16,
            'comprehensive-ir': 16
        },
        'deceptionTechnologiesData': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic-honeypots': 2 + 4 + 8 + 16,
            'honeyfiles-tokens': 4 + 8 + 16,
            'network-deception': 4 + 8 + 16,
            'deceptive-credentials': 8 + 16,
            'adaptive-deception': 8 + 16,
            'full-deception-fabric': 16
        },
        'homomorphicConfidentialComputing': {
            'not-applicable': 2 + 4 + 8 + 16,
            'research-pilot': 4 + 8 + 16,
            'production-specific': 4 + 8 + 16,
            'tee-sgx-sev': 8 + 16,
            'confidential-enclaves': 8 + 16,
            'secure-mpc': 16,
            'full-homomorphic': 16,
            'comprehensive-privacy-compute': 16
        },
        'cryptographicKeyLifecycle': {
            'software-keys': 2 + 4 + 8 + 16,
            'distributed-km': 4 + 8 + 16,
            'automated-key-rotation': 4 + 8 + 16,
            'crypto-shredding': 8 + 16,
            'hsm': 8 + 16,
            'qkd-prep': 16,
            'post-quantum-km': 16,
            'end-to-end-quantum-safe': 16
        },

        // Data Democratisation vs Control
        'dataAccessGovernance': {
            'self-service-governed': 2 + 4 + 8 + 16,
            'centralised-control': 4 + 8 + 16,
            'federated-governance': 8 + 16,
            'data-mesh': 16,
            'risk-based-access': 16,
            'adaptive-governance': 16
        },
        'selfServiceDataAccess': {
            'no-self-service': 2 + 4 + 8 + 16,
            'limited-self-service': 4 + 8 + 16,
            'guided-self-service': 4 + 8 + 16,
            'automated-provisioning': 8 + 16,
            'ai-assisted-access': 16,
            'full-democratisation': 16
        },
        'dataAccessBalancing': {
            'business-value': 2 + 4 + 8 + 16,
            'risk-reward': 4 + 8 + 16,
            'dynamic-balancing': 8 + 16,
            'context-aware': 16,
            'security-first': 16,
            'zero-trust-access': 16
        },
        'dataLiteracyPrograms': {
            'no-formal-program': 2 + 4 + 8 + 16,
            'basic-training': 4 + 8 + 16,
            'role-based-training': 8 + 16,
            'continuous-education': 16,
            'data-culture': 16,
            'data-champions': 16,
            'comprehensive-literacy': 16
        },
        'controlledDataSharing': {
            'no-external-sharing': 2 + 4 + 8 + 16,
            'manual-approval': 4 + 8 + 16,
            'api-controlled': 8 + 16,
            'automated-governance': 16,
            'federated-sharing': 16,
            'privacy-preserving': 16
        },
        'dataCatalogDiscovery': {
            'no-catalog': 1 + 2 + 4 + 8 + 16,
            'manual-documentation': 2 + 4 + 8 + 16,
            'basic-metadata-catalog': 4 + 8 + 16,
            'automated-discovery-glossary': 8 + 16,
            'ai-semantic-search': 16,
            'unified-data-fabric': 16,
            'automated-lineage': 16
        },
        'dynamicDataMaskingSelfService': {
            'no-masking': 1 + 2 + 4 + 8 + 16,
            'static-masking': 2 + 4 + 8 + 16,
            'role-based-masking': 4 + 8 + 16,
            'context-aware-masking': 8 + 16,
            'dynamic-field-masking': 16,
            'differential-privacy': 16,
            'synthetic-data-generation': 16
        },
        'dataAccessRequestWorkflow': {
            'email-requests': 2 + 4 + 8 + 16,
            'ticketing-system': 4 + 8 + 16,
            'self-service-portal': 8 + 16,
            'jit-access-provisioning': 16,
            'risk-based-auto-approval': 16,
            'continuous-certification': 16
        },
        'dataUsageAnalytics': {
            'no-tracking': 1 + 2 + 4 + 8 + 16,
            'basic-access-logs': 2 + 4 + 8 + 16,
            'usage-metrics': 4 + 8 + 16,
            'role-based-analytics': 4 + 8 + 16,
            'usage-dashboards': 8 + 16,
            'user-behaviour-analytics': 16,
            'anomaly-detection': 16,
            'purpose-based-monitoring': 16,
            'ai-usage-insights': 16
        },
        'dataEntitlementModel': {
            'no-attribution': 1 + 2 + 4 + 8 + 16,
            'rbac': 4 + 8 + 16,
            'abac': 8 + 16,
            'rebac': 8 + 16,
            'dynamic-context-aware': 16,
            'policy-based-automation': 16,
            'zero-trust-entitlements': 16
        },
        'dataAccessRecertification': {
            'no-recertification': 1 + 2 + 4 + 8 + 16,
            'annual-recertification': 2 + 4 + 8 + 16,
            'quarterly-recertification': 4 + 8 + 16,
            'role-based-recertification': 8 + 16,
            'usage-based-recertification': 8 + 16,
            'manager-attestation': 8 + 16,
            'risk-based-recertification': 16,
            'continuous-certification': 16
        },
        
        // Modern Data Security Controls        
        'dataDiscoveryAutomation': {
            'manual-inventory': 2 + 4 + 8 + 16,
            'automated-scanning': 4 + 8 + 16,
            'ml-based-discovery': 8 + 16,
            'continuous-discovery': 8 + 16,
            'cross-platform-discovery': 16,
            'real-time-classification': 16,
            'hybrid-discovery': 16
        },
        'sensitiveDataScanning': {
            'periodic-scans': 2 + 4 + 8 + 16,
            'scheduled-automated': 4 + 8 + 16,
            'continuous-scanning': 8 + 16,
            'cross-repository': 16,
            'intelligent-scanning': 16,
            'compliance-scanning': 16
        },
        'contentBasedClassification': {
            'manual-tagging': 2 + 4 + 8 + 16,
            'user-driven': 2 + 4 + 8 + 16,
            'keyword-based': 4 + 8 + 16,
            'metadata-driven': 4 + 8 + 16,
            'rule-based': 4 + 8 + 16,
            'pattern-matching': 8 + 16,
            'regex-classification': 8 + 16,
            'ml-classification': 8 + 16,
            'ai-powered-classification': 16,
            'semantic-analysis': 16,
            'contextual-classification': 16
        },
        'dataSecurityPostureManagement': {
            'no-dspm': 1 + 2 + 4 + 8 + 16,
            'manual-inventories': 2 + 4 + 8 + 16,
            'dspm-discovery': 4 + 8 + 16,
            'dspm-risk-scoring': 8 + 16,
            'dspm-auto-remediation': 16,
            'cloud-native-dspm': 16
        },
        'dlpAutomation': {
            'no-dlp': 1 + 2 + 4 + 8 + 16,
            'email-dlp': 2 + 4 + 8 + 16,
            'endpoint-dlp': 4 + 8 + 16,
            'network-dlp': 4 + 8 + 16,
            'cloud-dlp': 16,
            'integrated-dlp': 16,
            'ai-contextual-dlp': 16
        },
        'dataLabelingTaggingAutomation': {
            'manual-labeling': 2 + 4 + 8 + 16,
            'user-prompted': 4 + 8 + 16,
            'auto-suggested': 4 + 8 + 16,
            'automated-ml': 8 + 16,
            'persistent-labels': 8 + 16,
            'real-time-contextual': 16,
            'cross-system-propagation': 16
        },
        'dataPolicyEnforcementAutomation': {
            'manual-enforcement': 2 + 4 + 8 + 16,
            'basic-policy-rules': 4 + 8 + 16,
            'abac-policy-engine': 4 + 8 + 16,
            'real-time-pdp': 8 + 16,
            'ai-policy-recommendations': 16,
            'self-healing-conflicts': 16
        },
        'soarDataIncidents': {
            'no-automation': 1 + 2 + 4 + 8 + 16,
            'basic-ticketing': 2 + 4 + 8 + 16,
            'playbook-response': 4 + 8 + 16,
            'semi-automated': 8 + 16,
            'full-soar': 16,
            'ai-augmented': 16
        },
        'automatedComplianceReporting': {
            'manual-reports': 2 + 4 + 8 + 16,
            'scheduled-generation': 4 + 8 + 16,
            'continuous-monitoring': 8 + 16,
            'auto-audit-evidence': 16,
            'real-time-dashboards': 16,
            'predictive-risk': 16
        },
        'automatedDataLifecycle': {
            'manual-lifecycle': 2 + 4 + 8 + 16,
            'scheduled-archival': 4 + 8 + 16,
            'policy-based': 8 + 16,
            'automated-ttl': 16,
            'ml-optimisation': 16,
            'event-driven': 16
        },
        'apiSecurityDataFlowMonitoring': {
            'no-monitoring': 1 + 2 + 4 + 8 + 16,
            'gateway-logging': 2 + 4 + 8 + 16,
            'security-scanning': 4 + 8 + 16,
            'real-time-detection': 8 + 16,
            'data-leakage-prevention': 16,
            'behaviour-analytics': 16
        },

        // Data Governance & Management        
        'dataLineageTracking': {
            'none': 1 + 2 + 4 + 8 + 16,
            'manual-documentation': 2 + 4 + 8 + 16,
            'metadata-driven': 4 + 8 + 16,
            'automated-discovery': 8 + 16,
            'real-time-tracking': 8 + 16,
            'end-to-end-visibility': 16,
            'impact-analysis': 16
        },
        'recordPrimacyManagement': {
            'none': 1 + 2 + 4 + 8,
            'source-system-priority': 2 + 4 + 8,
            'master-data-management': 4 + 8,
            'golden-record': 8,
            'consensus-based': 8,
            'temporal-primacy': 16,
            'multi-domain-mdm': 16
        },
        'dataQualityControls': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic-validation': 2 + 4 + 8 + 16,
            'rule-based-checks': 4 + 8 + 16,
            'statistical-profiling': 8 + 16,
            'ml-quality-detection': 8 + 16,
            'real-time-monitoring': 16,
            'continuous-improvement': 16
        },
        'metadataManagement': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic-documentation': 2 + 4 + 8 + 16,
            'data-dictionary': 4 + 8 + 16,
            'catalog-driven': 4 + 8 + 16,
            'semantic-layer': 8 + 16,
            'automated-discovery': 16,
            'enterprise-metadata': 16
        },
        'dataStewardshipProgram': {
            'none': 1 + 2 + 4 + 8 + 16,
            'ad-hoc-ownership': 2 + 4 + 8 + 16,
            'business-stewards': 8 + 16,
            'domain-stewards': 8 + 16,
            'technical-stewards': 8 + 16,
            'federated-stewardship': 16,
            'centre-of-excellence': 16
        },
        'dataGovernanceFramework': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic-policies': 2 + 4 + 8 + 16,
            'dmbok-framework': 4 + 8 + 16,
            'dama-framework': 4 + 8 + 16,
            'cobit-data': 8 + 16,
            'custom-framework': 8 + 16,
            'adaptive-governance': 16
        },
        'dataFlowDocumentation': {
            'none': 1 + 2 + 4 + 8 + 16,
            'manual-documentation': 2 + 4 + 8 + 16,
            'high-level-diagrams': 2 + 4 + 8 + 16,
            'detailed-mapping': 4 + 8 + 16,
            'system-integration': 4 + 8 + 16,
            'api-flow-tracking': 8 + 16,
            'automated-lineage': 8 + 16,
            'network-flow-analysis': 8 + 16,
            'automated-discovery': 8 + 16,
            'real-time-monitoring': 16,
            'real-time-mapping': 16,
            'comprehensive-catalog': 16
        },
        'reportingAnalyticsGovernance': {
            'none': 1 + 2 + 4 + 8 + 16,
            'basic-controls': 2 + 4 + 8 + 16,
            'standardised-metrics': 4 + 8 + 16,
            'self-service-governed': 8 + 16,
            'data-mart-governance': 8 + 16,
            'certified-reports': 16,
            'enterprise-reporting': 16
        },
        'dataOwnershipAccountability': {
            'no-defined-ownership': 1 + 2 + 4 + 8 + 16,
            'it-owned': 2 + 4 + 8 + 16,
            'shared-ownership': 4 + 8 + 16,
            'business-owned': 4 + 8 + 16,
            'domain-driven': 8 + 16,
            'executive-accountability': 16,
            'data-trustee': 16
        },
        'dataStandardsConventions': {
            'no-standards': 1 + 2 + 4 + 8 + 16,
            'ad-hoc-naming': 1 + 2 + 4 + 8 + 16,
            'basic-conventions': 4 + 8 + 16,
            'industry-standards': 4 + 8 + 16,
            'enterprise-standards': 8 + 16,
            'data-taxonomies': 8 + 16,
            'semantic-standards': 16,
            'automated-enforcement': 16
        },
        'dataGlossaryBusinessTerms': {
            'no-glossary': 1 + 2 + 4 + 8 + 16,
            'informal-documentation': 1 + 2 + 4 + 8 + 16,
            'basic-glossary': 2 + 4 + 8 + 16,
            'searchable-glossary': 4 + 8 + 16,
            'multilingual-glossary': 8 + 16,
            'ai-powered-glossary': 16,
            'living-versioned-glossary': 16
        },
        'dataGovernanceCouncil': {
            'no-governance-body': 1 + 2 + 4 + 8 + 16,
            'ad-hoc-meetings': 2 + 4 + 8 + 16,
            'data-governance-council': 4 + 8 + 16,
            'cross-functional-committees': 4 + 8 + 16,
            'federated-governance': 8 + 16,
            'executive-steering': 16,
            'continuous-governance': 16
        },
        'dataIssueExceptionManagement': {
            'no-process': 1 + 2 + 4 + 8 + 16,
            'email-escalations': 2 + 4 + 8 + 16,
            'ticketing-system': 4 + 8 + 16,
            'formal-resolution': 4 + 8 + 16,
            'automated-detection': 16,
            'root-cause-analysis': 16,
            'continuous-improvement': 16
        },
        'dataValueRoiMeasurement': {
            'no-measurement': 1 + 2 + 4 + 8 + 16,
            'basic-cost-tracking': 2 + 4 + 8 + 16,
            'cost-benefit-analysis': 8 + 16,
            'data-asset-valuation': 16,
            'roi-dashboards': 16,
            'economic-value-added': 16,
            'data-monetisation': 16
        },
        'dataEthicsResponsibleUse': {
            'no-policy': 1 + 2 + 4 + 8 + 16,
            'basic-privacy-policy': 2 + 4 + 8 + 16,
            'ethics-guidelines': 4 + 8 + 16,
            'responsible-ai-framework': 8 + 16,
            'ethics-review-board': 8 + 16,
            'algorithmic-accountability': 16,
            'continuous-ethics-monitoring': 16
        },
};

/**
 * Determine if the selected option for a control is restricted for the given classification
 * @param {string} control - The name of the field
 * @param {string} selection - The value of the option
 * @param {string} classification - The current data classification level
 * @returns {boolean} True if selection is restricted for the classification, else false
 */
export const isSelectionRestricted = (control, selection, classification) => {
    const controlRestrictions = controlRestrictionMasks[control] || {};
    const selectionRestriction = controlRestrictions[selection] || 0;

    const classificationBit = getClassificationBit(classification);

    return (selectionRestriction & classificationBit) !== 0;
};

/**
 * Gets the bitwise value for a given data classification level
 * @param {*} classification - The data classification level (public, internal, confidential, restricted)
 * @returns - bitwise value
 */
const getClassificationBit = (classification) => {
    return classification === 'public' ? 1 :
           classification === 'internal' ? 2 :
           classification === 'confidential' ? 4 :
           classification === 'restricted' ? 8 :
           classification === 'restricted_caution' ? 16 :
           0;
};

/**
 * Count the number of set bits in a bitmask
 * @param {number} mask
 * @returns {number}
 */
const countBits = (mask) => {
    let count = 0;
    let remaining = mask;
    while (remaining) {
        count += remaining & 1;
        remaining >>= 1;
    }
    return count;
};

/**
 * Derive the minimum set of options that satisfy a classification for a control, directly from
 * controlRestrictionMasks rather than a separately maintained requirements list. Options tied for
 * the same restriction bitmask are treated as an equivalent tier - selecting any one of them satisfies
 * the requirement.
 *
 * Note: options omitted from controlRestrictionMasks default to "never restricted" (mask 0), so this
 * will never surface an option missing from the map as the minimum requirement. Controls with
 * incomplete mappings may therefore return  * an empty or overly strong recommendation.
 * @param {string} control - the name of the field
 * @param {string} classification - the current data classification level
 * @returns {string[]} option names that meet the minimum bar for this classification (any one satisfies)
 */
export const getMinimumRequiredOptions = (control, classification) => {
    const classificationBit = getClassificationBit(classification);
    const optionMasks = controlRestrictionMasks[control] || {};
    const optionNames = Object.keys(optionMasks);

    if (!classificationBit || optionNames.length === 0) {
        return [];
    }

    const passingOptions = optionNames.filter(option => (optionMasks[option] & classificationBit) === 0);
    if (passingOptions.length === 0) {
        return [];
    }

    // The minimum tier is the passing option(s) restricted at the most other classifications,
    // i.e. the weakest option that still clears this classification's bar
    const maxRestrictionCount = Math.max(...passingOptions.map(option => countBits(optionMasks[option])));
    return passingOptions.filter(option => countBits(optionMasks[option]) === maxRestrictionCount);
};

/**
 * Get the restriction reason for a specific control and classification
 * 
 * TODO: Complete the restriction reasons for all controls and classifications.
 * @param {String} control - The name of the field
 * @param {String} classification - The current data classification level
 * @returns {String} The restriction reason
 */
const getRestrictionReason = (control, classification) => {
    
    const reasons = {
        // Security Controls
        'atRestEncryption': {
            'internal': 'Internal classified data requires at least standard encryption.',
            'confidential': 'Confidential classified data requires strong encryption.',
            'restricted': 'Restricted classified data requires maximum encryption.'
        },
        'inTransitEncryption': {
            'public': 'Legacy encryption protocols should not be used, even for public data.',
            'internal': 'Internal classified data requires at least standard encryption.',
            'confidential': 'Confidential classified data requires strong encryption.',
            'restricted': 'Restricted classified data requires maximum encryption.'
        },
        'databaseEncryption': {
            'public': 'Database encryption is recommended even for public data.',
            'internal': 'Internal classified data requires database encryption.',  
            'confidential': 'Confidential classified data requires database encryption.',
            'restricted': 'Restricted data requires database encryption.'
        },
        'encryptionCipher': {
            'public': 'Compromised ciphers should not be used even for public data.',
            'internal': 'Internal classified data should not use deprecated, compromised, or weak ciphers.',
            'confidential': 'Confidential classified data should use only strong, non-deprecated ciphers.',
            'restricted': 'Restricted classified data should use only the strongest, quantum-resistant ciphers.'
        },
        'hashAlgorithm': {
            'public': 'Compromised hash algorithms should not be used even for public data.',
            'internal': 'Internal classified data should not use deprecated, compromised, or weak hash algorithms.',
            'confidential': 'Confidential classified data should use only strong, non-deprecated hash algorithms.',
            'restricted': 'Restricted data should use only the strongest hash algorithms.'
        },
        'keyManagement': {
            'public': 'Having a key management process is recommended for any key, regardless of data classification.',
            'internal': 'Internal classified data requires a key management process.',
            'confidential': 'Confidential classified data should be using customer managed keys.',
            'restricted': 'Restricted classified data requires HSM managed keys.'
        },
        'keyManagementProcesses': {
            'public': 'Having a key management process is recommended for any key, regardless of data classification.',
            'internal': 'Internal classified data requires a key management process.',
            'confidential': 'Confidential classified data requires automated key rotation processes.',
            'restricted': 'Restricted classified data requires automated key rotation with HSM and split-knowledge.'
        },
        'secretsManagement': {
            'public': 'Secrets management is recommended for any secrets, regardless of data classification.',
            'internal': 'Internal classified data requires secure secrets management.',
            'confidential': 'Confidential classified data requires robust secrets management.',
            'restricted': 'Restricted classified data requires robust secrets management.'
        },
        // Access Controls
        'authentication': {
            'public': 'Basic authentication is acceptable for public data.',
            'internal': 'Internal classified data requires at least multi-factor authentication (MFA).',
            'confidential': 'Confidential classified data requires Single Sign-on (SSO) and multi-factor authentication (MFA).',
            'restricted': 'Restricted classified data requires strong multi-factor authentication (MFA) with hardware or biometric tokens.'
        },
        'authorisation': {
            'public': 'Basic authorisation is acceptable for public data.',
            'internal': 'Internal classified data requires role-based access control (RBAC).',
            'confidential': 'Confidential classified data requires either role-based access control (RBAC) or attribute-based access control (ABAC).',
            'restricted': 'Restricted classified data requires Privileged Access Management (PAM) with zero-trust principles.'
        },
        'identityManagement': {
            'public': 'Basic identity management is acceptable for public data.',
            'internal': 'Internal classified data requires centrally-managed individual identities.',
            'confidential': 'Confidential classified data requires centrally-managed individual identities, no shared identities.',
            'restricted': 'Restricted classified data requires identity governance and administration (IGA).'
        },
        // Advanced Security Controls
        'wafControls': {
            'public': 'Basic WAF controls are acceptable for public data.',
            'internal': 'Internal classified data requires standard WAF controls implementing OWASP Core Rule Set.',
            'confidential': 'Confidential classified data requires advanced WAF controls.',
            'restricted': 'Restricted classified data requires enterprise WAF controls.'
        },
        'apiSecurityGateway': {
            'public': 'Basic API security gateway controls are acceptable for public data.',
            'internal': 'Internal classified data requires standard API security gateway controls.',
            'confidential': 'Confidential classified data requires OWASP API security gateway controls.',
            'restricted': 'Restricted classified data requires runtime protection API security gateway controls.'
        },
        'dlpControls': {
            'public': 'Basic DLP controls are acceptable for public data.',
            'internal': 'Internal classified data requires advanced DLP controls.',
            'confidential': 'Confidential classified data requires comprehensive DLP controls.',
            'restricted': 'Restricted classified data requires enterprise DLP controls.'
        },
        'privilegedSessionManagement': {
            'public': 'Basic logging is acceptable for public data.',
            'internal': 'Internal classified data requires full recording.',
            'confidential': 'Confidential classified data requires real-time monitoring.',
            'restricted': 'Restricted classified data requires AI analytics.'
        },
        'threatIntelligenceIntegration': {
            'public': 'Basic threat intelligence integration is acceptable for public data.',
            'internal': 'Internal classified data requires enhanced threat intelligence feeds.',
            'confidential': 'Confidential classified data requires automated enrichment of threat intelligence.',
            'restricted': 'Restricted classified data requires full platform capabilities of threat intelligence.'
        },
        'soar': {
            'public': 'Basic playbooks are acceptable for public data.',
            'internal': 'Internal classified data requires enhanced playbooks with SIEM orchestration.',
            'confidential': 'Confidential classified data requires SIEM orchestration.',
            'restricted': 'Restricted classified data requires automated response and full platform capabilities.'
        },
        'siem': {
            'public': 'Basic SIEM correlation capabilities are acceptable for public data.',
            'internal': 'Internal classified data requires advanced detection capabilities.',
            'confidential': 'Confidential classified data requires threat intelligence integrated capabilities.',
            'restricted': 'Restricted classified data requires managed detection and response (MDR) and extended detection and response (XDR) capabilities.'
        },
        'threatModeling': {
            'public': 'Ad-hoc threat modelling is acceptable for public data.',
            'internal': 'DevSecOps integrated threat modelling is recommended for internal data.',
            'confidential': 'Automated threat modelling is recommended for confidential data.',
            'restricted': 'Continuous threat modelling is recommended for restricted data.'
        },
        'casbControls': {
            'public': 'Basic CASB controls are acceptable for public data.',
            'internal': 'Standard CASB controls are recommended for internal data.',
            'confidential': 'Advanced threat protection is required for confidential data.',
            'restricted': 'Comprehensive CASB suite is required for restricted data.'
        },
        'sseControls': {
            'public': 'Basic SSE controls are acceptable for public data.',
            'internal': 'Standard SSE controls are recommended for internal data.',
            'confidential': 'Advanced SSE controls are required for confidential data.',
            'restricted': 'Full Secure Access Service Edge (SASE) platform is required for restricted data.'
        },
        'cloudNetworkSecurity': {
            'public': 'Basic cloud network security controls are acceptable for public data.',
            'internal': 'Standard cloud network security controls are recommended for internal data.',
            'confidential': 'Advanced cloud network security controls are required for confidential data.',
            'restricted': 'Zero-trust cloud network security controls are required for restricted data.'
        },
        'sdwanControls': {
            'public': 'Traditional WAN or MPLS is acceptable for public data.',
            'internal': 'Encrypted SD-WAN is recommended for internal data, constrained use of VPNs is acceptable.',
            'confidential': 'Advanced SD-WAN with security functions is required for confidential data.',
            'restricted': 'SASE-integrated SD-WAN with zero-trust capabilities is required for restricted data.'
        },
        'saseArchitecture': {
            'public': 'No SASE architecture is acceptable for public data.',
            'internal': 'Hybrid SASE architecture is recommended for internal data.',
            'confidential': 'Cloud native or full SASE architecture with SD-WAN integration is recommended for confidential data.',
            'restricted': 'Full SASE architecture with zero-trust capabilities is required for restricted data.'
        },
        'zeroTrustMaturity': {
            'public': 'Traditional network basedsecurity models are acceptable for public data.',
            'internal': 'Developing zero-trust maturity is recommended for internal data.',
            'confidential': 'Defined zero-trust maturity is recommended for confidential data.',
            'restricted': 'Managed zero-trust maturity is required for restricted data.'
        },
        'networkSecurity': {
            'public': 'Basic network security controls are acceptable for public data.',
            'internal': 'Standard network security controls are recommended for internal data.',
            'confidential': 'Advanced network security controls are required for confidential data.',
            'restricted': 'Zero-trust network security controls are required for restricted data.'
        },
        'protocolGapCoverage': {
            'public': 'Basic monitoring is expected for public data.',
            'internal': 'Deep Packet Inspection (DPI) is recommended for internal data.',
            'confidential': 'Comprehensive inspection including TLS interception is required for confidential data.',
            'restricted': 'Endpoint protection with agent monitoring is required for restricted data.'
        },
        // Application Security Controls
        'antivirusControls': {
            'public': 'Basic signature based antivirus is acceptable for public data.', 
            'internal': 'Standard endpoint protection antivirus with regular updates is recommended for internal data.',
            'confidential': 'Advanced antivirus with behavioural analysis is required for confidential data.',
            'restricted': 'Endpoint Detection and Response (EDR) with real-time monitoring is required for restricted data.'
        },
        'vulnerabilityScanning': {
            'public': 'Ad-hoc vulnerability scanning is acceptable for public data.',
            'internal': 'Scheduled vulnerability scanning is recommended for internal data.',
            'confidential': 'Continuous vulnerability scanning is required for confidential data.',
            'restricted': 'DevSecOps integrated continuous vulnerability scanning with SAST/DAST is required for restricted data.'
        },
        'applicationTesting': {},
        'applicationSecurityTesting': {},
        'applicationLogging': {
            'public': 'Basic application logging is acceptable for public data.',
            'internal': 'Structured application logging is recommended for internal data.',
            'confidential': 'Centralised SIEM-integrated application logging with monitoring is required for confidential data.',
            'restricted': 'Forensic level logging with real-time alerting is required for restricted data.'
        },
        'secureHeadersTransport': {},
        'sessionManagementHardening': {
            'public': 'Short session timeouts are acceptable for public data.',
            'internal': 'Token rotation and secure cookies are recommended for internal data.',
            'confidential': 'Re-authentication for sensitive actions and session binding is required for confidential data.',
            'restricted': 'Adaptive session management is required for restricted data.'
        },
        'certificateLifecycle': {
            'public': 'Basic certificate lifecycle management is acceptable for public data.',
            'internal': 'Automated certificate management is recommended for internal data.',
            'confidential': 'Enterprise-wide automated certificate lifecycle management is required for confidential data.',
            'restricted': 'Zero-touch automated certificate lifecycle management with policy enforcement is required for restricted data.'
        },
        'applicationControl': {
            'public': 'Basic application control is acceptable for public data.',
            'internal': 'Signature-based application control is recommended for internal data.',
            'confidential': 'Behavioural-based application control is required for confidential data.',
            'restricted': 'Zero-trust application control with continuous monitoring is required for restricted data.'
        },
        'patchManagement': {
            'public': 'Manual patch management is acceptable for public data.',
            'internal': 'Automated patch management is recommended for internal data.',
            'confidential': 'Risk-based automated patch management with testing is required for confidential data.',
            'restricted': 'Zero-day vulnerability management with immediate patch deployment is required for restricted data.'
        },
        'codeIntegrity': {
            'public': 'Basic code signing is acceptable for public data.',
            'internal': 'Trusted publisher code signing is recommended for internal data.',
            'confidential': 'Supply chain verified code signing is required for confidential data.',
            'restricted': 'Code attestation with provenance is required for restricted data.'
        },
        'sca': {
            'public': 'Basic dependency scanning is acceptable for public data.',
            'internal': 'Transitive dependency scanning with vulnerability database is recommended for internal data.',
            'confidential': 'CI/CD integrated SCA with policy enforcement and CVE detection is required for confidential data.',
            'restricted': 'Comprehensive SCA with real-time monitoring and alerting is required for restricted data.'
        },
        'ossLicenceCompliance': {
            'public': 'Open source licence compliance is recommended for all data classifications.',
            'internal': 'Open source licence compliance is recommended for all data classifications.',
            'confidential': 'Open source licence compliance is recommended for all data classifications.',
            'restricted': 'Open source licence compliance is required for all data classifications.'
        },
        'secretsScanningRepos': {
            'public': 'Secrets scanning is recommended for all data classifications.',
            'internal': 'Secrets scanning is recommended for all data classifications.',
            'confidential': 'Secrets scanning is recommended for all data classifications.',
            'restricted': 'Secrets scanning is required for all data classifications.'
        },
        'ciCdPipelineSecurity': {
            'public': 'CI/CD pipeline security is recommended for all data classifications.',
            'internal': 'CI/CD pipeline security is recommended for all data classifications.',
            'confidential': 'CI/CD pipeline security is recommended for all data classifications.',
            'restricted': 'CI/CD pipeline security is required for all data classifications.'
        },
        'osHardening': {
            'public': 'Basic OS hardening is acceptable for public data.',
            'internal': 'Standard OS hardening is recommended for internal data.',
            'confidential': 'Advanced OS hardening with CIS benchmarks is required for confidential data.',
            'restricted': 'Comprehensive OS hardening with continuous compliance monitoring is required for restricted data.'
        },
        'osEncryption': {},
        'mdmControls': {
            'public': 'Basic MDM controls are acceptable for public data.',
            'internal': 'Standard MDM controls are recommended for internal data.',
            'confidential': 'Comprehensive MDM controls are required for confidential data.',
            'restricted': 'Unified MDM controls with zero-trust integration are required for restricted data.'
        },
        'mamControls': {
            'public': 'Basic MAM controls are acceptable for public data.',
            'internal': 'Containerised MAM controls are recommended for internal data.',
            'confidential': 'Comprehensive MAM controls are required for confidential data.',
            'restricted': 'Unified Endpoint Management (UEM) with MAM is required for restricted data.'
        },
        'byodPolicy': {
            'public': 'Basic BYOD policy is acceptable for public data.',
            'internal': 'Standard BYOD policy is recommended for internal data.',
            'confidential': 'Managed BYOD policy with security controls is required for confidential data.',
            'restricted': 'Strictly managed BYOD policy with zero-trust access is required for restricted data.'
        },
        // Remote Access Infrastructure
        'vdiSolution': {
            'public': 'Basic VDI with shared desktops is acceptable for public data.',
            'internal': 'Dedicated or stateless desktop VDI is recommended for internal data.',
            'confidential': 'Enterprise VDI with encryption is required for confidential data.',
            'restricted': 'Zero trust VDI is required for restricted data'
        },
        'vpnAccessControls': {
            'public': 'MFA is recommended for public data.',
            'internal': 'MFA and posture checks are recommended for internal data.',
            'confidential': 'Full tunnel VPN with MFA and posture checks is required for confidential data.',
            'restricted': 'Per-app VPN or full-tunnel VPN with zero-trust access is required for restricted data.'
        },
        'ztnaAccess': {
            'public': 'ZTNA is recommended for public data.',
            'internal': 'Per-app ZTNA is recommended for internal data.',
            'confidential': 'ZTNA with continuous verification is required for confidential data.',
            'restricted': 'ZTNA with micro-segmentation is required for restricted data.'
        },
        'jumpHosts': {
            'public': 'Basic jump hosts are acceptable for public data.',
            'internal': 'Hardened jump hosts with MFA are recommended for internal data.',
            'confidential': 'Privileged jump hosts with session recording are required for confidential data.',
            'restricted': 'Zero trust jump hosts with privileged access management (PAM) are required for restricted data.'
        },
        'remoteAccessPolicy': {
            'public': 'VPN or managed devices for remote access is acceptable for public data.',
            'internal': 'VPN or VDI is recommended for internal data.',
            'confidential': 'VDI or jump host remote access is required for confidential data.',
            'restricted': 'Zero trust or Air-gapped remote access is required for restricted data.'
        },
        'sessionIsolation': {
            'public': 'Basic session isolation is acceptable for public data.',
            'internal': 'Process or container isolation is recommended for internal data.',
            'confidential': 'VM isolation is required for confidential data.',
            'restricted': 'Micro-VM or air-gapped isolation is required for restricted data.'
        },
        'remoteAccessMonitoring': {
            'public': 'Basic remote access monitoring is acceptable for public data.',
            'internal': 'Standard remote access monitoring with metadata session recording is recommended for internal data.',
            'confidential': 'Comprehensive remote access monitoring with full session recording is required for confidential data.',
            'restricted': 'UEBA remote access monitoring is required for restricted data.'
        },
        'privilegedAccessManagement': {
            'public': 'Basic privileged access management is acceptable for public data.',
            'internal': 'Standard privileged access management with session recording is recommended for internal data.',
            'confidential': 'Advanced privileged access management with real-time monitoring is required for confidential data.',
            'restricted': 'Zero trust privileged access management with AI analytics is required for restricted data.'
        },
        // Monitoring and Compliance
        'threatMonitoring': {
            'public': 'Basic threat monitoring is acceptable for public data.',
            'internal': 'SIEM integration is recommended for internal data.',
            'confidential': 'Threat detection with behavioural analytics is required for confidential data.',
            'restricted': 'AI-driven threat hunting with zero trust monitoring, deception technology, and threat intelligence is required for restricted data.'
        },
        'availabilityMonitoring': {
            'public': 'Basic availability monitoring is acceptable for public data.',
            'internal': 'Log monitoring and infrastructure monitoring is recommended for internal data.',
            'confidential': 'Comprehensive availability monitoring with predictive analytics is required for confidential data.',
            'restricted': 'AI-driven availability monitoring with auto-remediation is required for restricted data.'
        },
        'auditLogging': {
            'public': 'Basic audit logging is acceptable for public data.',
            'internal': 'Standard audit logging with log integrity is recommended for internal data.',
            'confidential': 'Detailed audit logging with real-time alerting is required for confidential data.',
            'restricted': 'Comprehensive audit logging with immutable logs, real-time alerting, and AI-driven analysis is required for restricted data.'
        },
        'penetrationTesting': {
            'public': 'Internal penetration testing is acceptable for public data.',
            'internal': 'Third-party penetration testing is recommended for internal data.',
            'confidential': 'Scheduled penetration testing is required for confidential data.',
            'restricted': 'Continuous penetration testing with bug bounty programs is required for restricted data.'
        },
        'socCapability': {
            'public': 'Basic SOC capabilities are acceptable for public data.',
            'internal': '8x5 SOC capabilities are recommended for internal data.',
            'confidential': '24x7 SOC capabilities are required for confidential data.',
            'restricted': 'Managed SOC capabilities with MDR and XDR are required for restricted data.'
        },
        'complianceAutomation': {
            'public': 'Basic compliance automation is acceptable for public data.',
            'internal': 'Scheduled compliance scans are recommended for internal data.',
            'confidential': 'Continuous compliance automation is required for confidential data.',
            'restricted': 'Policy-as-code with automated remediation and compliance dashboard is required for restricted data.'
        },
        'securityMetrics': {
            'public': 'Basic metrics such as MTTD and incident volume are acceptable for public data.',
            'internal': 'Additional metrics including MTTR and vulnerability count are recommended for internal data.',
            'confidential': 'Comprehensive metrics including SLA adherence and risk score are required for confidential data.',
            'restricted': 'Full suite of metrics including control effectiveness and business impact are required for restricted data.'
        },
        'auditTrailRetention': {
            'public': '30 days of audit trail retention is acceptable for public data.',
            'internal': 'Minimum 90 days of audit trail retention is recommended for internal data.',
            'confidential': 'Minimum 1 year of audit trail retention is required for confidential data.',
            'restricted': 'Minimum 3 years of audit trail retention is required for restricted data.'
        },
        'changeManagementIntegration': {
            'public': 'Basic change management integration is acceptable for public data.',
            'internal': 'Ticket-based change management is recommended for internal data.',
            'confidential': 'CAB change management integration with audit trails is required for confidential data.',
            'restricted': 'Full change management integration with real-time monitoring and compliance enforcement is required for restricted data.'
        },
        'securityTestingFrequency': {
            'public': 'Ad-hoc security testing is acceptable for public data.',
            'internal': 'Semi-annual security testing is recommended for internal data.',
            'confidential': 'Quarterly security testing is required for confidential data.',
            'restricted': 'Continuous security testing with pre-release continuous testing is required for restricted data.'
        },
        // Data Lifecycle Management
        'dataMigrationStrategy': {
            'public': 'No specific data migration strategy is required for public data.',
            'internal': 'Scripted migration with validation is recommended for internal data.',
            'confidential': 'ETL pipeline with data quality checks is required for confidential data.',
            'restricted': 'Real-time sync with automated validation and encryption is required for restricted data.'
        },
        'dataDowngradeControls': {
            'public': 'No specific data downgrade controls are required for public data.',
            'internal': 'Data masking is required for internal data.',
            'confidential': 'Tokenisation or synthetic data generation is required for confidential data.',
            'restricted': 'Anonymisation with irreversible techniques is required for restricted data.'
        },
        'dataVersioningStrategy': {
            'public': 'No specific data versioning strategy is required for public data.',
            'internal': 'Incremental versioning is recommended for internal data.',
            'confidential': 'Full versioning with audit trails is required for confidential data.',
            'restricted': 'Immutable versioning with blockchain or time-travel queries is required for restricted data.'
        },
        'dataRedundancyLevel': {
            'public': 'Local data redundancy is expected for public data.',
            'internal': 'Multi-AZ redundancy is recommended for internal data.',
            'confidential': 'Cross-region passive redundancy is required for confidential data.',
            'restricted': 'Active-active cross-region redundancy with real-time replication is required for restricted data.'
        },
        'haDrTestingFrequency': {
            'public': 'Annual HA/DR testing is acceptable for public data.',
            'internal': 'Semi-annual HA/DR testing is recommended for internal data.',
            'confidential': 'Quarterly HA/DR testing is required for confidential data.',
            'restricted': 'Monthly HA/DR testing with unannounced drills is required for restricted data.'
        },
        'backupStrategy': {
            'public': 'Basic backups are acceptable for public data.',
            'internal': 'Encrypted backups are recommended for internal data.',
            'confidential': 'Geo-redundant encrypted backups are required for confidential data.',
            'restricted': 'Immutable, air-gapped geo-redundant backups are required for restricted data.'
        },
        'backupTestingFrequency': {
            'public': 'Annual backup testing is acceptable for public data.',
            'internal': 'Semi-annual backup testing is recommended for internal data.',
            'confidential': 'Quarterly backup testing is required for confidential data.',
            'restricted': 'Monthly backup testing with data restoration drills is required for restricted data.'
        },
        'backupRetentionPeriod': {
            'public': '30 days of backup retention is acceptable for public data.',
            'internal': 'At least 90 days of backup retention is recommended for internal data.',
            'confidential': 'A year or more of backup retention is required for confidential data.',
            'restricted': 'A minimum of 5 years or more of backup retention is required for restricted data.'
        },
        'dataRetentionPolicy': {
            'public': '90 days of data retention is acceptable for public data.',
            'internal': '1 year of data retention is recommended for internal data.',
            'confidential': '3 years or more of data retention is required for confidential data.',
            'restricted': '7 years or more of data retention is required for restricted data.'
        },
        'archivePolicy': {
            'public': 'Short term inactivity based data archiving is acceptable for public data.',
            'internal': 'Cold storage based data archiving is recommended for internal data.',
            'confidential': 'Glacier data archiving is recommended for confidential data.',
            'restricted': 'Tape archiving is required for restricted data.'
        },
        'dataEolProcess': {
            'public': 'Formal review process is acceptable for public data.',
            'internal': 'Documented formal review process is recommended for internal data.',
            'confidential': 'Legal review is required for confidential data.',
            'restricted': 'Chain of custody is required for restricted data.'
        },
        'dataDisposalMethod': {
            'public': 'Manual data deletion is acceptable for public data.',
            'internal': 'Secure wipe methods are recommended for internal data.',
            'confidential': 'Cryptographic erasure or physical destruction is required for confidential data.',
            'restricted': 'Physical destruction with chain of custody is required for restricted data.'
        },
        // Compliance & Governance
        'businessImpactLevel': {
            'public': 'Public data typically has low impact if disclosed or disrupted.',
            'internal': 'Internal data typically has medium business impact if disclosed or disrupted.',
            'confidential': 'Confidential data typically has a high business impact if disclosed or disrupted.',
            'restricted': 'Restricted data typically has a critical or catastrophic business impact if disclosed or disrupted.'
        },
        'architectureGovernance': {
            'public': 'Ad-hoc architecture governance is acceptable for public data.',
            'internal': 'Quarterly architecture review boards are recommended at a minimum for internal data.',
            'confidential': 'Regular architecture review boards are required for confidential data.',
            'restricted': 'Continuous architecture reviews and governance are required for restricted data.'
        },
        'regulatoryCompliance': {
            'public': 'Basic regulatory compliance is acceptable for public data.',
            'internal': 'Standard APP 8 regulatory compliance with overseas processors is recommended for internal data.',
            'confidential': 'Comprehensive regulatory compliance is required with all processors for confidential data.',
            'restricted': 'Comprehensive contractual agreements are required for restricted data.'
        },
        'dpaStatus': {
            'public': 'Basic data processing agreements are typically not required for public data.',
            'internal': 'Standard data processing agreements are recommended for internal data.',
            'confidential': 'Comprehensive data processing agreements are required for confidential data.',
            'restricted': 'Full data processing agreements with regular audits are required for restricted data.'
        },
        'regulatoryReporting': {
            'public': 'Basic regulatory reporting is acceptable for public data.',
            'internal': 'Standard regulatory reporting is recommended for internal data.',
            'confidential': 'Comprehensive regulatory reporting is required for confidential data.',
            'restricted': 'Real-time regulatory reporting with audits is required for restricted data.'
        },
        'auditFrequency': {
            'public': 'Annual audits are acceptable for public data.',
            'internal': 'Annual audits are recommended for internal data.',
            'confidential': 'Semi-annual audits are required for confidential data.',
            'restricted': 'Quartely or Continuous audits with real-time compliance monitoring are required for restricted data.'
        },
        'dataResidency': {
            'public': 'No specific data residency requirements are needed for public data.',
            'internal': 'Data residency within preferred country is recommended for internal data.',
            'confidential': 'Data residency within Australia is required for confidential data.',
            'restricted': 'Data residency within Sovereign Cloud or on-premises is required for restricted data.'
        },
        // Privacy Engineering Controls 
        'privacyByDesign': {
            'public': 'Basic privacy measures are recommended for public data.',
            'internal': 'Privacy assessments are recommended for internal data.',
            'confidential': 'Privacy engineering practices are required for confidential data.',
            'restricted': 'Differential privacy or zero-knowledge techniques are required for restricted data.'
        },
        'automatedPrivacyControlsPets': {
            'public': 'Basic anonymisation is recommended for public data.',
            'internal': 'Tokenisation is recommended for internal data.',
            'confidential': 'Differential privacy techniques or homomorphic encryption are required for confidential data.',
            'restricted': 'Secure multi-party computation or comprehensive PETs is required for restricted data.'
        },
        'dataMinimisation': {
            'public': 'Basic reduction of data is recommended for public data.',
            'internal': 'Purpose-based data minimisation is recommended for internal data.',
            'confidential': 'Automated pruning, intelligent sampling, synthetic data, ephemeral storage, and privacy-preserving analytics are required for confidential data.',
            'restricted': 'Federated analytics is required for restricted data.'
        },
        'appDataCollectionLimitations': {
            'public': 'Public data should only be collected for defined purposes',
            'internal': 'Necessity test is required for internal data.',
            'confidential': 'Proportionality assessment is required for confidential data.',
            'restricted': 'Strict purpose binding with minimal collection of only necessary data is required for restricted data.'
        },
        'appSolicitedUnsolicited': {
            'public': 'It is recommended to only collect solicited data for public data.',
            'internal': 'Unsolicited data must be reviewed for internal data.',
            'confidential': 'Automatic destruction of unsolicited data and lawful retention is required of solicited data that is confidential data.',
            'restricted': 'Segregated handling and a comprehensive solicitation policy is required for restricted data.'
        },
        'appCollectionNotice': {
            'public': 'Basic notice is recommended for public data.',
            'internal': 'Detailed notice is recommended for internal data.',
            'confidential': 'Layered, interactive, just-in-time notice is required for confidential data.',
            'restricted': 'Comprehensive disclosure is required for restricted data.'
        },
        'appNotificationRequirements': {
            'public': 'Basic notifications are recommended for public data.',
            'internal': 'Proactive notifications are recommended for internal data.',
            'confidential': 'Automated notifications are required for confidential data.',
            'restricted': 'Personalised, multi-channel, and intelligent notifications are required for restricted data.'
        },
        'appThirdPartyCollection': {
            'public': 'Notification of Third Party Sources is recommended for public data.',
            'internal': 'Explicit Consent is required for internal data.',
            'confidential': 'Third Party Source Verification is required for confidential data.',
            'restricted': 'Purpose Alignment Verification and tracking is required for restricted data with potential restrictions on third-party collection.'
        },
        'crossBorderDataTransferCompliance': {
            'public': 'Data localisation and optional encryption-in-transit recommended for public data.',
            'internal': 'APP 8 notification and Australian SCCs with encryption-in-transit for internal data transfers.',
            'confidential': 'APEC CBPR or GDPR adequacy mechanisms required with encryption-at-rest and encryption-in-transit for confidential data.',
            'restricted': 'Comprehensive framework with encryption, SCCs, and continuous monitoring required, or no cross-border data transfers allowed for restricted data.'
        },
        'consentManagement': {
            'public': 'Basic consent is recommended for public data.',
            'internal': 'Granular consent is required for internal data.',
            'confidential': 'Dynamic consent with auditing and automation is required for confidential data.',
            'restricted': 'Blockchain-based consent is recommended for restricted data.'
        },
        'consentWithdrawalMechanism': {
            'public': 'Manual request is recommended for public data.',
            'internal': 'Self-service portal is required for internal data.',
            'confidential': 'One-click withdrawal and automated propagation are required for confidential data.',
            'restricted': 'Real-time cessation and verified withdrawal are required for restricted data.'
        },
        'appCustomerAccess': {
            'public': 'Manual requests are recommended for public data.',
            'internal': 'Customer portal is required for internal data.',
            'confidential': 'Automated access with structured export/API is required for confidential data.',
            'restricted': 'Real-time access and comprehensive rights platform are required for restricted data.'
        },
        'appDataCorrection': {
            'public': 'Manual correction with audit trail is recommended for public data.',
            'internal': 'Customer correction is required for internal data.',
            'confidential': 'Workflow correction with verified correction is required for confidential data.',
            'restricted': 'Real-time correction with automated verification is required for restricted data.'
        }
    };
    const controlReasons = reasons[control] || {};
    return controlReasons[classification] || '';
}

/**
 * Get the CSS class for a select option based on its restriction status
 * @param {String} control - The name of the field
 * @param {String} optionValue - The value of the option
 * @param {String} classification - The current data classification level
 * @returns {String} The CSS class name ('dc-option-danger', 'dc-option-warning', 'dc-option-missing',
 * or empty string)
 */
const getSelectOptionClass = (control, optionValue, classification) => {
    if (!classification) return '';

    const controlMasks = controlRestrictionMasks[control];
    if (!controlMasks || !Object.prototype.hasOwnProperty.call(controlMasks, optionValue)) {
        return 'dc-option-missing';
    }

    if (isSelectionRestricted(control, optionValue, classification)) {
        return 'dc-option-danger';
    }
    // Check if option would be restricted at the next higher classification level
    const classificationOrder = ['public', 'internal', 'confidential', 'restricted', 'restricted_caution'];
    const currentIndex = classificationOrder.indexOf(classification);
    const nextHigherClassification = classificationOrder[currentIndex + 1];

    if (nextHigherClassification && isSelectionRestricted(control, optionValue, nextHigherClassification)) {
        return 'dc-option-warning';
    }

    return '';
}

/**
 * 
 * @param {*} controlName - name of control
 * @param {*} controlValue - selected value
 * @param {*} classification - the current data classification level
 * @param {*} setValidationWarnings - the state setter function for validation warnings
 * @returns 
 */
export const validateControlSelection = (controlName, controlValue, classification, setValidationWarnings) => {
    if (!classification) {
        // Clear warnings for this field if no classification
        setValidationWarnings(prev => {
            const updated = { ...prev };
            delete updated[controlName];
            return updated;
        });
        return;
    }
    
    let warningMessage = null;

    const selected = Array.isArray(controlValue) ? controlValue : [controlValue].filter(Boolean);

    // Check if any selected control is inappropriate for this classification
    const restrictedSelections = selected.filter(v => isSelectionRestricted(controlName, v, classification));
    if (restrictedSelections.length) {
        const reason = getRestrictionReason(controlName, classification);
        warningMessage = `⚠️ ${restrictedSelections.join(', ')} not recommended for ${classification.toUpperCase()} data classification.${reason ? ' ' + reason : ''}`;
    }
    
    // Check for missing required options via validateSelection
    if (!warningMessage) {
        const missingRequired = validateSelection(controlName, selected, classification);
        if (missingRequired) {
            warningMessage = `💡 For ${classification.toUpperCase()} classification, required: ${missingRequired}`;
        }
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

/**
 * Get CSS class for option based on security level and data classification
 * @param {string} optionValue - The value of the option
 * @param {string} fieldName - The name of the field
 * @param {string} dataClassification - The current data classification level
 * @returns {string} CSS class name ('dc-option-danger', 'dc-option-warning', 'dc-option-missing',
 * or empty string if acceptable)
 */
export const getOptionSecurityClass = (optionValue, fieldName, dataClassification) => {

    return getSelectOptionClass(fieldName, optionValue, dataClassification);
};
