"use client";
import React, { useState } from "react";

const billTemplate = () => {
  const [gstTableActive, setGstTableActive] = useState(true);
  const [gstSettings, setGstSettings] = useState({
    gst: { 
      enabled: true,
      taxAmount: { enabled: true },
      cost: { enabled: true }
    },
    sgst: {
      enabled: true,
      totalgst: { enabled: true }
    }
  });

  const [patientTableActive, setPatientTableActive] = useState(true);
  const [patientSettings, setPatientSettings] = useState({
    patientName: { enabled: true },
    phoneNumber: { enabled: true },
    age: { enabled: true },
    gender: { enabled: true },
    address: { enabled: true },
    doctorName: { enabled: true }
  });

  const [itemTableActive, setItemTableActive] = useState(true);
  const [itemSettings, setItemSettings] = useState({
    itemName: { enabled: true },
    quantity: { enabled: true },
    hsn: { enabled: true },
    batch: { enabled: true },
    expiry: { enabled: true },
    mrp: { enabled: true },
    gstPercent: { enabled: true },
    discount: { enabled: true },
    total: { enabled: true }
  });

  const [paymentTableActive, setPaymentTableActive] = useState(true);
  const [paymentSettings, setPaymentSettings] = useState({
    amountPaid: { enabled: true },
    paymentMethod: { enabled: true },
    paymentStatus: { enabled: true },
    totalDiscount: { enabled: true },
    totalBill: { enabled: true },
    outstandingAmount: { enabled: true }
  });

  const toggleGstMainSetting = (section: 'gst' | 'sgst', enabled: boolean) => {
    setGstSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        enabled
      }
    }));
  };

  const toggleGstSubSetting = (section: 'gst' | 'sgst', subSetting: 'taxAmount' | 'cost' | 'totalgst', enabled: boolean) => {
    setGstSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSetting]: {
          ...prev[section][subSetting],
          enabled
        }
      }
    }));
  };

  const togglePatientSetting = (field: keyof typeof patientSettings, enabled: boolean) => {
    setPatientSettings(prev => ({
      ...prev,
      [field]: { enabled }
    }));
  };

  const toggleItemSetting = (field: keyof typeof itemSettings, enabled: boolean) => {
    setItemSettings(prev => ({
      ...prev,
      [field]: { enabled }
    }));
  };

  const togglePaymentSetting = (field: keyof typeof paymentSettings, enabled: boolean) => {
    setPaymentSettings(prev => ({
      ...prev,
      [field]: { enabled }
    }));
  };

  const ToggleKey = ({ 
    enabled, 
    onToggle,
    disabled = false
  }: { 
    enabled: boolean; 
    onToggle: (enabled: boolean) => void;
    disabled?: boolean;
  }) => (
    <div className="flex items-center gap-2">
      <span className={`text-sm ${!enabled ? 'font-medium' : 'text-[#999999]'}`}>Disable</span>
      <div 
        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${enabled ? 'bg-[#B3DB8A]' : 'bg-[#F7A6D8]'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && onToggle(!enabled)}
      >
        <div 
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0'}`}
        />
      </div>
      <span className={`text-sm ${enabled ? 'font-medium' : 'text-[#999999]'}`}>Enable</span>
    </div>
  );

  const [dlTableActive, setDlTableActive] = useState(true);
  const [dl1Enabled, setDl1Enabled] = useState(true);
  const [dl2Enabled, setDl2Enabled] = useState(true);
  const [dl1Number, setDl1Number] = useState("");
  const [dl2Number, setDl2Number] = useState("");
  const [showDlNumbers, setShowDlNumbers] = useState(false);

  const handleAddDlNumbers = () => {
    if (dl1Number || dl2Number) {
      setShowDlNumbers(true);
    }
  };

  const [pharmacyTableActive, setPharmacyTableActive] = useState(true);
const [pharmacySettings, setPharmacySettings] = useState({
  logo: { enabled: true },
  address: { enabled: true },
  fssai: { enabled: true },
  gstin: { enabled: true }
});
const [logoFile, setLogoFile] = useState<File | null>(null);
const [addressText, setAddressText] = useState("");

const togglePharmacySetting = (field: keyof typeof pharmacySettings, enabled: boolean) => {
  setPharmacySettings(prev => ({
    ...prev,
    [field]: { enabled }
  }));
};

const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    setLogoFile(e.target.files[0]);
  }
};

const [declarationTableActive, setDeclarationTableActive] = useState(true);
const [declarationSettings, setDeclarationSettings] = useState({
  signature: { enabled: true },
  terms: { enabled: true },
  remark: { enabled: true }
});
const [signatureFile, setSignatureFile] = useState<File | null>(null);
const [termsText, setTermsText] = useState("");
const [remarkText, setRemarkText] = useState("");

const toggleDeclarationSetting = (field: keyof typeof declarationSettings, enabled: boolean) => {
  setDeclarationSettings(prev => ({
    ...prev,
    [field]: { enabled }
  }));
};

const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    setSignatureFile(e.target.files[0]);
  }
};

  return (
    <div className="p-6">
      <div className="items-center gap-2 mb-6 text-xl text-center">
        <span className="text-[#999999] font-semibold">Bill Template</span>
        <span className="text-[#999999] font-semibold">&gt;</span>
        <span className="text-[#4D4D4D] font-semibold">Create</span>
      </div>

      {/* Pharmacy Information Table */}
      <div className={`bg-white rounded-lg p-6 mb-2 ${!pharmacyTableActive ? 'opacity-100' : ''}`}>
  <div className="flex justify-between items-center mb-4 px-2">
    <h1 className={`font-semibold ${!pharmacyTableActive ? 'text-[#999999]' : ''}`}>Pharmacy Information</h1>
    <div className="flex items-center gap-2">
      <ToggleKey 
        enabled={pharmacyTableActive} 
        onToggle={(enabled) => setPharmacyTableActive(enabled)} 
      />
    </div>
  </div>
  
  <div className="overflow-x-auto">
    <table className={`w-full border border-gray-300 ${!pharmacyTableActive ? 'text-gray-400' : 'text-#999999'}`}>
      <thead>
        <tr className={`border-b ${pharmacyTableActive ? 'bg-[#E6F3D8]' : 'bg-[#E6F3D8]'}`}>
          <th className="p-3"></th>
          <th className="p-3"></th>
          <th className="p-3"></th>
          <th className="p-3"></th>
          <th className="p-3"></th>
          <th className="p-3"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-3">Logo</td>
          <td className="p-3">
            <ToggleKey 
              enabled={pharmacyTableActive && pharmacySettings.logo.enabled} 
              onToggle={(enabled) => pharmacyTableActive && togglePharmacySetting('logo', enabled)} 
              disabled={!pharmacyTableActive}
            />
          </td>
          <td className="p-3">Address</td>
          <td className="p-3">
            <ToggleKey 
              enabled={pharmacyTableActive && pharmacySettings.address.enabled} 
              onToggle={(enabled) => pharmacyTableActive && togglePharmacySetting('address', enabled)} 
              disabled={!pharmacyTableActive}
            />
          </td>
          <td className="p-3">FSSAI</td>
          <td className="p-3">
            <ToggleKey 
              enabled={pharmacyTableActive && pharmacySettings.fssai.enabled} 
              onToggle={(enabled) => pharmacyTableActive && togglePharmacySetting('fssai', enabled)} 
              disabled={!pharmacyTableActive}
            />
          </td>
        </tr>

        <tr>
        <td></td>
        <td className="p-3">
  <div className="flex flex-col items-start">
    <div className={`flex items-center gap-4 ${(!pharmacySettings.logo.enabled || !pharmacyTableActive) ? 'opacity-50' : ''}`}>
      <label className="cursor-pointer px-3 py-1 rounded text-sm rounded-[6px] text-[10px] text-[#D11288] border-b border-[#FB009C] shadow-sm shadow-[#FB009C]/40 hover:shadow-[#FB009C] transition-all items-center">
        Upload
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleLogoUpload} 
          className="hidden"
          disabled={!pharmacySettings.logo.enabled || !pharmacyTableActive}
        />
      </label>
      
      <div className="text-sm flex items-center gap-2">
        {logoFile ? (
          <>
            <img 
              src={URL.createObjectURL(logoFile)} 
              alt="Uploaded Logo" 
              className="w-6 h-6 object-contain"
            />
            <div>
              <div>{logoFile.name}</div>
              <div className="text-gray-500">{(logoFile.size / 1024).toFixed(0)} KB</div>
            </div>
          </>
        ) : (
          <>
            <div className="w-6 h-6 bg-gray-100 flex items-center justify-center rounded">
              <span className="text-xs">📷</span>
            </div>
            <div>
              <div>Logo.png</div>
              <div className="text-gray-500">200 KB</div>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
</td>
  <td className="p-3">
    <input
      type="text"
      value={addressText}
      onChange={(e) => setAddressText(e.target.value)}
      className={`border rounded px-2 py-1 w-full ${!pharmacySettings.address.enabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      placeholder="Enter Pharmacy Address"
      disabled={!pharmacySettings.address.enabled || !pharmacyTableActive}
    />
  </td>
</tr>
        
        <tr>
          <td className="p-3">GSTIN</td>
          <td className="p-3" colSpan={2}>
            <div className="flex items-center gap-4">
              <ToggleKey 
                enabled={pharmacyTableActive && pharmacySettings.gstin.enabled} 
                onToggle={(enabled) => pharmacyTableActive && togglePharmacySetting('gstin', enabled)} 
                disabled={!pharmacyTableActive}
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

      {/* Drug License Information Table */} 
      <div className={`bg-white rounded-lg p-6 mb-2 ${!dlTableActive ? 'opacity-100' : ''}`}>
        <div className="flex justify-between items-center mb-4 px-2">
          <h1 className={`font-semibold ${!dlTableActive ? 'text-[#999999]' : ''}`}>Drug License Information</h1>
          <div className="flex items-center gap-2">
            <ToggleKey 
              enabled={dlTableActive} 
              onToggle={(enabled) => setDlTableActive(enabled)} 
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className={`w-full border border-gray-300 ${!dlTableActive ? 'text-gray-400' : 'text-#999999'}`}>
            <thead>
              <tr className={`border-b ${dlTableActive ? 'bg-[#E6F3D8]' : 'bg-[#E6F3D8]'}`}>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
               <td className="p-3 font-semibold text-[#1A1A1A]">DL Number
              <button
              onClick={handleAddDlNumbers}
              className="ml-4 text-pink-500 py-2 hover:text-pink-700"
              >
              Add
              </button>
              </td>
              </tr>
              <tr>
                <td className="p-3">DL Number 1</td>
                <td className="p-3">
                  <ToggleKey 
                    enabled={dlTableActive && dl1Enabled} 
                    onToggle={(enabled) => dlTableActive && setDl1Enabled(enabled)} 
                    disabled={!dlTableActive}
                  />
                </td>
                <td className="p-3">DL Number 2</td>
                <td className="p-3">
                  <ToggleKey 
                    enabled={dlTableActive && dl2Enabled} 
                    onToggle={(enabled) => dlTableActive && setDl2Enabled(enabled)} 
                    disabled={!dlTableActive}
                  />
                </td>
              </tr>
              <tr>
              <td colSpan={2} className="p-3">
          <input
            type="text"
            value={dl1Number}
            onChange={(e) => dl1Enabled && setDl1Number(e.target.value)}
            className={`border rounded px-2 py-1 w-2/3 ${!dl1Enabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            placeholder="Enter DL Number 1"
            disabled={!dl1Enabled || !dlTableActive}
          />
        </td>
        <td colSpan={2} className="p-3">
          <input
            type="text"
            value={dl2Number}
            onChange={(e) => dl2Enabled && setDl2Number(e.target.value)}
            className={`border rounded px-2 py-1 w-2/3 ${!dl2Enabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            placeholder="Enter DL Number 2"
            disabled={!dl2Enabled || !dlTableActive}
          />
        </td>
      </tr>
    </tbody>
  </table>

  {showDlNumbers && (
    <div className="mt-2 p-2 rounded">
      <p className="text-l text-gray-700">
        {dl1Number && `DL Number 1 : ${dl1Number}`}
      </p>
      <p className="text-l text-gray-700">
        {dl2Number && `DL Number 2 : ${dl2Number}`}
      </p>
    </div>
  )}
</div>
      </div>

      {/* Patient Information Table */}
      <div className={`bg-white rounded-lg p-6 mb-2 ${!patientTableActive ? 'opacity-100' : ''}`}>
        <div className="flex justify-between items-center mb-4 px-2">
          <h1 className={`font-semibold ${!patientTableActive ? 'text-[#999999]' : ''}`}>Patient Information</h1>
          <div className="flex items-center gap-2">
            <ToggleKey 
              enabled={patientTableActive} 
              onToggle={(enabled) => setPatientTableActive(enabled)} 
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className={`w-full border border-gray-300 ${!patientTableActive ? 'text-gray-400' : 'text-#999999'}`}>
            <thead>
              <tr className={`border-b ${patientTableActive ? 'bg-[#E6F3D8]' : 'bg-[#E6F3D8]'}`}>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3">Patient Name</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={patientTableActive && patientSettings.patientName.enabled} 
                    onToggle={(enabled) => patientTableActive && togglePatientSetting('patientName', enabled)} 
                    disabled={!patientTableActive}
                  />
                </td>
                <td className="p-3">Phone Number</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={patientTableActive && patientSettings.phoneNumber.enabled} 
                    onToggle={(enabled) => patientTableActive && togglePatientSetting('phoneNumber', enabled)} 
                    disabled={!patientTableActive}
                  />
                </td>
                <td className="p-3">Age</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={patientTableActive && patientSettings.age.enabled} 
                    onToggle={(enabled) => patientTableActive && togglePatientSetting('age', enabled)} 
                    disabled={!patientTableActive}
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3">Gender</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={patientTableActive && patientSettings.gender.enabled} 
                    onToggle={(enabled) => patientTableActive && togglePatientSetting('gender', enabled)} 
                    disabled={!patientTableActive}
                  />
                </td>
                <td className="p-3">Address</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={patientTableActive && patientSettings.address.enabled} 
                    onToggle={(enabled) => patientTableActive && togglePatientSetting('address', enabled)} 
                    disabled={!patientTableActive}
                  />
                </td>
                <td className="p-3">Doctor Name</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={patientTableActive && patientSettings.doctorName.enabled} 
                    onToggle={(enabled) => patientTableActive && togglePatientSetting('doctorName', enabled)} 
                    disabled={!patientTableActive}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Item Information Table */}
      <div className={`bg-white rounded-lg p-6 mb-2 ${!itemTableActive ? 'opacity-100' : ''}`}>
        <div className="flex justify-between items-center mb-4 px-2">
          <h1 className={`font-semibold ${!itemTableActive ? 'text-[#999999]' : ''}`}>Item Information</h1>
          <div className="flex items-center gap-2">
            <ToggleKey 
              enabled={itemTableActive} 
              onToggle={(enabled) => setItemTableActive(enabled)} 
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className={`w-full border border-gray-300 ${!itemTableActive ? 'text-gray-400' : 'text-#999999'}`}>
            <thead>
              <tr className={`border-b ${itemTableActive ? 'bg-[#E6F3D8]' : 'bg-[#E6F3D8]'}`}>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3">Item Name</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={itemTableActive && itemSettings.itemName.enabled} 
                    onToggle={(enabled) => itemTableActive && toggleItemSetting('itemName', enabled)} 
                    disabled={!itemTableActive}
                  />
                </td>
                <td className="p-3">Quantity</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={itemTableActive && itemSettings.quantity.enabled} 
                    onToggle={(enabled) => itemTableActive && toggleItemSetting('quantity', enabled)} 
                    disabled={!itemTableActive}
                  />
                </td>
                <td className="p-3">HSN</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={itemTableActive && itemSettings.hsn.enabled} 
                    onToggle={(enabled) => itemTableActive && toggleItemSetting('hsn', enabled)} 
                    disabled={!itemTableActive}
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3">Batch</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={itemTableActive && itemSettings.batch.enabled} 
                    onToggle={(enabled) => itemTableActive && toggleItemSetting('batch', enabled)} 
                    disabled={!itemTableActive}
                  />
                </td>
                <td className="p-3">Expiry</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={itemTableActive && itemSettings.expiry.enabled} 
                    onToggle={(enabled) => itemTableActive && toggleItemSetting('expiry', enabled)} 
                    disabled={!itemTableActive}
                  />
                </td>
                <td className="p-3">MRP</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={itemTableActive && itemSettings.mrp.enabled} 
                    onToggle={(enabled) => itemTableActive && toggleItemSetting('mrp', enabled)} 
                    disabled={!itemTableActive}
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3">GST%</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={itemTableActive && itemSettings.gstPercent.enabled} 
                    onToggle={(enabled) => itemTableActive && toggleItemSetting('gstPercent', enabled)} 
                    disabled={!itemTableActive}
                  />
                </td>
                <td className="p-3">Discount</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={itemTableActive && itemSettings.discount.enabled} 
                    onToggle={(enabled) => itemTableActive && toggleItemSetting('discount', enabled)} 
                    disabled={!itemTableActive}
                  />
                </td>
                <td className="p-3">Total</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={itemTableActive && itemSettings.total.enabled} 
                    onToggle={(enabled) => itemTableActive && toggleItemSetting('total', enabled)} 
                    disabled={!itemTableActive}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* GST Information Table */}
      <div className={`bg-white rounded-lg p-6 mb-2 ${!gstTableActive ? 'opacity-100' : ''}`}>
        <div className="flex justify-between items-center mb-4 px-2">
          <h1 className={`font-semibold ${!gstTableActive ? 'text-[#999999]' : ''}`}>GST Information</h1>
          <div className="flex items-center gap-2">
            <ToggleKey 
              enabled={gstTableActive} 
              onToggle={(enabled) => setGstTableActive(enabled)} 
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className={`w-full border border-gray-300 ${!gstTableActive ? 'text-gray-400' : 'text-#999999'}`}>
            <thead>
              <tr className={`border-b ${gstTableActive ? 'bg-[#E6F3D8]' : 'bg-[#E6F3D8]'}`}>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3">GST%</td>
                <td className="text-center p-3" colSpan={2}>
                  <ToggleKey 
                    enabled={gstTableActive && gstSettings.gst.enabled} 
                    onToggle={(enabled) => gstTableActive && toggleGstMainSetting('gst', enabled)} 
                    disabled={!gstTableActive}
                  />
                </td>
                <td className="p-3">Tax Amount</td>
                <td className="text-center p-3" colSpan={2}>
                  <ToggleKey 
                    enabled={gstTableActive && gstSettings.gst.taxAmount.enabled} 
                    onToggle={(enabled) => gstTableActive && toggleGstSubSetting('gst', 'taxAmount', enabled)} 
                    disabled={!gstTableActive}
                  />
                </td>
                <td className="p-3">CGST</td>
                <td className="text-center p-3" colSpan={2}>
                  <ToggleKey 
                    enabled={gstTableActive && gstSettings.gst.cost.enabled} 
                    onToggle={(enabled) => gstTableActive && toggleGstSubSetting('gst', 'cost', enabled)} 
                    disabled={!gstTableActive}
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3">SGST</td>
                <td className="text-center p-3" colSpan={2}>
                  <ToggleKey 
                    enabled={gstTableActive && gstSettings.sgst.enabled} 
                    onToggle={(enabled) => gstTableActive && toggleGstMainSetting('sgst', enabled)} 
                    disabled={!gstTableActive}
                  />
                </td>
                <td className="p-3">Total GST</td>
                <td className="text-center p-3" colSpan={2}>
                  <ToggleKey 
                    enabled={gstTableActive && gstSettings.sgst.totalgst.enabled} 
                    onToggle={(enabled) => gstTableActive && toggleGstSubSetting('sgst', 'totalgst', enabled)} 
                    disabled={!gstTableActive}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Information Table */}
      <div className={`bg-white rounded-lg p-6 mb-2 ${!paymentTableActive ? 'opacity-100' : ''}`}>
        <div className="flex justify-between items-center mb-4 px-2">
          <h1 className={`font-semibold ${!paymentTableActive ? 'text-[#999999]' : ''}`}>Payment Information</h1>
          <div className="flex items-center gap-2">
            <ToggleKey 
              enabled={paymentTableActive} 
              onToggle={(enabled) => setPaymentTableActive(enabled)} 
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className={`w-full border border-gray-300 ${!paymentTableActive ? 'text-gray-400' : 'text-#999999'}`}>
            <thead>
              <tr className={`border-b ${paymentTableActive ? 'bg-[#E6F3D8]' : 'bg-[#E6F3D8]'}`}>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3">Amount Paid</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={paymentTableActive && paymentSettings.amountPaid.enabled} 
                    onToggle={(enabled) => paymentTableActive && togglePaymentSetting('amountPaid', enabled)} 
                    disabled={!paymentTableActive}
                  />
                </td>
                <td className="p-3">Payment Method</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={paymentTableActive && paymentSettings.paymentMethod.enabled} 
                    onToggle={(enabled) => paymentTableActive && togglePaymentSetting('paymentMethod', enabled)} 
                    disabled={!paymentTableActive}
                  />
                </td>
                <td className="p-3">Payment Status</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={paymentTableActive && paymentSettings.paymentStatus.enabled} 
                    onToggle={(enabled) => paymentTableActive && togglePaymentSetting('paymentStatus', enabled)} 
                    disabled={!paymentTableActive}
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3">Total Discount</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={paymentTableActive && paymentSettings.totalDiscount.enabled} 
                    onToggle={(enabled) => paymentTableActive && togglePaymentSetting('totalDiscount', enabled)} 
                    disabled={!paymentTableActive}
                  />
                </td>
                <td className="p-3">Total Bill</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={paymentTableActive && paymentSettings.totalBill.enabled} 
                    onToggle={(enabled) => paymentTableActive && togglePaymentSetting('totalBill', enabled)} 
                    disabled={!paymentTableActive}
                  />
                </td>
                <td className="p-3">Outstanding Amount</td>
                <td className="text-center p-3">
                  <ToggleKey 
                    enabled={paymentTableActive && paymentSettings.outstandingAmount.enabled} 
                    onToggle={(enabled) => paymentTableActive && togglePaymentSetting('outstandingAmount', enabled)} 
                    disabled={!paymentTableActive}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Declaration Information Table */}
<div className={`bg-white rounded-lg p-6 mb-2 ${!declarationTableActive ? 'opacity-100' : ''}`}>
  <div className="flex justify-between items-center mb-4 px-2">
    <h1 className={`font-semibold ${!declarationTableActive ? 'text-[#999999]' : ''}`}>Declaration Information</h1>
    <div className="flex items-center gap-2">
      <ToggleKey 
        enabled={declarationTableActive} 
        onToggle={(enabled) => setDeclarationTableActive(enabled)} 
      />
    </div>
  </div>
  
  <div className="overflow-x-auto">
    <table className={`w-full border border-gray-300 ${!declarationTableActive ? 'text-gray-400' : 'text-#999999'}`}>
      <thead>
        <tr className={`border-b ${declarationTableActive ? 'bg-[#E6F3D8]' : 'bg-[#E6F3D8]'}`}>
          <th className="p-3"></th>
          <th className="p-3"></th>
          <th className="p-3"></th>
          <th className="p-3"></th>
          <th className="p-3"></th>
          <th className="p-3"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-3">Signature</td>
          <td className="p-3">
            <ToggleKey 
              enabled={declarationTableActive && declarationSettings.signature.enabled} 
              onToggle={(enabled) => declarationTableActive && toggleDeclarationSetting('signature', enabled)} 
              disabled={!declarationTableActive}
            />
          </td>
          <td className="p-3">Terms & Conditions</td>
          <td className="p-3">
            <ToggleKey 
              enabled={declarationTableActive && declarationSettings.terms.enabled} 
              onToggle={(enabled) => declarationTableActive && toggleDeclarationSetting('terms', enabled)} 
              disabled={!declarationTableActive}
            />
          </td>
          <td className="p-3">Remark</td>
          <td className="p-3">
            <ToggleKey 
              enabled={declarationTableActive && declarationSettings.remark.enabled} 
              onToggle={(enabled) => declarationTableActive && toggleDeclarationSetting('remark', enabled)} 
              disabled={!declarationTableActive}
            />
          </td>
        </tr>

        <tr>
          <td></td>
          <td className="p-3">
            <div className={`flex items-center gap-4 ${(!declarationSettings.signature.enabled || !declarationTableActive) ? 'opacity-50' : ''}`}>
              <label className="cursor-pointer px-3 py-1 rounded text-sm rounded-[6px] text-[10px] text-[#D11288] border-b border-[#FB009C] shadow-sm shadow-[#FB009C]/40 hover:shadow-[#FB009C] transition-all items-center">
                Upload
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleSignatureUpload} 
                  className="hidden"
                  disabled={!declarationSettings.signature.enabled || !declarationTableActive}
                />
              </label>
              
              <div className="text-sm flex items-center gap-2">
                {signatureFile ? (
                  <>
                    <img 
                      src={URL.createObjectURL(signatureFile)} 
                      alt="Uploaded Signature" 
                      className="w-6 h-6 object-contain"
                    />
                    <div>
                      <div>{signatureFile.name}</div>
                      <div className="text-gray-500">{(signatureFile.size / 1024).toFixed(0)} KB</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-6 h-6 bg-gray-100 flex items-center justify-center rounded">
                      <span className="text-xs">✍️</span>
                    </div>
                    <div>
                      <div>Signature.png</div>
                      <div className="text-gray-500">200 KB</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </td>
          <td className="p-3" colSpan={2}>
            <input
              type="text"
              value={termsText}
              onChange={(e) => setTermsText(e.target.value)}
              className={`border rounded px-2 py-1 w-2/3 ${!declarationSettings.terms.enabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              placeholder="Enter Terms & Conditions"
              disabled={!declarationSettings.terms.enabled || !declarationTableActive}
            />
          </td>
          <td className="p-3">
            <input
              type="text"
              value={remarkText}
              onChange={(e) => setRemarkText(e.target.value)}
              className={`border rounded px-2 py-1 w-full ${!declarationSettings.remark.enabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              placeholder="Enter Remark"
              disabled={!declarationSettings.remark.enabled || !declarationTableActive}
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

{/* Preview Bill and Save Buttons */}
<div className="flex justify-end gap-4 mt-6 mr-6">
  <button
    className="bg-white text-[#D11288] font-medium px-4 py-2 rounded-lg border border-[#D11288] hover:bg-gray-50 transition-colors"
  >
    Preview Bill
  </button>
  <button
    className="bg-[#D11288] text-white font-medium px-4 py-2 rounded-lg border border-[#D11288] hover:bg-[#B80F75] transition-colors"
  >
    Save
  </button>
</div>
    </div>
  );
};

export default billTemplate;