import React from "react";

// Components
import { InvoiceLayout } from "@/app/components";

// Helpers
import { formatNumberWithCommas, isDataUrl } from "@/lib/helpers";

// Variables
import { DATE_OPTIONS } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

const InvoiceTemplate7 = (data: InvoiceType) => {
    const { sender, receiver, details } = data;

    return (
        <InvoiceLayout data={data}>
            {/* Header with Logo */}
            <div className="text-center mb-4">
                {details.invoiceLogo && (
                    <img
                        src={details.invoiceLogo}
                        width={140}
                        height={100}
                        alt={`Logo of ${sender.name}`}
                        className="mx-auto mb-4 opacity-60"
                    />
                )}
                {/* <h1 className="text-2xl font-light text-gray-600 tracking-widest">ARROWMARK</h1> */}
                <div className="w-full h-px bg-gray-300 mt-4"></div>
            </div>

            {/* Invoice Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-4xl font-light text-blue-600 mb-2">INVOICE</h2>
                </div>
                <div className="text-left text-sm text-gray-600">
                    <h1 className="text-lg font-semibold">{sender.name}</h1>
                    {/* <p className="text-sm text-gray-600">YOUR COMPANY TAGLINE HERE</p> */}
                    <address className="not-italic">
                        {sender.address}
                        <br />
                        {sender.zipCode}, {sender.city}
                        <br />
                        {sender.country}
                        <br />
                    </address>
                </div>
                <div className="text-sm text-gray-600 text-right">
                    <p><h1 className="text-lg font-semibold">Prepared for :</h1></p>
                    <p className="font-medium">{receiver.name}</p>
                    <address className="not-italic text-gray-300">
                        {receiver.address && receiver.address.length > 0 ? receiver.address : null}
                        {receiver.zipCode && receiver.zipCode.length > 0 ? `, ${receiver.zipCode}` : null}
                        <br />
                        {receiver.city}, {receiver.country}
                    </address>
                </div>
            </div>
            <div className="w-full h-px bg-gray-300 mb-2"></div>

            {/* Invoice Details */}
            <div className=" mb-2 text-sm flex justify-between">
                <div>
                    <p className="font-medium text-gray-800">Invoice #</p>
                    <p className="text-gray-600">{details.invoiceNumber}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-800">Date</p>
                    <p className="text-gray-600">{new Date(details.invoiceDate).toLocaleDateString("en-US", DATE_OPTIONS)}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-800">Payment Due</p>
                    <p className="text-gray-600">{new Date(details.dueDate).toLocaleDateString("en-US", DATE_OPTIONS)}</p>
                </div>
            </div>
            <div className="w-full h-px bg-gray-300 mb-2"></div>

            {/* Items Table */}
            <div className="mb-4">
                {/* Table Header */}
                <div className="border-b border-gray-300 pb-2 mb-4">
                    <div className="grid grid-cols-4 gap-4 p-3 text-sm font-medium text-gray-800">
                        <div className="text-left">Description</div>
                        <div className="text-center">Quantity</div>
                        <div className="text-center">Price</div>
                        <div className="text-right">Total</div>
                    </div>
                </div>

                {/* Table Body */}
                <div className="space-y-3">
                    {details.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 text-sm">
                            <div className="text-left">
                                <p className="font-medium text-gray-800">{item.name}</p>
                                {item.description && (
                                    <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                                )}
                            </div>
                            <div className="text-center text-gray-700">{item.quantity}</div>
                            <div className="text-center text-gray-700">{item.unitPrice} {details.currency}</div>
                            <div className="text-right text-gray-700">{item.total} {details.currency}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full h-px bg-gray-300 mb-2"></div>

            {/* Main Content Section - Two Columns */}
            <div className="grid grid-cols-2 gap-8 mb-8">
                {/* Left Column - Thank You, Terms & Payment Info */}
                <div className="space-y-6">
                    {/* Thank You Message */}
                    <div>
                        <h2 className="text-3xl font-light text-blue-600 mb-2">THANK YOU!</h2>
                        {/* <p className="text-sm text-gray-600">Payment is due within 30 days of invoice date.</p> */}
                        {details.additionalNotes && (
                            <p className="text-sm text-gray-600 mt-2">{details.additionalNotes}</p>
                        )}
                    </div>

                    {/* Terms & Conditions */}
                    <div>
                        <h3 className="font-medium text-gray-800 mb-3 tracking-wide">TERMS & CONDITIONS</h3>
                        <div className="text-sm text-gray-600 leading-relaxed">
                            <p>{details.paymentTerms || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}</p>
                            {/* <p className="mt-3">Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p> */}
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div>
                        <h3 className="font-medium text-gray-800 mb-2 tracking-wide">PAYMENT INFO</h3>
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
                        <div className="space-y-2 text-sm">
                            {/* {details.showTotalItems && (
                                <div className="flex justify-between py-1">
                                    <span className="text-gray-600">Total Items</span>
                                    <span className="text-gray-800">{details.items.reduce((sum, item) => sum + Number(item.quantity), 0)}</span>
                                </div>
                            )}
                            {details.showTotalItemTypes && (
                                <div className="flex justify-between py-1">
                                    <span className="text-gray-600">Total Item Types</span>
                                    <span className="text-gray-800">{details.items.length}</span>
                                </div>
                            )} */}
                            <div className="flex justify-between py-1">
                                <span className="text-gray-600">Sub Total</span>
                                <span className="text-gray-800">{formatNumberWithCommas(Number(details.subTotal))} {details.currency}</span>
                            </div>
                            {details.discountDetails?.amount != undefined && details.discountDetails?.amount > 0 && (
                                <div className="flex justify-between py-1">
                                    <span className="text-gray-600">Discount</span>
                                    <span className="text-gray-800">
                                        {details.discountDetails.amountType === "amount"
                                            ? `- ${details.discountDetails.amount} ${details.currency}`
                                            : `- ${details.discountDetails.amount}%`}
                                    </span>
                                </div>
                            )}
                            {details.taxDetails?.amount != undefined && details.taxDetails?.amount > 0 && (
                                <div className="flex justify-between py-1">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="text-gray-800">
                                        {details.taxDetails.amountType === "amount"
                                            ? `+ ${details.taxDetails.amount} ${details.currency}`
                                            : `+ ${details.taxDetails.amount}%`}
                                    </span>
                                </div>
                            )}
                            {details.shippingDetails?.cost != undefined && details.shippingDetails?.cost > 0 && (
                                <div className="flex justify-between py-1">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="text-gray-800">
                                        {details.shippingDetails.costType === "amount"
                                            ? `+ ${details.shippingDetails.cost} ${details.currency}`
                                            : `+ ${details.shippingDetails.cost}%`}
                                    </span>
                                </div>
                            )}

                            {/* Total Amount */}
                            <div className="border-t border-gray-300 pt-2 mt-4">
                                <div className="flex justify-between">
                                    <div className="text-2xl font-medium text-gray-800">TOTAL</div>
                                    <div className="text-4xl font-light text-blue-600 text-left">
                                        {formatNumberWithCommas(Number(details.totalAmount))} {details.currency}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
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
                            {/* Amount Due Display */}
                            {/* <div className="text-right mt-6">
                                <h3 className="font-medium text-gray-800 mb-2 tracking-wide">AMOUNT DUE</h3>
                                <div className="text-5xl font-light text-blue-600">
                                    {formatNumberWithCommas(Number(details.totalAmount))} {details.currency}
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Contact Section */}
            <div className="border-t border-gray-300 pt-6">
                <div className="text-center">
                    <div className="text-sm text-gray-600">
                        <h4 className="font-medium text-gray-800 mb-2">Contact Details</h4>
                        <p>Tel : {sender.phone} | Email : {sender.email} </p>
                    </div>
                </div>
            </div>

            {/* Signature Section - Only show if signature exists */}
            {details?.signature?.data && (
                <div className="mt-8 text-center">
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
                    <div className="w-48 h-px bg-gray-300 mx-auto"></div>
                </div>
            )}
        </InvoiceLayout>
    );
};

export default InvoiceTemplate7;