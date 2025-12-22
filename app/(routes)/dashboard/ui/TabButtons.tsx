interface TabButtonsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabButtons = ({ activeTab, onTabChange }: TabButtonsProps) => {
  return (
    <div className="border-b p-4 border-border">
      <div className="flex overflow-x-scroll gap-4 items-center">
        <button
          type="button"
          onClick={() => onTabChange("products")}
          className={`py-2 px-8 rounded-full font-semibold transition-colors duration-300 ${
            activeTab === "products"
              ? "bg-secondary"
              : "bg-surface cursor-pointer"
          }`}
        >
          Продукты
        </button>
        <button
          type="button"
          onClick={() => onTabChange("categories")}
          className={`py-2 px-8 rounded-full font-semibold transition-colors duration-300 ${
            activeTab === "categories"
              ? "bg-secondary"
              : "bg-surface cursor-pointer"
          }`}
        >
          Категории
        </button>
      </div>
    </div>
  );
};

export default TabButtons;
