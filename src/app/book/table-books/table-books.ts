export interface FirstSet {
	title: string;
	id: number;
	description: string;
}

export interface SecondSet {
	id: number;
	qtyRelease: number;
	releaseDate: string;
}

export interface BothSets extends FirstSet, SecondSet {}