const CONFIG = {
  TIME_LIMIT_MINUTES: 30,
  START_CODE: "CO_PIGNEROLLES_START",
  FINISH_CODE: "CO_PIGNEROLLES_FINISH",
  
  // Mapping des leurres associés à la balise recherchée
  LEURRES_MAP: {
    "B01": ["CO_PIGNEROLLES_L01"],
    "B03": ["CO_PIGNEROLLES_L03"],
    "B05": ["CO_PIGNEROLLES_L05"],
    "B08": ["CO_PIGNEROLLES_L08"]
  },

  // Explications pédagogiques post-course
  LEURRES_INFO: {
    "CO_PIGNEROLLES_L01": "Erreur sur le carrefour. Le vrai QR B01 était sur le chêne au sud du croisement, pas sur le tilleul.",
    "CO_PIGNEROLLES_L03": "Confusion bâtiment / arbre. Le vrai QR B03 était fixé au monument en pierre.",
    "CO_PIGNEROLLES_L05": "Mauvaise orientation du muret. Le vrai QR B05 était sur la face NORD.",
    "CO_PIGNEROLLES_L08": "Erreur d'estimation de distance. Le vrai QR B08 était 30 mètres plus à l'ouest."
  },

  // 15 Parcours pré-configurés
  PARCOURS: {
    "P01": ["B01", "B02", "B05", "B03", "B07", "B06", "B10", "B08"],
    "P02": ["B08", "B10", "B06", "B07", "B03", "B05", "B02", "B01"],
    "P03": ["B02", "B01", "B06", "B10", "B05", "B03", "B08", "B07"],
    "P04": ["B07", "B08", "B03", "B05", "B10", "B06", "B01", "B02"],
    "P05": ["B03", "B05", "B02", "B01", "B07", "B10", "B06", "B08"],
    "P06": ["B06", "B10", "B07", "B01", "B02", "B05", "B03", "B08"],
    "P07": ["B05", "B03", "B08", "B07", "B02", "B01", "B06", "B10"],
    "P08": ["B10", "B06", "B01", "B02", "B07", "B08", "B03", "B05"],
    "P09": ["B01", "B06", "B02", "B05", "B08", "B03", "B10", "B07"],
    "P10": ["B08", "B03", "B05", "B02", "B06", "B01", "B07", "B10"],
    "P11": ["B02", "B05", "B03", "B08", "B01", "B06", "B10", "B07"],
    "P12": ["B07", "B10", "B06", "B01", "B08", "B03", "B05", "B02"],
    "P13": ["B03", "B08", "B07", "B10", "B02", "B05", "B01", "B06"],
    "P14": ["B06", "B01", "B05", "B02", "B03", "B08", "B07", "B10"],
    "P15": ["B05", "B02", "B01", "B06", "B08", "B07", "B10", "B03"]
  }
};