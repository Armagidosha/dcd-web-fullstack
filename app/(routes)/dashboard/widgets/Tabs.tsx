"use client";

import { useState } from "react";
import TabButtons from "../ui/TabButtons";
import CategoriesTable from "./CategoriesTable";
import ProductsTable from "./ProductsTable";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="bg-surface rounded-2xl shadow-lg border border-border overflow-hidden">
      <TabButtons activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "products" && (
        <div className="p-6">
          <ProductsTable />
        </div>
      )}

      {activeTab === "categories" && (
        <div className="p-6">
          <CategoriesTable />
        </div>
      )}
    </div>
  );
}
