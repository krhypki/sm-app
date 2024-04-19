'use client';

import { useFindPeopleContext } from '@/hooks/contexts';
import Input from '../ui/Input';

export default function FindPeopleFilterForm() {
  const { handleQueryUpdate } = useFindPeopleContext();

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="max-w-md mx-auto mb-10"
    >
      <Input
        type="search"
        onChange={(e) => {
          handleQueryUpdate(e.target.value);
        }}
        placeholder="Search for people"
      />
    </form>
  );
}
