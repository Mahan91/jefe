export default {
  application: {
    home: 'Dashboard',
    moreInfo: 'More details',
    noDate: 'No date available',
    pending: 'Is pending',
    yes: 'Yes',
    no: 'No',
    validate: 'Validate',
    datePlaceholder: 'Select date',
    dateFormat: 'MM/DD/YYYY',
  },

  index: {
    header: 'API features',
    subheader: 'showcase',
    search: {
      title: 'Vehicle Search',
      description: 'Find a vehicule in Argus database.',
    },
    referential: {
      title: 'Referential',
      description: 'Explore the Argus vehicles database.',
      button: 'Browse',
    },
    licensePlate: {
      title: 'Search by licence plate',
      description: 'Find a vehicule with his plate number.',
      button: 'Find',
    },
    quote: {
      title: 'Argus Quote',
      description: ' Get Argus quote and others maket values of a vehicle. ',
      button: 'Estimate',
    },
    dashboard: {
      topMakes: 'Top makes',
      topVehicles: 'Top vehicles',
      latestVehicles: 'Latest vehicles',
    },
  },

  login: {
    title: {
      signIn: 'Sign in',
    },
    form: {
      applicationId: 'Application Key',
      applicationSecret: 'Application Secret Key',
      username: 'Username',
      password: 'Password',
      isRemembered: 'Remember me?',
    },
    button: {
      signIn: 'Login',
    },
    isLoging: 'Loging in',
  },

  pageHeader: {
    myProfile: 'My Profile',
    signOut: 'Sign out',
  },

  makeList: {
    title: 'Make list',
    displayDateSince: 'Since {{startDate}}',
    displayDateWithEnd: 'From {{startDate}} to {{endDate}}',
    noMatching: 'No matching entries for this letter.',
  },

  makeSheet: {
    title: 'Make sheet',
    informations: {
      title: 'Informations',
      quote: 'Quote position: ',
    },
    topVehicles: 'Top vehicles',
    latestVehicles: 'Latest vehicles',
    categories: 'Categories',
    models: {
      title: 'Models and submodels',
    },
  },

  modelTimeline: {
    title: 'Model timeline',
    informations: 'Informations',
    index: 'Index',
    generation: 'Generation',
    phase: 'Phase',
    today: 'Today',
  },

  vehicleSheet: {
    title: 'Vehicle sheet',
    identity: 'Vehicle identity',
    priceAndQuote: {
      title: 'Price and quote',
      priceEvolution: {
        title: 'Price evolution',
        legend: 'Price incl. tax',
      },
      quote: {
        title: 'Quote',
        quotable: 'Quotable',
        first: 'First quote',
        prevarable: 'Prevarable',
      },
    },
    specsBlock: {
      dimensions: 'Dimensions and wieght',
      technical: 'Technicals specifications',
      performance: 'Perfomances and consumption',
      stdEquipments: 'Standard equipments',
      optEquipments: 'Optional equipments',
      stdPacks: 'Standard packs',
      optPacks: 'Optional packs',
    },
    equipmentsLabels: {
      manRef: 'Manufacturer ref.',
      name: 'Name',
      category: 'Category',
      priceHT: 'Price excl. taxes',
      priceTTC: 'Price incl. taxes',
    },
    equipments: 'Equipments',
    argusId: 'Argus id',
  },

  licensePlate: {
    form: {
      title: 'License plate',
      label: 'Enter a license plate number',
      description: 'License plate number',
      notValid: 'License plate number is not valid',
    },
    previous: 'Previous search',
    result: {
      title: 'Search result',
      blank: 'Search a vehicule by license plate, or select a previous search',
      candidates: {
        title: 'Candidates',
        searching: 'Searching candidates',
        notFound: 'No candidates',
      },
    },

    registration: {
      title: 'Registration certificate',
      number: 'Registration number',
      firstDate: 'First registration',
      date: 'Registration date',
      vinCode: 'Code vin',
      fiscalPower: 'Fiscal power',
      carbonEmission: 'Carbon emissions',
    },
  },

  prices: {
    ttc: 'incl. tax',
    ht: 'excl. taxes',
  },

  valorization: {
    offers: {
      extended: 'Argus market values',
      custom: 'Personalized Argus quote',
      residual: 'Residual Argus value',
      pastStock: 'Past quote and new price',
      past: 'Past quote',
      exchange: 'Trade-in value',
    },
    index: {
      title: 'Valorization history',
      valorize: 'Valorize',
      labels: {
        offer: 'Offer',
        vehicle: 'Vehicle',
        release: 'Release',
        date: 'Date',
        mileage: 'Mileage',
        value: 'Value',
      },
    },
    wizzard: {
      title: 'Computed an Argus value',
      identity: {
        title: '1. Identify a vehicle',
        select: {
          title: 'Select a vehicle',
          subtitle: 'Vehicle selection',
          category: 'Catégorie',
          make: 'Constructeur',
          date: 'Date',
          model: 'Modèle',
          version: 'Version',
          preview: {
            title: 'Vehicle preview',
            category: 'Select a category',
            make: 'Select a make',
            date: 'Select date',
            model: 'Select a model',
            version: 'Select a version',
          },
        },
        argusId: {
          title: 'Search by OID',
          form: {
            title: 'Search form',
            oid: 'Argus OID',
            date: 'Date',
          },
          preview: {
            title: 'Search result',
            noOID: 'Please enter an Argus OID',
            noMatch: 'No version matched with your OID',
            pending: 'Is searching',
          },
        },
      },
      offer: {
        title: '2. Offer selection',
        extended: {
          description: 'Compute the quote and the market values of your vehicle',
        },
        custom: {
          description: 'Compute the quotation of your vehicle',
        },
        residual: {
          description: 'Calculate the projected Argus value of your vehicle',
        },
        pastStock: {
          description: 'Calculate the price of your vehicle at a past date with the new price included',
        },
        past: {
          description: 'Calculate the price of your vehicle at a past date',
        },
        exhange: {
          description: 'Add a description',
        },
        vehicle: 'Valorized vehicle',
      },
      criteria: {
        title: '3. Define criteria',
        usage: {
          title: 'Vehicle usage',
          mileage: 'Mileage',
          date: 'Date',
          calculatedFor: 'Quotable date',
          returnedAt: 'Return date',
        },
        options: {
          title: 'Vehicle options',
        },
        garage: {
          title: 'Your garage',
          makes: 'Makes',
          zipcode: 'Zipcode',
        },
        summary: {
          title: 'Valorization summary',
          offer: 'Vehicle and offer',
        },
        valorize: 'Valorize',
      },
    },
    values: {
      title: 'Values',
      computing: 'Computing values',
      initial: 'Price of new',
      custom: {
        title: 'Custom market values',
        pastTitle: 'Past market value',
        standardValue: 'Argus average price: ',
        bodyInfluence: 'Body influence',
        releaseInfluence: 'Release date influence: ',
        optionsInfluence: 'Options influence',
        mileageInfluence: 'Mileage influence',
      },
      refurbishment: 'Refurbishment',
      displayeValues: 'Displayed value',
      customerValue: 'Customers',
      proValue: 'Profesionnals',
      residual: 'Residual value',
      exchangeValue: 'Trade-in value',
    },
  },

  techData: {
    notSpecified: 'Not specified',
    units: {
      liter: 'L',
      cc: 'cm³',
      mm: 'mm',
      kg: 'kg',
      kw: 'kW',
      hp: 'hp',
      cx: 'cx',
      rpm: 'rpm',
      nm: 'Nm',
      cv: 'hp',
      m: 'm',
      degree: 'degree',
      sec: 'sec',
      kph: 'kph',
      l100km: 'L/100km',
      km: 'km',
      gpkm: 'g/km',
    },
    dimensions: {
      title: 'Dimensions',
      length: 'Length',
      width: 'Width',
      height: 'Height',
      heightIncludingRoofRails: 'Height with roof rails',
      wheelBase: 'Wheelbase',
      fuelTank: 'Fuel tank',
      frontOverhang: 'Front overhang',
      rearOverhang: 'Rear overhang',
      frontTrack: 'Front track',
      rearTrack: 'Rear track',
      dragCoefficent: 'Drag coefficient',
    },
    tyre: {
      title: 'Tyres',
      wheelType: 'Wheel type',
      tyreType: 'Tyres type',
      front: 'Front wheels size',
      rear: 'Rear wheels size',
      sparewheelType: 'Spare wheel',
    },
    weight: {
      title: 'Weight',
      kerbweight: 'Kerb weight',
      kerbweightIncludingDriver: 'Kerb weight with driver',
      grossVehicleRating: 'Gross vehicle rating',
      grossCombinedRating: 'Gross combined rating',
      payload: 'Payload',
      unbrakedTrailer: 'Unbraked trailer',
    },
    habitability: {
      title: 'Habitability',
      numberOfPlaces: 'Number of places',
      numberOfDoors: 'Number of doors',
    },
    boot: {
      title: 'Boot',
      capacity: 'Capacity',
      minimumCapacity: 'Minimum capacity',
      maximumCapacity: 'Maximum capacity',
      maximumLength: 'Maximum length',
      usableLength: 'Usable length',
      usableWidth: 'Usable width',
      loadStillHeight: 'Load sill height',
      thirdRowCapacity: 'Third row capacity',
    },
    energy: {
      title: 'Energy',
      name: 'Name',
      code: 'Code',
      masterId: 'Master id',
      masterName: 'Master name',
      masterCode: 'Master code',
      legacyId: 'Legacy id',
    },
    engine: {
      title: 'Engine',
      marketName: 'Name',
      powerMarketName: 'Power market name',
      fullNicename: 'Full nice name',
      acronym: 'Acronym',
      layout: 'Layout',
      configuration: 'Configuration',
      supply: 'Aspiration',
      injectionSystem: 'Fuel System',
      literCapacity: 'Liter displacement',
      cubicCapacity: 'CC Displacement',
      dinHorsepower: 'Din horsepower',
      kilowatt: 'Kilowatt power',
      maxPowerRpm: 'To the regime of',
      torque: 'Torque',
      maxTorqueRpm: 'To the regime of',
      numberOfValves: 'Number of valves',
      boreAndStroke: 'Bore/Stroke',
      compressionRatio: 'Compression ratio',
      emission: 'Anti-pollution standard',
      fiscalHorsepower: 'Fiscal horsepower',
    },
    gearbox: {
      title: 'Gearbox',
      name: 'Name',
      marketingName: 'Market name',
      subtype: 'Type',
      numberOfGears: 'Number of gears',
      code: 'Code',
      legacyId: 'Legacy id',
    },
    transmission: {
      title: 'Transmission',
      marketingName: 'Market name',
      drivenWheels: 'Transmission mode',
      numberOfGears: 'Number of gears',
    },
    platform: {
      title: 'Chassis',
      chassisType: 'Type',
      chassisMaterial: 'Material',
      powerSteering: 'Power steering',
      powerSteeringAssistance: 'Steering type',
      powerSteeringType: 'Power steering type',
      turningCircleBetweenKerbs: 'Turning circle (sidewalk)',
      turningCircleWallToWall: 'Turning circle (wall)',
      steeringWheelLockToLockTurns: 'Steering wheel rotation',
      frontSuspension: 'Front suspension type',
      rearSuspensionType: 'Rear suspension type',
    },
    performance: {
      title: 'Performances',
      maximumSpeed: 'Maximum speed',
      da0100kph: 'Acceleration 0-100km/h',
      da01000m: 'Standing 1000m',
    },
    consumption: {
      title: 'Consumption',
      urbanFuel: 'Urban cycle',
      extraUrbanFuel: 'Extra urban',
      combinedFuel: 'Mixed',
      electricRange: 'Electrique range',
      co2EmissionLevel: 'CO2 emissions',
      carbonMonoxide: 'CO emissions',
      nitrousOxyde: 'Nox emission',
      particulateMatter: 'Particles emissions',
      totalHydrocarbons: 'Total emissions',
    },
  },

  errors: {
    description: 'This field',
    inclusion: '{{description}} is not included in the list',
    exclusion: '{{description}} is reserved',
    invalid: '{{description}} is invalid',
    confirmation: '{{description}} doesn\'t match {{on}}',
    accepted: '{{description}} must be accepted',
    empty: '{{description}} can\'t be empty',
    blank: '{{description}} can\'t be blank',
    present: '{{description}} must be blank',
    collection: '{{description}} must be a collection',
    singular: '{{description}} can\'t be a collection',
    tooLong: '{{description}} is too long (maximum is {{max}} characters)',
    tooShort: '{{description}} is too short (minimum is {{min}} characters)',
    before: '{{description}} must be before {{before}}',
    after: '{{description}} must be after {{after}}',
    wrongDateFormat: '{{description}} must be in the format of {{format}}',
    wrongLength: '{{description}} is the wrong length (should be {{is}} characters)',
    notANumber: '{{description}} must be a number',
    notAnInteger: '{{description}} must be an integer',
    greaterThan: '{{description}} must be greater than {{gt}}',
    greaterThanOrEqualTo: '{{description}} must be greater than or equal to {{gte}}',
    equalTo: '{{description}} must be equal to {{is}}',
    lessThan: '{{description}} must be less than {{lt}}',
    lessThanOrEqualTo: '{{description}} must be less than or equal to {{lte}}',
    otherThan: '{{description}} must be other than {{value}}',
    odd: '{{description}} must be odd',
    even: '{{description}} must be even',
    positive: '{{description}} must be positive',
    date: '{{description}} must be a valid date',
    onOrAfter: '{{description}} must be on or after {{onOrAfter}}',
    onOrBefore: '{{description}} must be on or before {{onOrBefore}}',
    email: '{{description}} must be a valid email address',
    phone: '{{description}} must be a valid phone number',
    url: '{{description}} must be a valid url',
  },
};
