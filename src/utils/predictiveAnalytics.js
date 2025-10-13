export const calculateRiskLevel = (grades, attendance, assessmentAvg) => {
  let riskScore = 0;

  // Grade risk (0-30 points)
  if (grades < 60) riskScore += 30;
  else if (grades < 70) riskScore += 20;
  else if (grades < 80) riskScore += 10;

  // Attendance risk (0-30 points)
  if (attendance < 50) riskScore += 30;
  else if (attendance < 70) riskScore += 15;

  // Assessment risk (0-40 points)
  if (assessmentAvg < 60) riskScore += 40;
  else if (assessmentAvg < 70) riskScore += 20;
  else if (assessmentAvg < 80) riskScore += 10;

  const riskLevel = riskScore >= 50 ? 'high' : riskScore >= 30 ? 'medium' : 'low';
  return { riskLevel, riskScore };
};

export const predictStudentGrade = (currentGrade, currentAttendance, assessmentAvg, trend = 0) => {
  // Simple linear regression-based prediction
  const gradeWeight = 0.5;
  const attendanceWeight = 0.2;
  const assessmentWeight = 0.3;

  const weightedScore =
    currentGrade * gradeWeight +
    currentAttendance * attendanceWeight +
    assessmentAvg * assessmentWeight;

  // Apply trend adjustment
  const predictedGrade = Math.min(100, Math.max(0, weightedScore + trend * 5));

  return parseFloat(predictedGrade.toFixed(2));
};