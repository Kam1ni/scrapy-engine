#version 300 es
precision mediump float;

uniform sampler2D diffuseTexture;
uniform sampler2D lightIntensityTexture;
out vec4 fragColor;
in vec2 tex_coord;

void main(){
	fragColor = texture(diffuseTexture, tex_coord) * texture(lightIntensityTexture, tex_coord);
}