import React from "react";

// Components
import { InvoiceLayout } from "@/app/components";

// Helpers
import { formatNumberWithCommas, isDataUrl } from "@/lib/helpers";

// Variables
import { DATE_OPTIONS } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

const InvoiceTemplate6 = (data: InvoiceType) => {
    const { sender, receiver, details } = data;

    return (
        <InvoiceLayout data={data}>
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
                <div>
                    {details.invoiceLogo && (
                        <img
                            src={details.invoiceLogo}
                            width={140}
                            height={100}
                            alt={`Logo of ${sender.name}`}
                            className="-mt-6"
                        />
                    )}
                    {/* <h1 className="text-lg font-semibold text-gray-800">{sender.name}</h1> */}
                    {/* <p className="text-sm text-gray-600">YOUR COMPANY TAGLINE HERE</p> */}
                    {/* <address className="not-italic text-gray-600">
                        {sender.address}
                        <br />
                        {sender.zipCode}, {sender.city}
                        <br />
                        {sender.country}
                        <br />
                        </address> */}
                </div>

                <div className="text-right">
                    <h2 className="text-5xl font-bold text-gray-800 mb-2">INVOICE</h2>
                </div>
            </div>

            {/* Bill To and Ship To */}
            <div className="bg-gray-600 text-white mb-6">
                <div className="grid grid-cols-2 gap-8 p-4">
                    <div>
                        <h1 className="text-lg font-semibold text-white">{sender.name}</h1>
                        {/* <p className="text-sm text-gray-600">YOUR COMPANY TAGLINE HERE</p> */}
                        <address className="not-italic text-white">
                            {sender.address}
                            <br />
                            {sender.zipCode}, {sender.city}
                            <br />
                            {sender.country}
                            <br />
                        </address>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Invoice to:</h3>
                        <div className="text-sm">
                            <p className="font-medium">{receiver.name}</p>
                            <address className="not-italic text-gray-300">
                                {receiver.address && receiver.address.length > 0 ? receiver.address : null}
                                {receiver.zipCode && receiver.zipCode.length > 0 ? `, ${receiver.zipCode}` : null}
                                <br />
                                {receiver.city}, {receiver.country}
                            </address>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blue Header Bar */}
            <div className="bg-blue-600 text-white p-3 mb-6">
                <div className="grid grid-cols-3 gap-4 text-sm font-medium flex justify-between">
                    <div>INVOICE # {details.invoiceNumber}</div>
                    <div>Invoice Date: {new Date(details.invoiceDate).toLocaleDateString("en-US", DATE_OPTIONS)}</div>
                    <div>Due Date : {new Date(details.dueDate).toLocaleDateString("en-US", DATE_OPTIONS)}</div>
                </div>
            </div>

            {/* Items Table */}
            <div className="mb-4">
                {/* Table Header */}
                <div className="bg-blue-600 text-white">
                    <div className="grid grid-cols-4 gap-4 p-3 font-semibold text-sm">
                        <div>QTY</div>
                        <div>PRODUCT DESCRIPTION</div>
                        <div className="text-center">PRICE</div>
                        <div className="text-right">TOTAL</div>
                    </div>
                </div>

                {/* Table Body */}
                <div className="bg-gray-100">
                    {details.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 p-3 border-b border-gray-300 text-sm">
                            <div className="font-medium text-gray-800">{item.quantity}</div>
                            <div>
                                <p className="font-medium text-gray-800">{item.name}</p>
                                {item.description && (
                                    <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                                )}
                            </div>
                            <div className="text-center text-gray-800">{item.unitPrice} {details.currency}</div>
                            <div className="text-right text-gray-800">{item.total} {details.currency}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between mb-2">
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

            {/* Main Content Section - Two Columns */}
            <div className="grid grid-cols-2 gap-8 mb-8">
                {/* Left Column - Thank You, Terms & Payment Info */}
                <div className="space-y-6">
                    {/* Thank You Message */}
                    <div>
                        <h3 className="text-gray-700 font-medium">{details.additionalNotes && (
                            <p>{details.additionalNotes}</p>
                        )}</h3>
                        {/* <p className="text-sm text-gray-600 mt-1">Payment is due max 7 days after invoice without deduction.</p> */}
                    </div>

                    {/* Terms & Conditions */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2">TERMS & CONDITIONS</h3>
                        <div className="text-sm text-gray-600">
                            <p>{details.paymentTerms || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}</p>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-blue-600 mb-2">Payment Info:</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p><span className="font-medium text-gray-800">Account #:</span> {details.paymentInformation?.accountNumber || "1234 5678 9012"}</p>
                            <p><span className="font-medium text-gray-800">A/C Name:</span> {details.paymentInformation?.accountName || sender.name}</p>
                            <p><span className="font-medium text-gray-800">Bank Details:</span> {details.paymentInformation?.bankName || "Add your details"}</p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Totals Section */}
                <div className="flex justify-end">
                    <div className="w-full">
                        <div className="space-y-2">
                            {/* {details.showTotalItems && (
                                <div className="flex justify-between py-1">
                                    <span className="font-medium text-gray-800">Total Items</span>
                                    <span className="text-gray-700">{details.items.reduce((sum, item) => sum + Number(item.quantity), 0)}</span>
                                </div>
                            )}
                            {details.showTotalItemTypes && (
                                <div className="flex justify-between py-1">
                                    <span className="font-medium text-gray-800">Total Item Types</span>
                                    <span className="text-gray-700">{details.items.length}</span>
                                </div>
                            )} */}
                            <div className="flex justify-between py-1">
                                <span className="font-medium text-gray-800">Subtotal</span>
                                <span className="text-gray-700">{formatNumberWithCommas(Number(details.subTotal))} {details.currency}</span>
                            </div>
                            {details.discountDetails?.amount != undefined && details.discountDetails?.amount > 0 && (
                                <div className="flex justify-between py-1">
                                    <span className="font-medium text-gray-800">Discount</span>
                                    <span className="text-gray-700">
                                        {details.discountDetails.amountType === "amount"
                                            ? `- ${details.discountDetails.amount} ${details.currency}`
                                            : `- ${details.discountDetails.amount}%`}
                                    </span>
                                </div>
                            )}
                            {details.taxDetails?.amount != undefined && details.taxDetails?.amount > 0 && (
                                <div className="flex justify-between py-1">
                                    <span className="font-medium text-gray-800">Tax Rate</span>
                                    <span className="text-gray-700">
                                        {details.taxDetails.amountType === "amount"
                                            ? `+ ${details.taxDetails.amount} ${details.currency}`
                                            : `+ ${details.taxDetails.amount}%`}
                                    </span>
                                </div>
                            )}
                            {details.shippingDetails?.cost != undefined && details.shippingDetails?.cost > 0 && (
                                <div className="flex justify-between py-1">
                                    <span className="font-medium text-gray-800">Shipping</span>
                                    <span className="text-gray-700">
                                        {details.shippingDetails.costType === "amount"
                                            ? `+ ${details.shippingDetails.cost} ${details.currency}`
                                            : `+ ${details.shippingDetails.cost}%`}
                                    </span>
                                </div>
                            )}

                            {/* Total Amount */}
                            <div className="font-bold text-lg">
                                {/* Amount Due Display */}
                                <div className="border-t border-gray-300 pt-6"></div>
                                <div className="flex justify-between">
                                    <div className="font-semibold text-gray-800 mb-2">TOTAL</div>
                                    <div className="text-2xl font-bold text-blue-600 mb-4">
                                        {formatNumberWithCommas(Number(details.totalAmount))} {details.currency}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Thank You Section */}
            <div className="border-t border-gray-300 pt-6">
                <div className="flex justify-between">
                    <div className="text-left">
                        <h2 className="text-3xl font-bold text-blue-600 flex items-center">THANK YOU!</h2>
                        <p className="text-sm text-gray-600">If you have any questions concerning this invoice, use the following contact information:</p>
                        <p className="text-sm text-gray-600">Email: {sender.email}</p>
                        <p className="text-sm text-gray-600">Phone: {sender.phone}</p>
                    </div>

                    {/* Signature Section - Only show if signature exists */}
                    {details?.signature?.data && (
                        <div className="text-center">
                            <p className="text-sm text-gray-600 mb-4">Signature</p>
                            {isDataUrl(details.signature.data) ? (
                                <img
                                    src={details.signature.data}
                                    width={120}
                                    height={60}
                                    alt={`Signature of ${sender.name}`}
                                    className="mx-auto mb-2"
                                />
                            ) : (
                                <p
                                    style={{
                                        fontSize: 24,
                                        fontWeight: 400,
                                        fontFamily: `${details.signature.fontFamily}, cursive`,
                                        color: "black",
                                        marginBottom: "8px"
                                    }}
                                >
                                    {details.signature.data}
                                </p>
                            )}
                            {/* Always show gray line below signature */}
                            <div className="border-b border-gray-300 w-48 mx-auto"></div>
                        </div>
                    )}
                </div>
            </div>
        </InvoiceLayout>
    );
};

export default InvoiceTemplate6;