exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('herds').del()
    .then(function () {
      // Inserts seed entries
      return knex('herds').insert([
        {
          id: 1,
          scientific_name: 'Rangifer tarandus pop. 14',
          herd_name: 'Calendar',
          coords: '422,65,424,87,415,87,408,85,402,86,399,82,395,82,391,80,388,75,377,68,402,66,420,64',
          eco_type: 'Boreal',
          status: 'Red - Threatened',
          population: 291,
          last_survey: 2006,
          range: 4964
        },
        {
          id: 2,
          scientific_name: 'Rangifer tarandus pop. 14',
          herd_name: 'Chinchaga',
          coords: "394,139,400,139,403,136,409,135,412,134,415,136,420,136,423,140,428,139,433,200,431,201,430,201,427,203,416,199,414,189,409,186,403,180,399,178,399,168,394,163,394,157,396,154,395,149,396,146,392,139",
          eco_type: 'Boreal',
          status: 'Red - Threatened',
          population: 250,
          last_survey: 2006,
          range: 13985
        },
        {
          id: 3,
          scientific_name: 'Rangifer tarandus pop. 14',
          herd_name: 'Maxhamish',
          coords: "382,80,391,81,386,74,377,68,365,69,361,71,359,69,347,69,346,72,347,75,344,78,345,79,343,81,345,86,343,91,345,97,350,98,355,96,371,102,374,106,378,101,368,90,369,88,372,82",
          eco_type: 'Boreal',
          status: 'Red - Threatened',
          population: 306,
          last_survey: 2006,
          range: 7101
        },
        {
          id: 4,
          scientific_name: 'Rangifer tarandus pop. 14',
          herd_name: 'Parker',
          coords: "359,115,352,116,354,119,353,121,356,121,355,124,357,125,361,121,364,122,365,123,366,121,367,118,359,115",
          eco_type: 'Boreal',
          status: 'Red - Threatened',
          population: 24,
          last_survey: 2008,
          range: 225
        },
        {
          id: 5,
          scientific_name: 'Rangifer tarandus pop. 14',
          herd_name: 'Prophet',
          coords: "367,143,365,138,365,130,369,129,371,130,378,130,381,132,382,134,383,142,381,141,379,141,378,138,380,137,378,135,373,134,374,140,368,143",
          eco_type: 'Boreal',
          status: 'Red - Threatened',
          population: 54,
          last_survey: 2006,
          range: 916
        },
        {
          id: 6,
          scientific_name: 'Rangifer tarandus pop. 14',
          herd_name: 'Snake-Sahtaneh',
          coords: "370,88,374,83,380,81,389,82,392,81,395,82,400,83,403,86,408,85,412,88,411,91,414,93,416,99,414,102,415,107,409,108,403,105,398,103,399,106,404,110,399,113,400,115,393,117,392,119,395,121,398,121,409,125,410,129,406,134,397,137,387,137,384,134,384,130,383,128,375,128,369,122,373,119,375,120,378,116,377,114,377,111,390,111,392,109,394,108,391,107,382,107,380,105,383,103,378,100,380,99,376,96,377,95,382,98,386,93,383,92,381,94,373,90,370,87",
          eco_type: 'Boreal',
          status: null,
          population: null,
          last_survey: null,
          range: null
        },
        {
          id: 7,
          scientific_name: 'Rangifer tarandus pop. 1',
          herd_name: 'Barkerville',
          coords: "405,343,409,343,410,345,410,349,404,351,406,354,411,354,412,358,408,360,405,362,404,359,405,356,400,350,400,347,403,343",
          eco_type: 'Mountain',
          status: 'Red - Threatened',
          population: 50,
          last_survey: 2006,
          range: 741
        },
        {
          id: 8,
          scientific_name: 'Rangifer tarandus pop. 1',
          herd_name: 'Central Rockies',
          coords: "476,389,480,385,483,385,484,381,489,382,490,387,492,383,496,382,497,378,500,379,500,384,502,393,506,390,507,395,516,405,514,407,502,399,498,401,497,393,489,395,476,390",
          eco_type: 'Mountain',
          status: 'Red - Threatened',
          population: 3,
          last_survey: 2008,
          range: 759
        },
        {
          id: 9,
          scientific_name: 'Rangifer tarandus pop. 1',
          herd_name: 'Columbia North',
          coords: "476,418,476,414,474,409,478,404,480,399,486,394,495,399,494,402,489,403,493,407,494,409,492,416,488,420,482,421,480,415,476,419",
          eco_type: 'Mountain',
          status: 'Red - Threatened',
          population: 140,
          last_survey: 2010,
          range: 4652
        },
        {
          id: 10,
          scientific_name: 'Rangifer tarandus pop. 1',
          herd_name: 'Columbia South',
          coords: "494,416,494,411,497,408,503,409,502,412,500,418,504,421,507,418,506,416,506,413,508,412,512,412,515,411,517,413,515,416,510,415,511,420,509,424,505,429,503,427,500,422,494,417",
          eco_type: 'Mountain',
          status: 'Red - Threatened',
          population: 14,
          last_survey: 2010,
          range: 1691
        },
        {
          id: 11,
          scientific_name: 'Rangifer tarandus pop. 1',
          herd_name: 'Duncan',
          coords: "528,441,526,437,521,431,522,430,523,422,527,426,530,428,529,433,530,437,532,441,531,443",
          eco_type: 'Mountain',
          status: 'Red - Threatened',
          population: 7,
          last_survey: 2010,
          range: 447
        },
        {
          id: 12,
          scientific_name: 'Rangifer tarandus pop. 1',
          herd_name: 'Frisby-Boulder',
          coords: "494,417,495,423,494,425,489,426,489,427,482,429,482,435,486,434,488,431,493,433,493,438,497,441,502,442,502,437,496,436,496,430,500,428,502,429,500,423,494,417",
          eco_type: 'Mountain',
          status: 'Red - Threatened',
          population: 12,
          last_survey: 2008,
          range: 692
        },
        {
          id: 13,
          scientific_name: 'Rangifer tarandus pop. 1',
          herd_name: 'Groundhog',
          coords: "467,412,466,408,468,407,468,397,471,392,470,388,474,387,476,390,472,396,474,401,471,404,472,406,467,412",
          eco_type: 'Mountain',
          status: 'Red - Threatened',
          population: 9,
          last_survey: 2010,
          range: 1006
        },
        {
          id: 14,
          scientific_name: 'Rangifer tarandus pop. 1',
          herd_name: 'Hart Ranges',
          coords: "384,286,376,278,379,275,381,273,383,268,388,268,395,276,396,280,399,279,401,280,403,281,403,284,405,285,403,287,407,292,412,292,414,294,421,295,425,297,424,300,427,302,427,305,427,308,437,308,436,312,437,313,441,314,443,319,446,322,451,327,446,327,447,330,443,335,439,335,436,337,421,325,404,318,403,307,405,305,396,302,390,297,391,291,384,285",
          eco_type: 'Mountain',
          status: 'Red - Threatened',
          population: 560,
          last_survey: 2010,
          range: 12466
        },
        {
          id: 15,
          scientific_name: 'Rangifer tarandus pop. 1',
          herd_name: 'Monashee',
          coords: "498,447,499,445,502,448,502,451,499,449,496,446",
          eco_type: 'Mountain',
          status: 'Red - Threatened',
          population: 7,
          last_survey: 2008,
          range: 194
        },
        {
          id: 16,
          scientific_name: 'Rangifer tarandus pop. 1',
          herd_name: 'Nakusp',
          coords: "524,466,514,461,511,454,510,447,513,442,515,437,523,437,522,441,529,441,531,444,526,452,524,455,524,462",
          eco_type: 'Mountain',
          status: 'Red - Threatened',
          population: 77,
          last_survey: 2010,
          range: 2342
        },
        {
          id: 17,
          scientific_name: 'Rangifer tarandus pop. 1',
          herd_name: 'Narrow Lake',
          coords: "524,466,514,461,511,454,510,447,513,442,515,437,523,437,522,441,529,441,531,444,526,452,524,455,524,462",
          eco_type: 'Mountain',
          status: 'Red - Threatened',
          population: 18,
          last_survey: 2010,
          range: 424
        },
        {
          id: 18,
          scientific_name: 'Rangifer tarandus pop. 1',
          herd_name: 'North Cariboo',
          coords: "400,320,400,325,404,328,408,329,408,335,410,340,419,343,420,346,424,355,427,355,426,351,427,348,426,343,422,336,417,333,418,328,415,326,409,326,409,322,403,318",
          eco_type: 'Mountain',
          status: 'Red - Threatened',
          population: 265,
          last_survey: 2006,
          range: 2327
        },
        {
          id: 19,
          scientific_name: 'Rangifer tarandus pop. 1',
          herd_name: 'Purcells South',
          coords: "556,482,560,481,564,482,564,485,568,487,568,492,563,490,563,492,566,497,565,497,560,496,559,493,556,490,551,492,550,488,555,487,555,483",
          eco_type: 'Mountain',
          status: 'Red - Threatened',
          population: 15,
          last_survey: 2010,
          range: 772
        },
        {
          id: 20,
          scientific_name: 'Rangifer tarandus pop. 1',
          herd_name: 'South Selkirks',
          coords: "536,509,535,494,536,491,535,488,537,488,539,491,542,496,545,496,547,499,548,501,544,503,547,508,537,509",
          eco_type: 'Mountain',
          status: 'Red - Threatened',
          population: 43,
          last_survey: 2010,
          range: 1296
        },
        {
          id: 21,
          scientific_name: 'Rangifer tarandus pop. 1',
          herd_name: 'Wells Gray',
          coords: "411,371,412,365,416,361,419,356,423,358,427,357,430,357,434,357,440,362,445,358,447,359,446,364,449,367,445,373,452,370,457,374,460,380,461,374,466,372,461,367,465,364,469,368,469,373,473,376,473,381,475,382,469,383,466,388,466,400,461,404,462,398,459,394,457,397,454,403,450,396,450,391,449,391,448,387,441,388,437,392,431,388,434,384,438,384,443,381,439,377,429,378,425,373,418,375,411,371",
          eco_type: 'Mountain',
          status: 'Red - Threatened',
          population: 490,
          last_survey: 2006,
          range: 9405
        },
        {
          id: 22,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Atlin',
          coords: "164,65,167,81,154,101,140,93,136,77,136,62,165,65,156,66",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 800,
          last_survey: 2007,
          range: 6857
        },
        {
          id: 23,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Burnt Pine',
          coords: "391,250,389,248,387,249,383,250,384,252,385,255,386,256,386,261,390,262,395,260,390,257,390,255,392,251",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 19,
          last_survey: 2010,
          range: 710
        },
        {
          id: 24,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Carcross',
          coords: "114,63,115,76,127,86,134,78,135,62,115,59,113,62",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 775,
          last_survey: 2008,
          range: 3174
        },
        {
          id: 25,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Charlotte Alplands',
          coords: "308,412,309,410,314,410,319,402,323,402,322,391,320,388,312,388,308,384,304,387,304,392,305,408,305,410,308,412",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 50,
          last_survey: 2001,
          range: 2650
        },
        {
          id: 26,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Chase',
          coords: "302,192,309,200,313,198,312,196,314,193,318,193,321,196,323,203,327,209,331,214,333,222,337,226,337,231,332,231,330,232,322,229,315,239,305,238,299,240,295,238,292,239,290,237,288,239,285,235,287,230,286,227,279,221,279,217,285,206,288,203,301,193",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 475,
          last_survey: 2009,
          range: 12465
        },
        {
          id: 27,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Edziza',
          coords: "197,150,198,158,196,172,190,178,183,174,183,156,190,149,196,149",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 150,
          last_survey: 2007,
          range: 2341
        },
        {
          id: 28,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Finlay',
          coords: "330,209,331,205,330,202,333,200,335,198,339,199,341,201,343,197,346,196,343,193,345,190,338,182,341,179,338,173,333,170,332,167,325,163,318,164,312,163,303,172,321,196,323,202,327,208",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 26,
          last_survey: 2002,
          range: 8175
        },
        {
          id: 29,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Frog',
          coords: "261,141,261,145,267,147,264,153,265,156,270,155,271,159,273,161,276,160,278,158,282,162,284,168,294,168,298,173,302,171,280,131,272,137,272,141,269,143",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 250,
          last_survey: 2001,
          range: 5039
        },
        {
          id: 30,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Gataga',
          coords: "313,162,318,164,324,163,321,158,321,154,316,147,311,147,310,146,302,145,283,133,303,170,306,168,309,165,312,162",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 338,
          last_survey: 2001,
          range: 5008
        },
        {
          id: 31,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Graham',
          coords: "369,198,369,193,365,192,363,195,360,195,356,193,353,197,345,196,343,198,342,202,343,205,343,209,345,215,344,219,345,220,349,223,351,222,352,224,350,226,352,233,359,233,362,235,365,232,370,229,373,230,376,226,379,227,381,227,387,231,387,228,386,225,390,223,390,221,386,220,382,215,379,209,377,203,372,201,369,197",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 311,
          last_survey: 2009,
          range: 9291
        },
        {
          id: 32,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Horseranch',
          coords: "264,88,263,104,251,116,243,131,232,136,216,136,203,129,213,99,230,91,242,70,256,78,264,88",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 600,
          last_survey: 1999,
          range: 17720
        },
        {
          id: 33,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Itcha-Ilgachuz',
          coords: "333,405,346,395,347,391,351,389,349,385,346,383,346,379,342,378,349,372,347,368,349,364,346,363,345,361,339,356,338,354,332,354,326,358,310,362,319,373,318,375,316,379,317,385,323,389,323,395,324,401,327,403,333,404",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 1367,
          last_survey: 2010,
          range: 9457
        },
        {
          id: 34,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Kennedy Siding',
          coords: "377,277,369,271,368,264,368,263,367,257,369,250,374,253,376,255,383,251,384,254,386,255,385,260,391,263,391,265,388,268,382,266,381,271,377,277",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 119,
          last_survey: 2002,
          range: 2962
        },
        {
          id: 35,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Level Kawdy',
          coords: "160,107,176,134,189,138,200,133,211,101,197,93,181,92,166,99,160,107",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 1500,
          last_survey: 1999,
          range: 11305
        },
        {
          id: 36,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Liard Plateau',
          coords: "283,70,282,79,304,90,318,89,322,81,319,74,314,70,283,70,283,70",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 141,
          last_survey: 2005,
          range: 5069
        },
        {
          id: 37,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Little Rancheria',
          coords: "240,70,233,88,227,92,209,98,198,91,202,83,202,68,239,69",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 1200,
          last_survey: 1999,
          range: 6999
        },
        {
          id: 38,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Moberly',
          coords: "388,247,389,243,386,241,386,236,385,234,385,232,381,229,376,229,373,231,370,230,366,232,363,236,364,238,364,241,366,246,371,251,377,255,382,251,387,248",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 171,
          last_survey: 2008,
          range: 3291
        },
        {
          id: 39,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Muskwa',
          coords: "324,162,339,161,344,156,352,157,358,153,364,154,368,153,369,148,367,146,367,142,365,137,366,125,361,121,357,127,352,117,343,111,327,102,322,97,313,100,303,95,302,93,300,96,306,122,305,126,305,133,311,136,310,145,317,147,322,153,321,158,324,161",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 1300,
          last_survey: 2004,
          range: 22205
        },
        {
          id: 40,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Narraway',
          coords: "438,259,426,260,424,264,430,275,428,278,420,281,415,281,415,284,414,287,413,291,414,292,415,294,420,295,421,294,422,296,426,297,425,301,429,302,430,307,438,308,438,310,437,313,439,314,441,313,442,315,444,315,438,260",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 200,
          last_survey: 2008,
          range: 6372
        },
        {
          id: 41,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Pink Mountain',
          coords: "377,173,373,166,373,161,368,153,366,155,361,155,360,154,357,154,354,158,348,158,344,157,339,162,326,163,333,166,334,170,341,176,342,179,340,182,346,189,344,193,347,196,352,196,356,193,363,194,367,191,370,192,370,187,367,185,368,180,372,176,376,172",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 850,
          last_survey: 2000,
          range: 9583
        },
        {
          id: 42,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Quintette',
          coords: "400,251,408,251,412,257,416,256,425,262,429,274,429,277,422,281,416,281,415,285,413,291,409,292,404,288,406,286,404,281,399,278,397,280,397,277,398,274,396,270,398,264,398,258,400,252",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 195,
          last_survey: 2008,
          range: 6978
        },
        {
          id: 43,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Rabbit',
          coords: "298,95,299,101,302,110,305,121,304,127,304,133,309,137,309,145,303,145,282,131,271,121,269,112,264,105,265,88,273,85,276,85,279,85,286,87,296,94",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 1300,
          last_survey: 2007,
          range: 11791
        },
        {
          id: 44,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Rainbows',
          coords: "287,376,288,382,293,383,297,386,299,385,303,384,304,386,309,383,312,388,319,388,316,385,316,383,314,379,318,373,309,362,303,362,295,369,287,375",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 50,
          last_survey: 2008,
          range: 3804
        },
        {
          id: 45,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Scott',
          coords: "346,256,343,252,347,247,346,242,346,239,348,235,351,233,359,234,362,236,364,243,369,250,366,257,368,263,366,265,365,267,362,265,360,266,360,269,355,269,352,262,346,256,347,256",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 60,
          last_survey: 2006,
          range: 4149
        },
        {
          id: 46,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Spatzizi',
          coords: "276,196,276,187,260,165,255,153,252,140,244,136,234,139,229,147,221,154,214,161,214,167,220,176,229,184,237,188,267,196,276,196",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 3000,
          last_survey: 1996,
          range: 15629
        },
        {
          id: 47,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Swan Lake',
          coords: "200,68,201,83,196,91,182,92,174,87,169,79,166,64,199,67",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 700,
          last_survey: 2007,
          range: 5516
        },
        {
          id: 48,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Takla',
          coords: "315,281,310,285,306,283,303,283,297,276,297,269,299,268,297,263,298,260,306,260,308,266,314,266,309,272,314,280",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 122,
          last_survey: 2004,
          range: 2122
        },
        {
          id: 50,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Telkwa',
          coords: "271,290,276,294,278,299,275,304,276,308,272,316,266,316,259,311,256,307,256,296,261,293,265,293,270,289",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 73,
          last_survey: 2008,
          range: 3098
        },
        {
          id: 51,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Tsenaglode',
          coords: "204,143,221,153,227,148,233,138,217,137,210,134,204,139",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 200,
          last_survey: 1999,
          range: 2463
        },
        {
          id: 52,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Tweedsmuir',
          coords: "290,326,281,328,272,324,261,325,256,332,256,339,261,349,268,356,292,358,300,362,308,361,326,357,325,347,325,343,321,341,306,336,297,329,290,326",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 250,
          last_survey: 2006,
          range: 13425
        },
        {
          id: 53,
          scientific_name: 'Rangifer tarandus pop. 15',
          herd_name: 'Wolverine',
          coords: "300,259,307,259,308,266,314,265,318,268,322,267,326,267,330,269,336,267,341,264,345,265,345,260,345,259,343,257,345,256,343,253,343,251,347,247,335,232,332,232,330,233,323,230,317,239,311,240,306,239,301,241,297,240,293,240,292,244,293,247,299,259",
          eco_type: 'Northern',
          status: 'Blue - Special Concern',
          population: 378,
          last_survey: 2008,
          range: 10541
        },
      ]);
    });
};
