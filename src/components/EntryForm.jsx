import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React, { useEffect, useState } from 'react'
import vgrades from '../data/VGrades'
import yosemiteGrades from '../data/YosemiteGrades'

export default function EntryForm(props) {
  const modalStyle = {
    bgcolor: 'white',
    padding: '30px',
    borderRadius: 1.2,
    minWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }

  function getUniqueID() {
    // Get the timestamp and convert
    // it into alphanumeric input
    return Date.now().toString(36)
  }

  const [grade, setGrade] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState(null) // TODO - Make this value today's date. dayjs() is returning an error
  const [mpLink, setMpLink] = useState('')
  const [climbingType, setClimbingType] = useState('')

  const updateClimbingType = (val) => {
    // the grade value might not be available if they change types
    // so reset it
    setGrade('')
    setClimbingType(val)
  }
  useEffect(() => {
    console.log(date)
  }, [date])

  const handleDateChange = (newDate) => {
    const newSelectedDate = newDate.format('MM/DD/YYYY').toString()
    setDate(newSelectedDate)
  }

  const onSubmit = () => {
    let id = getUniqueID()
    const model = {
      id,
      date,
      climbingType,
      grade,
      location,
      mpLink,
    }

    // TODO actually validate
    // const valid = true
    // if (!valid) {
    //   return
    // }
    props.onSubmit(model)
  }

  return (
    <>
      <Box sx={modalStyle}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: 3,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              // defaultValue={dayjs()}
              label="Date of climb"
              value={date}
              onChange={handleDateChange}
              // inputRef={dateRef}
              sx={{ width: 2 / 5 }}
            />
          </LocalizationProvider>
          <FormControl>
            <InputLabel id="climbing-type-label">Type</InputLabel>

            <Select
              defaultValue={''}
              label="___" //this wont work but i need it bc it gives me white space to add the inputLabel as a component?????
              value={climbingType}
              onChange={(e) => updateClimbingType(e.target.value)}
              sx={{ minWidth: 90, paddingLeft: '30' }}
              required
            >
              <MenuItem value="Sport">Sport</MenuItem>
              <MenuItem value="Trad">Trad</MenuItem>
              <MenuItem value="Bouldering">Bouldering</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="climbing-grade-label">Grade</InputLabel>

            <Select
              defaultValue={''}
              label="____" //this wont work but i need it bc it gives me white space to add the inputLabel as a component?????
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              sx={{ minWidth: 90, paddingLeft: '30' }}
              required
            >
              <MenuItem value={''}>Please make a selection</MenuItem>
              {climbingType === 'Bouldering'
                ? vgrades.map((v) => (
                    <MenuItem value={v.val}>{v.grade}</MenuItem>
                  ))
                : yosemiteGrades.map((v) => (
                    <MenuItem value={v.val}>{v.grade}</MenuItem>
                  ))}
            </Select>
          </FormControl>
        </Box>
        <FormControl
          sx={{
            paddingBottom: 3,
          }}
        >
          <TextField
            id="outlined-basic"
            label="Climb Location"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </FormControl>
        <FormControl
          sx={{
            paddingBottom: 3,
          }}
        >
          <TextField
            id="outlined-basic"
            label="Mountain Project Link"
            variant="outlined"
            value={mpLink}
            onChange={(e) => setMpLink(e.target.value)}
          />
          <a href="https://www.mountainproject.com/" target="_blank">
            search on mountain project here
          </a>
        </FormControl>
        <Button onClick={onSubmit} variant="outlined">
          submit
        </Button>
      </Box>
    </>
  )
}
