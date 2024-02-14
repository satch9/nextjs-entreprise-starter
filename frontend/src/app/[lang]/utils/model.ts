type StrapiResponse<T> = {
	data: T;
	message: string;
};

export interface Attribute {
	url: string;
	alternativeText?: any;
	caption?: any;
	width: number;
	height: number;
}

export interface Data {
	id: number;
	attributes: Attribute;
}

export interface Picture {
	data: Data;
}

export interface Button {
	id: number;
	url: string;
	newTab: boolean;
	text: string;
	type: string;
}

export interface ContentSection {
	id: number;
	__component: string;
	title: string;
	description: string;
	picture: Picture;
	buttons: Button[];
}

export interface Attribute {
	shortName: string;
	slug: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string;
	heading?: any;
	description?: any;
	contentSections: ContentSection[];
}

export interface Data {
	id: number;
	attributes: Attribute;
}

export interface Pagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

export interface Meta {
	pagination: Pagination;
}

export interface RootObject {
	data: Data[];
	meta: Meta;
}
export interface PublicHolidays {
	name: string;
	datePublicHolydays: Date;
}

export interface IMoisAvecJours {
	[key: string]: Array<Array<string | null>>;
}

export interface IEphemeride {
	Janvier: [
		[string, string]
	];
	Février: [
		[string, string]
	];
	Mars: [
		[string, string]
	];
	Avril: [
		[string, string]
	];
	Mai: [
		[string, string]
	];
	Juin: [
		[string, string]
	];
	Juillet: [
		[string, string]
	];
	Août: [
		[string, string]
	];
	Septembre: [
		[string, string]
	];
	Octobre: [
		[string, string]
	];
	Novembre: [
		[string, string]
	];
	Décembre: [
		[string, string]
	];
}

export interface CalendarProps {
	data: {
		id: string;
		startDate: string;
		endDate: string;
		guests: number;
	}[];
}
