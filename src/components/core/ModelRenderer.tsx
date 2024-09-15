"use client"
import { WynntilsSkinViewer } from "@/lib/WynntilsSkinViewer"
import { LegacyRef, useEffect, useMemo, useRef } from "react"
import { RepeatWrapping, TextureLoader, Vector2 } from "three"

type ModelRendererProps = {
    capeTexture: string
    alternate: boolean
}

export const ModelRenderer = ({ capeTexture, alternate } : ModelRendererProps) => {

    const skinViewer = useRef<WynntilsSkinViewer>()
    const canvas = useRef<HTMLCanvasElement>()

    const backgroundTexture = useMemo(() => {
        const texture = new TextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAASklEQVRYR+3WIQ4AMAhDUZBkgkmS3f9+4wTbISowv75J81Q9Yj0TkrmFtpkzAAEEEEAAAQTGBaqO9Ae6r/YHGIAAAggggAAC0wIfjERWgaTpVloAAAAASUVORK5CYII=')
        texture.repeat = new Vector2(10,10)
        texture.wrapS = RepeatWrapping
        texture.wrapT = RepeatWrapping
        return texture
    }, []);

    useEffect(() => {
        console.debug("Initializing Wynntils Cosmetic Viewer")
        const renderer = new WynntilsSkinViewer({
            canvas: canvas.current,
            model: 'auto-detect',
            renderPaused: false,
            zoom: 0.7,
            width: 350,
            height: 350,
        })

        renderer.playerWrapper.rotation.y = 128
        skinViewer.current = renderer as WynntilsSkinViewer
 
        skinViewer.current.loadSkin(`https://minotar.net/skin/MHF_Steve`)
    }, [backgroundTexture])

    useEffect(() => {
    
        if(!skinViewer.current) return

        if(!capeTexture) {
            skinViewer.current.resetCape()
            return
        }

        skinViewer.current.loadCape(capeTexture, { backEquipment: alternate ? 'elytra' : 'cape' })

    }, [capeTexture, alternate])
    

    return <canvas ref={canvas as LegacyRef<HTMLCanvasElement>} className="rounded-md" />

}