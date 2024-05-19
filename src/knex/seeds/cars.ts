import { Knex } from 'knex';

export const seed = async (knex: Knex): Promise<void> => {
    await knex('cars').del();

    await knex('cars').insert([
        {
            plate: "DBH-3491",
            transmission: "Automatic",
            manufacture: "Ford",
            model: "F150",
            type: "Sedan",
            rate: "400000",
            year: 2022,
            options: [
                "Cruise Control",
                "Tinted Glass",
                "Tinted Glass",
                "Tinted Glass",
                "AM/FM Stereo"
            ],
            specs: [
                "Brake assist",
                "Leather-wrapped shift knob",
                "Glove box lamp",
                "Air conditioning w/in-cabin microfilter",
                "Body color folding remote-controlled pwr mirrors",
                "Dual-stage front airbags w/occupant classification system"
            ]
        },
        {
            rate: "400000",
            plate: "WXB-3984",
            transmission: "Automatic",
            manufacture: "BMW",
            model: "X5",
            type: "Convertible",
            year: 2019,
            options: [
                "Keyless Entry",
                "Power Windows",
                "MP3 (Single Disc)",
                "CD (Multi Disc)",
                "Navigation"
            ],
            specs: [
                "Rear passenger map pockets",
                "Electrochromic rearview mirror",
                "Dual chrome exhaust tips",
                "Locking glove box",
                "Pwr front vented disc/rear drum brakes"
            ]
        },
        {
            plate: "OSL-4224",
            rate: "400000",
            transmission: "Automanual",
            manufacture: "Lincoln",
            model: "MKZ",
            type: "Sedan",
            year: 2021,
            options: [
                "Bucket Seats",
                "Airbag: Passenger",
                "Airbag: Driver",
                "Power Seats",
                "Airbag: Side",
                "Antilock Brakes",
                "CD (Multi Disc)"
            ],
            specs: [
                "Driver & front passenger map pockets",
                "Direct-type tire pressure monitor system",
                "Cargo area lamp",
                "Glove box lamp",
                "Silver finish interior door handles",
                "Driver & front passenger advanced multistage airbags w/occupant sensors",
                "Silver accent IP trim finisher -inc: silver shifter finisher",
                "Fasten seat belt warning light/chime"
            ]
        },
        {
            plate: "VPT-9753",
            transmission: "Manual",
            manufacture: "BMW",
            model: "M5",
            rate: "400000",
            type: "Hatchback",
            year: 2018,
            options: [
                "Alloy Wheels",
                "Power Locks",
                "A/C: Rear",
                "MP3 (Single Disc)",
                "Airbag: Driver",
                "A/C: Front",
                "Tinted Glass",
                "Alloy Wheels",
                "Alarm"
            ],
            specs: [
                "6.1L SRT V8 \"Hemi\" engine",
                "Multi-info display -inc: driving range, average MPG, current MPG, average speed, outside temp, elapsed time, maintenance & diagnostic messages",
                "Front & rear passenger folding assist grips",
                "Electronic throttle control system w/intelligence (ETCS-i)",
                "Pwr tilt/slide moonroof -inc: 1-touch open/close",
                "Acoustic glass windshield"
            ]
        },
        {
            plate: "BHD-3923",
            transmission: "Automatic",
            manufacture: "Lincoln",
            model: "Navigator",
            rate: "400000",
            type: "Minivan",
            year: 2020,
            options: [
                "CD (Multi Disc)",
                "Cruise Control",
                "Power Locks",
                "Alloy Wheels",
                "Tow Package"
            ],
            specs: [
                "Body color sill extension",
                "Torsion beam rear suspension w/stabilizer bar",
                "Front & rear passenger folding assist grips",
                "Electronic control braking (ECB)",
                "Black windshield molding"
            ]
        },
        {
            plate: "JPM-5482",
            rate: "400000",
            transmission: "Automanual",
            manufacture: "Ford",
            model: "Fiesta",
            type: "Hatchback",
            year: 2016,
            options: [
                "Leather Interior",
                "A/C: Rear",
                "CD (Multi Disc)",
                "Airbag: Side",
                "MP3 (Multi Disc)"
            ],
            specs: [
                "Tilt steering column",
                "Carpeted cargo area",
                "Tip start system",
                "Leather-wrapped shift knob",
                "Enhanced accident response system unlocks the doors, shuts off the fuel pump and turns on interior lights after airbag deploys",
                "Compact spare tire"
            ]
        },
        {
            plate: "BTW-1960",
            rate: "400000",
            transmission: "Automatic",
            manufacture: "Honda",
            model: "Accord",
            type: "Sedan",
            year: 2020,
            options: [
                "AM/FM Stereo",
                "Power Windows",
                "Power Locks",
                "Power Windows",
                "MP3 (Single Disc)",
                "A/C: Rear"
            ],
            specs: [
                "Silver finish interior door handles",
                "160-amp alternator",
                "Tire pressure monitoring system (TPMS)",
                "Cloth covered headliner",
                "625-amp maintenance-free battery",
                "Torsion beam rear suspension w/stabilizer bar",
                "Impact-dissipating upper interior trim",
                "Dual front 2-stage airbags -inc: passenger occupant classification system w/twin-chamber airbag"
            ]
        },
        {
            plate: "YHD-4104",
            rate: "400000",
            transmission: "Manual",
            manufacture: "Lincoln",
            model: "Navigator",
            type: "Regular Cab Pickup",
            year: 2014,
            options: [
                "Fog Lights",
                "Memory Seats",
                "Rear Window Defroster",
                "Integrated Phone",
                "Power Locks",
                "A/C: Rear"
            ],
            specs: [
                "XM satellite radio receiver -inc: 90 day trial subscription",
                "Dual front illuminated visor vanity mirrors",
                "Front door tinted glass",
                "Body color door handles",
                "Chrome bodyside molding"
            ]
        },
        {
            plate: "STL-7347",
            transmission: "Automatic",
            manufacture: "Buick",
            model: "LaCrosse",
            rate: "400000",
            type: "Extended Cab Pickup",
            year: 2012,
            options: [
                "CD (Multi Disc)",
                "Keyless Entry",
                "Cassette Player",
                "Power Windows",
                "Rear Window Wiper",
                "CD (Single Disc)",
                "Third Row Seats"
            ],
            specs: [
                "Rear reading & courtesy lamps",
                "Zone body construction -inc: front/rear crumple zones, hood deformation point",
                "4-wheel/4-channel anti-lock brake system (ABS)",
                "Anti-lock 4-wheel performance disc brakes",
                "200mm front axle",
                "Dual front knee airbags"
            ]
        },
        {
            plate: "TJW-7622",
            transmission: "Manual",
            manufacture: "BMW",
            model: "X5",
            rate: "400000",
            type: "Hatchback",
            year: 2019,
            options: [
                "Third Row Seats",
                "Bucket Seats",
                "Integrated Phone",
                "Navigation",
                "Leather Interior"
            ],
            specs: [
                "Cargo compartment lamp",
                "Body color fascias w/bright insert",
                "Front/rear stabilizer bars",
                "Electrochromic pwr folding heated mirrors w/memory -inc: puddle lamps, integrated turn signals, auto reverse tilt-down",
                "Multi-info display -inc: driving range, average MPG, current MPG, average speed, outside temp, elapsed time, maintenance & diagnostic messages"
            ]
        },
        {
            plate: "YND-1892",
            transmission: "Automatic",
            manufacture: "Chevy",
            model: "Malibu",
            rate: "400000",
            type: "Coupe",
            year: 2019,
            options: [
                "Alloy Wheels",
                "Power Windows",
                "Alloy Wheels",
                "Alloy Wheels",
                "Alarm",
                "Bucket Seats",
                "Bucket Seats"
            ],
            specs: [
                "Cloth covered headliner",
                "Sentry Key theft deterrent system",
                "Air conditioning w/in-cabin microfilter",
                "Driver & front passenger map pockets",
                "Security alarm",
                "Dual bright exhaust tips",
                "Compact spare tire"
            ]
        },
        {
            plate: "FZQ-1989",
            transmission: "Automanual",
            manufacture: "BMW",
            model: "X3",
            rate: "400000",
            type: "Passenger Van",
            year: 2018,
            options: [
                "Premium Sound",
                "Fog Lights",
                "Premium Sound",
                "Airbag: Side",
                "Power Seats",
                "Power Steering",
                "Airbag: Driver",
                "Power Steering",
                "Alarm"
            ],
            specs: [
                "Multi-reflector halogen headlamps",
                "Speed control",
                "Anti-lock brake system (ABS) -inc: electronic brake force distribution (EBD), brake assist",
                "Laminated side window glass",
                "Acoustic glass windshield",
                "Back-up camera",
                "Direct-type tire pressure monitor system",
                "All-position 3-point seat belts -inc: outboard pretensioners & force limiters, dual front pwr shoulder height adjusters, rear outboard emergency auto locking retractors, driver emergency locking retractor"
            ]
        },
        {
            plate: "GAG-1943",
            transmission: "CVT",
            manufacture: "Chevy",
            model: "Malibu",
            rate: "400000",
            type: "SUV",
            year: 2017,
            options: [
                "Memory Seats",
                "Cassette Player",
                "Alarm",
                "Power Steering",
                "Keyless Entry"
            ],
            specs: [
                "Leather-wrapped shift knob",
                "Dual front illuminated visor vanity mirrors",
                "Battery saver",
                "Driver & front passenger map pockets",
                "Deluxe insulation group"
            ]
        },
        {
            plate: "CVO-9549",
            transmission: "Manual",
            manufacture: "Chevy",
            model: "Malibu",
            rate: "400000",
            type: "Regular Cab Pickup",
            year: 2020,
            options: [
                "Bucket Seats",
                "Power Seats",
                "CD (Multi Disc)",
                "Bucket Seats",
                "Navigation",
                "Rear Window Defroster",
                "Fog Lights"
            ],
            specs: [
                "Front/rear side curtain airbags",
                "Front & rear side curtain airbags",
                "Body color front license plate brow",
                "Rear body-color spoiler",
                "Reversible/waterproof cargo storage",
                "Front & rear side curtain airbags"
            ]
        },
        {
            plate: "JWU-8459",
            transmission: "Automanual",
            manufacture: "Lincoln",
            model: "MKS",
            rate: "400000",
            type: "Regular Cab Pickup",
            year: 2017,
            options: [
                "Third Row Seats",
                "CD (Single Disc)",
                "Alloy Wheels",
                "A/C: Front",
                "Power Windows",
                "A/C: Front",
                "Memory Seats",
                "Cruise Control",
                "CD (Single Disc)"
            ],
            specs: [
                "Remote fuel lid release",
                "Electronic parking brake",
                "Daytime running lights (DRL)",
                "Silver finish interior door handles",
                "Back-up camera",
                "Highline door trim panel",
                "Pwr front vented disc/rear drum brakes"
            ]
        },
        {
            plate: "VOS-8183",
            transmission: "Automanual",
            manufacture: "Chevy",
            model: "Silverado",
            rate: "400000",
            type: "Convertible",
            year: 2021,
            options: [
                "Leather Interior",
                "Alloy Wheels",
                "MP3 (Single Disc)",
                "Airbag: Driver",
                "Cruise Control",
                "Cassette Player"
            ],
            specs: [
                "Rear window defroster",
                "High performance suspension",
                "1.8L DOHC 16-valve I4 engine -inc: engine cover",
                "Air conditioning w/in-cabin microfilter",
                "4-wheel ventilated pwr disc brakes -inc: brake override system"
            ]
        },
        {
            plate: "ENW-7713",
            transmission: "Automanual",
            manufacture: "Lincoln",
            model: "MKS",
            rate: "400000",
            type: "Regular Cab Pickup",
            year: 2015,
            options: [
                "Alarm",
                "Airbag: Passenger",
                "Cassette Player",
                "Moonroof/Sunroof",
                "Moonroof/Sunroof",
                "Antilock Brakes"
            ],
            specs: [
                "Energy absorbing steering column",
                "3-point ELR/ALR front passenger seat belt w/pretensioner & load limiter",
                "HomeLink universal transceiver",
                "Battery saver",
                "(2) aux 12V pwr outlets -inc: (1) in center console, (1) w/cigarette lighter",
                "LATCH-ready child seat anchor system",
                "Passenger assist handles",
                "XM satellite radio receiver -inc: 90 day trial subscription"
            ]
        },
        {
            plate: "TPM-8174",
            transmission: "CVT",
            manufacture: "Dodge",
            model: "Ram",
            rate: "400000",
            type: "Sedan",
            year: 2014,
            options: [
                "Moonroof/Sunroof",
                "Cassette Player",
                "Antilock Brakes",
                "Antilock Brakes",
                "Memory Seats",
                "MP3 (Single Disc)",
                "Leather Interior",
                "CD (Single Disc)"
            ],
            specs: [
                "3-point ELR/ALR front passenger seat belt w/pretensioner & load limiter",
                "Rear passenger map pockets",
                "Black roof molding",
                "Anti-lock brake system (ABS) -inc: electronic brake force distribution (EBD), brake assist",
                "Variable intermittent windshield wipers w/mist function",
                "Roof mounted antenna"
            ]
        },
        {
            rate: "400000",
            plate: "ZAG-8112",
            transmission: "Automatic",
            manufacture: "Ford",
            model: "F150",
            type: "Convertible",
            year: 2021,
            options: [
                "CD (Single Disc)",
                "Airbag: Driver",
                "Antilock Brakes",
                "CD (Single Disc)",
                "A/C: Rear",
                "Memory Seats",
                "Third Row Seats"
            ],
            specs: [
                "All-position 3-point seat belts -inc: outboard pretensioners & force limiters, dual front pwr shoulder height adjusters, rear outboard emergency auto locking retractors, driver emergency locking retractor",
                "Body color door handles",
                "Front & rear passenger folding assist grips",
                "Rear-window defogger w/auto-off timer",
                "160-amp alternator",
                "Body color door handles",
                "Battery saver",
                "First aid kit",
                "Immobilizer system"
            ]
        },
        {
            plate: "MRQ-2982",
            transmission: "Automatic",
            manufacture: "Audi",
            model: "A4",
            rate: "400000",
            type: "Crew Cab Pickup",
            year: 2012,
            options: [
                "Navigation",
                "Rear Window Wiper",
                "Tow Package",
                "MP3 (Multi Disc)",
                "Bucket Seats"
            ],
            specs: [
                "Pwr accessory delay",
                "Tire pressure monitoring system (TPMS)",
                "Tilt/telescoping steering column",
                "Electronic throttle control system w/intelligence (ETCS-i)",
                "Front/rear crumple zones",
                "Rear door child safety locks",
                "Child safety rear door locks"
            ]
        },
        {
            rate: "400000",
            plate: "ACT-6027",
            transmission: "Manual",
            manufacture: "Dodge",
            model: "Durango",
            type: "SUV",
            year: 2013,
            options: [
                "Memory Seats",
                "Integrated Phone",
                "Airbag: Driver",
                "Leather Interior",
                "Cassette Player",
                "Airbag: Passenger"
            ],
            specs: [
                "Floor carpeting",
                "Electric speed-sensitive variable-assist pwr steering",
                "Dana 44/226mm rear axle",
                "Roof mounted antenna",
                "Fixed long mast antenna"
            ]
        },
        {
            plate: "LSI-6227",
            transmission: "Automatic",
            manufacture: "Audi",
            model: "S5",
            rate: "400000",
            type: "Coupe",
            year: 2020,
            options: [
                "Memory Seats",
                "Power Locks",
                "Fog Lights",
                "Tinted Glass",
                "Rear Window Wiper",
                "Airbag: Passenger",
                "Power Locks",
                "Tow Package"
            ],
            specs: [
                "Pwr front vented disc/rear drum brakes",
                "Pwr windows -inc: 1-touch open/close",
                "Cloth covered headliner",
                "Foldable front door storage pockets",
                "Dual-stage front airbags w/occupant classification system",
                "Battery saver",
                "20\" x 9.0\" front & 20\" x 10.0\" rear aluminum wheels",
                "Cargo compartment lamp"
            ]
        },
        {
            plate: "OAI-9575",
            transmission: "Automatic",
            manufacture: "Toyota",
            model: "Camry",
            rate: "400000",
            type: "Extended Cab Pickup",
            year: 2022,
            options: [
                "Rear Window Defroster",
                "MP3 (Single Disc)",
                "Power Steering",
                "Antilock Brakes",
                "Tow Package",
                "Fog Lights",
                "AM/FM Stereo",
                "Alarm"
            ],
            specs: [
                "Intermittent rear wiper w/washer",
                "Energy absorbing front/rear bumpers",
                "Engine mounts -inc: (2) solid, (1) liquid-filled",
                "Tire pressure monitoring display",
                "Foldable front door storage pockets",
                "Child safety rear door locks",
                "Front/rear aluminum multi-link double joint suspension w/coil springs",
                "Laminated side window glass",
                "Silver accent IP trim finisher -inc: silver shifter finisher"
            ]
        },
        {
            plate: "NHI-3883",
            transmission: "Automatic",
            manufacture: "Nissan",
            model: "Pathfiner",
            rate: "400000",
            type: "Sedan",
            year: 2022,
            options: [
                "Moonroof/Sunroof",
                "Power Seats",
                "CD (Single Disc)",
                "Airbag: Passenger",
                "Alarm",
                "Power Seats",
                "Cruise Control"
            ],
            specs: [
                "200mm front axle",
                "Roof mounted antenna",
                "Cargo compartment cover",
                "Rear bench seat -inc: (3) adjustable headrests",
                "Front/rear aluminum multi-link double joint suspension w/coil springs",
                "Reclining front bucket seats -inc: active head restraints, double-thickness foam in front seats"
            ]
        },
        {
            plate: "IDN-5442",
            transmission: "CVT",
            manufacture: "Honda",
            model: "Civic",
            rate: "400000",
            type: "Wagon",
            year: 2015,
            options: [
                "CD (Single Disc)",
                "Airbag: Passenger",
                "A/C: Front",
                "Power Locks",
                "Navigation",
                "Rear Window Defroster",
                "Rear Window Defroster",
                "MP3 (Single Disc)",
                "Airbag: Side"
            ],
            specs: [
                "Electric speed-sensitive variable-assist pwr steering",
                "Steel side-door impact beams",
                "Dual bright exhaust tips",
                "Remote fuel lid release",
                "Traveler/mini trip computer"
            ]
        }
    ]);
};