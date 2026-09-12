import {
  controlRestrictionMasks,
  isSelectionRestricted,
  getMinimumRequiredOptions,
  getOptionSecurityClass,
  validateControlSelection,
} from './securityUtils';
import { validateSelection } from './validationUtils';

describe('controlRestrictionMasks', () => {
  test('defines restriction masks for key controls', () => {
    expect(controlRestrictionMasks).toBeDefined();
    expect(controlRestrictionMasks.atRestEncryption).toBeDefined();
    expect(controlRestrictionMasks.inTransitEncryption).toBeDefined();
    expect(controlRestrictionMasks.databaseEncryption).toBeDefined();
    expect(controlRestrictionMasks.encryptionCipher).toBeDefined();
  });
});

describe('isSelectionRestricted', () => {
  test('returns false when selection is permitted for classification', () => {
    expect(isSelectionRestricted('atRestEncryption', 'none', 'public')).toBe(false);
    expect(isSelectionRestricted('atRestEncryption', 'standard', 'internal')).toBe(false);
    expect(isSelectionRestricted('atRestEncryption', 'strong', 'confidential')).toBe(false);
    expect(isSelectionRestricted('atRestEncryption', 'maximum', 'restricted')).toBe(false);
  });

  test('returns true when selection is restricted for classification', () => {
    expect(isSelectionRestricted('atRestEncryption', 'none', 'internal')).toBe(true);
    expect(isSelectionRestricted('atRestEncryption', 'basic', 'confidential')).toBe(true);
    expect(isSelectionRestricted('atRestEncryption', 'standard', 'confidential')).toBe(true);
    expect(isSelectionRestricted('atRestEncryption', 'strong', 'restricted')).toBe(true);
  });

  test('handles unknown controls or options gracefully', () => {
    expect(isSelectionRestricted('nonExistentControl', 'basic', 'confidential')).toBe(false);
    expect(isSelectionRestricted('atRestEncryption', 'nonExistentOption', 'confidential')).toBe(false);
    expect(isSelectionRestricted('atRestEncryption', 'strong', 'invalidClassification')).toBe(false);
  });
});

describe('getMinimumRequiredOptions', () => {
  test('returns the minimum satisfying option tier for a classification', () => {
    expect(getMinimumRequiredOptions('atRestEncryption', 'internal')).toEqual(['standard']);
    expect(getMinimumRequiredOptions('atRestEncryption', 'confidential')).toEqual(['strong']);
    expect(getMinimumRequiredOptions('atRestEncryption', 'restricted')).toEqual(['maximum']);
  });

  test('returns empty array for unknown classifications or missing controls', () => {
    expect(getMinimumRequiredOptions('nonExistentControl', 'internal')).toEqual([]);
    expect(getMinimumRequiredOptions('atRestEncryption', 'unknownClassification')).toEqual([]);
  });
});

describe('getOptionSecurityClass', () => {
  test('returns empty string when no classification is provided', () => {
    expect(getOptionSecurityClass('standard', 'atRestEncryption', '')).toBe('');
    expect(getOptionSecurityClass('standard', 'atRestEncryption', null)).toBe('');
  });

  test('returns danger class when option is restricted at current classification', () => {
    expect(getOptionSecurityClass('none', 'atRestEncryption', 'internal')).toBe('dc-option-danger');
    expect(getOptionSecurityClass('basic', 'atRestEncryption', 'confidential')).toBe('dc-option-danger');
  });

  test('returns warning class when option is valid now but restricted at next higher classification', () => {
    expect(getOptionSecurityClass('standard', 'atRestEncryption', 'internal')).toBe('dc-option-warning');
  });

  test('returns empty string when option is valid and not restricted at next level', () => {
    expect(getOptionSecurityClass('maximum', 'atRestEncryption', 'internal')).toBe('');
  });

  test('returns missing class when option or control is not in mapping', () => {
    expect(getOptionSecurityClass('unmappedOption', 'atRestEncryption', 'internal')).toBe('dc-option-missing');
    expect(getOptionSecurityClass('standard', 'unmappedControl', 'internal')).toBe('dc-option-missing');
  });
});

describe('validateControlSelection', () => {
  test('clears warning when classification is empty', () => {
    let state = { atRestEncryption: 'Existing warning' };
    const setter = (updater) => {
      state = typeof updater === 'function' ? updater(state) : updater;
    };

    validateControlSelection('atRestEncryption', 'none', '', setter);
    expect(state.atRestEncryption).toBeUndefined();
  });

  test('sets danger warning for restricted single selection', () => {
    let state = {};
    const setter = (updater) => {
      state = typeof updater === 'function' ? updater(state) : updater;
    };

    validateControlSelection('atRestEncryption', 'none', 'internal', setter);
    expect(state.atRestEncryption).toContain('not recommended for INTERNAL');
  });

  test('sets danger warning for restricted multi-select array', () => {
    let state = {};
    const setter = (updater) => {
      state = typeof updater === 'function' ? updater(state) : updater;
    };

    validateControlSelection('atRestEncryption', ['none'], 'internal', setter);
    expect(state.atRestEncryption).toContain('not recommended for INTERNAL');
  });

  test('clears warning when selection meets requirement', () => {
    let state = { atRestEncryption: 'Existing warning' };
    const setter = (updater) => {
      state = typeof updater === 'function' ? updater(state) : updater;
    };

    validateControlSelection('atRestEncryption', 'standard', 'internal', setter);
    expect(state.atRestEncryption).toBeUndefined();
  });
});

describe('validateSelection', () => {
  test('returns empty string when selection satisfies classification', () => {
    expect(validateSelection('atRestEncryption', 'standard', 'internal')).toBe('');
    expect(validateSelection('atRestEncryption', ['basic', 'strong'], 'confidential')).toBe('');
  });

  test('returns minimum required options when selection is restricted', () => {
    expect(validateSelection('atRestEncryption', 'none', 'internal')).toBe('standard');
    expect(validateSelection('atRestEncryption', 'basic', 'confidential')).toBe('strong');
  });
});
