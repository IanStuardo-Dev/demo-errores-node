const allowedStatuses = ['approved', 'rework', 'rejected'];

function validateProductInspection(inspection) {
  if (!inspection.inspector) {
    return 'Inspector is required';
  }

  if (inspection.score < 0) {
    return 'Score must be greater than or equal to 0';
  }

  if (!allowedStatuses.includes(inspection.status)) {
    return 'Status is invalid';
  }

  return null;
}

module.exports = {
  validateProductInspection
};
