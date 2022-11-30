import React, { useState, useEffect } from 'react'
import { useUpdateUserMutation, useDeleteUserMutation } from '../users/usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { ROLES } from '../../config/roles'
import { Paper, Box, Button, TextField, Typography, Link, OutlinedInput, InputLabel, MenuItem, FormControl, Select } from '@mui/material'

// included
const USER_REGEX = /^[a-zA-Z0-9-_.]{3,24}$/
// required type
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/


const EditUserForm = ({ currentUser }) => {
  return (
    <div>EditUserForm</div>
  )
}

export default EditUserForm