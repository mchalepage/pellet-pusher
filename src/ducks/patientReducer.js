import axios from 'axios'

const initialState = {
    patient: {},
}

const GET_PATIENT = 'GET_PATIENT'

export function getPatient(patient_id){
    const patient = axios.get(`/api/patient/${patient_id}`)
    return {
        type: GET_PATIENT,
        payload: patient
    }
}

export default function (state = initialState, action){
    switch(action.type){
        case GET_PATIENT + '_PENDING':
            return state
        case GET_PATIENT + '_FULFILLED':
            return {...state, patient: action.payload.data}
        case GET_PATIENT + '_REJECTED':
            return initialState
        default:
            return state
    }
}