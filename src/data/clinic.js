// Sample catalog: confirm profiles, treatments, durations, and fees before launch.
export const services = [
  { id: 'checkup', name: 'Comprehensive Exam & Cleaning', duration: '45 min', price: '$80', category: 'Preventive care', description: 'A dental assessment and professional cleaning to support your regular oral care routine.' },
  { id: 'whitening', name: 'Laser Teeth Whitening', duration: '60 min', price: '$220', category: 'Cosmetic dentistry', description: 'Discuss your smile goals and whether professional whitening is suitable for you.' },
  { id: 'filling', name: 'Composite Dental Filling', duration: '45 min', price: '$120', category: 'Restorative care', description: 'An assessment of a damaged tooth and a tooth-colored restoration when appropriate.' },
  { id: 'ortho', name: 'Orthodontic Consultation', duration: '30 min', price: '$50', category: 'Orthodontics', description: 'Explore alignment concerns and discuss possible treatment options with a dentist.' },
  { id: 'rootcanal', name: 'Root Canal Therapy', duration: '90 min', price: '$450', category: 'Restorative care', description: 'A consultation and treatment plan for a tooth that may need root canal care.' },
];

export const dentists = [
  { id: 'dr-jenkins', name: 'Dr. Sarah Jenkins, DDM', specialty: 'Orthodontics & General', initials: 'SJ', description: 'Sample practitioner profile for general dental visits and orthodontic consultations.' },
  { id: 'dr-ramirez', name: 'Dr. Marcus Ramirez, DDS', specialty: 'Cosmetic & Endodontics', initials: 'MR', description: 'Sample practitioner profile for cosmetic consultations and restorative treatment planning.' },
];

export const bookingDentists = [...dentists, { id: 'any', name: 'Any Available Specialist', specialty: 'First available doctor' }];

export const faqs = [
  { question: 'How do I request an appointment?', answer: 'Choose a treatment and dentist in Book Appointment, then select a preferred date and time and enter your contact details. This prototype displays a confirmation screen but does not yet save or send your request to the clinic.' },
  { question: 'Are the displayed times live availability?', answer: 'No. The times are sample slots for demonstrating the booking flow. Dentist schedules and conflict checking will be connected when the appointment backend is added.' },
  { question: 'Can I choose my dentist?', answer: 'Yes. Start from a dentist profile to preselect that practitioner, or choose Any Available Specialist in the booking form. Actual assignment will need confirmation by the clinic.' },
  { question: 'Are the prices final?', answer: 'The displayed dollar prices are sample fees. The clinic must confirm its currency, pricing, and treatment details before launch. A final estimate depends on the assessment and agreed treatment plan.' },
  { question: 'What should I bring to my first visit?', answer: 'Ask the clinic which documents it requires. Useful information to prepare includes your contact details, previous dental records if available, and details of any coverage you would like the clinic to check.' },
  { question: 'How can I change or cancel a booking?', answer: 'Online changes and cancellations are not available in this prototype. The clinic’s contact details and cancellation policy need to be confirmed before appointment requests go live.' },
  { question: 'Which payment methods and insurance plans are accepted?', answer: 'Payment options and insurance arrangements have not been confirmed for this demo. Please verify these with the clinic before relying on coverage or displayed fees.' },
  { question: 'What are the clinic hours?', answer: 'The current site lists Monday through Saturday, 8:00 AM to 6:00 PM. These are sample hours and should be confirmed with the clinic before launch.' },
];
