import React from "react";

// Components
import { InvoiceLayout } from "@/app/components";

// Helpers
import { formatNumberWithCommas, isDataUrl } from "@/lib/helpers";

// Variables
import { DATE_OPTIONS } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

const InvoiceTemplate4 = (data: InvoiceType) => {
    const { sender, receiver, details } = data;

    return (
        <InvoiceLayout data={data}>
            {/* Header with Colorful Circles */}
            <div className="relative mb-8">
                {/* Colorful circles background */}
                <div className="absolute top-0 right-0 flex">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full"></div>
                    <div className="w-16 h-16 bg-red-500 rounded-full -ml-4"></div>
                    <div className="w-16 h-16 bg-pink-500 rounded-full -ml-4"></div>
                    <div className="w-16 h-16 bg-blue-500 rounded-full -ml-4"></div>
                    <div className="w-16 h-16 bg-green-500 rounded-full -ml-4"></div>
                </div>
                
                {/* Brand and Invoice Header */}
                <div className="flex justify-between items-start relative z-10">
                    <div>
                        {details.invoiceLogo && (
                            <img
                                src={details.invoiceLogo}
                                width={140}
                                height={100}
                                alt={`Logo of ${sender.name}`}
                                className="mb-2"
                            />
                        )}
                        <h1 className="text-lg font-semibold text-gray-800">{sender.name}</h1>
                        {/* <p className="text-sm text-gray-600">TAGLINE SPACE HERE</p> */}
                        <address className="not-italic text-gray-600 text-sm">
                        {sender.address}
                        <br />
                        {sender.zipCode}, {sender.city}
                        <br />
                        {sender.country}
                        <br />
                        </address>
                    </div>
                    
                    <div className="text-right  px-4 py-3 rounded">
                        <h2 className="text-4xl font-medium text-white tracking-wider">INVOICE</h2>
                        <div className="mt-2">
                            <p className="text-gray-600"><span className="font-semibold">Invoice#</span> {details.invoiceNumber}</p>
                            <p className="text-gray-600"><span className="font-semibold">Invoice Date</span> {new Date(details.invoiceDate).toLocaleDateString("en-US", DATE_OPTIONS)}</p>
                            <p className="text-gray-600"><span className="font-semibold">Due Date</span> {new Date(details.dueDate).toLocaleDateString("en-US",DATE_OPTIONS)}</p>
                        </div>
                        {/* Invoice To Section */}
                    <div className="mb-4 pt-2">
                        <h3 className="text-lg font-semibold text-gray-800">Invoice to:</h3>
                        <div>
                            <p className="font-semibold text-gray-800">{receiver.name}</p>
                            <address className="mt-1 not-italic text-gray-600 text-sm">
                                {receiver.address && receiver.address.length > 0 ? receiver.address : null}
                                {receiver.zipCode && receiver.zipCode.length > 0 ? `, ${receiver.zipCode}` : null}
                                <br />
                                {receiver.city}, {receiver.country}
                            </address>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            

            {/* Items Table */}
            <div className="mb-4">
                {/* Table Header with Yellow and Dark Colors */}
                <div className="grid grid-cols-5 gap-0">
                    {/* <div className="bg-yellow-400 text-gray-800 p-3 font-semibold text-sm">SL.</div> */}
                    <div className="bg-yellow-400 text-gray-800 p-3 font-semibold text-sm col-span-2">Item Description</div>
                    <div className="bg-gray-800 text-white p-3 font-semibold text-sm text-center">Price</div>
                    <div className="bg-gray-800 text-white p-3 font-semibold text-sm text-center">Qty.</div>
                    <div className="bg-gray-800 text-white p-3 font-semibold text-sm text-right">Total</div>
                </div>
                
                {/* Table Body */}
                <div className="border border-gray-300">
                    {details.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-5 gap-0 border-b border-gray-300 last:border-b-0">
                            {/* <div className="p-3 text-center font-medium text-gray-800 bg-gray-50">{index + 1}</div> */}
                            <div className="p-3 col-span-2 bg-white">
                                <p className="font-medium text-gray-800">{item.name}</p>
                                {item.description && (
                                    <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                                )}
                            </div>
                            <div className="p-3 text-center text-gray-800 bg-gray-50">{item.unitPrice} {details.currency}</div>
                            <div className="p-3 text-center text-gray-800 bg-white">{item.quantity}</div>
                            <div className="p-3 text-right text-gray-800 bg-gray-50">{item.total} {details.currency}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Thank you message */}
            {/* <div className="mb-6">
                <p className="text-gray-700 font-medium">Thank you for your business</p>
            </div> */}
            <div className="mb-2">
            {details.showTotalItems && (
            <div>
                <span className="font-semibold text-gray-800 text-xs">Total Items: </span>
                <span className="text-gray-600 text-xs">{details.items.reduce((sum, item) => sum + Number(item.quantity), 0)}</span>
            </div>
            )}
            {details.showTotalItemTypes && (
            <div>
                <span className="font-semibold text-gray-800 text-xs">Total Item Types: </span>
                <span className="text-gray-600 text-xs">{details.items.length}</span>
            </div>
            )}
            </div>

            {/* Bottom Section with Payment Info and Totals */}
            <div className="grid grid-cols-2 gap-8 mb-8">
                {/* Payment Info */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Info:</h3>
                    {/* <p className="mb-3"><span className="text-xs text-gray-800 font-medium">Please send the payment to this address</span></p> */}
                    <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-medium text-gray-800">Account #:</span> {details.paymentInformation?.accountNumber || "1234 5678 9012"}</p>
                        <p><span className="font-medium text-gray-800">A/C Name:</span> {details.paymentInformation?.accountName || sender.name}</p>
                        <p><span className="font-medium text-gray-800">Bank Details:</span> {details.paymentInformation?.bankName || "Add your bank details"}</p>
                    </div>
                </div>

                {/* Totals */}
                <div>
                    <div className="space-y-2 text-right">
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-800">Sub Total:</span>
                            <span className="text-gray-600">{formatNumberWithCommas(Number(details.subTotal))} {details.currency}</span>
                        </div>
                        {details.discountDetails?.amount != undefined && details.discountDetails?.amount > 0 && (
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-800">Discount:</span>
                                <span className="text-gray-600">
                                    {details.discountDetails.amountType === "amount"
                                        ? `- ${details.discountDetails.amount} ${details.currency}`
                                        : `- ${details.discountDetails.amount}%`}
                                </span>
                            </div>
                        )}
                        {details.taxDetails?.amount != undefined && details.taxDetails?.amount > 0 && (
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-800">Tax:</span>
                                <span className="text-gray-600">
                                    {details.taxDetails.amountType === "amount"
                                        ? `+ ${details.taxDetails.amount} ${details.currency}`
                                        : `+ ${details.taxDetails.amount}%`}
                                </span>
                            </div>
                        )}
                        {details.shippingDetails?.cost != undefined && details.shippingDetails?.cost > 0 && (
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-800">Shipping:</span>
                                <span className="text-gray-600">
                                    {details.shippingDetails.costType === "amount"
                                        ? `+ ${details.shippingDetails.cost} ${details.currency}`
                                        : `+ ${details.shippingDetails.cost}%`}
                                </span>
                            </div>
                        )}
                        <div className="flex justify-between border-t border-gray-300 pt-2 mt-2">
                            <span className="text-lg font-bold text-gray-800">Total:</span>
                            <span className="text-lg font-bold text-gray-800">{formatNumberWithCommas(Number(details.totalAmount))} {details.currency}</span>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* Terms & Conditions */}
            <div className="mb-6">
<h3 className="text-lg font-semibold text-gray-800 mb-2 inline-block mr-2">Terms & Conditions :</h3>
                <p className="text-sm text-gray-600 inline-block">
                    {details.paymentTerms || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dignissim pretium consectetur."}
                </p>

                {details.additionalNotes && (
                    <p className="text-gray-700 font-medium mt-2">{details.additionalNotes}</p>
                )}
            </div>

            {/* Contact Info and Signature */}
            <div className="flex justify-between items-end">
                <div className="text-sm text-gray-600">
                    <p>If you have any questions concerning this invoice, use the following contact information:</p>
                    <p className="font-medium text-gray-800 mt-1">{sender.email}</p>
                    <p className="font-medium text-gray-800">{sender.phone}</p>
                </div>

                {details?.signature?.data && (
                    <div className="text-center">
                        {isDataUrl(details.signature.data) ? (
                            <img
                                src={details.signature.data}
                                width={120}
                                height={60}
                                alt={`Signature of ${sender.name}`}
                                className="mx-auto mt-1"
                            />
                        ) : (
                            <p
                                style={{
                                    fontSize: 24,
                                    fontWeight: 400,
                                    fontFamily: `${details.signature.fontFamily}, cursive`,
                                    color: "black",
                                    marginTop: "8px"
                                }}
                            >
                                {details.signature.data}
                            </p>
                        )}
                        <div className="border-b border-gray-300 w-32 mb-1"></div>
                        <p className="text-xs text-gray-600">Authorised Sign</p>
                    </div>
                )}
            </div>

            {/* Bottom Colorful Border */}
            <div className="flex mt-8 -mb-4 -mx-4">
                <div className="flex-1 h-4 bg-yellow-400"></div>
                <div className="flex-1 h-4 bg-red-500"></div>
                <div className="flex-1 h-4 bg-pink-500"></div>
                <div className="flex-1 h-4 bg-blue-500"></div>
                <div className="flex-1 h-4 bg-green-500"></div>
            </div>
        </InvoiceLayout>
    );
};

export default InvoiceTemplate4;