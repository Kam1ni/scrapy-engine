#version 300 es
precision mediump float;

uniform vec3 ambientLight;
layout(location = 0) out vec4 lightIntensityOut;

void main(){
	lightIntensityOut = vec4(ambientLight, 1.0);
}