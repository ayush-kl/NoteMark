import { useState } from 'react'
const billTemplate = () => {
  const [gstTableActive, setGstTableActive] = useState(true)
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
  })

  const [patientTableActive, setPatientTableActive] = useState(true)
  const [patientSettings, setPatientSettings] = useState({
    patientName: { enabled: true },
    phoneNumber: { enabled: true },
    age: { enabled: true },
    gender: { enabled: true },
    address: { enabled: true },
    doctorName: { enabled: true }
  })

  const [itemTableActive, setItemTableActive] = useState(true)
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
  })

  const [paymentTableActive, setPaymentTableActive] = useState(true)
  const [paymentSettings, setPaymentSettings] = useState({
    amountPaid: { enabled: true },
    paymentMethod: { enabled: true },
    paymentStatus: { enabled: true },
    totalDiscount: { enabled: true },
    totalBill: { enabled: true },
    outstandingAmount: { enabled: true }
  })

  const toggleGstMainSetting = (section: 'gst' | 'sgst', enabled: boolean) => {
    setGstSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        enabled
      }
    }))
  }

  const toggleGstSubSetting = (
    section: 'gst' | 'sgst',
    subSetting: 'taxAmount' | 'cost' | 'totalgst',
    enabled: boolean
  ) => {
    setGstSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSetting]: {
          ...prev[section][subSetting],
          enabled
        }
      }
    }))
  }

  const togglePatientSetting = (field: keyof typeof patientSettings, enabled: boolean) => {
    setPatientSettings((prev) => ({
      ...prev,
      [field]: { enabled }
    }))
  }

  const toggleItemSetting = (field: keyof typeof itemSettings, enabled: boolean) => {
    setItemSettings((prev) => ({
      ...prev,
      [field]: { enabled }
    }))
  }

  const togglePaymentSetting = (field: keyof typeof paymentSettings, enabled: boolean) => {
    setPaymentSettings((prev) => ({
      ...prev,
      [field]: { enabled }
    }))
  }

  const ToggleKey = ({
    enabled,
    onToggle,
    disabled = false
  }: {
    enabled: boolean
    onToggle: (enabled: boolean) => void
    disabled?: boolean
  }) => (
    <div className="flex items-center gap-2">
      <span className={`text-xs ${!enabled ? 'font-medium' : 'text-[#999999]'}`}>Disable</span>

      <div
        className={`w-8 h-4 rounded-full p-[2px] cursor-pointer transition-colors ${
          enabled ? 'bg-[#B3DB8A]' : 'bg-[#F7A6D8]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && onToggle(!enabled)}
      >
        <div
          className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform ${
            enabled ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </div>

      <span className={`text-xs ${enabled ? 'font-medium' : 'text-[#999999]'}`}>Enable</span>
    </div>
  )

  const [dlTableActive, setDlTableActive] = useState(true)
  const [dl1Enabled, setDl1Enabled] = useState(true)
  const [dl2Enabled, setDl2Enabled] = useState(true)
  const [dl1Number, setDl1Number] = useState('')
  const [dl2Number, setDl2Number] = useState('')
  const [showDlNumbers, setShowDlNumbers] = useState(false)

  const handleAddDlNumbers = () => {
    if (dl1Number || dl2Number) {
      setShowDlNumbers(true)
    }
  }

  const [pharmacyTableActive, setPharmacyTableActive] = useState(true)
  const [pharmacySettings, setPharmacySettings] = useState({
    logo: { enabled: true },
    address: { enabled: true },
    fssai: { enabled: true },
    gstin: { enabled: true }
  })
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [addressText, setAddressText] = useState('')

  const togglePharmacySetting = (field: keyof typeof pharmacySettings, enabled: boolean) => {
    setPharmacySettings((prev) => ({
      ...prev,
      [field]: { enabled }
    }))
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0])
    }
  }

  const [declarationTableActive, setDeclarationTableActive] = useState(true)
  const [declarationSettings, setDeclarationSettings] = useState({
    signature: { enabled: true },
    terms: { enabled: true },
    remark: { enabled: true }
  })
  const [signatureFile, setSignatureFile] = useState<File | null>(null)
  const [termsText, setTermsText] = useState('')
  const [remarkText, setRemarkText] = useState('')

  const toggleDeclarationSetting = (field: keyof typeof declarationSettings, enabled: boolean) => {
    setDeclarationSettings((prev) => ({
      ...prev,
      [field]: { enabled }
    }))
  }

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSignatureFile(e.target.files[0])
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-center items-center mb-10">
        <div className="p-1 text-center bg-white w-48 rounded-b-md shadow-sm shadow-[#CCCCCC]/100">
          <span className="text-[#999999] font-semibold">Bill Template</span>
          <span className="text-[#999999] font-semibold">&gt;</span>
          <span className="text-[#4D4D4D] font-semibold">Create</span>
        </div>
      </div>

      {/* Pharmacy Information Table */}
      <div className={`rounded-lg mb-10 ${!pharmacyTableActive ? 'opacity-100' : ''}`}>
        <div className="flex justify-between items-center px-2">
          <div className="p-1 text-center bg-white w-48 rounded-t-md shadow-sm shadow-[#CCCCCC]/100">
            <span
              className={`font-inter text-xs font-bold text-[#1A1A1A]${
                !pharmacyTableActive ? 'text-[#999999]' : ''
              }`}
            >
              Pharmacy Information
            </span>
          </div>
          <div className="flex justify-between items-center ">
            <div className="p-1.5 text-center bg-white w-44 rounded-t-md shadow-sm shadow-[#CCCCCC]/100">
              <ToggleKey
                enabled={pharmacyTableActive}
                onToggle={(enabled) => setPharmacyTableActive(enabled)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-b-lg mx-2 shadow-sm shadow-[#CCCCCC]/100">
          <table
            className={`w-full border border-gray-300 ${
              !pharmacyTableActive ? 'text-gray-400' : 'text-#999999'
            }`}
          >
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
                <td className="p-3 text-sm">Logo</td>
                <td className="p-3">
                  <ToggleKey
                    enabled={pharmacyTableActive && pharmacySettings.logo.enabled}
                    onToggle={(enabled) =>
                      pharmacyTableActive && togglePharmacySetting('logo', enabled)
                    }
                    disabled={!pharmacyTableActive}
                  />
                </td>
                <td className="p-3 text-sm">Address</td>
                <td className="p-3">
                  <ToggleKey
                    enabled={pharmacyTableActive && pharmacySettings.address.enabled}
                    onToggle={(enabled) =>
                      pharmacyTableActive && togglePharmacySetting('address', enabled)
                    }
                    disabled={!pharmacyTableActive}
                  />
                </td>
                <td className="p-3 text-sm">FSSAI</td>
                <td className="p-3">
                  <ToggleKey
                    enabled={pharmacyTableActive && pharmacySettings.fssai.enabled}
                    onToggle={(enabled) =>
                      pharmacyTableActive && togglePharmacySetting('fssai', enabled)
                    }
                    disabled={!pharmacyTableActive}
                  />
                </td>
              </tr>

              <tr>
                <td></td>
                <td className="p-3">
                  <div className="flex flex-col items-start">
                    <div
                      className={`flex items-center gap-4 ${
                        !pharmacySettings.logo.enabled || !pharmacyTableActive ? 'opacity-50' : ''
                      }`}
                    >
                      <label className="cursor-pointer px-3 py-1 text-sm rounded-[6px] text-[10px] text-[#D11288] border-b border-[#FB009C] shadow-sm shadow-[#FB009C]/40 hover:shadow-[#FB009C] transition-all items-center">
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
                              <div className="text-gray-500 text-xs">
                                {(logoFile.size / 1024).toFixed(0)} KB
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-6 h-6 rounded-full bg-[#F7A6D8] flex items-center justify-center">
                              <span className="text-xs">
                                <svg
                                  width="16"
                                  height="20"
                                  viewBox="0 0 16 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.8335 1.66797H3.00016C2.55814 1.66797 2.13421 1.84356 1.82165 2.15612C1.50909 2.46868 1.3335 2.89261 1.3335 3.33464V16.668C1.3335 17.11 1.50909 17.5339 1.82165 17.8465C2.13421 18.159 2.55814 18.3346 3.00016 18.3346H13.0002C13.4422 18.3346 13.8661 18.159 14.1787 17.8465C14.4912 17.5339 14.6668 17.11 14.6668 16.668V7.5013M8.8335 1.66797L14.6668 7.5013M8.8335 1.66797V7.5013H14.6668"
                                    stroke="#D11288"
                                  />
                                </svg>
                              </span>
                            </div>
                            <div>
                              <div className="text-xs">Logo.png</div>
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
                    className={`border border-[#999999] rounded-md px-2 py-1 w-full placeholder:text-xs placeholder:text-[#4D4D4D] ${
                      !pharmacySettings.address.enabled ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder="Lorem Ipsum is simply dummy text"
                    disabled={!pharmacySettings.address.enabled || !pharmacyTableActive}
                  />
                </td>
              </tr>

              <tr>
                <td className="p-3 text-sm">GSTIN</td>
                <td className="p-3" colSpan={2}>
                  <div className="flex items-center gap-4">
                    <ToggleKey
                      enabled={pharmacyTableActive && pharmacySettings.gstin.enabled}
                      onToggle={(enabled) =>
                        pharmacyTableActive && togglePharmacySetting('gstin', enabled)
                      }
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
      <div className={`rounded-lg mb-10 ${!dlTableActive ? 'opacity-100' : ''}`}>
        <div className="flex justify-between items-center px-2">
          <div className="p-1 text-center bg-white w-52 rounded-t-md shadow-sm shadow-[#CCCCCC]/100">
            <span
              className={`font-inter text-xs font-bold text-[#1A1A1A]${
                !pharmacyTableActive ? 'text-[#999999]' : ''
              }`}
            >
              Drug License Information
            </span>
          </div>
          <div className="flex justify-between items-center ">
            <div className="p-1.5 text-center bg-white w-44 rounded-t-md shadow-sm shadow-[#CCCCCC]/100">
              <ToggleKey
                enabled={pharmacyTableActive}
                onToggle={(enabled) => setPharmacyTableActive(enabled)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-b-lg mx-2 shadow-sm shadow-[#CCCCCC]/100">
          <table
            className={`w-full border border-gray-300 ${
              !dlTableActive ? 'text-gray-400' : 'text-#999999'
            }`}
          >
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
                <td className="p-3 text-xs font-bold text-[#1A1A1A]">
                  DL Number
                  <button
                    onClick={handleAddDlNumbers}
                    className="ml-4 text-pink-500 py-2 hover:text-pink-700"
                  >
                    Add
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-3 text-xs">DL Number 1</td>
                <td className="p-3">
                  <ToggleKey
                    enabled={dlTableActive && dl1Enabled}
                    onToggle={(enabled) => dlTableActive && setDl1Enabled(enabled)}
                    disabled={!dlTableActive}
                  />
                </td>
                <td className="p-3 text-xs">DL Number 2</td>
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
                    className={`border border-[#999999] rounded px-2 py-1 w-2/3 placeholder:text-xs placeholder:text-[#4D4D4D]  ${
                      !dl1Enabled ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder="Lorem Ipsum is simply dummy text"
                    disabled={!dl1Enabled || !dlTableActive}
                  />
                </td>
                <td colSpan={2} className="p-3">
                  <input
                    type="text"
                    value={dl2Number}
                    onChange={(e) => dl2Enabled && setDl2Number(e.target.value)}
                    className={`border border-[#999999] rounded px-2 py-1 w-2/3 placeholder:text-xs placeholder:text-[#4D4D4D]  ${
                      !dl2Enabled ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder="Lorem Ipsum is simply dummy text"
                    disabled={!dl2Enabled || !dlTableActive}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {showDlNumbers && (
            <div className="mt-2 p-2 rounded">
              <p className="text-l text-gray-700">{dl1Number && `DL Number 1 : ${dl1Number}`}</p>
              <p className="text-l text-gray-700">{dl2Number && `DL Number 2 : ${dl2Number}`}</p>
            </div>
          )}
        </div>
      </div>

      {/* Patient Information Table */}
      <div className={`rounded-lg mb-10 ${!dlTableActive ? 'opacity-100' : ''}`}>
        <div className="flex justify-between items-center px-2">
          <div className="p-1 text-center bg-white w-52 rounded-t-md shadow-sm shadow-[#CCCCCC]/100">
            <span
              className={`font-inter text-xs font-bold text-[#1A1A1A]${
                !pharmacyTableActive ? 'text-[#999999]' : ''
              }`}
            >
              Patient Information
            </span>
          </div>
          <div className="flex justify-between items-center ">
            <div className="p-1.5 text-center bg-white w-44 rounded-t-md shadow-sm shadow-[#CCCCCC]/100">
              <ToggleKey
                enabled={pharmacyTableActive}
                onToggle={(enabled) => setPharmacyTableActive(enabled)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto  bg-white rounded-b-lg mx-2 shadow-sm shadow-[#CCCCCC]/100">
          <table
            className={`w-full border border-gray-300 ${
              !patientTableActive ? 'text-gray-400' : 'text-#999999'
            }`}
          >
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
                <td className="p-3 text-xs">Patient Name</td>
                <td className="text-center p-3">
                  <ToggleKey
                    enabled={patientTableActive && patientSettings.patientName.enabled}
                    onToggle={(enabled) =>
                      patientTableActive && togglePatientSetting('patientName', enabled)
                    }
                    disabled={!patientTableActive}
                  />
                </td>
                <td className="p-3 text-xs">Phone Number</td>
                <td className="text-center p-3">
                  <ToggleKey
                    enabled={patientTableActive && patientSettings.phoneNumber.enabled}
                    onToggle={(enabled) =>
                      patientTableActive && togglePatientSetting('phoneNumber', enabled)
                    }
                    disabled={!patientTableActive}
                  />
                </td>
                <td className="p-3 text-xs">Age</td>
                <td className="text-center p-3">
                  <ToggleKey
                    enabled={patientTableActive && patientSettings.age.enabled}
                    onToggle={(enabled) =>
                      patientTableActive && togglePatientSetting('age', enabled)
                    }
                    disabled={!patientTableActive}
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 text-xs">Gender</td>
                <td className="text-center p-3">
                  <ToggleKey
                    enabled={patientTableActive && patientSettings.gender.enabled}
                    onToggle={(enabled) =>
                      patientTableActive && togglePatientSetting('gender', enabled)
                    }
                    disabled={!patientTableActive}
                  />
                </td>
                <td className="p-3 text-xs">Address</td>
                <td className="text-center p-3">
                  <ToggleKey
                    enabled={patientTableActive && patientSettings.address.enabled}
                    onToggle={(enabled) =>
                      patientTableActive && togglePatientSetting('address', enabled)
                    }
                    disabled={!patientTableActive}
                  />
                </td>
                <td className="p-3 text-xs">Doctor Name</td>
                <td className="text-center p-3">
                  <ToggleKey
                    enabled={patientTableActive && patientSettings.doctorName.enabled}
                    onToggle={(enabled) =>
                      patientTableActive && togglePatientSetting('doctorName', enabled)
                    }
                    disabled={!patientTableActive}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Item Information Table */}
      <div className={`rounded-lg mb-10 ${!dlTableActive ? 'opacity-100' : ''}`}>
        <div className="flex justify-between items-center px-2">
          <div className="p-1 text-center bg-white w-52 rounded-t-md shadow-sm shadow-[#CCCCCC]/100">
            <span
              className={`font-inter text-xs font-bold text-[#1A1A1A]${
                !pharmacyTableActive ? 'text-[#999999]' : ''
              }`}
            >
              Item Information
            </span>
          </div>
          <div className="flex justify-between items-center ">
            <div className="p-1.5 text-center bg-white w-44 rounded-t-md shadow-sm shadow-[#CCCCCC]/100">
              <ToggleKey
                enabled={pharmacyTableActive}
                onToggle={(enabled) => setPharmacyTableActive(enabled)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-b-lg mx-2 shadow-sm shadow-[#CCCCCC]/100">
          <table
            className={`w-full border border-gray-300 ${
              !itemTableActive ? 'text-gray-400' : 'text-#999999'
            }`}
          >
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
                <td className="p-3 text-xs">Item Name</td>
                <td className="text-center p-3">
                  <ToggleKey
                    enabled={itemTableActive && itemSettings.itemName.enabled}
                    onToggle={(enabled) =>
                      itemTableActive && toggleItemSetting('itemName', enabled)
                    }
                    disabled={!itemTableActive}
                  />
                </td>
                <td className="p-3 text-xs">Quantity</td>
                <td className="text-center p-3">
                  <ToggleKey
                    enabled={itemTableActive && itemSettings.quantity.enabled}
                    onToggle={(enabled) =>
                      itemTableActive && toggleItemSetting('quantity', enabled)
                    }
                    disabled={!itemTableActive}
                  />
                </td>
                <td className="p-3 text-xs">HSN</td>
                <td className="text-center p-3">
                  <ToggleKey
                    enabled={itemTableActive && itemSettings.hsn.enabled}
                    onToggle={(enabled) => itemTableActive && toggleItemSetting('hsn', enabled)}
                    disabled={!itemTableActive}
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 text-xs">Batch</td>
                <td className="text-center p-3">
                  <ToggleKey
                    enabled={itemTableActive && itemSettings.batch.enabled}
                    onToggle={(enabled) => itemTableActive && toggleItemSetting('batch', enabled)}
                    disabled={!itemTableActive}
                  />
                </td>
                <td className="p-3 text-xs">Expiry</td>
                <td className="text-center p-3">
                  <ToggleKey
                    enabled={itemTableActive && itemSettings.expiry.enabled}
                    onToggle={(enabled) => itemTableActive && toggleItemSetting('expiry', enabled)}
                    disabled={!itemTableActive}
                  />
                </td>
                <td className="p-3 text-xs">MRP</td>
                <td className="text-center p-3">
                  <ToggleKey
                    enabled={itemTableActive && itemSettings.mrp.enabled}
                    onToggle={(enabled) => itemTableActive && toggleItemSetting('mrp', enabled)}
                    disabled={!itemTableActive}
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 text-xs">GST%</td>
                <td className="text-center p-3">
                  <ToggleKey
                    enabled={itemTableActive && itemSettings.gstPercent.enabled}
                    onToggle={(enabled) =>
                      itemTableActive && toggleItemSetting('gstPercent', enabled)
                    }
                    disabled={!itemTableActive}
                  />
                </td>
                <td className="p-3 text-xs">Discount</td>
                <td className="text-center p-3">
                  <ToggleKey
                    enabled={itemTableActive && itemSettings.discount.enabled}
                    onToggle={(enabled) =>
                      itemTableActive && toggleItemSetting('discount', enabled)
                    }
                    disabled={!itemTableActive}
                  />
                </td>
                <td className="p-3 text-xs">Total</td>
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
      <div className={`rounded-lg mb-10 ${!dlTableActive ? 'opacity-100' : ''}`}>
        <div className="flex justify-between items-center px-2">
          <div className="p-1 text-center bg-white w-52 rounded-t-md shadow-sm shadow-[#CCCCCC]/100">
            <span
              className={`font-inter text-xs font-bold text-[#1A1A1A]${
                !pharmacyTableActive ? 'text-[#999999]' : ''
              }`}
            >
              GST Information
            </span>
          </div>
          <div className="flex justify-between items-center ">
            <div className="p-1.5 text-center bg-white w-44 rounded-t-md shadow-sm shadow-[#CCCCCC]/100">
              <ToggleKey
                enabled={pharmacyTableActive}
                onToggle={(enabled) => setPharmacyTableActive(enabled)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-b-lg mx-2 shadow-sm shadow-[#CCCCCC]/100">
          <table
            className={`w-full border border-gray-300 ${
              !gstTableActive ? 'text-gray-400' : 'text-#999999'
            }`}
          >
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
                <td className="p-3 text-xs">GST%</td>
                <td className="text-center p-3" colSpan={2}>
                  <ToggleKey
                    enabled={gstTableActive && gstSettings.gst.enabled}
                    onToggle={(enabled) => gstTableActive && toggleGstMainSetting('gst', enabled)}
                    disabled={!gstTableActive}
                  />
                </td>
                <td className="p-3 text-xs">Tax Amount</td>
                <td className="text-center p-3" colSpan={2}>
                  <ToggleKey
                    enabled={gstTableActive && gstSettings.gst.taxAmount.enabled}
                    onToggle={(enabled) =>
                      gstTableActive && toggleGstSubSetting('gst', 'taxAmount', enabled)
                    }
                    disabled={!gstTableActive}
                  />
                </td>
                <td className="p-3 text-xs">CGST</td>
                <td className="text-center p-3" colSpan={2}>
                  <ToggleKey
                    enabled={gstTableActive && gstSettings.gst.cost.enabled}
                    onToggle={(enabled) =>
                      gstTableActive && toggleGstSubSetting('gst', 'cost', enabled)
                    }
                    disabled={!gstTableActive}
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 text-xs">SGST</td>
                <td className="text-center p-3" colSpan={2}>
                  <ToggleKey
                    enabled={gstTableActive && gstSettings.sgst.enabled}
                    onToggle={(enabled) => gstTableActive && toggleGstMainSetting('sgst', enabled)}
                    disabled={!gstTableActive}
                  />
                </td>
                <td className="p-3 text-xs">Total GST</td>
                <td className="text-center p-3" colSpan={2}>
                  <ToggleKey
                    enabled={gstTableActive && gstSettings.sgst.totalgst.enabled}
                    onToggle={(enabled) =>
                      gstTableActive && toggleGstSubSetting('sgst', 'totalgst', enabled)
                    }
                    disabled={!gstTableActive}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Information Table */}
      <div className={`rounded-lg mb-10 ${!dlTableActive ? 'opacity-100' : ''}`}>
        <div className="flex justify-between items-center px-2">
          <div className="p-1 text-center bg-white w-52 rounded-t-md shadow-sm shadow-[#CCCCCC]/100">
            <span
              className={`font-inter text-xs font-bold text-[#1A1A1A]${
                !pharmacyTableActive ? 'text-[#999999]' : ''
              }`}
            >
              Payment Information
            </span>
          </div>
          <div className="flex justify-between items-center ">
            <div className="p-1.5 text-center bg-white w-44 rounded-t-md shadow-sm shadow-[#CCCCCC]/100">
              <ToggleKey
                enabled={pharmacyTableActive}
                onToggle={(enabled) => setPharmacyTableActive(enabled)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-b-lg mx-2 shadow-sm shadow-[#CCCCCC]/100">
          <table
            className={`w-full border border-gray-300 ${
              !paymentTableActive ? 'text-gray-400' : 'text-#999999'
            }`}
          >
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
                <td className="p-3 text-xs">Amount Paid</td>
                <td className="text-center p-3">
                  <ToggleKey
                    enabled={paymentTableActive && paymentSettings.amountPaid.enabled}
                    onToggle={(enabled) =>
                      paymentTableActive && togglePaymentSetting('amountPaid', enabled)
                    }
                    disabled={!paymentTableActive}
                  />
                </td>
                <td className="p-3 text-xs">Payment Method</td>
                <td className="text-center p-3">
                  <ToggleKey
                    enabled={paymentTableActive && paymentSettings.paymentMethod.enabled}
                    onToggle={(enabled) =>
                      paymentTableActive && togglePaymentSetting('paymentMethod', enabled)
                    }
                    disabled={!paymentTableActive}
                  />
                </td>
                <td className="p-3 text-xs">Payment Status</td>
                <td className="text-center p-3">
                  <ToggleKey
                    enabled={paymentTableActive && paymentSettings.paymentStatus.enabled}
                    onToggle={(enabled) =>
                      paymentTableActive && togglePaymentSetting('paymentStatus', enabled)
                    }
                    disabled={!paymentTableActive}
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 text-xs">Total Discount</td>
                <td className="text-center p-3">
                  <ToggleKey
                    enabled={paymentTableActive && paymentSettings.totalDiscount.enabled}
                    onToggle={(enabled) =>
                      paymentTableActive && togglePaymentSetting('totalDiscount', enabled)
                    }
                    disabled={!paymentTableActive}
                  />
                </td>
                <td className="p-3 text-xs">Total Bill</td>
                <td className="text-center p-3">
                  <ToggleKey
                    enabled={paymentTableActive && paymentSettings.totalBill.enabled}
                    onToggle={(enabled) =>
                      paymentTableActive && togglePaymentSetting('totalBill', enabled)
                    }
                    disabled={!paymentTableActive}
                  />
                </td>
                <td className="p-3 text-xs">Outstanding Amount</td>
                <td className="text-center p-3">
                  <ToggleKey
                    enabled={paymentTableActive && paymentSettings.outstandingAmount.enabled}
                    onToggle={(enabled) =>
                      paymentTableActive && togglePaymentSetting('outstandingAmount', enabled)
                    }
                    disabled={!paymentTableActive}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Declaration Information Table */}
      <div className={`rounded-lg mb-10 ${!dlTableActive ? 'opacity-100' : ''}`}>
        <div className="flex justify-between items-center px-2">
          <div className="p-1 text-center bg-white w-52 rounded-t-md shadow-sm shadow-[#CCCCCC]/100">
            <span
              className={`font-inter text-xs font-bold text-[#1A1A1A]${
                !pharmacyTableActive ? 'text-[#999999]' : ''
              }`}
            >
              Declaration Information
            </span>
          </div>
          <div className="flex justify-between items-center ">
            <div className="p-1.5 text-center bg-white w-44 rounded-t-md shadow-sm shadow-[#CCCCCC]/100">
              <ToggleKey
                enabled={pharmacyTableActive}
                onToggle={(enabled) => setPharmacyTableActive(enabled)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-b-lg mx-2 shadow-sm shadow-[#CCCCCC]/100">
          <table
            className={`w-full border border-gray-300 ${
              !declarationTableActive ? 'text-gray-400' : 'text-#999999'
            }`}
          >
            <thead>
              <tr
                className={`border-b ${declarationTableActive ? 'bg-[#E6F3D8]' : 'bg-[#E6F3D8]'}`}
              >
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
                <td className="p-3 text-xs">Signature</td>
                <td className="p-3">
                  <ToggleKey
                    enabled={declarationTableActive && declarationSettings.signature.enabled}
                    onToggle={(enabled) =>
                      declarationTableActive && toggleDeclarationSetting('signature', enabled)
                    }
                    disabled={!declarationTableActive}
                  />
                </td>
                <td className="p-3 text-xs">Terms & Conditions</td>
                <td className="p-3">
                  <ToggleKey
                    enabled={declarationTableActive && declarationSettings.terms.enabled}
                    onToggle={(enabled) =>
                      declarationTableActive && toggleDeclarationSetting('terms', enabled)
                    }
                    disabled={!declarationTableActive}
                  />
                </td>
                <td className="p-3 text-xs">Remark</td>
                <td className="p-3">
                  <ToggleKey
                    enabled={declarationTableActive && declarationSettings.remark.enabled}
                    onToggle={(enabled) =>
                      declarationTableActive && toggleDeclarationSetting('remark', enabled)
                    }
                    disabled={!declarationTableActive}
                  />
                </td>
              </tr>

              <tr>
                <td></td>
                <td className="p-3">
                  <div
                    className={`flex items-center gap-4 ${
                      !declarationSettings.signature.enabled || !declarationTableActive
                        ? 'opacity-50'
                        : ''
                    }`}
                  >
                    <label className="cursor-pointer px-3 py-1 text-sm rounded-[6px] text-[10px] text-[#D11288] border-b border-[#FB009C] shadow-sm shadow-[#FB009C]/40 hover:shadow-[#FB009C] transition-all items-center">
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
                            <div className="text-gray-500">
                              {(signatureFile.size / 1024).toFixed(0)} KB
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-6 h-6 bg-gray-100 flex items-center justify-center rounded">
                            <span className="text-xs">
                              <div className="w-6 h-6 rounded-full bg-[#F7A6D8] flex items-center justify-center">
                                <span className="text-xs">
                                  <svg
                                    width="16"
                                    height="20"
                                    viewBox="0 0 16 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8.8335 1.66797H3.00016C2.55814 1.66797 2.13421 1.84356 1.82165 2.15612C1.50909 2.46868 1.3335 2.89261 1.3335 3.33464V16.668C1.3335 17.11 1.50909 17.5339 1.82165 17.8465C2.13421 18.159 2.55814 18.3346 3.00016 18.3346H13.0002C13.4422 18.3346 13.8661 18.159 14.1787 17.8465C14.4912 17.5339 14.6668 17.11 14.6668 16.668V7.5013M8.8335 1.66797L14.6668 7.5013M8.8335 1.66797V7.5013H14.6668"
                                      stroke="#D11288"
                                    />
                                  </svg>
                                </span>
                              </div>
                            </span>
                          </div>
                          <div>
                            <div className="text-xs">Sign.png</div>
                            <div className="text-gray-500 text-xs">200 KB</div>
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
                    className={`border border-[#999999] rounded px-2 py-1 w-full placeholder:text-xs placeholder:text-[#4D4D4D]${
                      !declarationSettings.terms.enabled ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder="Lorem Ipsum is simply dummy text"
                    disabled={!declarationSettings.terms.enabled || !declarationTableActive}
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    value={remarkText}
                    onChange={(e) => setRemarkText(e.target.value)}
                    className={`border border-[#999999] rounded px-2 py-1 w-full placeholder:text-xs placeholder:text-[#4D4D4D]${
                      !declarationSettings.remark.enabled ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder="Lorem Ipsum is simply dummy text"
                    disabled={!declarationSettings.remark.enabled || !declarationTableActive}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Bill and Save Buttons */}
      <div className="flex justify-end gap-4 mt-6 mr-6 text-sm">
        <button className="bg-white text-[#D11288] font-medium px-3 py-1 rounded-md shadow-md hover:bg-gray-50 transition-colors">
          Preview Bill
        </button>
        <button className="bg-[#D11288] text-white font-medium px-3 py-1 rounded-md border border-[#D11288] hover:bg-[#B80F75] transition-colors">
          Save
        </button>
      </div>
    </div>
  )
}

export default billTemplate
