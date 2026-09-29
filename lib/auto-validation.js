import { CAR_MODELS } from "./car-models";

export function validateVehicle(values, today = new Date()) {
  const { vehicleChoice, searchMethod, registration, brand, model, customBrand, customModel, firstRegistration } = values;
  const errors = {};
  if (!["current", "future"].includes(vehicleChoice)) {
    errors["auto-vehicle-current"] = "Sélectionnez la voiture que vous souhaitez assurer.";
    return errors;
  }
  // The future-purchase branch currently only contains the vehicle-choice question.
  if (vehicleChoice === "future") return errors;
  if (!["registration", "make_model"].includes(searchMethod)) {
    errors["auto-search-registration"] = "Choisissez une méthode de recherche.";
    return errors;
  }
  if (searchMethod === "registration") {
    if (!/^[A-Z]{2}-[0-9]{3}-[A-Z]{2}$/.test(registration)) {
      errors["auto-registration"] = "Saisissez une immatriculation complète au format AA-123-AA.";
    }
  } else {
    if (brand !== "other" && !Object.hasOwn(CAR_MODELS, brand)) {
      errors["brand-search"] = "Sélectionnez la marque de votre voiture.";
      return errors;
    }
    if (brand === "other" && !customBrand.trim()) {
      errors["auto-custom-brand"] = "Précisez la marque de votre voiture.";
      return errors;
    }
    if (brand === "other" || model === "other") {
      if (!customModel.trim()) errors["auto-custom-model"] = "Précisez le modèle de votre voiture.";
    } else if (!CAR_MODELS[brand].includes(model)) {
      errors["auto-model"] = "Sélectionnez le modèle de votre voiture.";
    }
  }
  // Date fields only appear once a plate has been entered or a model selected.
  if (Object.keys(errors).length) return errors;
  const { month, year } = firstRegistration;
  if (!/^(0[1-9]|1[0-2])$/.test(month)) errors["first-registration-month"] = "Sélectionnez le mois.";
  if (!/^\d{4}$/.test(year) || Number(year) < 1900 || Number(year) > today.getFullYear()) {
    errors["first-registration-year"] = "Saisissez une année valide, comprise entre 1900 et l’année actuelle.";
  } else if (Number(year) === today.getFullYear() && Number(month) > today.getMonth() + 1) {
    errors["first-registration-month"] = "La première immatriculation ne peut pas être dans le futur.";
  }
  return errors;
}
