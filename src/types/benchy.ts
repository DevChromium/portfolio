// To parse this data:
//
//   import { Convert, BenchData } from "./file";
//
//   const benchData = Convert.toBenchData(json);

export interface BenchData {
	credit?: string
	textureSize: number[]
	textures: Textures
	elements: Element[]
}

export interface Element {
	from: number[]
	to: number[]
	faces: UVs
	rotation?: Rotation
}

export interface UVs {
	north?: UV
	south?: UV
	east?: UV
	west?: UV
	up?: UV
	down?: UV
}

export interface UV {
	uv: number[]
	texture: Texture
	rotation?: number
}

export interface Rotation {
	angle: number
	axis: string
	origin: number[]
}
type Textures = Record<string, string>
type Texture = keyof Textures

// Converts JSON strings to/from your types
export class Convert {
	public static toBenchData(json: string): BenchData {
		return JSON.parse(json)
	}

	public static benchDataToJson(value: BenchData): string {
		return JSON.stringify(value)
	}
}