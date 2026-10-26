import image_hero from "../../Images/FormsBackground.jpg";
import image_portrait from "../../Images/Realtor-solo.webp";
import image_home from "../../Images/Don'tJustListIt.webp";
import image_kitchen from "../../Images/GetItSold.webp";
import image_keys from "../../Images/GuideToBuyers.webp";
import image_valley from "../../Images/photoGallery1.webp";
import image_windows from "../../Images/photogallery2.webp";
import image_terrace from "../../Images/photogallery3.webp";
import image_rooftops from "../../Images/photogallery4.webp";
import image_grounds from "../../Images/photogallery6.webp";
import image_courts from "../../Images/photogallery7.webp";
import image_greens from "../../Images/photogallery8.webp";
import image_interior from "../../Images/services1.webp";
import image_architecture from "../../Images/services2.webp";
import image_service from "../../Images/services3.webp";
import image_ridge from "../../Images/RidgeRealtyGroupLogo.webp";
import image_realtor from "../../Images/RealtoLogo.webp";
import image_chamber from "../../Images/PahrumpValleyLogo.webp";
import image_housing from "../../Images/EqualHousingOpportunity.webp";
import image_wordmark from "../../Images/Marci Metzger Homes - Real Estate Agent, Real Estate, Realtor_files/qt=q_95_ie-d.webp";
export const assets = {
  hero: { source: "Images/FormsBackground.jpg", image: image_hero, alt: "Poolside residence at dusk", role: "arrival", priority: 'high', crop: '3:2', propertyAssociation: null },
  portrait: { source: "Images/Realtor-solo.webp", image: image_portrait, alt: "Marci Metzger in a navy jacket", role: "arrival, about", priority: 'high', crop: '1:1', propertyAssociation: null },
  home: { source: "Images/Don'tJustListIt.webp", image: image_home, alt: "Illuminated single-story home and swimming pool", role: "perspective", priority: 'normal', crop: '2:1', propertyAssociation: null },
  kitchen: { source: "Images/GetItSold.webp", image: image_kitchen, alt: "Bright kitchen with a white island and pendant lighting", role: "spotlights", priority: 'normal', crop: '2:1', propertyAssociation: null },
  keys: { source: "Images/GuideToBuyers.webp", image: image_keys, alt: "House keys with a red home-shaped key ring", role: "buyer services", priority: 'normal', crop: '2:1', propertyAssociation: null },
  valley: { source: "Images/photoGallery1.webp", image: image_valley, alt: "Aerial view of a golf course, lake, and desert mountains", role: "collection, gallery", priority: 'normal', crop: '3:2', propertyAssociation: null },
  windows: { source: "Images/photogallery2.webp", image: image_windows, alt: "Sitting room with expansive windows overlooking the landscape", role: "collection, gallery", priority: 'normal', crop: '3:2', propertyAssociation: null },
  terrace: { source: "Images/photogallery3.webp", image: image_terrace, alt: "Aerial view of a residence and surrounding desert landscape", role: "collection, gallery", priority: 'normal', crop: '3:2', propertyAssociation: null },
  rooftops: { source: "Images/photogallery4.webp", image: image_rooftops, alt: "Tiled rooftops and landscaped grounds from above", role: "collection, gallery", priority: 'normal', crop: '3:2', propertyAssociation: null },
  grounds: { source: "Images/photogallery6.webp", image: image_grounds, alt: "Aerial view of landscaped community grounds and walking paths", role: "collection, gallery", priority: 'normal', crop: '3:2', propertyAssociation: null },
  courts: { source: "Images/photogallery7.webp", image: image_courts, alt: "Aerial view of tennis courts and the surrounding neighborhood", role: "collection, gallery", priority: 'normal', crop: '3:2', propertyAssociation: null },
  greens: { source: "Images/photogallery8.webp", image: image_greens, alt: "Homes and green fairways with mountains on the horizon", role: "collection, gallery", priority: 'normal', crop: '3:2', propertyAssociation: null },
  interior: { source: "Images/services1.webp", image: image_interior, alt: "Light-filled interior with an open stair and dining area", role: "lifestyle", priority: 'normal', crop: '1:1', propertyAssociation: null },
  architecture: { source: "Images/services2.webp", image: image_architecture, alt: "Contemporary white house and garden", role: "lifestyle", priority: 'normal', crop: '1:1', propertyAssociation: null },
  service: { source: "Images/services3.webp", image: image_service, alt: "A conversation over paperwork at a table", role: "lifestyle", priority: 'normal', crop: '1:1', propertyAssociation: null },
  ridge: { source: "Images/RidgeRealtyGroupLogo.webp", image: image_ridge, alt: "The Ridge Realty Group", role: "affiliations", priority: 'normal', crop: '1:1', propertyAssociation: null },
  realtor: { source: "Images/RealtoLogo.webp", image: image_realtor, alt: "REALTOR emblem", role: "affiliations", priority: 'normal', crop: '1:1', propertyAssociation: null },
  chamber: { source: "Images/PahrumpValleyLogo.webp", image: image_chamber, alt: "Pahrump Valley Chamber of Commerce", role: "affiliations", priority: 'normal', crop: '1:1', propertyAssociation: null },
  housing: { source: "Images/EqualHousingOpportunity.webp", image: image_housing, alt: "Equal Housing Opportunity", role: "footer", priority: 'normal', crop: '1:1', propertyAssociation: null },
  wordmark: { source: "Images/Marci Metzger Homes - Real Estate Agent, Real Estate, Realtor_files/qt=q_95_ie-d.webp", image: image_wordmark, alt: "Marci Metzger Homes", role: "footer", priority: 'normal', crop: 'natural', propertyAssociation: null }
} as const;
export const collection = [
 {slug:'valley', asset:assets.valley, title:'A wider perspective', subtitle:'Landscape / aerial view'},
 {slug:'windows', asset:assets.windows, title:'Room for the view', subtitle:'Interiors / natural light'},
 {slug:'terrace', asset:assets.terrace, title:'Space to settle in', subtitle:'Architecture / exterior'},
 {slug:'courts', asset:assets.courts, title:'Life beyond your door', subtitle:'Landscape / community spaces'},
 {slug:'rooftops', asset:assets.rooftops, title:'A sense of place', subtitle:'Architecture / from above'},
 {slug:'grounds', asset:assets.grounds, title:'Room to wander', subtitle:'Landscape / open spaces'},
 {slug:'greens', asset:assets.greens, title:'Beyond the horizon', subtitle:'Landscape / fairways'},
];
export const gallery = [assets.valley, assets.windows, assets.terrace, assets.rooftops, assets.grounds, assets.courts, assets.greens];
