import {
	BoxGeometry,
	BufferAttribute,
	DoubleSide,
	FrontSide,
	Group,
	Mesh,
	MeshStandardMaterial,
	NearestFilter,
	RepeatWrapping,
	TextureLoader,
	Vector2,
	Vector3,
} from 'three'
import { BenchData, UV, UVs } from '../types/benchy'

export class Benchy {
	static async createMaterial(source: string, opaque = false, alphaTest = 0.35) {
		const matTex = new TextureLoader().load(source)
		matTex.wrapS = RepeatWrapping
		matTex.wrapT = RepeatWrapping
		matTex.minFilter = NearestFilter
		matTex.magFilter = NearestFilter

		return new MeshStandardMaterial({
			map: matTex,
			side: DoubleSide,
			transparent: !opaque,
			alphaTest,
		})
	}

	static makeBenchyModel = async (texture: string, model: BenchData): Promise<BenchyObject> => {
		try {
			if (texture === '#') {
				// make default black texture
				texture =
					'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOc9Tr4PwAG2ALZBzOfwAAAAABJRU5ErkJggg=='
			}
			const material = await this.createMaterial(texture)
			const group = new BenchyObject()
			model.elements.forEach((element) => {
				const xDif = element.to[0] - element.from[0]
				const yDif = element.to[1] - element.from[1]
				const zDif = element.to[2] - element.from[2]
				const xPos = element.from[0]
				const yPos = element.from[1]
				const zPos = element.from[2]

				const box = new BoxGeometry(Math.abs(xDif), Math.abs(yDif), Math.abs(zDif))
				box.translate(xDif / 2 + xPos, yDif / 2 + yPos, zDif / 2 + zPos)
				this.setJsonUVs(box, element.faces)

				const mesh = new Mesh(box, material)

				if (element.rotation != undefined && element.rotation.angle % 360 != 0) {
					const angle = (element.rotation.angle * Math.PI) / 180
					let axis = new Vector3(0, 0, 0)

					const axisNames = ['x', 'y', 'z']
					axisNames.every((axisTest) => {
						if (axisTest == element.rotation?.axis) {
							const vectorCoords = Array(3).fill(0)
							vectorCoords[axisNames.indexOf(axisTest)] = 1
							axis = new Vector3(...vectorCoords)
							return
						}
						return true
					})
					mesh.position.sub(new Vector3(...element.rotation.origin))
					mesh.position.applyAxisAngle(axis, angle)
					mesh.position.add(new Vector3(...element.rotation.origin))
					mesh.rotateOnAxis(axis, angle)
				}
				group.add(mesh)
			})
			group.scale.x = -1
			group.scale.z = -1

			return group
		} catch (e) {
			console.log(e)
			throw 'JSON model is not a valid format!'
		}
	}

	static rotateArray = (arr: Vector2[], shift: number) => {
		const original = [...arr]

		for (let i = 0; i < arr.length; ++i) {
			arr[i] = original[(i + shift) % arr.length]
		}

		return arr
	}

	static UVtoVertices = (face: UV | undefined) => {
		if (face == undefined) {
			return [new Vector2(-1.0, -1.0), new Vector2(0.0, -1.0), new Vector2(0.0 / 16, 0.0), new Vector2(-1.0, 0.0)]
		} else {
			let result = [
				new Vector2(face.uv[0] / 16, 1.0 - face.uv[3] / 16),
				new Vector2(face.uv[2] / 16, 1.0 - face.uv[3] / 16),
				new Vector2(face.uv[2] / 16, 1.0 - face.uv[1] / 16),
				new Vector2(face.uv[0] / 16, 1.0 - face.uv[1] / 16),
			]
			if (face.rotation == undefined) face.rotation = 0
			result = this.rotateArray(result, Math.floor(face.rotation / 90))
			return result
		}
	}

	static setJsonUVs = (box: BoxGeometry, UVs: UVs) => {
		const north = this.UVtoVertices(UVs.north),
			south = this.UVtoVertices(UVs.south),
			east = this.UVtoVertices(UVs.east),
			west = this.UVtoVertices(UVs.west),
			up = this.UVtoVertices(UVs.up),
			down = this.UVtoVertices(UVs.down)

		const uvAttr = box.attributes.uv as BufferAttribute
		//@ts-ignore
		uvAttr.copyVector2sArray([
			east[3],
			east[2],
			east[0],
			east[1],
			west[3],
			west[2],
			west[0],
			west[1],
			up[3],
			up[2],
			up[0],
			up[1],
			down[3],
			down[2],
			down[0],
			down[1],
			south[3],
			south[2],
			south[0],
			south[1],
			north[3],
			north[2],
			north[0],
			north[1],
		])
		uvAttr.needsUpdate = true
	}
}

export class BenchyObject extends Group {
	private material

	constructor() {
		super()
		this.name = 'bench'
		this.material = new MeshStandardMaterial({
			side: FrontSide,
		})
	}

	get map() {
		return this.material.map
	}

	set map(newMap) {
		this.material.map = newMap
		this.material.needsUpdate = true
	}
}