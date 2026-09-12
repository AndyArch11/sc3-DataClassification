import { isSelectionRestricted, getMinimumRequiredOptions } from './securityUtils';

/**
 * Determine if the selected options for a control meet the minimum requirements for the given classification level.
 *
 * Required options are derived directly from securityUtils' isSelectionRestricted bitwise mapping
 * (via getMinimumRequiredOptions) rather than a separately maintained requirements/hierarchy list, so
 * the "what's restricted" and "what's required" views of a control can no longer drift out of sync.
 * @param {*} control - the name of the field
 * @param {*} selectedOptions - the selected option(s) in the field
 * @param {*} classification - the current data classification level
 * @returns {string} - Empty string if a selected option already meets the minimum bar for this
 * classification, otherwise a comma-separated list of options that would satisfy the requirement
 * 
 * TODO: Add mapping for minimum required controls for selections where the current bitwise mapping 
 * does not fully capture the requirements. For example, Remote Access Policy recommendation for Confidential:
 * VDI/jump host + JIT/PAM + SSH certs + session recording; avoid split tunnel and third-party tools unless brokered.
 * Should be reflected in the minimum required options for the control. This is not covered by the current 
 * isSelectionRestricted bitwise mapping.
 */
export const validateSelection = (control, selectedOptions, classification) => {
    const selected = Array.isArray(selectedOptions) ? selectedOptions : [selectedOptions].filter(Boolean);

    // Already satisfied if any selected option is not restricted for this classification
    if (selected.some(option => !isSelectionRestricted(control, option, classification))) {
        return '';
    }

    return getMinimumRequiredOptions(control, classification).join(', ');
};
