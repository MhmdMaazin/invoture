import React from "react";

// Components
import { InvoiceLayout } from "@/app/components";

// Helpers
import { formatNumberWithCommas, isDataUrl } from "@/lib/helpers";

// Variables
import { DATE_OPTIONS } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

const InvoiceTemplate5 = (data: InvoiceType) => {
    const { sender, receiver, details } = data;

    return (
        <InvoiceLayout data={data}>
            {/* Geometric Header */}
            <div className="relative mb-8">
                {/* Curved geometric shape */}
                <svg
                    className="absolute top-0 left-0 w-full"
                    width="100%"
                    height="60"
                    viewBox="0 0 1000 60"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="100%" stopColor="#374151" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,0 L1000,0 L1000,40 Q800,60 600,45 Q400,30 200,50 Q100,60 0,45 Z"
                        fill="url(#headerGradient)"
                    />
                    <circle cx="900" cy="15" r="8" fill="#ffffff" opacity="0.3" />
                    <circle cx="940" cy="25" r="5" fill="#ffffff" opacity="0.5" />
                    <polygon points="30,10 40,30 20,30" fill="#ffffff" opacity="0.4" />
                </svg>

                <div className="relative z-10 pt-8">
                    <div className="flex justify-between items-start">
                        <div className="text-white clip-path-diagonal">
                            {details.invoiceLogo && (
                                <img
                                    src={details.invoiceLogo}
                                    width={120}
                                    height={80}
                                    alt={`Logo of ${sender.name}`}
                                // className="mb-2 filter brightness-0 invert"
                                />
                            )}
                            <h1 className="text-xl font-bold text-gray-700">{sender.name}</h1>
                            {/* <p className="text-sm text-red-100">TAGLINE SPACE HERE</p> */}
                            <address className="not-italic text-gray-700">
                            {sender.address} || {sender.zipCode} || {sender.city} || {sender.country}
                            </address>
                        </div>

                        <div className="text-right">
                            <h2 className="text-4xl font-bold text-red-400">INVOICE</h2>
                            <div className="mt-2">
                                <p className="text-gray-700"><span className="font-semibold">Invoice#</span> {details.invoiceNumber}</p>
                                <p className="text-gray-700"><span className="font-semibold">Invoice Date</span> {new Date(details.invoiceDate).toLocaleDateString("en-US", DATE_OPTIONS)}</p>
                                <p className="text-gray-700"><span className="font-semibold">Due Date</span> {new Date(details.dueDate).toLocaleDateString("en-US",DATE_OPTIONS)}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Items Table Header */}
            <div className="mb-6">
                <div className="bg-red-500 text-white">
                    <div className="grid grid-cols-5 gap-4 p-3 font-semibold">
                        {/* <div>SL.</div> */}
                        <div className="col-span-2">Item Description</div>
                        <div className="text-center">Price</div>
                        <div className="text-center">Qty.</div>
                        <div className="text-right">Total</div>
                    </div>
                </div>

                {/* Items */}
                {details.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 p-3 border-b border-gray-300 hover:bg-gray-50">
                        {/* <div className="font-medium text-gray-800">{index + 1}</div> */}
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

            {/* Bottom Section */}
            <div className="grid grid-cols-2 gap-8 mb-8">
                {/* Left Side - Invoice To and Payment Info */}
                <div>
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-red-500 mb-2">Invoice to:</h3>
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

                    <div>
                        <h3 className="text-lg font-semibold text-red-500 mb-2">Payment Info:</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p><span className="font-medium text-gray-800">Account #:</span> {details.paymentInformation?.accountNumber || "1234 5678 9012"}</p>
                            <p><span className="font-medium text-gray-800">A/C Name:</span> {details.paymentInformation?.accountName || sender.name}</p>
                            <p><span className="font-medium text-gray-800">Bank Details:</span> {details.paymentInformation?.bankName || "Add your details"}</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Totals */}
                <div>
                    <div className="space-y-3">
                        {/* {details.showTotalItems && (
                            <div className="flex justify-between py-2">
                                <span className="font-semibold text-gray-800">Total Items:</span>
                                <span className="text-gray-700">{details.items.reduce((sum, item) => sum + Number(item.quantity), 0)}</span>
                            </div>
                        )}
                        {details.showTotalItemTypes && (
                            <div className="flex justify-between py-2">
                                <span className="font-semibold text-gray-800">Total Item Types:</span>
                                <span className="text-gray-700">{details.items.length}</span>
                            </div>
                        )} */}
                        <div className="flex justify-between py-2">
                            <span className="font-semibold text-gray-800">Sub Total:</span>
                            <span className="text-gray-700">{formatNumberWithCommas(Number(details.subTotal))} {details.currency}</span>
                        </div>
                        {details.discountDetails?.amount != undefined && details.discountDetails?.amount > 0 && (
                            <div className="flex justify-between py-2">
                                <span className="font-semibold text-gray-800">Discount:</span>
                                <span className="text-gray-700">
                                    {details.discountDetails.amountType === "amount"
                                        ? `- ${details.discountDetails.amount} ${details.currency}`
                                        : `- ${details.discountDetails.amount}%`}
                                </span>
                            </div>
                        )}
                        {details.taxDetails?.amount != undefined && details.taxDetails?.amount > 0 && (
                            <div className="flex justify-between py-2">
                                <span className="font-semibold text-gray-800">Tax:</span>
                                <span className="text-gray-700">
                                    {details.taxDetails.amountType === "amount"
                                        ? `+ ${details.taxDetails.amount} ${details.currency}`
                                        : `+ ${details.taxDetails.amount}%`}
                                </span>
                            </div>
                        )}
                        {details.shippingDetails?.cost != undefined && details.shippingDetails?.cost > 0 && (
                            <div className="flex justify-between py-2">
                                <span className="font-semibold text-gray-800">Shipping:</span>
                                <span className="text-gray-700">
                                    {details.shippingDetails.costType === "amount"
                                        ? `+ ${details.shippingDetails.cost} ${details.currency}`
                                        : `+ ${details.shippingDetails.cost}%`}
                                </span>
                            </div>
                        )}
                        <div className="border-t-2 border-gray-300 pt-2">
                            <div className="flex justify-between py-2 text-lg font-bold">
                                <span className="text-gray-800">Total:</span>
                                <span className="text-gray-800">{formatNumberWithCommas(Number(details.totalAmount))} {details.currency}</span>
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
                    </div>
                </div>
            </div>

            {/* Terms & Conditions */}
            <div className="mb-6">
<div className="bg-gray-800 text-white p-3 mb-3 flex items-center justify-between">
                    <h3 className="font-semibold">Terms & Conditions</h3>
                    <p className="text-sm text-gray-300 ml-4">
                    {details.paymentTerms || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                </p>
                </div>
                {details.additionalNotes && (
                    <p className="text-gray-700 font-medium mt-2">{details.additionalNotes}</p>
                )}
            </div>

            {/* Thank you message */}
            {/* <div className="mb-6">
                <p className="">Thank you for your business</p>
            </div> */}

            {/* Contact and Signature */}
            <div className="flex justify-between items-end z-10">
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
                        <div className="border-b border-gray-800 w-32 mb-1"></div>
                        <p className="text-xs text-gray-800">Authorised Sign</p>
                    </div>
                )}
            </div>

            {/* Bottom Geometric Elements */}
            <div className="relative mt-8 -mb-4 -mx-4">
                {/* <svg
                    className="absolute bottom-0 left-0 w-full"
                    width="100%"
                    height="60"
                    viewBox="0 0 1000 60"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="100%" stopColor="#374151" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,60 L1000,60 L1000,20 Q800,0 600,15 Q400,30 200,10 Q100,0 0,15 Z"
                        fill="url(#footerGradient)"
                    />
                    <circle cx="100" cy="45" r="8" fill="#ffffff" opacity="0.3" />
                    <circle cx="60" cy="35" r="5" fill="#ffffff" opacity="0.5" />
                    <polygon points="940,50 920,30 960,30" fill="#ffffff" opacity="0.4" />
                </svg> */}
            </div>
        </InvoiceLayout>
    );
};

export default InvoiceTemplate5;