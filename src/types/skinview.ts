import { TextureCanvas } from 'skinview-utils/build/types'
import { BackEquipment } from 'skinview3d/libs/model'

export type TextureSource = HTMLImageElement | HTMLVideoElement | ImageBitmap | TextureCanvas
export type RemoteImage =
	| string
	| {
			src: string
			/** @defaultvalue "anonymous" */
			crossOrigin?: string | null
			referrerPolicy?: string
	  }
interface LoadOptions {
	makeVisible?: boolean
}
export interface CapeLoadOptions extends LoadOptions {
	backEquipment?: BackEquipment
}