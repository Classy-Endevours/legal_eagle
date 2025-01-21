export const mockAIResults = {
  result: [
    {
      status: "Missing",
      title: "Specific State Not Specified",
      description:
        "The governing law clause references the 'United States' but lacks a specific state. This may lead to issues of enforceability and clarity. It's essential to specify a state to avoid jurisdictional ambiguities.",
    },
    {
      status: "Needs Review",
      title: "No Penalty for Delays",
      description:
        "The clause mentions delivery within 20 working days but does not outline any penalties for non-compliance. This absence may lead to disputes. Consider adding penalty terms or remedies for timely delivery failures.",
    },
    {
      status: "Needs Review",
      title: "Unclear Payment Terms",
      description:
        "The payment clause states payment will occur after completion but lacks specifics about the payment method and timeline. Adding this information would avoid potential misunderstandings regarding the payment process.",
    },
    {
      status: "Missing",
      title: "Arbitration Location and Rules Not Specified",
      description:
        "The arbitration clause mentions resolution of disputes through arbitration but does not specify the location or rules that will govern the arbitration process. It is critical to include these details for clarity and enforceability.",
    },
    {
      status: "Needs Review",
      title: "Confidentiality Duration and Exceptions Not Defined",
      description:
        "The confidentiality clause requires maintenance of secrecy for shared documents but lacks duration and exceptions. Clarifying these aspects can prevent disputes related to what is covered and for how long.",
    },
    {
      status: "Needs Review",
      title: "Definition of 'Cause' for Termination Lacking",
      description:
        "The termination clause states that the agreement can be terminated with cause but does not define 'cause.' This lack of definition can lead to misunderstandings and disputes. A clear definition should be provided to ensure all parties have a mutual understanding.",
    },
  ],
};

export const summaryResults = {
  result: [
    {
      title: "Governing Law Clause",
      summary:
        "The contract is subject to the laws of the United States, without specifying a particular state.",
    },
    {
      title: "Project Delivery Timeline",
      summary:
        "The contractor agrees to deliver the project within 20 working days, but does not include a penalty for delays.",
    },
    {
      title: "Payment Terms",
      summary:
        "Payment will be made after completion of the project, but lacks details on the payment method or timeline.",
    },
    {
      title: "Dispute Resolution",
      summary:
        "Disputes will be resolved by arbitration, although the location and rules for arbitration are not defined.",
    },
    {
      title: "Confidentiality Obligations",
      summary:
        "Confidentiality must be maintained for shared documents, but the duration and exceptions are not specified.",
    },
    {
      title: "Termination Clause",
      summary:
        "The agreement allows for termination with cause, but the term 'cause' is not defined.",
    },
  ],
};

export const newMockData = {
  result: [
    {
      status: "Needs Review",
      title: "Jurisdiction Ambiguity",
      description:
        "The governing law clause specifies 'the laws of the United States' but does not identify a specific state. It is important to clarify which state's laws will govern the contract to prevent ambiguity and ensure enforceability.",
    },
    {
      status: "Needs Review",
      title: "Unclear Project Delivery Timeline",
      description:
        "The clause states that the project will be delivered within 20 working days but does not outline penalties for delays. This could lead to disputes regarding accountability. Consider including penalties or remedies for missed deadlines.",
    },
    {
      status: "Missing",
      title: "Undefined Payment Terms",
      description:
        "The payment clause indicates that payment will be made after completion but lacks details about the payment method and timeline. Include specific terms regarding how and when payment will be processed to avoid misunderstandings.",
    },
    {
      status: "Missing",
      title: "Arbitration Clause Lacks Details",
      description:
        "The dispute resolution clause refers to arbitration but does not specify the location or the rules that will govern the arbitration process. Providing this information is essential to ensure clarity on how disputes will be resolved.",
    },
    {
      status: "Missing",
      title: "Insufficient Confidentiality Provisions",
      description:
        "While confidentiality must be maintained for shared documents, the clause does not specify the duration of confidentiality obligations or any exceptions. Clear terms should be included to define how long confidentiality applies and under what circumstances it may be overridden.",
    },
    {
      status: "Needs Review",
      title: "Vague Termination Clause",
      description:
        "The termination clause states that the agreement can occur with cause, but the term 'cause' is not specifically defined. Clarifying what constitutes 'cause' will help prevent disputes regarding termination rights.",
    },
  ],
};

export const newMockSummary = {
  result: [
    {
      title: "Governing Law Clause",
      summary:
        "The contract is governed by the laws of the United States, though a specific state is not identified.",
    },
    {
      title: "Project Delivery Timeline",
      summary:
        "The contractor is required to deliver the project within 20 working days, with no penalties for delays specified.",
    },
    {
      title: "Payment Terms",
      summary:
        "Payment is to be made after project completion, but the payment method and timeline are not detailed.",
    },
    {
      title: "Dispute Resolution",
      summary:
        "Disputes will be resolved through arbitration, though the location and rules for arbitration are not defined.",
    },
    {
      title: "Confidentiality Obligations",
      summary:
        "Confidentiality must be maintained for shared documents, but the duration and any exceptions are not specified.",
    },
    {
      title: "Termination Clause",
      summary:
        "The agreement can be terminated with cause, but the term 'cause' is not defined in the contract.",
    },
  ],
};

export const userModifyMockData1 = `**Improvements to Document: Clarity and Specificity Suggested**

---

**Governing Law**  
This contract shall be governed by and construed in accordance with the laws of the United States. However, the specific state jurisdiction that applies to this contract should be clearly specified. 

**Project Delivery**  
The contractor agrees to deliver the project within 20 working days from the commencement date. However, to ensure accountability, a penalty clause for delays should be included, outlining the consequences or deductions applicable for late delivery.

**Payment Terms**  
Payment will be processed upon the successful completion of the project. To improve transparency, the following details should be included:
- Accepted payment methods (e.g., bank transfer, check, online payment platforms).
- Payment timeline (e.g., payment to be made within 10 business days of project completion).

**Dispute Resolution**  
In the event of a dispute, resolution shall occur through arbitration. To clarify this process, the following details should be defined:
- The location of the arbitration (to ensure both parties know where disputes will be resolved).
- The rules governing the arbitration (e.g., which arbitration body or rules will apply, such as the American Arbitration Association).

**Confidentiality Clause**  
All shared documents must remain confidential. To strengthen this clause, specify:
- The duration of the confidentiality obligation (e.g., for a period of five years after termination of the agreement).
- Any exceptions to confidentiality (e.g., disclosures required by law, information that becomes public through no fault of the receiving party).

**Termination Clause**  
This agreement may be terminated with cause by either party. However, the term 'cause' should be explicitly defined to avoid ambiguity. Suggested definitions could include:
- Material breach of contract terms.
- Failure to perform duties as outlined in this agreement.
- Any other specified conditions that would warrant termination.

---

**Conclusion**  
Enhancing this contract with clear and specific terms will improve mutual understanding and can help prevent disputes in the future. Each section should be reviewed for additional details and considerations as necessary.`;

export const userModifyMockData2 = `**Contract Summary and Recommendations for Improvement**

1. **Governing Law**:  
   This contract shall be governed by the laws of the United States; however, the specific state jurisdiction has not been specified. **Recommendation:** Clearly identify the state whose laws will govern this contract to avoid confusion and ensure correct legal interpretation.

2. **Project Delivery Timeline**:  
   The contractor agrees to complete the project within 20 working days. However, there are no outlined penalties for failure to meet this timeline. **Recommendation:** Include specific penalties or consequences for delays to ensure accountability and maintain project timelines.

3. **Payment Terms**:  
   Payment will be made upon successful project completion, but the method of payment and timeline for disbursement are not specified. **Recommendation:** Define acceptable payment methods (e.g., bank transfer, check) and outline a timeline for payment (e.g., within X days after completion or approval of work).

4. **Dispute Resolution**:  
   In the event of a dispute, arbitration will be the chosen method for resolution; however, details regarding the location and rules governing the arbitration process are absent. **Recommendation:** Specify the agreed-upon location for the arbitration proceedings and the set of rules to be followed (e.g., American Arbitration Association rules) to ensure both parties are prepared.

5. **Confidentiality Agreement**:  
   Confidentiality is required for shared documents, yet the duration of this obligation and any exceptions to it are not articulated. **Recommendation:** Clearly state the length of the confidentiality obligation (e.g., 1 year after contract termination) and the exceptions (e.g., disclosures required by law) to avoid potential disputes over confidentiality expectations.

6. **Termination Clause**:  
   The contract allows for termination with cause, but the term ‘cause’ remains undefined. **Recommendation:** Provide a clear definition of ‘cause’ that specifies the grounds on which either party may terminate the agreement (e.g., breach of contract, failure to deliver services).

**Conclusion**:  
Improving the clarity and specificity of this contract will provide better protection for both parties and foster a more professional working relationship. Each recommendation aims to mitigate potential misunderstandings and disputes in the future.`;

export const userModifyMockData3 = `This contract is subject to the laws of the United States, although the specific state is not mentioned. \n\nThe contractor agrees to deliver the project within 20 working days; however, there are no penalties outlined for any delays. \n\nPayment will be made after the project's completion, but no details are provided regarding the payment method or timeline. \n\nIn the event of a dispute, the matter will be resolved through arbitration; however, the location and rules governing the arbitration process are not defined. \n\nConfidentiality must be maintained for all shared documents, but the clause does not specify the duration of confidentiality or any exceptions. \n\nTermination of this agreement may occur with cause; however, the term 'cause' remains undefined.`;

export const userModifyMockData4 = `This contract is subject to the laws of the United States; however, the specific state is not mentioned.  

The contractor agrees to deliver the project within 20 working days; however, there is no penalty mentioned for delays.  

Payment will be made after completion; however, no details are provided about the payment method or timeline.  

In case of a dispute, the matter will be resolved by arbitration; however, the location and rules for arbitration are not defined.  

Confidentiality must be maintained for shared documents; however, the clause does not specify the duration or exceptions.  

Termination of this agreement can occur with cause; however, the term 'cause' is not explained or defined.`;
