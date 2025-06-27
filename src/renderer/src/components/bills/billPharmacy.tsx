import React from 'react'

interface InvoiceItem {
  item: string
  quantity: string
  hsn: string
  batch: string
  expiry: string
  mrp: string
  gst: string
  discount: string
  total: string
}

interface InvoiceData {
  date: string
  invoiceNo: string
  address: string
  cityState: string
  pin: string
  phone: string
  gstin: string
  dlNumber1: string
  dlNumber2: string
  fssai: string
  patientName: string
  mobile: string
  patientAddress: string
  doctorName: string
  items: InvoiceItem[]
  subTotal: string
  totalDiscount: string
  paymentMethod: string
  amount: string
}

const InvoicePrintContent = React.forwardRef<HTMLDivElement>((_, ref) => {
  const invoiceData: InvoiceData = {
    date: 'June 10, 2024',
    invoiceNo: 'AA4400230000052SA10062417',
    address: 'WADI, DHABHA CHOWK, Main Road',
    cityState: 'Nagpur Hingna (Maharashtra)',
    pin: '440023',
    phone: '1234567890',
    gstin: 'DF775555XY',
    dlNumber1: '20-MH-NGI-456222',
    dlNumber2: '21-MH-NGI-475522',
    fssai: 'BG5825TY499',
    patientName: 'Atharv Kurde',
    mobile: '7828295680',
    patientAddress: 'NA',
    doctorName: 'DR. KUMAR',
    items: [
      {
        item: 'CALPOL 1000MG TABLET',
        quantity: '1:0',
        hsn: '3004',
        batch: 'GGIII',
        expiry: '02/2025',
        mrp: '175',
        gst: '12',
        discount: '0',
        total: '175.00'
      }
    ],
    subTotal: '175.00',
    totalDiscount: '0.00',
    paymentMethod: 'cash',
    amount: '175'
  }

  return (
    <div ref={ref} className="border-2 border-black rounded-sm w-full max-w-4xl mx-auto mt-6">
      <div className=" text-xs font-sans">
        {/* Company Header */}
        <div className="mx-4">
          <div className=" grid grid-cols-3 gap-10">
            <div className="mt-1">
              <div className="flex justify-start items-start">
                <h1 className="text-bold text-2xl font-sans">Demo Pharmacy</h1>
              </div>
              <p className="text-left">{invoiceData.address}</p>
              <p className="text-left">{invoiceData.cityState}</p>
              <p className="text-left">{invoiceData.pin}</p>
              <p className="text-left">{invoiceData.phone}</p>
            </div>
            <div className="justify-center items-center mt-8 pl-16">
              <p>
                <span className="font-bold">DL NO 1:</span> {invoiceData.dlNumber1}
              </p>
              <p>
                <span className="font-bold">DL NO 2:</span> {invoiceData.dlNumber2}
              </p>
              <p>
                <span className="font-bold">FSSAI:</span> {invoiceData.fssai}
              </p>
              <p>
                <span className="font-bold">GSTIN:</span> {invoiceData.gstin}
              </p>
            </div>
            <div className="flex justify-center items-start mt-2">
              <img src="./main_logo.svg" alt="Company Logo" width={40} height={40} />
              <span className="font-semibold">DAWAI.AI</span>
            </div>
          </div>

          <div className="border-t border-gray-300"></div>
        </div>
        <div className="flex mt-4 mx-4 justify-between">
          {/* First Column */}
          <div className="w-1/3 justify-start">
            <p>
              <span className="font-bold">Patient name: {invoiceData.patientName}</span>
            </p>
            <p>
              <span className="font-normal">Mobile:</span> {invoiceData.mobile}
            </p>
            <p>
              <span className="font-normal">Shipping Address:</span> {invoiceData.patientAddress}
            </p>
            <p>
              <span className="font-normal">Dr name:</span> {invoiceData.doctorName}
            </p>
          </div>

          {/* Second Column */}
          <div className="w-1/3 flex items-center justify-center">
            <h1 className="text-2xl font-semibold">Sales Invoice</h1>
          </div>

          {/* Third Column */}
          <div className="w-1/3 justify-end pl-16">
            <p>Date: {invoiceData.date}</p>
            <p>Invoice no.: </p>
            <p>{invoiceData.invoiceNo}</p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mt-4 border-collapse border border-black h-48">
          <thead>
            <tr className="border-2 border-black">
              <th className="border-r-2 border-black p-3 text-center">Item</th>
              <th className="border-r-2 border-black p-3 text-center">HSN</th>
              <th className="border-r-2 border-black p-3 text-center">Quantity</th>
              <th className="border-r-2 border-black p-3 text-center">Batch</th>
              <th className="border-r-2 border-black p-3 text-center">Expiry</th>
              <th className="border-r-2 border-black p-3 text-center">MRP(₹)</th>
              <th className="border-r-2 border-black p-3 text-center">GST%</th>
              <th className="border-r-2 border-black p-3 text-center">Discount%</th>
              <th className="p-3 text-center">Total(₹)</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index} className="border-2 border-black">
                <td className="border-r-2 border-black p-[32px] text-center">{item.item}</td>
                <td className="border-r-2 border-black p-6 text-center">{item.quantity}</td>
                <td className="border-r-2 border-black p-6 text-center">{item.hsn}</td>
                <td className="border-r-2 border-black p-6 text-center">{item.batch}</td>
                <td className="border-r-2 border-black p-6 text-center">{item.expiry}</td>
                <td className="border-r-2 border-black p-6 text-center">{item.mrp}</td>
                <td className="border-r-2 border-black p-6 text-center">{item.gst}</td>
                <td className="border-r-2 border-black p-6 text-center">{item.discount}</td>
                <td className="p-6 text-center">{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bottom Section */}
        <div className=" grid grid-cols-3 gap-2">
          <div className="col-span-1 h-36">
            <table className="w-full border border-black h-[187px]">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="border-r-2 border-black p-1 text-left">GST%</th>
                  <th className="border-r-2 border-black p-1 text-left">TAXABLE AMT</th>
                  <th className="border-r-2 border-black p-1 text-left">CGST</th>
                  <th className="border-r-2 border-black p-1 text-left">SGST</th>
                  <th className="p-1 text-left border-r-2 border-black">TOTAL GST</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-2 border-black">
                  <td className="border-r-2 border-black p-1">0%</td>
                  <td className="border-r-2 border-black p-1">0.00</td>
                  <td className="border-r-2 border-black p-1">0.00</td>
                  <td className="border-r-2 border-black p-1">0.00</td>
                  <td className="p-1 border-r-2 border-black">0.00</td>
                </tr>
                <tr className="border-b-2 border-black">
                  <td className="border-r-2 border-black p-1">5%</td>
                  <td className="border-r-2 border-black p-1">0.00</td>
                  <td className="border-r-2 border-black p-1">0.00</td>
                  <td className="border-r-2 border-black p-1">0.00</td>
                  <td className="p-1 border-r-2 border-black">0.00</td>
                </tr>
                <tr className="border-b-2 border-black">
                  <td className="border-r-2 border-black p-1">12%</td>
                  <td className="border-r-2 border-black p-1">156.25</td>
                  <td className="border-r-2 border-black p-1">9.37</td>
                  <td className="border-r-2 border-black p-1">9.37</td>
                  <td className="p-1 border-r-2 border-black">18.75</td>
                </tr>
                <tr className="border-b-2 border-black">
                  <td className="border-r-2 border-black p-1">18%</td>
                  <td className="border-r-2 border-black p-1">0.00</td>
                  <td className="border-r-2 border-black p-1">0.00</td>
                  <td className="border-r-2 border-black p-1">0.00</td>
                  <td className="p-1 border-r-2 border-black">0.00</td>
                </tr>
                <tr className="border-b-2 border-black">
                  <td className="border-r-2 border-black p-1">TOTAL</td>
                  <td className="border-r-2 border-black p-1">156.25</td>
                  <td className="border-r-2 border-black p-1">9.37</td>
                  <td className="border-r-2 border-black p-1">9.37</td>
                  <td className="p-1 border-r-2 border-black">18.75</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-span-1 w-full">
            <p className="text-left font-medium">&quot;GET WELL SOON BY DAWAI.AI&quot;</p>
            <div className="h-[1px] bg-black mt-3" /> {/* Full-width attached line */}
            <div className="mt-3 text-left">
              <p className="text-xs">Terms & Conditions</p>
              <p className="text-xs">Confirm Medicines from your Doctor before use</p>
            </div>
            <div className="mt-20 flex justify-end items-end bottom-1">
              <div className="w-50 border-t border-black">
                <p className="my-2 text-xs text-right font-extrabold">Authorized Signature</p>
              </div>
            </div>
          </div>

          <div className="border-l border-black">
            <div className="col-span-1">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-1 font-bold">Sub Total (₹):</td>
                    <td className="py-1 text-right">{invoiceData.subTotal}</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-bold">Add Discount (₹):</td>
                    <td className="py-1 text-right">{invoiceData.totalDiscount}</td>
                  </tr>
                  <tr>
                    <td className="py-1 pb-16 font-bold">Payment:</td>
                    <td className="py-1 pb-16 text-right">{invoiceData.paymentMethod}</td>
                  </tr>
                  <tr className=" border-t border-black">
                    <td className="pb-3 pt-1 text-lg font-bold">Amount(₹):</td>
                    <td className="pb-3 pt-1 text-right text-lg font-bold">{invoiceData.amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

InvoicePrintContent.displayName = 'InvoicePrintContent'

export default InvoicePrintContent
