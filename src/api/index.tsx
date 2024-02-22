import React from 'react';
import axios from 'axios';
import {baseUrl,AIUrl} from './serviceUrl';

export const get = async (url: any, params = {}) => {
  try {
    console.log("baseUrl",baseUrl);
    
    const response = await axios.get(`${baseUrl}/${url}`, {params});
    return response.data;
  } catch (error) {
    console.log('GET request failed:', error);
    throw error;
  }
};

export const post = async (url: any, data:any = {}, config = {}) => {
  try {
    const response = await axios.post(`${baseUrl}/${url}`, data,config);
    return response.data;
  } catch (error) {
    console.log('POST request failed:', error);
    throw error;
  }
};

export const postAI = async (url:any,data:any = {},config = {}) => {
  try {
    const response = await axios.post(`${AIUrl}/${url}`, data,config);
    return response.data;
  }catch (error) {
    console.log("POST AI request failed:",error);
    throw error;
  }
};


export const Api = async (method: string, url: string, params: any = {}, data: any = null, config: any = {}) => {
  try {
    const response = await axios.request({
      method,
      url: `${baseUrl}/${url}`,
      params,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error(`${method.toUpperCase()} request failed:`, error);
    throw error;
  }
};


export const ApiAi = async (method: string, url: string, params: any = {}, data: any = null, config: any = {}) => {
  try {
    const response = await axios.request({
      method,
      url: `${AIUrl}/${url}`,
      params,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error(`${method.toUpperCase()} request failed:`, error);
    throw error;
  }
};