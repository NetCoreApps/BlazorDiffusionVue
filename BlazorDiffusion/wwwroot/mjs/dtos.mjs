/* Options:
Date: 2024-07-31 18:47:01
Version: 8.30
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: https://localhost:5001

//AddServiceStackTypes: True
//AddDocAnnotations: True
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/

"use strict";
export class AuditBase {
    /** @param {{createdDate?:string,createdBy?:string,modifiedDate?:string,modifiedBy?:string,deletedDate?:string,deletedBy?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    createdDate;
    /** @type {string} */
    createdBy;
    /** @type {string} */
    modifiedDate;
    /** @type {string} */
    modifiedBy;
    /** @type {?string} */
    deletedDate;
    /** @type {string} */
    deletedBy;
}
export class Artifact extends AuditBase {
    /** @param {{id?:number,creativeId?:number,fileName?:string,filePath?:string,contentType?:string,contentLength?:number,width?:number,height?:number,seed?:number,prompt?:string,nsfw?:boolean,averageHash?:number,perceptualHash?:number,differenceHash?:number,background?:string,lqip?:string,quality?:number,likesCount?:number,albumsCount?:number,downloadsCount?:number,searchCount?:number,temporalScore?:number,score?:number,rank?:number,refId?:string,filePathSmall?:string,filePathMedium?:string,filePathLarge?:string,versions?:{ [index: string]: string; },createdDate?:string,createdBy?:string,modifiedDate?:string,modifiedBy?:string,deletedDate?:string,deletedBy?:string}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {number} */
    creativeId;
    /** @type {string} */
    fileName;
    /** @type {string} */
    filePath;
    /** @type {string} */
    contentType;
    /** @type {number} */
    contentLength;
    /** @type {number} */
    width;
    /** @type {number} */
    height;
    /** @type {number} */
    seed;
    /** @type {string} */
    prompt;
    /** @type {?boolean} */
    nsfw;
    /** @type {?number} */
    averageHash;
    /** @type {?number} */
    perceptualHash;
    /** @type {?number} */
    differenceHash;
    /** @type {?string} */
    background;
    /** @type {?string} */
    lqip;
    /** @type {number} */
    quality;
    /** @type {number} */
    likesCount;
    /** @type {number} */
    albumsCount;
    /** @type {number} */
    downloadsCount;
    /** @type {number} */
    searchCount;
    /** @type {number} */
    temporalScore;
    /** @type {number} */
    score;
    /** @type {number} */
    rank;
    /** @type {string} */
    refId;
    /** @type {?string} */
    filePathSmall;
    /** @type {?string} */
    filePathMedium;
    /** @type {?string} */
    filePathLarge;
    /** @type {{ [index: string]: string; }} */
    versions;
}
export class AlbumArtifact {
    /** @param {{id?:number,albumId?:number,artifactId?:number,description?:string,createdDate?:string,modifiedDate?:string,artifact?:Artifact}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {number} */
    albumId;
    /** @type {number} */
    artifactId;
    /** @type {?string} */
    description;
    /** @type {string} */
    createdDate;
    /** @type {string} */
    modifiedDate;
    /** @type {?Artifact} */
    artifact;
}
export class Album extends AuditBase {
    /** @param {{id?:number,name?:string,description?:string,slug?:string,tags?:string[],refId?:string,ownerId?:number,ownerRef?:string,primaryArtifactId?:number,private?:boolean,rating?:number,likesCount?:number,downloadsCount?:number,searchCount?:number,score?:number,rank?:number,prefColumns?:number,artifacts?:AlbumArtifact[],createdDate?:string,createdBy?:string,modifiedDate?:string,modifiedBy?:string,deletedDate?:string,deletedBy?:string}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {?string} */
    name;
    /** @type {string} */
    description;
    /** @type {string} */
    slug;
    /** @type {string[]} */
    tags;
    /** @type {string} */
    refId;
    /** @type {number} */
    ownerId;
    /** @type {string} */
    ownerRef;
    /** @type {?number} */
    primaryArtifactId;
    /** @type {boolean} */
    private;
    /** @type {?number} */
    rating;
    /** @type {number} */
    likesCount;
    /** @type {number} */
    downloadsCount;
    /** @type {number} */
    searchCount;
    /** @type {number} */
    score;
    /** @type {number} */
    rank;
    /** @type {?number} */
    prefColumns;
    /** @type {AlbumArtifact[]} */
    artifacts;
}
export class AlbumLike {
    /** @param {{id?:number,albumId?:number,appUserId?:number,createdDate?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {number} */
    albumId;
    /** @type {number} */
    appUserId;
    /** @type {string} */
    createdDate;
}
export class ArtifactLike {
    /** @param {{id?:number,artifactId?:number,appUserId?:number,createdDate?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {number} */
    artifactId;
    /** @type {number} */
    appUserId;
    /** @type {string} */
    createdDate;
}
/** @typedef {'Nsfw'|'Malformed'|'Blurred'|'LowQuality'|'Other'} */
export var ReportType;
(function (ReportType) {
    ReportType["Nsfw"] = "Nsfw"
    ReportType["Malformed"] = "Malformed"
    ReportType["Blurred"] = "Blurred"
    ReportType["LowQuality"] = "LowQuality"
    ReportType["Other"] = "Other"
})(ReportType || (ReportType = {}));
export class ArtifactReport {
    /** @param {{id?:number,artifactId?:number,appUserId?:number,artifact?:Artifact,type?:ReportType,description?:string,createdDate?:string,notes?:string,actionedDate?:string,actionedBy?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {number} */
    artifactId;
    /** @type {number} */
    appUserId;
    /** @type {Artifact} */
    artifact;
    /** @type {ReportType} */
    type;
    /** @type {?string} */
    description;
    /** @type {string} */
    createdDate;
    /** @type {?string} */
    notes;
    /** @type {?string} */
    actionedDate;
    /** @type {?string} */
    actionedBy;
}
export class Artist extends AuditBase {
    /** @param {{id?:number,firstName?:string,lastName?:string,yearDied?:number,type?:string[],score?:number,rank?:number,createdDate?:string,createdBy?:string,modifiedDate?:string,modifiedBy?:string,deletedDate?:string,deletedBy?:string}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {?string} */
    firstName;
    /** @type {string} */
    lastName;
    /** @type {?number} */
    yearDied;
    /** @type {?string[]} */
    type;
    /** @type {number} */
    score;
    /** @type {number} */
    rank;
}
export class CreativeArtist {
    /** @param {{id?:number,creativeId?:number,artistId?:number,artist?:Artist}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {number} */
    creativeId;
    /** @type {number} */
    artistId;
    /** @type {Artist} */
    artist;
}
export class Modifier extends AuditBase {
    /** @param {{id?:number,name?:string,category?:string,description?:string,score?:number,rank?:number,createdDate?:string,createdBy?:string,modifiedDate?:string,modifiedBy?:string,deletedDate?:string,deletedBy?:string}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    name;
    /** @type {string} */
    category;
    /** @type {?string} */
    description;
    /** @type {number} */
    score;
    /** @type {number} */
    rank;
}
export class CreativeModifier {
    /** @param {{id?:number,creativeId?:number,modifierId?:number,modifier?:Modifier}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {number} */
    creativeId;
    /** @type {number} */
    modifierId;
    /** @type {Modifier} */
    modifier;
}
export class Creative extends AuditBase {
    /** @param {{id?:number,userPrompt?:string,prompt?:string,images?:number,width?:number,height?:number,steps?:number,curatedArtifactId?:number,primaryArtifactId?:number,artistNames?:string[],modifierNames?:string[],artists?:CreativeArtist[],modifiers?:CreativeModifier[],artifacts?:Artifact[],error?:string,ownerId?:number,ownerRef?:string,key?:string,curated?:boolean,rating?:number,private?:boolean,score?:number,rank?:number,refId?:string,requestId?:string,engineId?:string,createdDate?:string,createdBy?:string,modifiedDate?:string,modifiedBy?:string,deletedDate?:string,deletedBy?:string}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    userPrompt;
    /** @type {string} */
    prompt;
    /** @type {number} */
    images;
    /** @type {number} */
    width;
    /** @type {number} */
    height;
    /** @type {number} */
    steps;
    /** @type {?number} */
    curatedArtifactId;
    /** @type {?number} */
    primaryArtifactId;
    /** @type {string[]} */
    artistNames;
    /** @type {string[]} */
    modifierNames;
    /** @type {CreativeArtist[]} */
    artists;
    /** @type {CreativeModifier[]} */
    modifiers;
    /** @type {Artifact[]} */
    artifacts;
    /** @type {?string} */
    error;
    /** @type {?number} */
    ownerId;
    /** @type {?string} */
    ownerRef;
    /** @type {?string} */
    key;
    /** @type {boolean} */
    curated;
    /** @type {?number} */
    rating;
    /** @type {boolean} */
    private;
    /** @type {number} */
    score;
    /** @type {number} */
    rank;
    /** @type {string} */
    refId;
    /** @type {string} */
    requestId;
    /** @type {string} */
    engineId;
}
/** @typedef {'Original'|'Small'|'Medium'|'Large'} */
export var ArtifactSize;
(function (ArtifactSize) {
    ArtifactSize["Original"] = "Original"
    ArtifactSize["Small"] = "Small"
    ArtifactSize["Medium"] = "Medium"
    ArtifactSize["Large"] = "Large"
})(ArtifactSize || (ArtifactSize = {}));
/** @typedef {'Updates'|'Beta'} */
export var SignupType;
(function (SignupType) {
    SignupType["Updates"] = "Updates"
    SignupType["Beta"] = "Beta"
})(SignupType || (SignupType = {}));
export class StatBase {
    /** @param {{refId?:string,appUserId?:number,rawUrl?:string,remoteIp?:string,createdDate?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    refId;
    /** @type {?number} */
    appUserId;
    /** @type {string} */
    rawUrl;
    /** @type {string} */
    remoteIp;
    /** @type {string} */
    createdDate;
}
export class Signup extends StatBase {
    /** @param {{id?:number,type?:SignupType,email?:string,name?:string,cancelledDate?:string,refId?:string,appUserId?:number,rawUrl?:string,remoteIp?:string,createdDate?:string}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {SignupType} */
    type;
    /** @type {string} */
    email;
    /** @type {?string} */
    name;
    /** @type {?string} */
    cancelledDate;
}
/** @typedef TKey {any} */
export class IdentityUser {
    /** @param {{id?:TKey,userName?:string,normalizedUserName?:string,email?:string,normalizedEmail?:string,emailConfirmed?:boolean,passwordHash?:string,securityStamp?:string,concurrencyStamp?:string,phoneNumber?:string,phoneNumberConfirmed?:boolean,twoFactorEnabled?:boolean,lockoutEnd?:string,lockoutEnabled?:boolean,accessFailedCount?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {TKey} */
    id;
    /** @type {?string} */
    userName;
    /** @type {?string} */
    normalizedUserName;
    /** @type {?string} */
    email;
    /** @type {?string} */
    normalizedEmail;
    /** @type {boolean} */
    emailConfirmed;
    /** @type {?string} */
    passwordHash;
    /** @type {?string} */
    securityStamp;
    /** @type {?string} */
    concurrencyStamp;
    /** @type {?string} */
    phoneNumber;
    /** @type {boolean} */
    phoneNumberConfirmed;
    /** @type {boolean} */
    twoFactorEnabled;
    /** @type {?string} */
    lockoutEnd;
    /** @type {boolean} */
    lockoutEnabled;
    /** @type {number} */
    accessFailedCount;
}
export class AppUser extends IdentityUser {
    /** @param {{firstName?:string,lastName?:string,displayName?:string,profileUrl?:string,avatar?:string,handle?:string,refId?:number,refIdStr?:string,isArchived?:boolean,archivedDate?:string,lastLoginIp?:string,lastLoginDate?:string,createdDate?:string,modifiedDate?:string,id?:TKey,userName?:string,normalizedUserName?:string,email?:string,normalizedEmail?:string,emailConfirmed?:boolean,passwordHash?:string,securityStamp?:string,concurrencyStamp?:string,phoneNumber?:string,phoneNumberConfirmed?:boolean,twoFactorEnabled?:boolean,lockoutEnd?:string,lockoutEnabled?:boolean,accessFailedCount?:number}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?string} */
    firstName;
    /** @type {?string} */
    lastName;
    /** @type {?string} */
    displayName;
    /** @type {?string} */
    profileUrl;
    /** @type {?string} */
    avatar;
    /** @type {?string} */
    handle;
    /** @type {?number} */
    refId;
    /** @type {string} */
    refIdStr;
    /** @type {boolean} */
    isArchived;
    /** @type {?string} */
    archivedDate;
    /** @type {?string} */
    lastLoginIp;
    /** @type {?string} */
    lastLoginDate;
    /** @type {string} */
    createdDate;
    /** @type {string} */
    modifiedDate;
}
export class QueryBase {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    skip;
    /** @type {?number} */
    take;
    /** @type {string} */
    orderBy;
    /** @type {string} */
    orderByDesc;
    /** @type {string} */
    include;
    /** @type {string} */
    fields;
    /** @type {{ [index: string]: string; }} */
    meta;
}
/** @typedef From {any} */
/** @typedef  Into {any} */
export class QueryDb_2 extends QueryBase {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
}
export class ArtifactResult extends Artifact {
    /** @param {{userPrompt?:string,artistNames?:string[],modifierNames?:string[],primaryArtifactId?:number,ownerRef?:string,similarity?:number,id?:number,creativeId?:number,fileName?:string,filePath?:string,contentType?:string,contentLength?:number,width?:number,height?:number,seed?:number,prompt?:string,nsfw?:boolean,averageHash?:number,perceptualHash?:number,differenceHash?:number,background?:string,lqip?:string,quality?:number,likesCount?:number,albumsCount?:number,downloadsCount?:number,searchCount?:number,temporalScore?:number,score?:number,rank?:number,refId?:string,filePathSmall?:string,filePathMedium?:string,filePathLarge?:string,versions?:{ [index: string]: string; },createdDate?:string,createdBy?:string,modifiedDate?:string,modifiedBy?:string,deletedDate?:string,deletedBy?:string}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {string} */
    userPrompt;
    /** @type {string[]} */
    artistNames;
    /** @type {string[]} */
    modifierNames;
    /** @type {?number} */
    primaryArtifactId;
    /** @type {string} */
    ownerRef;
    /** @type {?number} */
    similarity;
}
/** @typedef T {any} */
export class QueryData extends QueryBase {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
}
export class ArtifactCommentVote {
    /** @param {{id?:number,artifactCommentId?:number,appUserId?:number,vote?:number,createdDate?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {number} */
    artifactCommentId;
    /** @type {number} */
    appUserId;
    /** @type {number} */
    vote;
    /** @type {string} */
    createdDate;
}
/** @typedef T {any} */
export class QueryDb_1 extends QueryBase {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
}
/** @typedef {'Download'} */
export var StatType;
(function (StatType) {
    StatType["Download"] = "Download"
})(StatType || (StatType = {}));
export class ArtifactStat extends StatBase {
    /** @param {{id?:number,type?:StatType,artifactId?:number,source?:string,version?:string,refId?:string,appUserId?:number,rawUrl?:string,remoteIp?:string,createdDate?:string}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {StatType} */
    type;
    /** @type {number} */
    artifactId;
    /** @type {string} */
    source;
    /** @type {string} */
    version;
}
export class SearchStat extends StatBase {
    /** @param {{id?:number,query?:string,similar?:string,user?:string,modifier?:string,artist?:string,album?:string,show?:string,source?:string,artifactId?:number,albumId?:number,modifierId?:number,artistId?:number,refId?:string,appUserId?:number,rawUrl?:string,remoteIp?:string,createdDate?:string}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {?string} */
    query;
    /** @type {?string} */
    similar;
    /** @type {?string} */
    user;
    /** @type {?string} */
    modifier;
    /** @type {?string} */
    artist;
    /** @type {?string} */
    album;
    /** @type {?string} */
    show;
    /** @type {?string} */
    source;
    /** @type {?number} */
    artifactId;
    /** @type {?number} */
    albumId;
    /** @type {?number} */
    modifierId;
    /** @type {?number} */
    artistId;
}
export class CommentResult {
    /** @param {{id?:number,artifactId?:number,replyId?:number,content?:string,upVotes?:number,downVotes?:number,votes?:number,flagReason?:string,notes?:string,appUserId?:number,displayName?:string,handle?:string,profileUrl?:string,avatar?:string,createdDate?:string,modifiedDate?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {number} */
    artifactId;
    /** @type {?number} */
    replyId;
    /** @type {string} */
    content;
    /** @type {number} */
    upVotes;
    /** @type {number} */
    downVotes;
    /** @type {number} */
    votes;
    /** @type {?string} */
    flagReason;
    /** @type {?string} */
    notes;
    /** @type {number} */
    appUserId;
    /** @type {string} */
    displayName;
    /** @type {?string} */
    handle;
    /** @type {?string} */
    profileUrl;
    /** @type {?string} */
    avatar;
    /** @type {string} */
    createdDate;
    /** @type {string} */
    modifiedDate;
}
export class ArtifactComment extends AuditBase {
    /** @param {{id?:number,artifactId?:number,replyId?:number,content?:string,upVotes?:number,downVotes?:number,votes?:number,flagReason?:string,notes?:string,refId?:string,appUserId?:number,createdDate?:string,createdBy?:string,modifiedDate?:string,modifiedBy?:string,deletedDate?:string,deletedBy?:string}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {number} */
    artifactId;
    /** @type {?number} */
    replyId;
    /** @type {string} */
    content;
    /** @type {number} */
    upVotes;
    /** @type {number} */
    downVotes;
    /** @type {number} */
    votes;
    /** @type {?string} */
    flagReason;
    /** @type {?string} */
    notes;
    /** @type {string} */
    refId;
    /** @type {number} */
    appUserId;
}
/** @typedef {'Offensive'|'Spam'|'Nudity'|'Illegal'|'Other'} */
export var PostReport;
(function (PostReport) {
    PostReport["Offensive"] = "Offensive"
    PostReport["Spam"] = "Spam"
    PostReport["Nudity"] = "Nudity"
    PostReport["Illegal"] = "Illegal"
    PostReport["Other"] = "Other"
})(PostReport || (PostReport = {}));
export class ArtifactCommentReport {
    /** @param {{id?:number,artifactCommentId?:number,appUserId?:number,postReport?:PostReport,description?:string,createdDate?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {number} */
    artifactCommentId;
    /** @type {number} */
    appUserId;
    /** @type {PostReport} */
    postReport;
    /** @type {string} */
    description;
    /** @type {string} */
    createdDate;
}
export class PageStats {
    /** @param {{label?:string,total?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    label;
    /** @type {number} */
    total;
}
export class ResponseError {
    /** @param {{errorCode?:string,fieldName?:string,message?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    errorCode;
    /** @type {string} */
    fieldName;
    /** @type {string} */
    message;
    /** @type {{ [index: string]: string; }} */
    meta;
}
export class ResponseStatus {
    /** @param {{errorCode?:string,message?:string,stackTrace?:string,errors?:ResponseError[],meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    errorCode;
    /** @type {string} */
    message;
    /** @type {string} */
    stackTrace;
    /** @type {ResponseError[]} */
    errors;
    /** @type {{ [index: string]: string; }} */
    meta;
}
export class AlbumResult {
    /** @param {{id?:number,name?:string,slug?:string,albumRef?:string,ownerRef?:string,primaryArtifactId?:number,score?:number,artifactIds?:number[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    name;
    /** @type {string} */
    slug;
    /** @type {string} */
    albumRef;
    /** @type {string} */
    ownerRef;
    /** @type {?number} */
    primaryArtifactId;
    /** @type {number} */
    score;
    /** @type {number[]} */
    artifactIds;
}
export class ArtistInfo {
    /** @param {{id?:number,name?:string,type?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    name;
    /** @type {?string} */
    type;
}
export class ModifierInfo {
    /** @param {{id?:number,name?:string,category?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    name;
    /** @type {string} */
    category;
}
export class Likes {
    /** @param {{artifactIds?:number[],albumIds?:number[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number[]} */
    artifactIds;
    /** @type {number[]} */
    albumIds;
}
export class UserResult {
    /** @param {{refId?:string,handle?:string,avatar?:string,profileUrl?:string,likes?:Likes,albums?:AlbumResult[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    refId;
    /** @type {?string} */
    handle;
    /** @type {?string} */
    avatar;
    /** @type {?string} */
    profileUrl;
    /** @type {Likes} */
    likes;
    /** @type {AlbumResult[]} */
    albums;
}
export class AlbumRef {
    /** @param {{refId?:string,ownerId?:number,name?:string,slug?:string,description?:string,tags?:string[],primaryArtifactRef?:string,artifactsCount?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    refId;
    /** @type {number} */
    ownerId;
    /** @type {string} */
    name;
    /** @type {string} */
    slug;
    /** @type {string} */
    description;
    /** @type {string[]} */
    tags;
    /** @type {?string} */
    primaryArtifactRef;
    /** @type {number} */
    artifactsCount;
}
export class AdminDataResponse {
    /** @param {{pageStats?:PageStats[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {PageStats[]} */
    pageStats;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class GetCreativesInAlbumsResponse {
    /** @param {{results?:AlbumResult[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {AlbumResult[]} */
    results;
}
export class IdResponse {
    /** @param {{id?:string,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    id;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class CheckQuotaResponse {
    /** @param {{timeRemaining?:string,creditsUsed?:number,creditsRequested?:number,creditsRemaining?:number,dailyQuota?:number,requestedDetails?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    timeRemaining;
    /** @type {number} */
    creditsUsed;
    /** @type {number} */
    creditsRequested;
    /** @type {number} */
    creditsRemaining;
    /** @type {number} */
    dailyQuota;
    /** @type {string} */
    requestedDetails;
}
export class CreateCreativeResponse {
    /** @param {{result?:Creative,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {Creative} */
    result;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class GetCreativeResponse {
    /** @param {{result?:Creative,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {Creative} */
    result;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class SearchDataResponse {
    /** @param {{artists?:ArtistInfo[],modifiers?:ModifierInfo[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {ArtistInfo[]} */
    artists;
    /** @type {ModifierInfo[]} */
    modifiers;
}
export class GetUserInfoResponse {
    /** @param {{result?:UserResult,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {UserResult} */
    result;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class AnonDataResponse {
    /** @param {{topAlbums?:AlbumResult[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {AlbumResult[]} */
    topAlbums;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class GetAlbumIdsResponse {
    /** @param {{results?:number[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number[]} */
    results;
}
export class GetAlbumRefsResponse {
    /** @param {{results?:AlbumRef[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {AlbumRef[]} */
    results;
}
export class UserProfile {
    /** @param {{displayName?:string,avatar?:string,handle?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    displayName;
    /** @type {?string} */
    avatar;
    /** @type {?string} */
    handle;
}
export class UserDataResponse {
    /** @param {{user?:UserResult,profile?:UserProfile,signups?:SignupType[],roles?:string[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {UserResult} */
    user;
    /** @type {UserProfile} */
    profile;
    /** @type {SignupType[]} */
    signups;
    /** @type {string[]} */
    roles;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class GetAlbumResultsResponse {
    /** @param {{results?:AlbumResult[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {AlbumResult[]} */
    results;
}
export class EmptyResponse {
    /** @param {{responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {ResponseStatus} */
    responseStatus;
}
export class GetUserProfileResponse {
    /** @param {{result?:UserProfile,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {UserProfile} */
    result;
    /** @type {ResponseStatus} */
    responseStatus;
}
/** @typedef T {any} */
export class QueryResponse {
    /** @param {{offset?:number,total?:number,results?:T[],meta?:{ [index: string]: string; },responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    offset;
    /** @type {number} */
    total;
    /** @type {T[]} */
    results;
    /** @type {{ [index: string]: string; }} */
    meta;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class Todo {
    /** @param {{id?:number,text?:string,isFinished?:boolean}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    text;
    /** @type {boolean} */
    isFinished;
}
export class GetArtifactUserDataResponse {
    /** @param {{artifactId?:number,liked?:boolean,upVoted?:number[],downVoted?:number[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    artifactId;
    /** @type {boolean} */
    liked;
    /** @type {number[]} */
    upVoted;
    /** @type {number[]} */
    downVoted;
}
export class GetAlbumUserDataResponse {
    /** @param {{albumId?:number,likedArtifacts?:number[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    albumId;
    /** @type {number[]} */
    likedArtifacts;
}
export class AuthenticateResponse {
    /** @param {{userId?:string,sessionId?:string,userName?:string,displayName?:string,referrerUrl?:string,bearerToken?:string,refreshToken?:string,refreshTokenExpiry?:string,profileUrl?:string,roles?:string[],permissions?:string[],responseStatus?:ResponseStatus,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    userId;
    /** @type {string} */
    sessionId;
    /** @type {string} */
    userName;
    /** @type {string} */
    displayName;
    /** @type {string} */
    referrerUrl;
    /** @type {string} */
    bearerToken;
    /** @type {string} */
    refreshToken;
    /** @type {?string} */
    refreshTokenExpiry;
    /** @type {string} */
    profileUrl;
    /** @type {string[]} */
    roles;
    /** @type {string[]} */
    permissions;
    /** @type {ResponseStatus} */
    responseStatus;
    /** @type {{ [index: string]: string; }} */
    meta;
}
export class AdminData {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'AdminData' }
    getMethod() { return 'GET' }
    createResponse() { return new AdminDataResponse() }
}
export class CreateAlbum {
    /** @param {{name?:string,description?:string,tags?:string[],primaryArtifactId?:number,artifactIds?:number[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    name;
    /** @type {string} */
    description;
    /** @type {?string[]} */
    tags;
    /** @type {?number} */
    primaryArtifactId;
    /** @type {?number[]} */
    artifactIds;
    getTypeName() { return 'CreateAlbum' }
    getMethod() { return 'POST' }
    createResponse() { return new Album() }
}
export class UpdateAlbum {
    /** @param {{id?:number,name?:string,description?:string,slug?:string,tags?:string[],primaryArtifactId?:number,unpinPrimaryArtifact?:boolean,addArtifactIds?:number[],removeArtifactIds?:number[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {?string} */
    name;
    /** @type {?string} */
    description;
    /** @type {?string} */
    slug;
    /** @type {?string[]} */
    tags;
    /** @type {?number} */
    primaryArtifactId;
    /** @type {?boolean} */
    unpinPrimaryArtifact;
    /** @type {?number[]} */
    addArtifactIds;
    /** @type {?number[]} */
    removeArtifactIds;
    getTypeName() { return 'UpdateAlbum' }
    getMethod() { return 'PATCH' }
    createResponse() { return new Album() }
}
export class GetCreativesInAlbums {
    /** @param {{creativeId?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    creativeId;
    getTypeName() { return 'GetCreativesInAlbums' }
    getMethod() { return 'GET' }
    createResponse() { return new GetCreativesInAlbumsResponse() }
}
export class CreateAlbumLike {
    /** @param {{albumId?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    albumId;
    getTypeName() { return 'CreateAlbumLike' }
    getMethod() { return 'POST' }
    createResponse() { return new IdResponse() }
}
export class DeleteAlbumLike {
    /** @param {{albumId?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    albumId;
    getTypeName() { return 'DeleteAlbumLike' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}
export class CreateArtifactLike {
    /** @param {{artifactId?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    artifactId;
    getTypeName() { return 'CreateArtifactLike' }
    getMethod() { return 'POST' }
    createResponse() { return new IdResponse() }
}
export class DeleteArtifactLike {
    /** @param {{artifactId?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    artifactId;
    getTypeName() { return 'DeleteArtifactLike' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}
export class CreateArtifactReport {
    /** @param {{artifactId?:number,type?:ReportType,description?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    artifactId;
    /** @type {ReportType} */
    type;
    /** @type {?string} */
    description;
    getTypeName() { return 'CreateArtifactReport' }
    getMethod() { return 'POST' }
    createResponse() { return new ArtifactReport() }
}
export class DeleteArtifactReport {
    /** @param {{artifactId?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    artifactId;
    getTypeName() { return 'DeleteArtifactReport' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}
export class DownloadArtifact {
    /** @param {{refId?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    refId;
    getTypeName() { return 'DownloadArtifact' }
    getMethod() { return 'GET' }
    createResponse() { return new Blob() }
}
export class DownloadDirect {
    /** @param {{refId?:string,encryptionMethod?:string,accessId?:string,accessKey?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    refId;
    /** @type {?string} */
    encryptionMethod;
    /** @type {?string} */
    accessId;
    /** @type {?string} */
    accessKey;
    getTypeName() { return 'DownloadDirect' }
    getMethod() { return 'POST' }
    createResponse () { };
}
export class CheckQuota {
    /** @param {{images?:number,width?:number,height?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    images;
    /** @type {number} */
    width;
    /** @type {number} */
    height;
    getTypeName() { return 'CheckQuota' }
    getMethod() { return 'POST' }
    createResponse() { return new CheckQuotaResponse() }
}
export class CreateCreative {
    /** @param {{userPrompt?:string,images?:number,width?:number,height?:number,steps?:number,seed?:number,engineId?:string,artistIds?:number[],modifierIds?:number[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    userPrompt;
    /** @type {?number} */
    images;
    /** @type {?number} */
    width;
    /** @type {?number} */
    height;
    /** @type {?number} */
    steps;
    /** @type {?number} */
    seed;
    /** @type {?string} */
    engineId;
    /** @type {number[]} */
    artistIds;
    /** @type {number[]} */
    modifierIds;
    getTypeName() { return 'CreateCreative' }
    getMethod() { return 'POST' }
    createResponse() { return new CreateCreativeResponse() }
}
export class UpdateCreative {
    /** @param {{id?:number,primaryArtifactId?:number,unpinPrimaryArtifact?:boolean}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {?number} */
    primaryArtifactId;
    /** @type {?boolean} */
    unpinPrimaryArtifact;
    getTypeName() { return 'UpdateCreative' }
    getMethod() { return 'PATCH' }
    createResponse() { return new Creative() }
}
export class UpdateArtifact {
    /** @param {{id?:number,nsfw?:boolean,quality?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {?boolean} */
    nsfw;
    /** @type {?number} */
    quality;
    getTypeName() { return 'UpdateArtifact' }
    getMethod() { return 'PATCH' }
    createResponse() { return new Artifact() }
}
export class ResizedArtifact {
    /** @param {{artifactId?:number,size?:ArtifactSize}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    artifactId;
    /** @type {ArtifactSize} */
    size;
    getTypeName() { return 'ResizedArtifact' }
    getMethod() { return 'GET' }
    createResponse() { }
}
export class DeleteCreative {
    /** @param {{id?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    getTypeName() { return 'DeleteCreative' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}
export class HardDeleteCreative {
    /** @param {{id?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    getTypeName() { return 'HardDeleteCreative' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}
export class DeleteCdnFilesMq {
    /** @param {{files?:string[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string[]} */
    files;
    getTypeName() { return 'DeleteCdnFilesMq' }
    getMethod() { return 'POST' }
    createResponse () { };
}
export class DeleteCdnFile {
    /** @param {{file?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    file;
    getTypeName() { return 'DeleteCdnFile' }
    getMethod() { return 'POST' }
    createResponse() { }
}
export class GetCdnFile {
    /** @param {{file?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    file;
    getTypeName() { return 'GetCdnFile' }
    getMethod() { return 'POST' }
    createResponse () { };
}
export class GetCreative {
    /** @param {{id?:number,artifactId?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?number} */
    artifactId;
    getTypeName() { return 'GetCreative' }
    getMethod() { return 'GET' }
    createResponse() { return new GetCreativeResponse() }
}
export class SearchData {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'SearchData' }
    getMethod() { return 'POST' }
    createResponse() { return new SearchDataResponse() }
}
export class GetUserInfo {
    /** @param {{refId?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    refId;
    getTypeName() { return 'GetUserInfo' }
    getMethod() { return 'GET' }
    createResponse() { return new GetUserInfoResponse() }
}
export class AnonData {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'AnonData' }
    getMethod() { return 'POST' }
    createResponse() { return new AnonDataResponse() }
}
export class GetAlbumIds {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'GetAlbumIds' }
    getMethod() { return 'POST' }
    createResponse() { return new GetAlbumIdsResponse() }
}
export class GetAlbumRefs {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'GetAlbumRefs' }
    getMethod() { return 'POST' }
    createResponse() { return new GetAlbumRefsResponse() }
}
export class UserData {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'UserData' }
    getMethod() { return 'POST' }
    createResponse() { return new UserDataResponse() }
}
export class GetAlbumResults {
    /** @param {{ids?:number[],refIds?:string[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number[]} */
    ids;
    /** @type {?string[]} */
    refIds;
    getTypeName() { return 'GetAlbumResults' }
    getMethod() { return 'POST' }
    createResponse() { return new GetAlbumResultsResponse() }
}
export class CreateSignup {
    /** @param {{type?:SignupType,email?:string,name?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {SignupType} */
    type;
    /** @type {string} */
    email;
    /** @type {?string} */
    name;
    getTypeName() { return 'CreateSignup' }
    getMethod() { return 'POST' }
    createResponse() { return new EmptyResponse() }
}
export class GetUserProfile {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'GetUserProfile' }
    getMethod() { return 'POST' }
    createResponse() { return new GetUserProfileResponse() }
}
export class UpdateUserProfile {
    /** @param {{displayName?:string,avatar?:string,handle?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    displayName;
    /** @type {?string} */
    avatar;
    /** @type {?string} */
    handle;
    getTypeName() { return 'UpdateUserProfile' }
    getMethod() { return 'PUT' }
    createResponse() { return new UserProfile() }
}
export class SearchArtifacts extends QueryDb_2 {
    /** @param {{query?:string,similar?:string,by?:string,user?:string,show?:string,modifier?:string,artist?:string,album?:string,source?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?string} */
    query;
    /** @type {?string} */
    similar;
    /** @type {?string} */
    by;
    /** @type {?string} */
    user;
    /** @type {?string} */
    show;
    /** @type {?string} */
    modifier;
    /** @type {?string} */
    artist;
    /** @type {?string} */
    album;
    /** @type {?string} */
    source;
    getTypeName() { return 'SearchArtifacts' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class ViewCreativeMetadata {
    /** @param {{creativeId?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    creativeId;
    getTypeName() { return 'ViewCreativeMetadata' }
    getMethod() { return 'GET' }
    createResponse() { return new Creative() }
}
export class QueryTodos extends QueryData {
    /** @param {{id?:number,ids?:number[],textContains?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?number[]} */
    ids;
    /** @type {?string} */
    textContains;
    getTypeName() { return 'QueryTodos' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class CreateTodo {
    /** @param {{text?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    text;
    getTypeName() { return 'CreateTodo' }
    getMethod() { return 'POST' }
    createResponse() { return new Todo() }
}
export class UpdateTodo {
    /** @param {{id?:number,text?:string,isFinished?:boolean}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    text;
    /** @type {boolean} */
    isFinished;
    getTypeName() { return 'UpdateTodo' }
    getMethod() { return 'PUT' }
    createResponse() { return new Todo() }
}
export class DeleteTodo {
    /** @param {{id?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    getTypeName() { return 'DeleteTodo' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}
export class DeleteTodos {
    /** @param {{ids?:number[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number[]} */
    ids;
    getTypeName() { return 'DeleteTodos' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}
export class GetArtifactUserData {
    /** @param {{artifactId?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    artifactId;
    getTypeName() { return 'GetArtifactUserData' }
    getMethod() { return 'GET' }
    createResponse() { return new GetArtifactUserDataResponse() }
}
export class GetAlbumUserData {
    /** @param {{albumId?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    albumId;
    getTypeName() { return 'GetAlbumUserData' }
    getMethod() { return 'GET' }
    createResponse() { return new GetAlbumUserDataResponse() }
}
export class CreateArtifactCommentVote {
    /** @param {{artifactCommentId?:number,vote?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    artifactCommentId;
    /** @type {number} */
    vote;
    getTypeName() { return 'CreateArtifactCommentVote' }
    getMethod() { return 'POST' }
    createResponse() { }
}
export class DeleteArtifactCommentVote {
    /** @param {{artifactCommentId?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    artifactCommentId;
    getTypeName() { return 'DeleteArtifactCommentVote' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}
export class Authenticate {
    /** @param {{provider?:string,userName?:string,password?:string,rememberMe?:boolean,accessToken?:string,accessTokenSecret?:string,returnUrl?:string,errorView?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description AuthProvider, e.g. credentials */
    provider;
    /** @type {string} */
    userName;
    /** @type {string} */
    password;
    /** @type {?boolean} */
    rememberMe;
    /** @type {string} */
    accessToken;
    /** @type {string} */
    accessTokenSecret;
    /** @type {string} */
    returnUrl;
    /** @type {string} */
    errorView;
    /** @type {{ [index: string]: string; }} */
    meta;
    getTypeName() { return 'Authenticate' }
    getMethod() { return 'POST' }
    createResponse() { return new AuthenticateResponse() }
}
export class AdminQueryArtifactComments extends QueryDb_1 {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'AdminQueryArtifactComments' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class AdminQueryArtifactCommentReports extends QueryDb_1 {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'AdminQueryArtifactCommentReports' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryAlbums extends QueryDb_1 {
    /** @param {{id?:number,ids?:number[],skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?number[]} */
    ids;
    getTypeName() { return 'QueryAlbums' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryAlbumLikes extends QueryDb_1 {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'QueryAlbumLikes' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryAlbumArtifacts extends QueryDb_1 {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'QueryAlbumArtifacts' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryArtifactStats extends QueryDb_1 {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'QueryArtifactStats' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QuerySearchStats extends QueryDb_1 {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'QuerySearchStats' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QuerySignups extends QueryDb_1 {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'QuerySignups' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryArtifacts extends QueryDb_1 {
    /** @param {{id?:number,ids?:number[],skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?number[]} */
    ids;
    getTypeName() { return 'QueryArtifacts' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryArtifactLikes extends QueryDb_1 {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'QueryArtifactLikes' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryArtifactReports extends QueryDb_1 {
    /** @param {{artifactId?:number,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?number} */
    artifactId;
    getTypeName() { return 'QueryArtifactReports' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryArtists extends QueryDb_1 {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'QueryArtists' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryArtifactComments extends QueryDb_2 {
    /** @param {{artifactId?:number,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {number} */
    artifactId;
    getTypeName() { return 'QueryArtifactComments' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryArtifactCommentVotes extends QueryDb_1 {
    /** @param {{artifactId?:number,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {number} */
    artifactId;
    getTypeName() { return 'QueryArtifactCommentVotes' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryCreatives extends QueryDb_1 {
    /** @param {{id?:number,createdBy?:string,ownerId?:number,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?string} */
    createdBy;
    /** @type {?number} */
    ownerId;
    getTypeName() { return 'QueryCreatives' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryCreativeArtists extends QueryDb_1 {
    /** @param {{creativeId?:number,modifierId?:number,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?number} */
    creativeId;
    /** @type {?number} */
    modifierId;
    getTypeName() { return 'QueryCreativeArtists' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryCreativeModifiers extends QueryDb_1 {
    /** @param {{creativeId?:number,modifierId?:number,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?number} */
    creativeId;
    /** @type {?number} */
    modifierId;
    getTypeName() { return 'QueryCreativeModifiers' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryModifiers extends QueryDb_1 {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    getTypeName() { return 'QueryModifiers' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class AdminUpdateArtifactComment {
    /** @param {{id?:number,replyId?:number,content?:string,notes?:string,flagReason?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {?number} */
    replyId;
    /** @type {?string} */
    content;
    /** @type {?string} */
    notes;
    /** @type {?string} */
    flagReason;
    getTypeName() { return 'AdminUpdateArtifactComment' }
    getMethod() { return 'PATCH' }
    createResponse() { return new ArtifactComment() }
}
export class AdminDeleteArtifactComment {
    /** @param {{id?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    getTypeName() { return 'AdminDeleteArtifactComment' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}
export class AdminUpdateArtifactCommentReport {
    /** @param {{id?:number,postReport?:PostReport,description?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {?PostReport} */
    postReport;
    /** @type {?string} */
    description;
    getTypeName() { return 'AdminUpdateArtifactCommentReport' }
    getMethod() { return 'PATCH' }
    createResponse() { return new ArtifactCommentReport() }
}
export class AdminDeleteArtifactCommentReport {
    /** @param {{id?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    getTypeName() { return 'AdminDeleteArtifactCommentReport' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}
export class DeleteAlbum {
    /** @param {{id?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    getTypeName() { return 'DeleteAlbum' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}
export class UpdateAlbumArtifact {
    /** @param {{id?:number,name?:string,description?:string,slug?:string,tags?:string[],primaryArtifactId?:number,addArtifactIds?:number[],removeArtifactIds?:number[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {?string} */
    name;
    /** @type {?string} */
    description;
    /** @type {?string} */
    slug;
    /** @type {?string[]} */
    tags;
    /** @type {?number} */
    primaryArtifactId;
    /** @type {?number[]} */
    addArtifactIds;
    /** @type {?number[]} */
    removeArtifactIds;
    getTypeName() { return 'UpdateAlbumArtifact' }
    getMethod() { return 'PATCH' }
    createResponse() { return new Album() }
}
export class UpdateSignup {
    /** @param {{id?:number,type?:SignupType,email?:string,name?:string,cancelledDate?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {?SignupType} */
    type;
    /** @type {?string} */
    email;
    /** @type {?string} */
    name;
    /** @type {?string} */
    cancelledDate;
    getTypeName() { return 'UpdateSignup' }
    getMethod() { return 'PATCH' }
    createResponse() { return new Signup() }
}
export class DeleteSignup {
    /** @param {{id?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    getTypeName() { return 'DeleteSignup' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}
export class UpdateArtifactReport {
    /** @param {{artifactId?:number,type?:ReportType,description?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    artifactId;
    /** @type {?ReportType} */
    type;
    /** @type {?string} */
    description;
    getTypeName() { return 'UpdateArtifactReport' }
    getMethod() { return 'PATCH' }
    createResponse() { return new ArtifactReport() }
}
export class CreateArtist {
    /** @param {{firstName?:string,lastName?:string,yearDied?:number,type?:string[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    firstName;
    /** @type {string} */
    lastName;
    /** @type {?number} */
    yearDied;
    /** @type {?string[]} */
    type;
    getTypeName() { return 'CreateArtist' }
    getMethod() { return 'POST' }
    createResponse() { return new Artist() }
}
export class UpdateArtist {
    /** @param {{id?:number,firstName?:string,lastName?:string,yearDied?:number,type?:string[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {?string} */
    firstName;
    /** @type {?string} */
    lastName;
    /** @type {?number} */
    yearDied;
    /** @type {?string[]} */
    type;
    getTypeName() { return 'UpdateArtist' }
    getMethod() { return 'PATCH' }
    createResponse() { return new Artist() }
}
export class DeleteArtist {
    /** @param {{id?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    getTypeName() { return 'DeleteArtist' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}
export class CreateArtifactComment {
    /** @param {{artifactId?:number,replyId?:number,content?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    artifactId;
    /** @type {?number} */
    replyId;
    /** @type {string} */
    content;
    getTypeName() { return 'CreateArtifactComment' }
    getMethod() { return 'POST' }
    createResponse() { return new ArtifactComment() }
}
export class UpdateArtifactComment {
    /** @param {{id?:number,content?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {?string} */
    content;
    getTypeName() { return 'UpdateArtifactComment' }
    getMethod() { return 'PATCH' }
    createResponse() { return new ArtifactComment() }
}
export class DeleteArtifactComment {
    /** @param {{id?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    getTypeName() { return 'DeleteArtifactComment' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}
export class CreateArtifactCommentReport {
    /** @param {{artifactCommentId?:number,postReport?:PostReport,description?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    artifactCommentId;
    /** @type {PostReport} */
    postReport;
    /** @type {string} */
    description;
    getTypeName() { return 'CreateArtifactCommentReport' }
    getMethod() { return 'POST' }
    createResponse() { }
}
export class DeleteArtifactCommentReport {
    /** @param {{id?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    getTypeName() { return 'DeleteArtifactCommentReport' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}
export class CreateCreativeArtist {
    /** @param {{creativeId?:number,modifierId?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    creativeId;
    /** @type {?number} */
    modifierId;
    getTypeName() { return 'CreateCreativeArtist' }
    getMethod() { return 'POST' }
    createResponse() { return new CreativeArtist() }
}
export class DeleteCreativeArtist {
    /** @param {{id?:number,ids?:number[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?number[]} */
    ids;
    getTypeName() { return 'DeleteCreativeArtist' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}
export class CreateCreativeModifier {
    /** @param {{creativeId?:number,modifierId?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    creativeId;
    /** @type {?number} */
    modifierId;
    getTypeName() { return 'CreateCreativeModifier' }
    getMethod() { return 'POST' }
    createResponse() { return new CreativeModifier() }
}
export class DeleteCreativeModifier {
    /** @param {{id?:number,ids?:number[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    id;
    /** @type {?number[]} */
    ids;
    getTypeName() { return 'DeleteCreativeModifier' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}
export class CreateModifier {
    /** @param {{name?:string,category?:string,description?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    name;
    /** @type {string} */
    category;
    /** @type {?string} */
    description;
    getTypeName() { return 'CreateModifier' }
    getMethod() { return 'POST' }
    createResponse() { return new Modifier() }
}
export class UpdateModifier {
    /** @param {{id?:number,name?:string,category?:string,description?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {?string} */
    name;
    /** @type {?string} */
    category;
    /** @type {?string} */
    description;
    getTypeName() { return 'UpdateModifier' }
    getMethod() { return 'PATCH' }
    createResponse() { return new Modifier() }
}
export class DeleteModifier {
    /** @param {{id?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    getTypeName() { return 'DeleteModifier' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}

