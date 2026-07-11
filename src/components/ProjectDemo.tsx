"use client";

import React, { useState, useMemo } from "react";
import { 
  FaUpload, FaPlay, FaSyncAlt, FaSearch, FaArrowUp, FaArrowDown, 
  FaFileExport, FaCheck, FaLock, FaUndo 
} from "react-icons/fa";

interface DemoProps {
  onSuccessToast: (message: string) => void;
}

// ==========================================
// 1. PORTFOLIO MANAGEMENT SYSTEM DEMO
// ==========================================
export function PortfolioManagerDemo({ onSuccessToast }: DemoProps) {
  const [portfolio, setPortfolio] = useState([
    { symbol: "TCS", shares: 45, avgPrice: 3200, currentPrice: 3450, value: 155250, gain: 11250 },
    { symbol: "RELIANCE", shares: 60, avgPrice: 2400, currentPrice: 2550, value: 153000, gain: 9000 },
    { symbol: "INFY", shares: 80, avgPrice: 1500, currentPrice: 1420, value: 113600, gain: -6400 },
  ]);
  const [csvUploaded, setCsvUploaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"holdings" | "benchmark">("holdings");

  const totalValue = useMemo(() => portfolio.reduce((sum, item) => sum + item.value, 0), [portfolio]);
  const totalGain = useMemo(() => portfolio.reduce((sum, item) => sum + item.gain, 0), [portfolio]);
  const gainPercentage = useMemo(() => (totalGain / (totalValue - totalGain)) * 100, [totalValue, totalGain]);

  const handleSampleCSV = () => {
    // Simulate parsing a CSV statement
    const newItems = [
      { symbol: "HDFCBANK", shares: 120, avgPrice: 1450, currentPrice: 1680, value: 201600, gain: 27600 },
      { symbol: "ICICIBANK", shares: 150, avgPrice: 850, currentPrice: 940, value: 141000, gain: 13500 },
      { symbol: "TATASTEEL", shares: 500, avgPrice: 110, currentPrice: 125, value: 62500, gain: 7500 },
    ];
    setPortfolio([...portfolio, ...newItems]);
    setCsvUploaded(true);
    onSuccessToast("Statement CSV successfully imported! 3 new holdings added.");
  };

  const resetPortfolio = () => {
    setPortfolio([
      { symbol: "TCS", shares: 45, avgPrice: 3200, currentPrice: 3450, value: 155250, gain: 11250 },
      { symbol: "RELIANCE", shares: 60, avgPrice: 2400, currentPrice: 2550, value: 153000, gain: 9000 },
      { symbol: "INFY", shares: 80, avgPrice: 1500, currentPrice: 1420, value: 113600, gain: -6400 },
    ]);
    setCsvUploaded(false);
    onSuccessToast("Portfolio reset to default state.");
  };

  return (
    <div className="w-full text-sm font-sans">
      <div className="flex justify-between items-center mb-4 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
        <div>
          <span className="text-xs text-muted-slate uppercase tracking-wider block">Total Portfolio Value</span>
          <span className="text-xl font-bold text-white">₹{totalValue.toLocaleString("en-IN")}</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-muted-slate uppercase tracking-wider block">Total Return</span>
          <span className={`text-sm font-semibold flex items-center justify-end ${totalGain >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            {totalGain >= 0 ? "+" : ""}₹{totalGain.toLocaleString("en-IN")} ({gainPercentage.toFixed(2)}%)
          </span>
        </div>
      </div>

      <div className="flex border-b border-slate-800 mb-4">
        <button 
          onClick={() => setActiveTab("holdings")}
          className={`pb-2 px-4 font-medium transition-colors relative ${activeTab === "holdings" ? "text-primary-cyan" : "text-muted-slate hover:text-white"}`}
        >
          Active Holdings
          {activeTab === "holdings" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-cyan" />}
        </button>
        <button 
          onClick={() => setActiveTab("benchmark")}
          className={`pb-2 px-4 font-medium transition-colors relative ${activeTab === "benchmark" ? "text-primary-cyan" : "text-muted-slate hover:text-white"}`}
        >
          Index Benchmark vs Portfolio
          {activeTab === "benchmark" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-cyan" />}
        </button>
      </div>

      {activeTab === "holdings" ? (
        <div>
          <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/60 mb-3">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/40 text-xs font-semibold text-muted-slate">
                  <th className="p-3">Symbol</th>
                  <th className="p-3 text-right">Shares</th>
                  <th className="p-3 text-right">Avg Price</th>
                  <th className="p-3 text-right">Current</th>
                  <th className="p-3 text-right">Gain/Loss</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {portfolio.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/30 text-slate-300">
                    <td className="p-3 font-semibold text-white">{item.symbol}</td>
                    <td className="p-3 text-right">{item.shares}</td>
                    <td className="p-3 text-right">₹{item.avgPrice.toLocaleString()}</td>
                    <td className="p-3 text-right">₹{item.currentPrice.toLocaleString()}</td>
                    <td className={`p-3 text-right font-medium ${item.gain >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {item.gain >= 0 ? "+" : ""}₹{item.gain.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-2 flex-wrap">
            {!csvUploaded ? (
              <button 
                onClick={handleSampleCSV}
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-xs cursor-pointer shadow-md hover:shadow-cyan-500/20 transition-all duration-300"
              >
                <FaUpload className="text-xs" /> Sim. CSV Import (Broker Statement)
              </button>
            ) : (
              <button 
                onClick={resetPortfolio}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-4 py-2 rounded-lg text-xs cursor-pointer transition-colors"
              >
                <FaUndo className="text-xs" /> Reset Holdings
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-slate">Performance Comparison (Last 6 Months)</span>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-primary-cyan inline-block" /> Portfolio</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-indigo-500 inline-block" /> NIFTY 50</span>
            </div>
          </div>
          {/* Custom SVG Line Chart */}
          <div className="relative w-full h-36 bg-slate-900/30 rounded border border-slate-800/50 p-1">
            <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible">
              {/* Grid Lines */}
              <line x1="0" y1="20" x2="400" y2="20" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="4" />
              <line x1="0" y1="60" x2="400" y2="60" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="4" />
              <line x1="0" y1="100" x2="400" y2="100" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="4" />

              {/* S&P / Nifty Line (Indigo) */}
              <path 
                d="M0,100 L80,90 L160,95 L240,78 L320,80 L400,68" 
                fill="none" 
                stroke="#6366f1" 
                strokeWidth="2.5" 
              />
              {/* Portfolio Line (Cyan) */}
              <path 
                d="M0,100 L80,85 L160,75 L240,55 L320,40 L400,15" 
                fill="none" 
                stroke="#06b6d4" 
                strokeWidth="3.5" 
                className="animate-pulse"
              />
              
              {/* Points */}
              <circle cx="400" cy="15" r="4" fill="#06b6d4" />
              <circle cx="400" cy="68" r="4" fill="#6366f1" />
            </svg>
            <div className="absolute bottom-1 right-2 bg-emerald-950/70 border border-emerald-800 text-[10px] text-emerald-400 px-1.5 py-0.5 rounded font-mono">
              Outperforming index by +28.5%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. CLIENT PORTFOLIO WEBSITE DEMO
// ==========================================
export function ClientPortfolioDemo({ onSuccessToast }: DemoProps) {
  const [layoutMode, setLayoutMode] = useState<"grid" | "list">("grid");
  const [themeColor, setThemeColor] = useState<"cyan" | "emerald" | "purple">("cyan");
  const [animating, setAnimating] = useState(false);

  const triggerAnimation = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 800);
    onSuccessToast(`Re-triggering Framer Motion animations in [${layoutMode.toUpperCase()}] layout.`);
  };

  const getThemeClass = () => {
    if (themeColor === "cyan") return "from-cyan-500 to-blue-600 text-cyan-400 border-cyan-500/20";
    if (themeColor === "emerald") return "from-emerald-400 to-teal-600 text-emerald-400 border-emerald-500/20";
    return "from-purple-500 to-pink-600 text-purple-400 border-purple-500/20";
  };

  return (
    <div className="w-full text-sm font-sans">
      <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 mb-4">
        {/* Mock Toolbar */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-[10px] text-muted-slate ml-2 font-mono">client-website-preview.space</span>
          </div>
          <div className="flex gap-2 text-xs">
            <button 
              onClick={() => { setLayoutMode("grid"); triggerAnimation(); }}
              className={`px-2 py-0.5 rounded cursor-pointer ${layoutMode === "grid" ? "bg-slate-800 text-white" : "text-muted-slate"}`}
            >
              Grid Layout
            </button>
            <button 
              onClick={() => { setLayoutMode("list"); triggerAnimation(); }}
              className={`px-2 py-0.5 rounded cursor-pointer ${layoutMode === "list" ? "bg-slate-800 text-white" : "text-muted-slate"}`}
            >
              List Layout
            </button>
          </div>
        </div>

        {/* Theme Settings Selector */}
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="text-muted-slate">Client Branding Accents:</span>
          <div className="flex gap-2">
            {(["cyan", "emerald", "purple"] as const).map((color) => (
              <button
                key={color}
                onClick={() => { setThemeColor(color); onSuccessToast(`Switched client design system to theme: [${color.toUpperCase()}]`); }}
                className={`w-4 h-4 rounded-full border cursor-pointer ${
                  color === "cyan" ? "bg-cyan-400" : color === "emerald" ? "bg-emerald-400" : "bg-purple-400"
                } ${themeColor === color ? "border-white ring-2 ring-slate-800" : "border-transparent"}`}
              />
            ))}
          </div>
        </div>

        {/* Mock Content Canvas */}
        <div className={`p-4 bg-slate-900/40 rounded-lg border border-slate-800/50 min-h-36 flex flex-col justify-center items-center transition-all ${animating ? "opacity-40 scale-[0.98]" : "opacity-100 scale-100"}`}>
          {layoutMode === "grid" ? (
            <div className="grid grid-cols-2 gap-3 w-full">
              {[1, 2].map((i) => (
                <div key={i} className={`p-3 bg-slate-900 border rounded-lg ${getThemeClass()}`}>
                  <div className="h-2 w-12 bg-white/20 rounded mb-2" />
                  <div className="h-4 w-full bg-white/10 rounded mb-1" />
                  <div className="h-3 w-2/3 bg-white/5 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full">
              {[1, 2].map((i) => (
                <div key={i} className={`p-2 bg-slate-900 border rounded-lg flex items-center justify-between ${getThemeClass()}`}>
                  <div className="flex items-center gap-3 w-2/3">
                    <div className="w-8 h-8 rounded bg-white/10 flex-shrink-0" />
                    <div className="w-full">
                      <div className="h-3 w-16 bg-white/20 rounded mb-1.5" />
                      <div className="h-2 w-full bg-white/5 rounded" />
                    </div>
                  </div>
                  <div className="h-6 w-12 bg-white/10 rounded" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button 
        onClick={triggerAnimation}
        className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-lg border border-slate-700 cursor-pointer"
      >
        <FaPlay className="text-[10px]" /> Run Entry Animations
      </button>
    </div>
  );
}

// ==========================================
// 3. CAPITALINE AWS - DATA GRID DEMO
// ==========================================
interface DataItem {
  id: number;
  isin: string;
  security: string;
  category: string;
  nav: number;
  change: number;
}

// Expanded dataset for realistic filtering
const allData: DataItem[] = [
  { id: 1, isin: "INF200K01083", security: "SBI Bluechip Direct Fund", category: "Equity LargeCap", nav: 78.42, change: 0.85 },
  { id: 2, isin: "INF179K01135", security: "HDFC Top 100 Growth", category: "Equity LargeCap", nav: 912.45, change: -0.32 },
  { id: 3, isin: "INF846K01DP4", security: "Axis Midcap Direct Growth", category: "Equity MidCap", nav: 82.14, change: 1.45 },
  { id: 4, isin: "INF209K01168", security: "Nippon Small Cap Fund", category: "Equity SmallCap", nav: 135.60, change: 2.15 },
  { id: 5, isin: "INF109KC1558", security: "ICICI Prudential Liquid", category: "Debt Liquid", nav: 345.18, change: 0.05 },
  { id: 6, isin: "INF917K01235", security: "Mirae Asset Large Cap", category: "Equity LargeCap", nav: 114.75, change: 0.62 },
  { id: 7, isin: "INF846K01725", security: "Parag Parikh Flexi Cap", category: "Equity FlexiCap", nav: 68.90, change: 1.10 }
];

export function DataGridDemo({ onSuccessToast }: DemoProps) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof DataItem>("security");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (field: keyof DataItem) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filteredData = useMemo(() => {
    const result = allData.filter(item => 
      item.security.toLowerCase().includes(search.toLowerCase()) ||
      item.isin.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    );

    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortAsc ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

    return result;
  }, [search, sortField, sortAsc]);

  const handleCSVExport = () => {
    // Generate actual CSV string
    const headers = "ID,ISIN,Security Name,Category,NAV,Change (%)\n";
    const rows = filteredData.map(item => 
      `${item.id},${item.isin},"${item.security}",${item.category},${item.nav},${item.change}`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `capitaline_aws_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    onSuccessToast(`Exported ${filteredData.length} records successfully to browser downloads!`);
  };

  return (
    <div className="w-full text-xs font-sans">
      <div className="flex gap-2 justify-between items-center mb-3 flex-wrap">
        <div className="relative w-full sm:w-64">
          <FaSearch className="absolute left-2.5 top-2.5 text-muted-slate text-xs" />
          <input 
            type="text" 
            placeholder="Search ISIN, Security name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-primary-cyan text-xs"
          />
        </div>
        <button 
          onClick={handleCSVExport}
          className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1.5 rounded-lg font-medium cursor-pointer shadow-sm shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all text-xs"
        >
          <FaFileExport className="text-xs" /> Export filtered (.CSV)
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/60 max-h-56">
        <table className="w-full border-collapse text-left">
          <thead className="sticky top-0 bg-slate-900 z-10">
            <tr className="border-b border-slate-800 text-[10px] font-bold text-muted-slate uppercase tracking-wider">
              <th onClick={() => handleSort("isin")} className="p-2.5 cursor-pointer hover:text-white select-none">
                ISIN {sortField === "isin" && (sortAsc ? <FaArrowUp className="inline ml-1" /> : <FaArrowDown className="inline ml-1" />)}
              </th>
              <th onClick={() => handleSort("security")} className="p-2.5 cursor-pointer hover:text-white select-none">
                Security {sortField === "security" && (sortAsc ? <FaArrowUp className="inline ml-1" /> : <FaArrowDown className="inline ml-1" />)}
              </th>
              <th onClick={() => handleSort("category")} className="p-2.5 cursor-pointer hover:text-white select-none">
                Category {sortField === "category" && (sortAsc ? <FaArrowUp className="inline ml-1" /> : <FaArrowDown className="inline ml-1" />)}
              </th>
              <th onClick={() => handleSort("nav")} className="p-2.5 text-right cursor-pointer hover:text-white select-none">
                NAV {sortField === "nav" && (sortAsc ? <FaArrowUp className="inline ml-1" /> : <FaArrowDown className="inline ml-1" />)}
              </th>
              <th onClick={() => handleSort("change")} className="p-2.5 text-right cursor-pointer hover:text-white select-none">
                1D Change {sortField === "change" && (sortAsc ? <FaArrowUp className="inline ml-1" /> : <FaArrowDown className="inline ml-1" />)}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/30 text-slate-300">
                  <td className="p-2.5 font-mono text-[10px] text-slate-400">{item.isin}</td>
                  <td className="p-2.5 font-medium text-white truncate max-w-40">{item.security}</td>
                  <td className="p-2.5 text-slate-400">{item.category}</td>
                  <td className="p-2.5 text-right font-mono text-white">₹{item.nav.toFixed(2)}</td>
                  <td className={`p-2.5 text-right font-mono font-medium ${item.change >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {item.change >= 0 ? "+" : ""}{item.change.toFixed(2)}%
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-muted-slate font-medium">No financial assets match your search</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center text-[10px] text-muted-slate mt-2 bg-slate-900/40 p-2 rounded border border-slate-800/50">
        <span>Rows: {filteredData.length} filtered from {allData.length} total</span>
        <span className="text-cyan-400 animate-pulse flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" /> Live .NET AWS Server Connection: OK
        </span>
      </div>
    </div>
  );
}

// ==========================================
// 4. NAV INDIA - REPORTING DEMO
// ==========================================
interface ReconciliationItem {
  id: number;
  detail: string;
  bankVal: number;
  ledgerVal: number;
}

export function NAVIndiaDemo({ onSuccessToast }: DemoProps) {
  const [data, setData] = useState<ReconciliationItem[]>([
    { id: 101, detail: "Reliance Settlement Receivables", bankVal: 450000, ledgerVal: 450000 },
    { id: 102, detail: "TCS Dividend Payout Credit", bankVal: 120500, ledgerVal: 120500 },
    { id: 103, detail: "HDFC Brokerage Service Fee", bankVal: -4500, ledgerVal: -4500 },
    { id: 104, detail: "Mutual Fund Redemption Inflow", bankVal: 785400, ledgerVal: 780400 }, // Discrepancy!
    { id: 105, detail: "T-Bills Inward Settlement", bankVal: 1500000, ledgerVal: 1500000 }
  ]);
  
  const [discrepanciesHighlighted, setDiscrepanciesHighlighted] = useState(false);
  const [locked, setLocked] = useState(false);
  const [auditId, setAuditId] = useState("");

  const handleReconcile = () => {
    setDiscrepanciesHighlighted(true);
    onSuccessToast("Auditor tool successfully scanned: 1 ledger discrepancy identified!");
  };

  const handleFixAndLock = () => {
    // Fix the mismatch in 104
    const resolved = data.map(item => 
      item.id === 104 ? { ...item, ledgerVal: 785400 } : item
    );
    setData(resolved);
    setLocked(true);
    const newId = `NAV-LOCK-${Math.floor(100000 + Math.random() * 900000)}`;
    setAuditId(newId);
    onSuccessToast(`Ledger discrepancy resolved. Ledger locked! ID: ${newId}`);
  };

  const resetLedger = () => {
    setData([
      { id: 101, detail: "Reliance Settlement Receivables", bankVal: 450000, ledgerVal: 450000 },
      { id: 102, detail: "TCS Dividend Payout Credit", bankVal: 120500, ledgerVal: 120500 },
      { id: 103, detail: "HDFC Brokerage Service Fee", bankVal: -4500, ledgerVal: -4500 },
      { id: 104, detail: "Mutual Fund Redemption Inflow", bankVal: 785400, ledgerVal: 780400 },
      { id: 105, detail: "T-Bills Inward Settlement", bankVal: 1500000, ledgerVal: 1500000 }
    ]);
    setLocked(false);
    setDiscrepanciesHighlighted(false);
    setAuditId("");
    onSuccessToast("Ledger reverted to audited raw state.");
  };

  return (
    <div className="w-full text-xs font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        {/* Bank Records Table */}
        <div className="rounded-lg border border-slate-800 bg-slate-950/60 overflow-hidden">
          <div className="bg-slate-900/60 px-3 py-2 border-b border-slate-800 font-bold text-white uppercase tracking-wider text-[10px]">
            🏦 Bank Custody Feeds (A)
          </div>
          <div className="p-1">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[9px] text-muted-slate border-b border-slate-800 uppercase">
                  <th className="p-1.5">ID</th>
                  <th className="p-1.5">Description</th>
                  <th className="p-1.5 text-right">Value (₹)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/20 text-slate-300">
                    <td className="p-1.5 font-mono text-slate-400">{item.id}</td>
                    <td className="p-1.5 truncate max-w-24 text-slate-300">{item.detail}</td>
                    <td className="p-1.5 text-right font-mono text-white">{item.bankVal.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Internal Ledger Table */}
        <div className="rounded-lg border border-slate-800 bg-slate-950/60 overflow-hidden">
          <div className="bg-slate-900/60 px-3 py-2 border-b border-slate-800 font-bold text-white uppercase tracking-wider text-[10px]">
            📑 Internal Reporting Ledger (B)
          </div>
          <div className="p-1">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[9px] text-muted-slate border-b border-slate-800 uppercase">
                  <th className="p-1.5">ID</th>
                  <th className="p-1.5">Description</th>
                  <th className="p-1.5 text-right">Value (₹)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  const hasMismatch = item.bankVal !== item.ledgerVal;
                  return (
                    <tr 
                      key={item.id} 
                      className={`hover:bg-slate-900/20 text-slate-300 transition-colors ${
                        hasMismatch && discrepanciesHighlighted && !locked
                          ? "bg-amber-950/30 text-amber-300 border-l-2 border-amber-500" 
                          : ""
                      }`}
                    >
                      <td className="p-1.5 font-mono text-slate-400">{item.id}</td>
                      <td className="p-1.5 truncate max-w-24 text-slate-300">{item.detail}</td>
                      <td className="p-1.5 text-right font-mono text-white">
                        {item.ledgerVal.toLocaleString()}
                        {hasMismatch && discrepanciesHighlighted && !locked && (
                          <span className="block text-[8px] text-amber-400 font-sans font-semibold">
                            Mismatch: (₹{(item.bankVal - item.ledgerVal).toLocaleString()})
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap items-center">
        {!discrepanciesHighlighted ? (
          <button 
            onClick={handleReconcile}
            className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors text-xs"
          >
            <FaSyncAlt className="text-xs animate-spin-slow" /> Run Audit Reconciliation
          </button>
        ) : !locked ? (
          <button 
            onClick={handleFixAndLock}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors text-xs shadow-md shadow-emerald-500/20"
          >
            <FaLock className="text-xs" /> Resolve Mismatch & Lock Ledger
          </button>
        ) : (
          <div className="flex gap-3 items-center w-full justify-between flex-wrap">
            <span className="bg-emerald-950/70 border border-emerald-800 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5">
              <FaCheck className="text-emerald-400" /> Locked: {auditId}
            </span>
            <button 
              onClick={resetLedger}
              className="text-slate-400 hover:text-white underline cursor-pointer text-[10px]"
            >
              Reset Reconciliation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
