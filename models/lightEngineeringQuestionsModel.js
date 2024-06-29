const mongoose = require("mongoose");

const lightEngineeingQuestionsSchema = mongoose.Schema({
  title: {
    type: String,
  },
  conductedBy: {
    type: String,
  },
  generalInfo: {
    industryName: {
      type: String,
    },
    location: {
      type: String,
    },
    address: {
      type: String,
    },
    yearEstablished: {
      type: Number,
    },
    tel: {
      type: String,
    },
    fax: {
      type: String,
    },
    proprietorName: {
      type: String,
    },
    educationalBackground: {
      type: String,
    },
    trainingAchieved: {
      type: String,
    },
    productType: {
      type: String,
    },
    productDemand: {
      type: String,
    },
    unitPrice: {
      type: String,
    },
    productDecision: [
      {
        decision: {
          type: String,
        },
      },
    ],
  },
  organization: {
    fixedCapital: {
      type: String,
    },
    machinery: {
      type: String,
    },
    land: {
      type: String,
    },
    building: {
      type: String,
    },
    workerWages: {
      type: String,
    },
    others: {
      type: String,
    },
    financeSource: {
      type: String,
    },
    fullTimeEmployees: {
      type: Number,
    },
    partTimeEmployees: {
      type: Number,
    },
  },
  rawMaterial: {
    rawMaterialRequired: {
      type: String,
    },
    materialSupplier: [
      {
        supplierType: {
          type: String,
        },
      },
    ],
    qualityTest: {
      type: String,
    },
    intendedTest: {
      type: String,
    },
    judgeRawMaterial: [
      {
        judge: {
          type: String,
        },
      },
    ],
  },
  manufacturing: {
    manufacturingProcessRequired: [
      {
        processType: {
          type: String,
        },
      },
    ],
    maintenanceAvailability: [
      {
        type: {
          type: String,
        },
      },
    ],
    noOfUnSkilledEmployees: {
      type: Number,
    },
    noOfSkilledEmployees: {
      type: Number,
    },
    noOfSemiSkilledEmployees: {
      type: Number,
    },
    skilledLevel: [
      {
        levelYear: {
          type: String,
        },
      },
    ],
    semiSkilledLevel: [
      {
        levelYear: {
          type: String,
        },
      },
    ],
    unskilledLevel: [
      {
        levelYear: {
          type: String,
        },
      },
    ],
    safetyKnowledgeLevel: {
      type: String,
    },
    operationSpace: {
      type: String,
    },
    storeSpace: {
      type: String,
    },
  },
  machineUsed: {
    machineUsedInfo: [
      {
        machineType: {
          type: String,
        },
        machineQuantity: {
          type: Number,
        },
        machineCountry: {
          type: String,
        },
        machineAccuracy: {
          type: String,
        },
        machineUsageTime: {
          type: String,
        },
        machineAgeType: {
          type: String,
        },
        machineYearUsage: {
          type: String,
        },
        machineOthers: {
          type: String,
        },
      },
    ],
  },
  safetyMeasures: {
    stateOfElectricWiring: {
      type: String,
    },
    fireFightingGears: [
      {
        gearType: {
          type: String,
        },
      },
    ],
    firstAidBox: {
      type: String,
    },
    nearestMedicalAid: {
      type: String,
    },
    safetyMeasuresAvailable: [
      {
        machineType: {
          type: String,
        },
        machineGuardingSystem: {
          type: String,
        },
        machineEmergencyStop: {
          type: String,
        },
        machineColorUsedSafetySigns: {
          type: String,
        },
        machineLubricationSystem: {
          type: String,
        },
        machineInterLockingSystem: {
          type: String,
        },
        machineElectricalProtection: {
          type: String,
        },
        machineOthers: {
          type: String,
        },
      },
    ],
  },
  safetyRelations: {
    safetyRelatedInfo: [
      {
        machineType: {
          type: String,
        },
        machineAccidentRate: {
          type: Number,
        },
        machineInjuryType: {
          type: String,
        },
        machineAbsenteeism: {
          type: String,
        },
        machineExpenses: {
          type: Number,
        },
        machineTurnOverRate: {
          type: String,
        },
      },
    ],
    exerciseSafetyMeasuresAvailability: {
      type: String,
    },
    safetyMeasureAcknowledgement: {
      type: String,
    },
    safeOperationsTraining: {
      type: String,
    },
    employeeSafeguardKnowledge: {
      type: String,
    },
    safeGuardsRemovalAcknowledgement: {
      type: String,
    },
    safeGuardUnavailabilityAcknowledgement: {
      type: String,
    },
  },
  houseKeeping: {
    houseKeepingInfo: [
      {
        practiceType: {
          type: String,
        },
        cleaningOftenDone: {
          type: String,
        },
        cleaningEmployee: {
          type: String,
        },
        toolsEquipment: {
          type: String,
        },
        frequentlyNeededTool: {
          type: String,
        },
        panelsNeededTool: {
          type: String,
        },
        gears: {
          type: String,
        },
        spread: {
          type: String,
        },
        spill: {
          type: String,
        },
      },
    ],
  },
  existingMachinerySafety: {
    existingMachinerySafetyInfo: [
      {
        machineType: {
          type: String,
        },
        machineSafeguard: {
          type: String,
        },
        machineSafetyEquipment: {
          type: String,
        },
        machineTrainingEmployee: {
          type: String,
        },
        machineMaintenanceSchedule: {
          type: String,
        },
        machineReplacingMc: {
          type: String,
        },
        machineAvailableToolbox: {
          type: String,
        },
      },
    ],
  },
  productOutput: {
    prHourly: {
      type: String,
    },
    prDaily: {
      type: String,
    },
    prWeekly: {
      type: String,
    },
    prMonthly: {
      type: String,
    },
    prOrderBased: {
      type: String,
    },
    prDefectRate: {
      type: Number,
    },
    prReworkRate: {
      type: Number,
    },
    defectSource: [
      {
        source: {
          type: String,
        },
      },
    ],
    qdDaily: {
      type: String,
    },
    qdWeekly: {
      type: String,
    },
    qdMonthly: {
      type: String,
    },
    qdOrderBased: {
      type: String,
    },
  },
  identification: {
    financial: [
      {
        financialType: {
          type: String,
        },
      },
    ],
    technical: [
      {
        technicalType: {
          type: String,
        },
      },
    ],
    managerial: [
      {
        managerialType: {
          type: String,
        },
      },
    ],
    needPriority: [
      {
        priorityType: {
          type: String,
        },
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "Questionnaire",
  lightEngineeingQuestionsSchema
);
