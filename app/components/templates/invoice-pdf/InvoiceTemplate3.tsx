import React from "react";

// Components
import { InvoiceLayout } from "@/app/components";

// Helpers
import { formatNumberWithCommas, isDataUrl } from "@/lib/helpers";

// Variables
import { DATE_OPTIONS } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

const InvoiceTemplate3 = (data: InvoiceType) => {
    const { sender, receiver, details } = data;

    return (
        <InvoiceLayout data={data}>
            <div className="flex min-h-[60rem]">
                {/* Red Sidebar */}
                <div className="w-1/3 bg-red-500 text-white p-6 flex flex-col">
                    {/* Brand Section */}
                    <div className="mb-8">
                        {details.invoiceLogo && (
                            <img
                                src={details.invoiceLogo}
                                width={120}
                                height={80}
                                alt={`Logo of ${sender.name}`}
                                className="mb-4 filter brightness-0 invert"
                            />
                        )}
                        <h1 className="text-xl font-bold text-white">{sender.name}</h1>
                        {/* <p className="text-sm text-red-100 mt-1">TAGLINE SPACE HERE</p> */}
                        <address className="not-italic text-white">
                        {sender.address}
                        <br />
                        {sender.zipCode}, {sender.city}
                        <br />
                        {sender.country}
                        <br />
                        </address>
                    </div>

                    {/* Invoice To Section */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-white mb-3">Invoice to:</h3>
                        <div className="text-white">
                            <p className="font-semibold">{receiver.name}</p>
                            <p className="text-sm text-red-100 mt-1">
                                {receiver.address && receiver.address.length > 0 ? receiver.address : null}
                                {receiver.zipCode && receiver.zipCode.length > 0 ? `, ${receiver.zipCode}` : null}
                            </p>
                            <p className="text-sm text-red-100">
                                {receiver.city}, {receiver.country}
                            </p>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-white mb-3">Payment Account Details:</h3>
                        <div className="text-sm text-red-100 space-y-1">
                            {/* <p className="mb-4"><span className="text-white font-medium">Please send the payment to this address</span></p> */}
                            <p><span className="text-white font-medium">Account #:</span> {details.paymentInformation?.accountNumber || "1234 5678 9012"}</p>
                            <p><span className="text-white font-medium">A/C Name:</span> {details.paymentInformation?.accountName || sender.name}</p>
                            <p><span className="text-white font-medium">Bank Details:</span> {details.paymentInformation?.bankName || "Add your details"}</p>
                        </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="mt-auto">
                        <h3 className="text-lg font-bold text-white mb-3">Terms & Conditions</h3>
                        <div className="text-sm text-red-100">
                            <p>{details.paymentTerms || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dignissim pretium consectetur."}</p>
                        </div>
                    </div>

                    {/* Thank you message */}
                    <div className="mt-8 bg-gray-800 text-white text-center py-3 -mx-6">
                        <p className="font-medium">Thank you for your business</p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-6 bg-white">
                    {/* Header */}
                    <div className="text-right mb-8">
                        <h2 className="text-4xl font-light text-gray-700 tracking-wider">INVOICE</h2>
                        <div className="mt-4 text-right">
                            <p className="text-gray-600"><span className="font-semibold">Invoice#</span> {details.invoiceNumber}</p>
                            <p className="text-gray-600"><span className="font-semibold">Invoice Date :</span> {new Date(details.invoiceDate).toLocaleDateString("en-US", DATE_OPTIONS)}</p>
                            <p className="text-gray-600"><span className="font-semibold">Due Date :</span> {new Date(details.dueDate).toLocaleDateString("en-US",DATE_OPTIONS)}</p>
                        </div>
                    </div>

                    {/* Items Table with Dark Header */}
                    <div className="mb-6">
                        <div className="bg-gray-800 text-white">
                            <div className="grid grid-cols-5 gap-4 p-3 text-sm font-medium">
                                {/* <div className="col-span-1">SL.</div> */}
                                <div className="col-span-2">Items</div>
                                <div className="text-center">Price</div>
                                <div className="text-center">Qty.</div>
                                <div className="text-right">Total</div>
                            </div>
                        </div>
                        
                        <div className="bg-gray-100">
                            {details.items.map((item, index) => (
                                <div key={index} className="grid grid-cols-5 gap-4 p-3 border-b border-gray-300 text-sm">
                                    {/* <div className="col-span-1 font-medium text-gray-800">{index + 1}</div> */}
                                    <div className="col-span-2">
                                        <p className="font-medium text-gray-800">{item.name}</p>
                                        {item.description && (
                                            <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                                        )}
                                    </div>
                                    <div className="text-center text-gray-800">{item.unitPrice} {details.currency}</div>
                                    <div className="text-center text-gray-800">{item.quantity}</div>
                                    <div className="text-right text-gray-800">{item.total} {details.currency}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Totals Section */}
                    <div className="flex justify-end mb-8">
                        <div className="w-1/2">
                            <div className="space-y-2 text-right">
                            {details.showTotalItems && (
                                <div className="flex justify-between">
                                    <span className="font-semibold text-gray-800">Total Items:</span>
                                    <span className="text-gray-600">{details.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                                </div>
                            )}
                            {details.showTotalItemTypes && (
                                <div className="flex justify-between">
                                    <span className="font-semibold text-gray-800">Total Types:</span>
                                    <span className="text-gray-600">{details.items.length}</span>
                                </div>
                            )}
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
                                <div className="bg-red-500 text-white p-3 flex justify-between font-bold text-lg">
                                    <span>Total:</span>
                                    <span>{formatNumberWithCommas(Number(details.totalAmount))} {details.currency}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Notes */}
                    {details.additionalNotes && (
                        <div className="mb-6">
                            <p className="text-gray-600 text-sm">{details.additionalNotes}</p>
                        </div>
                    )}

                    {/* Contact Info */}
                    <div className="text-sm text-gray-600 mb-6">
                        <p>If you have any questions concerning this invoice, use the following contact information:</p>
                        <p className="font-medium text-gray-800 mt-1">{sender.email}</p>
                        <p className="font-medium text-gray-800">{sender.phone}</p>
                    </div>

                    {/* Signature */}
                    {details?.signature?.data && (
                        <div className="flex justify-end">
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
                        </div>
                    )}
                </div>
            </div>
        </InvoiceLayout>
    );
};

export default InvoiceTemplate3;