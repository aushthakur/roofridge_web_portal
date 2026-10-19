const LoanApplication = require('../models/LoanApplication');
const LegalConsultation = require('../models/LegalConsultation');
const Lead = require('../models/Lead');
const ApiResponse = require('../utils/apiResponse');

// @desc    Calculate Loan Eligibility and EMI (VOL-09)
// @route   POST /api/v1/finance/eligibility
// @access  Public
exports.getLoanEligibility = async (req, res) => {
  const { monthlyIncome, existingEmi = 0, tenureYears = 20, interestRate = 8.5 } = req.body;

  if (!monthlyIncome || monthlyIncome <= 0) {
    return ApiResponse.error(res, 'Monthly income must be greater than zero', 400);
  }

  try {
    // 50% FOIR (Fixed Obligation to Income Ratio) standard banking rule
    const availableMonthlyCapacity = Math.max(0, monthlyIncome * 0.5 - existingEmi);

    // Monthly interest rate
    const r = interestRate / (12 * 100);
    const n = tenureYears * 12;

    // Loan eligibility formula: P = EMI * ((1+r)^n - 1) / (r * (1+r)^n)
    const maxEligibleLoan = Math.round(
      availableMonthlyCapacity * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)))
    );

    // Indicative EMI on max eligible loan
    const indicativeEmi = Math.round(availableMonthlyCapacity);

    const partnerBanks = [
      { name: 'HDFC Bank', rate: '8.45% - 9.15%', maxLtv: '80%', processingFee: '0.50%' },
      { name: 'State Bank of India', rate: '8.40% - 9.05%', maxLtv: '85%', processingFee: '0.35%' },
      { name: 'ICICI Bank', rate: '8.50% - 9.25%', maxLtv: '80%', processingFee: '0.50%' },
      { name: 'Axis Bank', rate: '8.60% - 9.30%', maxLtv: '80%', processingFee: '0.50%' },
    ];

    return ApiResponse.success(
      res,
      {
        maxEligibleLoan,
        indicativeEmi,
        tenureYears,
        assumedInterestRate: interestRate,
        partnerBanks,
      },
      'Eligibility calculated'
    );
  } catch (error) {
    return ApiResponse.error(res, 'Eligibility calculation failed: ' + error.message, 500);
  }
};

// @desc    Apply for Home / Property Loan
// @route   POST /api/v1/finance/loans
// @access  Private (or authenticated guest)
exports.applyLoan = async (req, res) => {
  const {
    applicantName,
    applicantPhone,
    applicantEmail,
    loanType = 'home_loan',
    loanAmount,
    tenureYears = 20,
    employmentType = 'salaried',
    monthlyIncome,
    city = 'Noida',
    preferredBank = 'HDFC Bank',
    propertyId,
    notes,
  } = req.body;

  if (!loanAmount || !monthlyIncome) {
    return ApiResponse.error(res, 'Loan amount and monthly income are required', 400);
  }

  try {
    const loan = await LoanApplication.create({
      user: req.user ? req.user.id : undefined,
      applicantName: applicantName || (req.user ? req.user.name : 'Applicant'),
      applicantPhone: applicantPhone || (req.user ? req.user.phone : ''),
      applicantEmail: applicantEmail || (req.user ? req.user.email : ''),
      loanType,
      loanAmount,
      tenureYears,
      employmentType,
      monthlyIncome,
      city,
      preferredBank,
      property: propertyId,
      notes,
    });

    // Also register lead into CRM pipeline
    await Lead.create({
      fullName: loan.applicantName,
      phone: loan.applicantPhone,
      email: loan.applicantEmail,
      source: 'loan_application',
      interestType: 'loan',
      city,
      budget: { min: loanAmount, max: loanAmount, display: `₹${loanAmount}` },
      notes: `Loan Application for ${loanType} of ₹${loanAmount} via ${preferredBank}`,
      priority: 'high',
      score: 80,
    });

    return ApiResponse.success(res, loan, 'Loan application submitted successfully', 201);
  } catch (error) {
    return ApiResponse.error(res, 'Loan application failed: ' + error.message, 500);
  }
};

// @desc    Request Legal Consultation
// @route   POST /api/v1/finance/legal
// @access  Private (or guest)
exports.requestLegalConsultation = async (req, res) => {
  const {
    clientName,
    clientPhone,
    clientEmail,
    serviceType,
    propertyDetails,
    city = 'Noida',
    notes,
  } = req.body;

  if (!serviceType || !propertyDetails) {
    return ApiResponse.error(res, 'Service type and property details are required', 400);
  }

  try {
    const consultation = await LegalConsultation.create({
      user: req.user ? req.user.id : undefined,
      clientName: clientName || (req.user ? req.user.name : 'Client'),
      clientPhone: clientPhone || (req.user ? req.user.phone : ''),
      clientEmail: clientEmail || (req.user ? req.user.email : ''),
      serviceType,
      propertyDetails,
      city,
      notes,
    });

    // Register lead in CRM
    await Lead.create({
      fullName: consultation.clientName,
      phone: consultation.clientPhone,
      email: consultation.clientEmail,
      source: 'legal_consult',
      interestType: 'legal',
      city,
      notes: `Legal consultation for ${serviceType}: ${propertyDetails}`,
      priority: 'medium',
      score: 70,
    });

    return ApiResponse.success(res, consultation, 'Legal request submitted successfully', 201);
  } catch (error) {
    return ApiResponse.error(res, 'Legal request failed: ' + error.message, 500);
  }
};

// @desc    Get User Finance & Legal requests
// @route   GET /api/v1/finance/my
// @access  Private
exports.getUserFinanceRequests = async (req, res) => {
  try {
    const [loans, legal] = await Promise.all([
      LoanApplication.find({ user: req.user.id }).sort({ createdAt: -1 }),
      LegalConsultation.find({ user: req.user.id }).sort({ createdAt: -1 }),
    ]);

    return ApiResponse.success(res, { loans, legal }, 'Finance & Legal records retrieved');
  } catch (error) {
    return ApiResponse.error(res, 'Error fetching requests: ' + error.message, 500);
  }
};

// @desc    Get All Finance & Legal requests (Admin Desk)
// @route   GET /api/v1/finance/all
// @access  Private (Admin)
exports.getAllFinanceRequests = async (req, res) => {
  try {
    const [loans, legal] = await Promise.all([
      LoanApplication.find().populate('user', 'name phone email').sort({ createdAt: -1 }),
      LegalConsultation.find().populate('user', 'name phone email').sort({ createdAt: -1 }),
    ]);

    return ApiResponse.success(res, { loans, legal }, 'All finance & legal requests retrieved');
  } catch (error) {
    return ApiResponse.error(res, 'Error fetching requests: ' + error.message, 500);
  }
};

// @desc    Update Loan / Legal Application Status (Admin)
// @route   PUT /api/v1/finance/loans/:id/status
// @access  Private (Admin)
exports.updateLoanStatus = async (req, res) => {
  const { status, bankAssigned, remarks } = req.body;
  try {
    const loan = await LoanApplication.findById(req.params.id);
    if (!loan) return ApiResponse.error(res, 'Loan application not found', 404);
    if (status) loan.status = status;
    if (bankAssigned) loan.bankAssigned = bankAssigned;
    if (remarks) loan.remarks = remarks;
    await loan.save();
    return ApiResponse.success(res, loan, `Loan status updated to ${loan.status}`);
  } catch (error) {
    return ApiResponse.error(res, 'Failed to update loan status: ' + error.message, 500);
  }
};

