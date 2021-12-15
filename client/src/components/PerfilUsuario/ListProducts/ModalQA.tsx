import React, { BaseSyntheticEvent, useState } from "react";
import { Button, Grid, TextField, Typography, Modal } from "@material-ui/core";
import { Box } from "@mui/system";
import { Skeleton, Stack } from '@mui/material';
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { User } from "../../../redux/reducer/stateTypes";
import AnswerModal from "../../publicationDetail/qAndA/answerModal/AnswerModal";
import { useParams } from 'react-router';


interface Form {
  message: string;
  publicationId: string;
  authorId: string;
}
interface PubId {
  id: string;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function ModalQA(props: PubId): JSX.Element {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const publicationId = props.id;
    const user = useSelector((state: RootState): User | undefined => state?.userSignin?.userInfo);

    const [form, setForm] = useState<Form>({ message: '', publicationId: publicationId || '', authorId: user?._id || '' });
    const [isBuyer, setIsBuyer] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { message } = form;

    const [questions, setQuestions] = React.useState<[]>();


    // React.useEffect(() => {
    //     if (open) {
    //         setLoading(true)
    //     }
    // }, [open])


    React.useEffect(() => {
        if (user) {
            setLoading(true)
            getQuestions();
        }
    }, [publicationId, user]);

    // React.useEffect(() => {
    //     if (user) {
    //         setIsBuyer(user && !(user?.publications?.find(p => p._id === publicationId)));
    //     }
    // }, []);

    async function getQuestions() {
        await setIsBuyer(!!!(user?.publications?.find(p => p._id === publicationId)));
        axios.get('/qAndAs/' + publicationId).then(({ data }) => {
            setQuestions(data);
            setLoading(false)
        });
    };

    function handleForm(e: BaseSyntheticEvent) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function submitForm(e: BaseSyntheticEvent) {
        e.preventDefault();

        axios.post('/question', form).then(({ data }) => {
            setForm({ message: '', publicationId: publicationId || '', authorId: user?._id || '' });
            getQuestions();
        })
    }

    return (<>
        <div>
            <Button className='buttonSpan buttonMargin' color='primary' variant='outlined' onClick={handleOpen}>Q & A</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography variant="h5">Preguntas y respuestas</Typography>

                    { loading ?
        
        <Stack spacing={2} width={700} marginY={3}>
            <Skeleton variant="rectangular" height={20} width={300} style={{ marginLeft: 0 }} />
            <Skeleton variant="rectangular" height={50} width={300} />
            <Skeleton variant="rectangular" height={20} width={300} />
            <Skeleton variant="rectangular" height={50} width={300} />
            <Skeleton variant="rectangular" height={20} width={300} />
            <Skeleton variant="rectangular" height={50} width={300} />
        </Stack>
    
            :


            <Box>

                    {isBuyer &&

                        <Grid onSubmit={submitForm} component="form" container spacing={2} style={{ margin: "3px 0" }}>
                            <Grid item xs={5}>
                                <TextField
                                    onChange={handleForm}
                                    fullWidth
                                    name="message"
                                    value={message}
                                    id="outlined-helperText"
                                    label="Escribe tu pregunta..."
                                    helperText="Consejo: ¡Busca entre las respuestas antes de preguntar!"
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Button disabled={!message} type="submit">Preguntar</Button>
                            </Grid>
                        </Grid>
                    }

                    {/* </Box> */}

                    {questions && questions.length > 0 ?

                        <Box component="div">
                            {questions?.map((q: any) => {
                                return <Box key={q._id} component="div" sx={{ my: 3 }}>
                                    <Typography component="p">
                                        {q.message}
                                    </Typography>

                                    {!isBuyer && !q.answer?.message?.length ?

                                        <AnswerModal questionId={q._id} authorId={user?._id} getQuestions={getQuestions}>
                                            <div>Responder</div>
                                        </AnswerModal>

                                        :
                                        <Typography component="p" style={{ color: 'gray ' }}>
                                            {q.answer?.message ? q.answer?.message : 'Sin respuesta'} {q.answer?.createdAt && new Date(q.answer?.createdAt).toLocaleDateString()}
                                        </Typography>
                                    }
                                </Box>
                            })
                            }
                        </Box>

                        :

                        <Typography style={{ color: 'gray', margin: 2 }}>Aún no hay preguntas en esta publicación</Typography>

                    }
                    </Box>
            }


                </Box>
            </Modal>
        </div>
    </>)

}
