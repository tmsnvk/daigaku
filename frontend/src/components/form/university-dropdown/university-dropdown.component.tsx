/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';

/* component, style imports */

/* configuration, utilities, constants imports */

/* interface, type, enum imports */
import { DropdownInput, UniversityOption } from '@common-types';

/**
 * Defines the component's properties.
 *
 * @template T - The type of form values extending the `react-hook-form` library.
 */
interface ComponentProps<T extends FieldValues, UniversityOption> extends DropdownInput<T, UniversityOption> {}

/**
 * Renders a dropdown input component to select an {@link UniversityOption}.
 *
 * @param {ComponentProps<T, UniversityOption>} props
 * @return {JSX.Element}
 */
export const UniversityDropdown = <T extends FieldValues>({
  register,
  validationRules,
  error,
  id,
  isDisabled,
  options,
}: ComponentProps<T, UniversityOption>): JSX.Element => {
  return (
    <></>
    // <BaseInput $isError={error !== undefined}>
    //   <InputLabel
    //     inputId={id}
    //     label={l.COMPONENTS.FORM.UNIVERSITY_DROPDOWN.LABEL}
    //   />
    //   <select
    //     {...register(id, validationRules)}
    //     id={id}
    //     name={id}
    //     disabled={isDisabled}
    //   >
    //     <option
    //       hidden
    //       value={''}
    //     >
    //       {l.COMPONENTS.FORM.UNIVERSITY_DROPDOWN.DEFAULT_OPTION}
    //     </option>
    //     {options.map((universityOption: UniversityOption) => (
    //       <option
    //         key={universityOption.uuid}
    //         value={universityOption.uuid}
    //       >
    //         {`${universityOption.name} - ${universityOption.abbreviation}`}
    //       </option>
    //     ))}
    //   </select>
    //   {error && <CoreInputError message={error} />}
    // </BaseInput>
  );
};
