import IconSearch from "../../icons/iconSearch";

type Props = {
  label: string;
};

const SearchInput = (props: Props) => {
  return (
    <form>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <IconSearch />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-72 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.label || "Search"}
          required
        />
      </div>
    </form>
  );
};

export default SearchInput;
