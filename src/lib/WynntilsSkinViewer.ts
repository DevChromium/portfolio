"use client"

import { inferModelType, RemoteImage, TextureSource } from 'skinview-utils'
import { SkinViewer, SkinViewerOptions } from 'skinview3d'
import { CapeLoadOptions, SkinLoadOptions } from 'skinview3d/libs/viewer'
import { CanvasTexture, Group, NearestFilter, Vector3 } from 'three'

declare module 'skinview3d' {
	export interface PlayerObject {
		slot: {
			head: Group
			body: Group
			leftArm: Group
			rightArm: Group
			leftLeg: Group
			rightLeg: Group
		}
	}
}

export class WynntilsSkinViewer extends SkinViewer {
	constructor(options: SkinViewerOptions = {}) {
		super(options)

		this.playerObject.slot = {
			head: new Group(),
			body: new Group(),
			leftArm: new Group(),
			rightArm: new Group(),
			leftLeg: new Group(),
			rightLeg: new Group(),
		}

		this.playerObject.skin.head.add(this.playerObject.slot.head)
		this.playerObject.skin.body.add(this.playerObject.slot.body)
		this.playerObject.skin.leftArm.add(this.playerObject.slot.leftArm)
		this.playerObject.skin.rightArm.add(this.playerObject.slot.rightArm)
		this.playerObject.skin.leftLeg.add(this.playerObject.slot.leftLeg)
		this.playerObject.skin.rightLeg.add(this.playerObject.slot.rightLeg)
	}

	async loadCape<S extends TextureSource | RemoteImage>(source: S, options: CapeLoadOptions = {}): Promise<void> {
		const texture = await loadImage(source)

		this.loadCapeToCanvas(texture)
		this.recreateCapeTextureFix()

		// Clear the old animation if it exists
		if (this.capeCanvas.dataset.loopId) {
			clearInterval(parseInt(this.capeCanvas.dataset.loopId))
		}

		if (texture.width !== texture.height * 2) {
			this.playAnimation(this.capeCanvas, texture, this.recreateCapeTextureFix)
		}

		if (options.makeVisible !== false) {
			this.playerObject.backEquipment = options.backEquipment === undefined ? 'cape' : options.backEquipment
		}
	}

	loadCapeToCanvas = (image: TextureSource): void => {
		if (image.height % (image.width / 2) !== 0) {
			throw new Error('Invalid cape image')
		}

		const canvas = this.capeCanvas

		canvas.width = image.width
		canvas.height = image.width / 2

		const ctx = canvas.getContext('2d')
		ctx?.clearRect(0, 0, canvas.width, canvas.height)
		ctx?.drawImage(image, 0, 0, image.width, image.width / 2, 0, 0, canvas.width, canvas.height)
	}
	recreateCapeTextureFix = () => {
		const capeTexture = new CanvasTexture(this.capeCanvas)
		capeTexture.magFilter = NearestFilter
		capeTexture.minFilter = NearestFilter
		this.playerObject.cape.map = capeTexture
		this.playerObject.elytra.map = capeTexture
	}

	async loadSkin<S extends TextureSource | RemoteImage>(source: S, options: SkinLoadOptions = {}): Promise<void> {
		const texture = await loadImage(source)

		this.loadSkinToCanvas(texture)
		this.recreateSkinTextureFix()

		// Clear the old animation if it exists
		if (this.skinCanvas.dataset.loopId) {
			clearInterval(parseInt(this.skinCanvas.dataset.loopId))
		}

		if (texture.height !== texture.width) {
			this.playAnimation(this.skinCanvas, texture, this.recreateSkinTextureFix)
		}

		if (options.model === undefined || options.model === 'auto-detect') {
			this.playerObject.skin.modelType = inferModelType(this.skinCanvas)
		} else {
			this.playerObject.skin.modelType = options.model
		}
		if (options.makeVisible !== false) {
			this.playerObject.skin.visible = true
		}
	}

	loadSkinToCanvas = (image: TextureSource) => {
		let isOldFormat = false
		if (image.width !== image.height) {
			if (image.width === 2 * image.height) {
				isOldFormat = true
			} else {
				// throw new Error(`Bad skin size: ${image.width}x${image.height}`);
			}
		}
		const canvas = this.skinCanvas
		const context = canvas.getContext('2d')
		if (context === null) {
			throw new Error('Failed to get canvas context')
		}
		if (isOldFormat) {
			throw new Error('Old skin format is not supported')
		} else {
			canvas.width = image.width
			canvas.height = image.width
			context.clearRect(0, 0, image.width, image.width)
			context.drawImage(image, 0, 0, canvas.width, canvas.height)
			// fixOpaqueSkin(context, canvas.width, true);
		}
	}
	recreateSkinTextureFix = () => {
		const skinTexture = new CanvasTexture(this.skinCanvas)
		skinTexture.magFilter = NearestFilter
		skinTexture.minFilter = NearestFilter
		this.playerObject.skin.map = skinTexture
	}
	

	playAnimation(canvas: HTMLCanvasElement, image: TextureSource, recreateTexture: (renderer: SkinViewer) => void) {
		// Play animation if the image is a sprite sheet with multiple frames
		const frameCount = image.height / canvas.height

		// Start loop for this canvas so that it can be stopped later
		let i = 0
		const loop = () => {
			if (!this.animation?.paused) {
				const ctx = canvas.getContext('2d')
				ctx?.clearRect(0, 0, canvas.width, canvas.height)
				ctx?.drawImage(
					image,
					0,
					i * canvas.height, // source x, y
					canvas.width,
					canvas.height, // source width, height
					0,
					0, // destination x, y
					canvas.width,
					canvas.height // destination width, height
				)
				recreateTexture(this)
				i = (i + 1) % frameCount
			}
			canvas.dataset.loopId = setTimeout(loop, 1000 / 10).toString()
		}
		loop()
	}
}

const loadImage = (source: any): Promise<HTMLImageElement> => {
	const image = new Image()
	return new Promise((resolve, reject) => {
		image.onload = () => resolve(image)
		image.onerror = reject
		image.crossOrigin = 'anonymous'
		if (typeof source === 'string') {
			image.src = source
		} else {
			if (source.crossOrigin !== undefined) {
				image.crossOrigin = source.crossOrigin
			}
			if (source.referrerPolicy !== undefined) {
				image.referrerPolicy = source.referrerPolicy
			}
			image.src = source.src
		}
	})
}